import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { UserConsumer } from './App'
//GQL
import {SIGNUP_MUTATION, LOGIN_MUTATION} from '../resolvers/Mutations'
//STYLING
import { withStyles } from "@material-ui/core/styles";
import {
  Container,
  Avatar,
  Card,
  Button,
  TextField,
  Link,
  Grid,
  Typography
} from "@material-ui/core";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  card: {
    padding: theme.spacing(2)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      email: "",
      password: "",
      name: "",
      errors: {
        email: '',
        password: '',
        name: ''
      }
    };
  }

  confirm = async (data, context) => {
    console.log('CONFIRM')
    console.log(data)
    const res = this.state.login ? data.login : data.signup;
    context.setUser(res)
    this.props.history.push(`/`);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if(this.state.errors[e.target.name].length !== 0){
      this.validator(e)
    }
  }

  submit = (mutation) => {
    console.log('SUBMIT')
    if(this.state.errors.email.length === 0 && this.state.errors.name.length === 0 && this.state.errors.password.length === 0){
      console.log('MUTATE')
      mutation()
    }
  }

  validator = (e) => {
    const { name, value } = e.target;
    let errors = this.state.errors;
  
    switch (name) {
      case 'name': 
        errors.name = 
          value.length < 5
            ? 'Name must be 5 characters long!'
            : '';
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password': 
        errors.password = 
          value.length < 8
            ? 'Password must be 8 characters long!'
            : '';
        break;
      default:
        break;
    }
    this.setState({errors})
  }

  handleError(GQLerrors){
    console.log('handleError')
    console.log(GQLerrors)
    let errors = this.state.errors;
    switch(GQLerrors[0].message){
      case 'BAD_EMAIL':
        errors.email = 'Unknown email'
      break;
      case 'BAD_PASSWORD':
        errors.email = 'Password incorrect'
      break;
      default:
      break;
    }
    this.setState({errors})
  }

  render(){
    const {login, name, email, password} = this.state
    const { classes } = this.props;
    return (
      <UserConsumer>
        {(context) => {
          return (      
            <Container component="main" className={classes.root} maxWidth="xs">
            <Card className={classes.card}>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}></Avatar>
                <Typography component="h1" variant="h5">
                  {login ? "Sign in" : "Sign Up"}
                </Typography>
                <form className={classes.form} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      {!login && (
                        <TextField
                          onChange={e => {
                            this.handleChange(e);
                          }}
                          onBlur={this.validator}
                          error={this.state.errors.name.length !== 0}
                          helperText={this.state.errors.name}
                          autoComplete="name"
                          name="name"
                          variant="outlined"
                          required
                          fullWidth
                          id="Name"
                          label="Name"
                          autoFocus
                        />
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        onChange={e => {
                          this.handleChange(e);
                        }}
                        onBlur={this.validator}
                        error={this.state.errors.email.length !== 0}
                        helperText={this.state.errors.email}
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        onChange={e => {
                          this.handleChange(e);
                        }}
                        onBlur={this.validator}
                        error={this.state.errors.password.length !== 0}
                        helperText={this.state.errors.password}
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />
                    </Grid>
                  </Grid>
                  
                  <Mutation
                    mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                    variables={{ email, password, name }}
                    onCompleted={(data)=> {this.confirm(data, context)}}
                    onError={(data) => {this.handleError(data.graphQLErrors)}}
                >
                  {(mutation, { loading, error, data, called }) => (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={(e) => {
                      e.preventDefault()
                      this.submit(mutation)
                    }}
                  >
                    {login ? "Sign in" : "Sign Up"}
                  </Button>
                  )}
                  </Mutation>
                  {login ? (
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link
                          href="#"
                          onClick={() => {
              
                            this.setState({ login: false });
                          }}
                          variant="body2"
                        >
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid container justify="flex-end">
                      <Grid item>
                        <Link
                          href="#"
                          onClick={() => {
                            this.setState({ login: true });
                          }}
                          variant="body2"
                        >
                          Already have an account? Sign in
                        </Link>
                      </Grid>
                    </Grid>
                  )}
                </form>
              </div>
            </Card>
          </Container>
        )
      }}
      </UserConsumer> 
  );
}
}

export default withStyles(styles)(Auth);
