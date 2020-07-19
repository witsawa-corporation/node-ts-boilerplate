import { ErrorType } from 'interface'

export const errors = (name: string, message: string, status: number): ErrorType => {
  const error: ErrorType = new Error(message)
  error.status = status
  error.name = name
  return error
}

export const badRequest = (message: string): ErrorType => {
  return errors('Bad Request', message, 400)
}

export const unauthorized = (message: string): ErrorType => {
  return errors('Unauthorized', message, 401)
}

export const notFound = (message: string): ErrorType => {
  return errors('Not Found', message, 404)
}
