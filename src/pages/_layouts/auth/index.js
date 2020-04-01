import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";

import Container from "@material-ui/core/Container";

export default function AuthLayout({ children }) {
  return (
    <>
      <CssBaseline />

      <Container fixed>{children}</Container>
    </>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired
};
