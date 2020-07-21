import { Response, NextFunction } from 'express'
import { forbidden, unauthorized } from 'lib/errorObj'
import { RequestType, RoleResolverType } from 'interface'

const authorization = (acls: Array<RoleResolverType>) => async (
  req: RequestType,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.token || !req.user) {
      return next(unauthorized('NO_LOGGED_IN'))
    }
    const results = await Promise.all(
      acls.map((acl: RoleResolverType) => acl({ user: req.user, token: req.token })),
    )
    const canAccess = results.some(item => item)
    if (canAccess) {
      return next()
    }
    return next(forbidden('NO_PERMISSION'))
  } catch (e) {
    next(e)
  }
}

export default authorization
