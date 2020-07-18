import express from 'express'
import jwt from 'jsonwebtoken'

const SECRET = process.env.SECRET_TOKEN || ''

function authentication(
  req: express.Request | any,
  res: express.Response,
  next: express.NextFunction,
): void {
  let token
  if (req.get('X-Access-Token')) {
    token = req.get('X-Access-Token')
  }
  if (token) {
    req.token = token
    jwt.verify(token, SECRET, function(err: any, user: any) {
      if (err) {
        return next(err)
      }
      req.user = user
    })
    next()
  } else {
    next()
  }
}

export default authentication
