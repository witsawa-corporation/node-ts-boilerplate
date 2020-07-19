import { Request } from 'express'

export interface UserData {
  _id?: string
  email?: string
  username?: string
  createdAt?: string
  updatedAt?: string
  iat?: number
}

export interface RequestType extends Request {
  user?: UserData
  token?: string
}

export interface ErrorType extends Error {
  status?: number
}
