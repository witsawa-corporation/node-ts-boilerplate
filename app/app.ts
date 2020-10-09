import express from 'express'
import cors from 'cors'

const SwaggerJSDoc = require('swagger-jsdoc')
const SwaggerUI = require('swagger-ui-express')

import authentication from 'middlewares/authentication'
import logErrors from 'middlewares/logErrors'
import errorHandler from 'middlewares/errorHandler'
import routes from 'routes'
import { version } from '../package.json'

const port = process.env.PORT || 8080
const app: express.Application = express()

const swaggerSpec = SwaggerJSDoc({
  definition: {
    info: {
      title: 'Node TS Boilerplate',
      description: 'A Node + Typescript boilerplate project',
      version: version,
      servers: [`http://localhost:${port}`],
    },
  },
  apis: ['**/*.ts'],
})

app.use(cors())
app.use(express.json())
app.use(authentication)

app.use('/documentation', SwaggerUI.serve, SwaggerUI.setup(swaggerSpec, { explorer: true }))
app.get('/', function(req, res) {
  res.send({
    title: 'Welcome to server',
    nodeEnv: process.env.NODE_ENV,
  })
})
app.use('/api', routes)
if (process.env.NODE_ENV !== 'test') {
  app.use(logErrors)
}
app.use(errorHandler)

app.listen(port, function() {
  console.log(`listening on port ${port}`)
})

export default app
