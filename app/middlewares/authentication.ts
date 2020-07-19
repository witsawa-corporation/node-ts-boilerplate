import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { RequestType } from 'interface'

const SECRET = process.env.SECRET_TOKEN || ''

function authentication(req: RequestType, res: Response, next: NextFunction): void {
  let token
  if (req.get('X-Access-Token')) {
    token = req.get('X-Access-Token')
  }
  if (token) {
    req.token = token
    jwt.verify(token, SECRET, function(err, user) {
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
