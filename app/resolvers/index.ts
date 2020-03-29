import { resolvers as ScalarResolver } from 'graphql-scalars'

import user from './user'

const resolvers = {
  ...ScalarResolver,
  Query: {
    ...user.Query,
  },
  Mutation: {
    ...user.Mutation,
  },
}

export default resolvers
