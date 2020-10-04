import 'reflect-metadata'
import './lib/env'
import { createConnection, Connection } from 'typeorm'
import { User } from 'entity/User'

const connectDB = async (): Promise<Connection> => {
  const connection = await createConnection({
    type: 'postgres',
    url: process.env.PG_URL,
    entities: [User],
    synchronize: true,
    logging: false,
  })
  return connection
}

connectDB()
  .then(async connection => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const app = require('./app')
    await connection.manager.save(
      connection.manager.create(User, {
        email: 'admin@guroo.com',
        username: 'administrator',
        password: 'Guroo1q2w3e4r',
      }),
    )
  })
  .catch(error => {
    console.log(error)
  })
