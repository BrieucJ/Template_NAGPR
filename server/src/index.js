const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { prisma } = require('./generated/prisma-client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
require('dotenv').config()

const resolvers = {
  Query,
  Mutation,
}
const typeDefs = require('./schema');


const { PORT } = process.env;
console.log('\nprocess.env.PORT', PORT);

//APP
const app = express();
app.set('port', (PORT || 3001));
app.use(helmet());

if (app.get('env') === 'development') {
  // Enable the app to receive requests from the React app and Storybook when running locally.
  app.use('*', cors({ origin: ['http://localhost:3000', 'http://localhost:9009'] }));
  app.use(morgan('tiny'));
}

// Serve static files from the React app
const staticFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // console.log(req)
    return {
      ...req,
      APP_SECRET: process.env.APP_SECRET,
      prisma
    }
  },
  formatError: (err) => {
    // Don't give the specific errors to the client.
    // if (err.message.startsWith("Database Error: ")) {
    //   return new Error('Internal server error');
    // }
    // console.error(err)
    return err;
  },
});

server.applyMiddleware({ app });

app.use('*', staticFiles);

app.listen(app.get('port'), () => {
  console.log(`🚀 Apollo server listening on http://localhost:${app.get('port')}/graphql`);
});