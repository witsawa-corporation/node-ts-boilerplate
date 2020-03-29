interface User {
  id: string
  email: string
  password?: string
  firstName: string
  lastName: string
  createdAt: Date
  updatedAt: Date
}

const resolvers = {
  Query: {
    users: (): [User] => {
      return [
        {
          id: '5e80a18bf28524840a840c6f',
          email: 'hello@gmail.com',
          firstName: 'f',
          lastName: 'l',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    },
  },
  Mutation: {
    login: (): string => 'xxxxxxx',
    registerUser: (_: void, args: User): User => {
      return {
        id: '5e80a18bf28524840a840c6f',
        ...args,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    },
  },
}

export default resolvers
