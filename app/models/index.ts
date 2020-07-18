import mongoose from 'mongoose'

const mongoUrl = process.env.MONGO_URL || ''

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

export { UserModel, UserType } from './user'
