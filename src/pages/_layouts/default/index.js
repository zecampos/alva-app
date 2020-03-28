import React from "react";
import PropTypes from "prop-types";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

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
      <Container className={classes.root} maxWidth="xl">
        {children}
      </Container>
    </>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired
};
