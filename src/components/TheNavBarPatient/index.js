import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Icon
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Hidden from "@material-ui/core/Hidden";
import history from "../../services/history";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  nav: {
    backgroundColor: "#FFF",
    paddingLeft: 15,
    paddingRight: 15
  },
  navDiv: {
    justifyContent: "space-between"
  },
  btnAcess: {
    marginLeft: 15,
    marginRight: 15
  },
  btnRegister: {
    backgroundColor: "#3B5A9A",
    color: "#FFF",
    marginLeft: 15,
    marginRight: 15
  },
  title: {
    flexGrow: 1,
    color: "#008037"
  },
  menuApp: {
    color: "#3B5A9A"
  }
}));

export default function TheNavBarPatient() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }
  function handleLogout() {
    localStorage.removeItem("patient");
    localStorage.removeItem("signed");
    history.push("/");
  }
  return (
    <div className={classes.root}>
      <AppBar className={classes.nav} position="static">
        <Toolbar className={classes.navDiv}>
          <div>
            <img
              style={{ height: 60 }}
              src={require("../../assets/logo.png")}
            />
          </div>
          <div
            style={{
              justifyContent: "space-around"
            }}
          >
            <Hidden mdUp>
              <IconButton
                edge="start"
                className={classes.menuApp}
                aria-label="menu"
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>Meu Perfil</MenuItem>
                <MenuItem>Sair</MenuItem>
              </Menu>
            </Hidden>
            <Hidden smDown>
              <Button
                className={classes.btnAcess}
                color="primary"
                variant="outlined"
                endIcon={<AccountBoxIcon />}
              >
                Meu Perfil
              </Button>
              <Button
                className={classes.btnAcess}
                color="primary"
                variant="outlined"
                endIcon={<ExitToAppIcon />}
                onClick={() => handleLogout()}
              >
                Sair
              </Button>
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
