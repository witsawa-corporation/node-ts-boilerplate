import Joi from '@hapi/joi'

export const createUserSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .required(),
  username: Joi.string()
    .lowercase()
    .trim()
    .required(),
  password: Joi.string().required(),
})

export const updateUserSchema = Joi.object({
  username: Joi.string()
    .lowercase()
    .trim()
    .required(),
})

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .required(),
  password: Joi.string().required(),
})

export const querySchema = Joi.object({
  limit: Joi.number().optional(),
  skip: Joi.number().optional(),
  where: Joi.object({
    email: Joi.string().optional(),
    username: Joi.string().optional(),
  }).optional(),
  sort: Joi.object({
    email: Joi.string().optional(),
    username: Joi.string().optional(),
  }).optional(),
})
