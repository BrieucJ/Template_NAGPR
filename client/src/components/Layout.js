import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
//STYLING
import { Grid, CssBaseline } from "@material-ui/core";
import { ThemeProvider, withStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";


const styles = theme => ({
  root: {
    height: "calc(100vh - 74px)"
  }
});

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      themeType: localStorage.getItem('themeType') || 'light'
    }
  }

  toggleThemeType = () => {
    if (this.state.themeType === 'dark'){
      this.setState({themeType:'light'});
      localStorage.setItem('themeType', 'light')
    } else {
      this.setState({themeType:'dark'});
      localStorage.setItem('themeType', 'dark')
    }
  }

  render() {
    const { classes } = this.props;
    let theme = createMuiTheme({
      palette: {
        type: this.state.themeType
      }
    });
    return (
      <ThemeProvider theme={theme}>
        <Header toggleThemeType={this.toggleThemeType} theme={theme}/>
        <Grid container className={classes.root}>
          <CssBaseline />
          {this.props.children}
        </Grid>
        <Footer />
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(Layout);
