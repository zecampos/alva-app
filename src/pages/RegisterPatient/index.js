import "date-fns";
import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Paper,
  Button,
  Grid,
  TextField,
  Typography,
  InputLabel,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import * as Yup from "yup";
import { Form } from "@unform/web";
import MaskedInput from "react-text-mask";
import { cpfMask, cepMask } from "../../utils/mask";
import { api } from "../../services/api";
import history from "../../services/history";
import Input from "../../components/Form/Input";
import InputCpf from "../../components/Form/InputCpf";
import { isCEP, checkCPF } from "../../utils/validadeInputs";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  input: {
    // paddingLeft: 5,
    // paddingRight: 5,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 10,
    width: "48%",
  },
}));

export default function RegisterPatient() {
  const formRef = useRef(null);
  const classes = useStyles();
  const [values, setValues] = React.useState({
    username: "",
    email: "",
    password: "",
    checked: false,
    valid: false,
    acceptedTerms: false,
    riskGroup: false,
    // documentID: "",
    zipcode: "",
  });

  function handleInputChange(name, value) {
    setValues({ ...values, [name]: value });
  }
  function validForm() {
    const { acceptedTerms } = values;
    if (acceptedTerms === true) {
      return false;
    } else {
      return true;
    }
  }

  function clearRegex(v) {
    return v.replace(/[^\w\s]/gi, "");
  }
  async function handleRegister(data) {
    try {
      const register = await api.post("registerPatient", data);
      history.push("/");
    } catch (e) {
      console.log("erro ao cadastrar", e);
    }
  }

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required("O email é obrigatório"),
        username: Yup.string().required("O nome é obrigatório"),
        password: Yup.string()
          .required("A senha é obrigatóri com no minino 6 caracteres")
          .min(6),
        zipcode: Yup.string().required("O CEP é obrigatório"),
        documentID: Yup.string()
          .test("documentID", "Digite um CPF válido", (value) => {
            return checkCPF(value);
          })
          .required("O CPF é obrigatório"),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      data.documentID = clearRegex(data.documentID);
      data.zipcode = clearRegex(data.zipcode);
      data.riskGroup = values.riskGroup;
      console.log(data);
      await handleRegister(data);
      reset();
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        const errorMessages = {};
        e.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });
        console.log(e);
        formRef.current.setErrors(errorMessages);
      }
    }
  }
  return (
    <Grid
      style={{ height: "100vh" }}
      alignContent="center"
      justify="center"
      container
    >
      <Grid item md={6} lg={6} sm={12} xl={6} xs={12}>
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
          <Form ref={formRef} className={classes.root} onSubmit={handleSubmit}>
            <Input
              style={{ marginRight: 5, marginLeft: 5, width: "98%" }}
              label="Nome Completo"
              type="text"
              name="username"
            />
            <Input
              className={classes.input}
              label="e-mail"
              type="email"
              name="email"
            />

            <Input
              className={classes.input}
              label="Senha"
              type="password"
              name="password"
            />
            <Input
              className={classes.input}
              label="CEP"
              mask="99999-999"
              name="zipcode"
            />
            <Input
              className={classes.input}
              label="CPF"
              mask="999.999.999-99"
              name="documentID"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.riskGroup}
                  onChange={(value) =>
                    handleInputChange("riskGroup", value.target.checked)
                  }
                  color="primary"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              }
              label="Sou do grupo de risco da COVID-19"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.acceptedTerms}
                  onChange={(value) =>
                    handleInputChange("acceptedTerms", value.target.checked)
                  }
                  color="primary"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              }
              label="Li e aceito os termos de uso e responsabilidade"
            />
            <Button
              style={{ marginTop: 30, marginBlock: 20 }}
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              disabled={validForm()}
              // onClick={() => handleRegister()}
            >
              Entrar
            </Button>
            {/* <button type="submit">Enviar</button> */}
          </Form>
        </Paper>
      </Grid>
    </Grid>
  );
}
