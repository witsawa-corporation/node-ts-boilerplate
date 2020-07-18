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

export const UserModel = mongoose.model('User', schema)
