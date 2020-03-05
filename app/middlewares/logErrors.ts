import express from 'express'

function logErrors(
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void {
  console.log(new Date())
  console.error(err.stack)
  next(err)
}

export default logErrors
