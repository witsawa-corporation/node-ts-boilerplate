import './lib/env'
import app, { server } from './app'

const port = process.env.PORT || 3000
const path = process.env.GRAPHQL_PATH || '/graphql'

server.applyMiddleware({ app, path })

app.listen(port, function() {
  console.log(`listening on port ${port}, path ${path}`)
})
