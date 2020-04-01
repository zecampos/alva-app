import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button, Grid, TextField, Typography } from "@material-ui/core";
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
    marginTop: 30
  }
}));

export default function Login() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: "",
    password: ""
  });
  function handleInputChange(name, value) {
    setValues({ ...values, [name]: value });
  }
  function validForm() {
    const { email, password } = values;
    if (email.length > 6 && password.length > 6) {
      return false;
    } else {
      return true;
    }
  }
  async function handleLogin() {
    try {
      const login = await api.post("sessionPatient", values);
      // const patient = {
      //   token: login.data.token.token,
      //   ...login.data.patient
      // };
      await localStorage.setItem("patient", JSON.stringify(login.data));
      await localStorage.setItem("signed", JSON.stringify(true));
      history.push("check");
    } catch (e) {
      console.log("erro ao logar", e);
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
            Logar
          </Typography>
          <form className={classes.root} noValidate autoComplete="off">
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
            />
            <Button
              style={{ marginTop: 30, marginBlock: 20 }}
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={validForm()}
              onClick={() => handleLogin()}
            >
              Entrar
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
