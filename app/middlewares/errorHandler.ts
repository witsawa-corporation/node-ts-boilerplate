import express from 'express'
import { ErrorType } from 'interface'

function errorHandler(
  error: ErrorType,
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: express.NextFunction,
): void {
  const message: string = error.message
  const name: string = error.name
  const status: number = error.status || 500
  res.status(status)
  res.send({ name, status, message })
}

export default errorHandler
