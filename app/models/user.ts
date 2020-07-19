import mongoose from 'mongoose'

const { Schema } = mongoose

export interface UserType {
  _id: string
  email: string
  username: string
  password?: string
  createdAt: string
  updatedAt: string
}

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

schema.post('save', function(error: any, doc: any, next: (err?: Error) => void) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('USER_ALREADY_EXISTS'))
  } else {
    next()
  }
})

export const UserModel = mongoose.model('User', schema)
