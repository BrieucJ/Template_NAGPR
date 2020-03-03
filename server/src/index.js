const { ApolloServer, gql } = require('apollo-server');
const { prisma } = require('./generated/prisma-client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
require('dotenv').config()

const resolvers = {
  Query,
  Mutation,
}
const typeDefs = require('./schema');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // console.log(req)
    return {
      ...req,
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

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
