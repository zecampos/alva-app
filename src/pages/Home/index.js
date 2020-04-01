import React from "react";
import GoogleMapReact from "google-map-react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Grid
} from "@material-ui/core";
import { api } from "../../services/api";
import PlaceIcon from "@material-ui/icons/Place";
import { getToken } from "../../services/seesionStorage";

const AnyReactComponent = ({ text }) => (
  <div>
    <PlaceIcon color="primary" fontSize="large" />
  </div>
);

export default function Home() {
  const [location, setLocation] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [token, setToken] = React.useState("");

  async function getMyLocation(t) {
    try {
      setLoading(true);
      const config = {
        headers: { Authorization: "bearer " + t }
      };
      const l = await api.get("getMyData", config);
      console.log("location", l.data);
      setLocation(l.data.location);
      setLoading(false);
    } catch (e) {
      console.log("error get location");
      setLoading(false);
    }
  }
  React.useEffect(() => {
    (async function getLocation() {
      const patient = JSON.parse(localStorage.getItem("patient"));
      setToken(patient.patient.token);
      await getMyLocation(patient.patient.token);
    })();
  }, []);

  return (
    <>
      <Grid
        style={{ height: "100vh" }}
        alignContent="center"
        justify="center"
        container
      >
        <Grid item md={4} lg={6} sm={12} xl={4} xs={12}>
          {loading ? (
            <>
              <h1>Loading</h1>{" "}
            </>
          ) : (
            <div style={{ height: "70vh", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyBBtfaAFyfONdgi4gXHE1yCNGJX_vvF744"
                }}
                defaultCenter={{
                  lat: location.lat,
                  lng: location.lng
                }}
                defaultZoom={16}
                // yesIWantToUseGoogleMapApiInternals
                // onGoogleApiLoaded={({ map, maps }) =>
                //   handleApiLoaded(map, maps)
                // }
              >
                <AnyReactComponent
                  lat={location.lat}
                  lng={location.lng}
                  text="My Marker"
                />
              </GoogleMapReact>
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
}
