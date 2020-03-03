const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar DateTime

  enum AccessRole {
    USER
    ADMIN
  }

  type Query {
    me: User
    user(id: ID!): User
    users(limit: Int): [User]
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
    signup(email: String!, password: String!, name: String!): AuthPayload
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    accessRole: String!
  }
`

module.exports = typeDefs;