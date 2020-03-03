import React, { Component } from "react";
import { Link } from "react-router-dom";
import { UserConsumer } from './App'
//STYLING
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Menu, Brightness4, Brightness7 } from "@material-ui/icons";

const styles = theme => ({
  appBar: {
    marginBottom: theme.spacing(2)
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textDecoration: "none"
  }
});

class Header extends Component {
  render(){
    const { classes, toggleThemeType, theme } = this.props;
    return (
      <UserConsumer>
        {(context) => {
          return (      
        <AppBar position="static" color="primary" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Menu />
            </IconButton>
            <Typography
              variant="h6"
              className={classes.title}
              component={Link}
              to={"/"}
              color="inherit"
            >
              TITLE
            </Typography>
            <IconButton
              color="inherit"
              aria-label="toggle light/dark"
              onClick={toggleThemeType}
            >
              {theme.palette.type === 'dark' ?  <Brightness7/> : <Brightness4/>}
            </IconButton>
            {context.token ? (
              <Button
                onClick={() => {
                  context.logout()
                }}
                color="inherit"
                component={Link}
                to={"/"}
              >
                Logout
              </Button>
            ) : (
              <Button color="inherit" component={Link} to={"/Auth"}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        )
      }}
      </UserConsumer> 
  );
}
}


export default withStyles(styles)(Header);