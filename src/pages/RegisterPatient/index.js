import "date-fns";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  Grid,
  TextField,
  Typography,
  Input,
  InputLabel,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import { cpfMask } from "../../utils/mask";
import { api } from "../../services/api";
import history from "../../services/history";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  input: {
    marginTop: 20
  }
}));

export default function RegisterPatient() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    username: "",
    email: "",
    password: "",
    checked: false,
    valid: false,
    acceptedTerms: false,
    documentID: "",
    birthday: new Date()
  });
  function handleInputChange(name, value) {
    setValues({ ...values, [name]: value });
  }
  function validForm() {
    const { email, password, username, acceptedTerms, documentID } = values;
    if (
      email.length > 6 &&
      password.length > 6 &&
      username.length > 6 &&
      acceptedTerms === true &&
      documentID.length > 11
    ) {
      return false;
    } else {
      return true;
    }
  }
  function parseDate(d) {
    return format(d.valueOf(), "yyyy-MM-dd");
  }
  function clearRegex(v) {
    return v.replace(/[^\w\s]/gi, "");
  }
  async function handleRegister() {
    try {
      const data = {
        username: values.username,
        email: values.email,
        password: values.password,
        checked: false,
        valid: false,
        acceptedTerms: values.acceptedTerms,
        documentID: clearRegex(values.documentID),
        birthday: parseDate(values.birthday)
      };
      const register = await api.post("registerPatient", data);
      history.push("/login");
    } catch (e) {
      console.log("erro ao cadastrar", e);
    }
  }

  return (
    <Grid
      style={{ height: "100vh" }}
      alignContent="center"
      justify="center"
      container
    >
      <Grid item md={4} lg={4} sm={12} xl={4} xs={12}>
        <Paper className={classes.paper}>
          <div>
            <img
              style={{ height: 100 }}
              src={require("../../assets/logo.png")}
            />
          </div>
          <Typography variant="h6" component="h2">
            Cadastrar
          </Typography>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              value={values.username}
              onChange={value =>
                handleInputChange("username", value.target.value)
              }
              fullWidth
              id="username"
              label="Nome Completo"
              variant="filled"
              className={classes.input}
              autoComplete="off"
              helperText="Digite seu nome completo"
            />
            <TextField
              value={values.email}
              onChange={value => handleInputChange("email", value.target.value)}
              fullWidth
              type="email"
              id="email"
              label="E-mail"
              variant="filled"
              className={classes.input}
              autoComplete="off"
              helperText="Digite um e-mail válido"
            />

            <TextField
              value={values.password}
              onChange={value =>
                handleInputChange("password", value.target.value)
              }
              fullWidth
              type="password"
              id="password"
              label="Senha"
              variant="filled"
              className={classes.input}
              helperText="Digite uma senha com no mínimo 6 caracteres"
            />
            {/* <Input
              value={values.birthday}
              onChange={value => console.log("idade", value.target.value)}
              fullWidth
              id="birthday"
              className={classes.input}
              autoComplete="off"
              inputComponent={DateMask}
            /> */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={classes.input}
                fullWidth
                inputVariant="filled"
                variant="dialog"
                disableToolbar
                format="dd/MM/yyyy"
                id="date-picker-inline"
                label="Data de Nascimento"
                value={values.birthday}
                invalidLabel="Data ivalida"
                onChange={value => handleInputChange("birthday", value)}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
            <TextField
              value={values.documentID}
              onChange={value =>
                handleInputChange("documentID", cpfMask(value.target.value))
              }
              fullWidth
              type="documentID"
              id="documentID"
              label="CPF"
              variant="filled"
              className={classes.input}
              helperText="Digite um cpf válido"
            />
            <div>
              <TextField
                className={classes.input}
                fullWidth
                id="termos"
                label="Termos"
                multiline
                rows={6}
                value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consectetur orci consequat eros pellentesque facilisis. Sed vehicula tincidunt risus in malesuada. Maecenas bibendum, metus vitae accumsan pharetra, libero justo luctus magna, eget imperdiet nisl dui nec quam. Donec maximus risus id blandit suscipit. Phasellus vitae orci quis risus tincidunt imperdiet non ac est. Suspendisse cursus, justo sit amet iaculis maximus, augue ligula faucibus erat, sit amet venenatis urna justo eu nisi. Maecenas cursus congue orci, vitae maximus mi iaculis ac. Ut auctor mauris metus, sit amet tempus nibh porttitor sed."
                disabled
                variant="filled"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.acceptedTerms}
                    onChange={value =>
                      handleInputChange("acceptedTerms", value.target.checked)
                    }
                    color="primary"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                }
                label="Aceitar os termos"
              />
            </div>
            <Button
              style={{ marginTop: 30, marginBlock: 20 }}
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={validForm()}
              onClick={() => handleRegister()}
            >
              Entrar
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
