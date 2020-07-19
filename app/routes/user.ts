import { Router } from 'express'
import * as userServices from 'services/user'

const router = Router()

router.post('/', userServices.create)
router.get('/', userServices.find)
router.get('/:id', userServices.userMe, userServices.findById)
router.patch('/:id', userServices.userMe, userServices.updateById)
router.delete('/:id', userServices.deleteById)
router.post('/login', userServices.login)

export default router
