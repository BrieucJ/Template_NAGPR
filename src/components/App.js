import React, {createContext, Component} from 'react';
import Layout from './Layout';
import { Switch, Route } from 'react-router-dom'
import Auth from './Auth'

export const UserContext = createContext({
  token: null,
  user: {},
});

export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer

class App extends Component {
  constructor(props) {
    super(props)
    this.setUser = (data) => {
      this.setState({user: data.user, token: data.token});
      localStorage.setItem('user', data.user)
      localStorage.setItem('token',  data.token)
    }
    this.logout = () => {
      localStorage.clear()
      this.setState({user: {}, token: null})
    }
    this.state = {
      token: localStorage.getItem('token'),
      user: localStorage.getItem('user'),
      setUser: this.setUser,
      logout: this.logout,
    }
  }

  render(){
  return (
    <UserProvider value={this.state}> 
      <Layout>
        <Switch>
          <Route exact path="/auth" component={Auth}/>
        </Switch>
      </Layout>
    </UserProvider>
  );
}
}

export default App;
