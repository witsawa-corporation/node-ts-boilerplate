import { gql } from 'apollo-server-express'

const user = gql`
  type User {
    id: ObjectID!
    firstName: String
    lastName: String
    email: EmailAddress
    createdAt: DateTime
    updatedAt: DateTime
  }

  extend type Query {
    users: [User]!
  }

  extend type Mutation {
    registerUser(firstName: String!, lastName: String!, email: String!, password: String!): User!
    login(email: EmailAddress!, password: String!): String
  }
`

export default user
