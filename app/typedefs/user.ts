import { gql } from 'apollo-server-express'

const user = gql`
  type User {
    id: String!
    firstName: String
    lastName: String
    email: String
    password: String
    # createdAt: Date
    # updatedAt: Date
  }

  extend type Query {
    users: [User]!
  }

  extend type Mutation {
    registerUser(firstName: String!, lastName: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): String
  }
`

export default user
