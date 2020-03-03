import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
//APOLLO
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
//ROUTER
import { BrowserRouter } from 'react-router-dom'
require('dotenv').config()

const uri = process.NODE_ENV !== 'production' ? 'http://localhost:3001/graphql' : process.env.REACT_APP_GRAPHQL_URI;
console.log(process.NODE_ENV)
console.log(uri)
const httpLink = createHttpLink({uri: uri})
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
})

const client = new ApolloClient({link: authLink.concat(httpLink), cache: new InMemoryCache() })

ReactDOM.render(
<BrowserRouter >
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
</BrowserRouter>
, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
