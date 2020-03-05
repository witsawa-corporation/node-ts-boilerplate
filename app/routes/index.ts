import { Router } from 'express'

import users from './user'

const router = Router()

router.use('/users', users)

export default router
