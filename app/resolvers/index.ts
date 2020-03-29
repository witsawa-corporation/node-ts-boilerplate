import user from './user'

const resolvers = {
  Query: {
    ...user.Query,
  },
  Mutation: {
    ...user.Mutation,
  },
}

export default resolvers
