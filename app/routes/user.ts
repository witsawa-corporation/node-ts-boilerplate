import { Router } from 'express'
import jwt from 'jsonwebtoken'
import Joi from '@hapi/joi'
// import sendEmail from '../lib/sendEmail'

const router = Router()
const SECRET = process.env.SECRET_TOKEN || ''

router.post(
  '/login',
  (req, res, next) => {
    const schema = Joi.object({
      username: Joi.string()
        .trim()
        .required(),
      password: Joi.string().required(),
      captcha: Joi.string()
        .trim()
        .required(),
      token: Joi.string().required(),
    })
    const { value, error } = schema.validate(req.body)
    if (error) {
      return next(new Error(`400: ${error}`))
    }
    req.body.username = value.username
    next()
  },
  async (req: any, res, next) => {
    try {
      const user = req.user
      const payload = {
        username: user.username,
      }
      const token = jwt.sign(payload, SECRET)
      res.send({ token })
    } catch (e) {
      next(e)
    }
  },
)

router.get('/', (req, res) => {
  res.send([])
})

export default router
