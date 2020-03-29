import { gql } from 'apollo-server-express'
import user from './user'

const root = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`

const typeDefs = [root, user]

export default typeDefs
