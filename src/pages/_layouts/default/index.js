import React from "react";
import PropTypes from "prop-types";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TheNavBarPatient from "../../../components/TheNavBarPatient";
const useStyles = makeStyles({
  root: {
    padding: 0
  }
});

export default function DefaultLayout({ children }) {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <TheNavBarPatient />
      <Container className={classes.root} maxWidth="xl">
        {children}
      </Container>
    </>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired
};
