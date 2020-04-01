import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Grid,
  ListItemText,
  List,
  ListItem,
  Paper,
  InputAdornment,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng
} from "react-google-places-autocomplete";
import { api } from "../../services/api";
import history from "../../services/history";
import { getToken } from "../../services/seesionStorage";
const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  containerItem: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 40
  },
  input: {
    backgroundColor: theme.palette.common.white,
    paddingBottom: 15
  }
}));

export default function CompleteProfile() {
  const classes = useStyles();
  const [location, setLocation] = React.useState({
    fullAdress: "",
    adress: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    country: "",
    lat: 0,
    lng: 0
  });
  const [symptoms, setSymptoms] = React.useState({
    respiratoryDiseases: false,
    heartDisease: false,
    diabetes: false,
    highPressure: false,
    asthma: false,
    others: "",
    limitedMobility: false,
    gender: ""
  });
  const [token, setToken] = React.useState("");

  function validForm() {
    const { fullAdress } = location;
    const { gender } = symptoms;
    if (fullAdress.length > 6 && gender.length > 4) {
      return false;
    } else {
      return true;
    }
  }

  async function goBusca(data) {
    try {
      console.log("data", data);

      const results = await geocodeByPlaceId(data.place_id);
      console.log("results", results);
      const newCoords = await getLatLng(results[0]);

      const newAdress = {
        fullAdress: data.description,
        adress: data.terms[0].value,
        complement: "",
        neighborhood: data.terms[1].value,
        city: data.terms[2].value,
        state: data.terms[3].value,
        country: data.terms[4].value,
        lat: newCoords.lat,
        lng: newCoords.lng
      };
      console.log("______", newAdress);
      setLocation(newAdress);
    } catch (e) {
      console.log("erro", e);
    }
  }
  function handleInputChange(name, value) {
    setLocation({ ...location, [name]: value });
  }
  const handleChange = event => {
    setSymptoms({ ...symptoms, [event.target.name]: event.target.checked });
  };
  function handleInputOthers(name, value) {
    setSymptoms({ ...symptoms, [name]: value });
  }

  async function handleLocation() {
    try {
      const config = {
        headers: { Authorization: "bearer " + token }
      };
      await api.post("location", location, config);
    } catch (e) {
      console.log("error location", e);
    }
  }
  async function handleSymptom() {
    try {
      const config = {
        headers: { Authorization: "bearer " + token }
      };
      await api.post("symptom", symptoms, config);
    } catch (e) {
      console.log("error symptom", e);
    }
  }
  async function handleChangeUser() {
    const config = {
      headers: { Authorization: "bearer " + token }
    };
    try {
      await api.post("updatePatient", symptoms, config);
    } catch (e) {
      console.log("error updatePatient", e);
    }
  }
  async function handleSave() {
    try {
      await handleLocation();
      await handleSymptom();
      await handleChangeUser();
      history.push("dashboard");
    } catch (e) {
      console.log("erro ao salvar");
    }
  }
  React.useEffect(() => {
    const patient = JSON.parse(localStorage.getItem("patient"));
    setToken(patient.patient.token);
  }, []);
  return (
    <Grid justify="center" style={{ height: "100vh" }} container>
      <Grid className={classes.containerItem} item xs={6} md={6} xl={6}>
        <Typography variant="h6" component="h2">
          Seu Endereo
        </Typography>
        <div>
          <GooglePlacesAutocomplete
            autocompletionRequest={{
              componentRestrictions: {
                country: ["br"]
              }
            }}
            onSelect={goBusca}
            renderInput={props => (
              <TextField
                id="standard-basic"
                fullWidth
                label="Qual o seu endereço"
                variant="filled"
                className={classes.input}
                {...props}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
            )}
            renderSuggestions={(active, suggestions, onSelectSuggestion) => (
              <Paper square>
                <List component="nav" aria-label="secondary mailbox folders">
                  {suggestions.map(suggestion => (
                    <ListItem
                      key={suggestion.description}
                      onClick={event => onSelectSuggestion(suggestion, event)}
                      button
                    >
                      <ListItemText primary={suggestion.description} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          />
        </div>
        <div>
          <TextField
            id="1"
            fullWidth
            label="Rua e Numero"
            variant="filled"
            className={classes.input}
            value={location.adress}
            onChange={value => handleInputChange("adress", value.target.value)}
          />
          <TextField
            id="2"
            fullWidth
            label="Complemento"
            variant="filled"
            className={classes.input}
            value={location.complement}
            onChange={value =>
              handleInputChange("complement", value.target.value)
            }
          />
          <TextField
            id="3"
            fullWidth
            label="Bairro"
            variant="filled"
            className={classes.input}
            value={location.neighborhood}
            onChange={value =>
              handleInputChange("neighborhood", value.target.value)
            }
          />
          <TextField
            id="4"
            fullWidth
            label="Cidade"
            variant="filled"
            className={classes.input}
            value={location.city}
            onChange={value => handleInputChange("city", value.target.value)}
          />
          <TextField
            id="5"
            fullWidth
            label="Estado"
            variant="filled"
            className={classes.input}
            value={location.state}
            onChange={value => handleInputChange("state", value.target.value)}
          />
          <TextField
            id="6"
            fullWidth
            label="País"
            variant="filled"
            className={classes.input}
            value={location.country}
            onChange={value => handleInputChange("country", value.target.value)}
          />
        </div>
      </Grid>
      <Grid className={classes.containerItem} item xs={6} md={6} xl={6}>
        <Typography variant="h6" component="h2">
          Sintomas
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={symptoms.respiratoryDiseases}
                onChange={handleChange}
                name="respiratoryDiseases"
                color="primary"
              />
            }
            label="Respiratórias"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={symptoms.heartDisease}
                onChange={handleChange}
                name="heartDisease"
                color="primary"
              />
            }
            label="Coração"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={symptoms.diabetes}
                onChange={handleChange}
                name="diabetes"
                color="primary"
              />
            }
            label="Diabetes"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={symptoms.highPressure}
                onChange={handleChange}
                name="highPressure"
                color="primary"
              />
            }
            label="Hipertenção"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={symptoms.asthma}
                onChange={handleChange}
                name="asthma"
                color="primary"
              />
            }
            label="Asma"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={symptoms.limitedMobility}
                onChange={handleChange}
                name="limitedMobility"
                color="primary"
              />
            }
            label="Limitação para se mover"
          />
          <TextField
            id="10"
            fullWidth
            label="Outras"
            variant="filled"
            className={classes.input}
            value={symptoms.others}
            onChange={value => handleInputOthers("others", value.target.value)}
          />
        </FormGroup>
        <InputLabel id="demo-customized-select-label">Genero</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={symptoms.gender}
          fullWidth
          variant="filled"
          label="Genero"
          title="Genero"
          onChange={value => handleInputOthers("gender", value.target.value)}
        >
          <MenuItem value="Homem">Homem</MenuItem>
          <MenuItem value="Mulher">Mulher</MenuItem>
          <MenuItem value="Outro">Outro</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={2} md={2} xl={2}>
        <Button
          onClick={() => handleSave()}
          color="primary"
          variant="contained"
          disabled={validForm()}
        >
          Salvar
        </Button>
      </Grid>
    </Grid>
  );
}
