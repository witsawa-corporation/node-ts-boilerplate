import express from 'express'

function errorHandler(
  err: Error,
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: express.NextFunction,
): void {
  const errMessage: string = err.message
  const status: number = +errMessage.substring(0, 3) || 500
  const messageTemp = errMessage.substring(5)
  const message = messageTemp.split(',')[0]
  res.status(status)
  res.send({ status, message })
}

export default errorHandler
