import React from "react";
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

import TheNavBarPatient from "../../components/TheNavBarPatient";
export default function Home() {
  return (
    <>
      <TheNavBarPatient />
      <Grid
        style={{ height: "100vh" }}
        alignContent="center"
        justify="center"
        container
      >
        <Grid item md={4} lg={4} sm={12} xl={4} xs={12}></Grid>
      </Grid>
    </>
  );
}
