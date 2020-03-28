import React from "react";

import { Router } from "react-router-dom";
import history from "./services/history";
import Routes from "./routes";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3B5A9A"
    }
  }
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Routes />
      </Router>
    </ThemeProvider>
  );
}
