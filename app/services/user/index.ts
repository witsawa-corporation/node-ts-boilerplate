import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserModel, UserType } from '../../models'
import { createUserSchema, updateUserSchema, loginSchema } from './schema'
import { RequestType } from './../../interface'
import { badRequest, unauthorized, errors } from '../../lib/errorObj'

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
    const newUser = new UserModel({
      email: value.email,
      username: value.username,
      password: hashPassword(value.password),
    })
    const result = await newUser.save()
    res.send(result)
  } catch (e) {
    next(e)
  }
}

export const find = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await UserModel.find({}, { password: false })
    res.send(users)
  } catch (e) {
    next(e)
  }
}

export const findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await UserModel.findById(req.params.id, { password: false })
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
    const result = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: value },
      { new: true, select: { password: false } },
    )
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
    const result = await UserModel.findByIdAndRemove(req.params.id)
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
    const user: UserType | null = await UserModel.findOne({ email: value.email }).lean()
    if (!user) {
      return next(unauthorized('LOGIN_FAILED'))
    }
    const matchedPassword = comparePassword(value.password, user?.password || '')
    if (!matchedPassword) {
      return next(unauthorized('LOGIN_FAILED'))
    }
    user.password = undefined
    const token = jwt.sign(user, SECRET)
    res.send({ token })
  } catch (e) {
    next(e)
  }
}
