import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getRepository, UpdateResult } from 'typeorm'
import { User } from 'entity/User'
import { RequestType } from 'interface'
import { badRequest, unauthorized, errors } from 'lib/errorObj'
import { createUserSchema, updateUserSchema, loginSchema, querySchema } from './schema'

const UserModel = getRepository(User)

const SECRET = process.env.SECRET_TOKEN || ''

const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

const comparePassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash)
}

export const userMe = async (
  req: RequestType,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (req.params.id === 'me') {
      if (!req?.user?._id) {
        return next(badRequest('INVALID_ID'))
      }
      req.params.id = req?.user?._id || ''
    }
    next()
  } catch (e) {
    next(e)
  }
}

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { value, error } = createUserSchema.validate(req.body, { abortEarly: false })
    if (error) {
      return next(errors(error.name, error.message, 400))
    }
    const newUser = new User()
    newUser.email = value.email
    newUser.username = value.username
    newUser.password = hashPassword(value.password)
    const result = await UserModel.save(newUser)
    res.send(result)
  } catch (e) {
    next(e)
  }
}

export const find = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { value, error } = querySchema.validate(
      { ...req.query, where: JSON.parse(req.query.where || '{}') },
      { abortEarly: false },
    )
    if (error) {
      return next(errors(error.name, error.message, 400))
    }
    const [data, total] = await UserModel.findAndCount({
      select: ['id', 'email', 'username'],
      where: value.where || {},
      skip: value.skip,
      take: value.limit,
      order: value.sort,
    })
    res.send({ data, total })
  } catch (e) {
    next(e)
  }
}

export const findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await UserModel.findOne(req.params.id, {
      select: ['id', 'email', 'username'],
    })
    res.send(user)
  } catch (e) {
    next(e)
  }
}

export const updateById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { value, error } = updateUserSchema.validate(req.body)
    if (error) {
      return next(errors(error.name, error.message, 400))
    }
    const result: UpdateResult = await UserModel.update(req.params.id, value)
    result.raw.password = undefined
    res.send(result)
  } catch (e) {
    next(e)
  }
}

export const deleteById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await UserModel.softDelete(req.params.id)
    res.send(result)
  } catch (e) {
    next(e)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { value, error } = loginSchema.validate(req.body)
    if (error) {
      return next(errors(error.name, error.message, 400))
    }
    const user = await UserModel.findOne({ email: value.email })
    if (!user) {
      return next(unauthorized('LOGIN_FAILED'))
    }
    const matchedPassword = comparePassword(value.password, user?.password || '')
    if (!matchedPassword) {
      return next(unauthorized('LOGIN_FAILED'))
    }
    user.password = ''
    const token = jwt.sign(user, SECRET)
    res.send({ token })
  } catch (e) {
    next(e)
  }
}
