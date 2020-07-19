import Joi from '@hapi/joi'

export const createUserSchema = Joi.object({
  email: Joi.string()
    .email()
    .trim()
    .required(),
  username: Joi.string()
    .trim()
    .required(),
  password: Joi.string().required(),
})

export const updateUserSchema = Joi.object({
  username: Joi.string()
    .trim()
    .required(),
})

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .trim()
    .required(),
  password: Joi.string().required(),
})
