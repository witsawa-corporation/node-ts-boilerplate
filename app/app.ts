import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import depthLimit from 'graphql-depth-limit'
import cors from 'cors'
import compression from 'compression'

import typeDefs from './typedefs'
import resolvers from './resolvers'

const app: express.Application = express()

app.use(cors())
app.use(compression())

export const server = new ApolloServer({ typeDefs, resolvers, validationRules: [depthLimit(7)] })

export default app
