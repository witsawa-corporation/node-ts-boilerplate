import express from 'express'
import cors from 'cors'

import authentication from 'middlewares/authentication'
import logErrors from 'middlewares/logErrors'
import errorHandler from 'middlewares/errorHandler'
import routes from 'routes'

const port = process.env.PORT || 8080
const app: express.Application = express()

app.use(cors())
app.use(express.json())
app.use(authentication)

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
