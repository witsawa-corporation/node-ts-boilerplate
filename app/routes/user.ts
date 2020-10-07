import { Router } from 'express'
import * as userServices from 'services/user'
import auth from 'middlewares/authorization'
import { authentication } from 'roleResolvers'

const router = Router()

/**
 * @swagger
 *
 * /api/users:
 *   post:
 *     description: Creates a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in:  body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: users
 */
router.post('/', userServices.create)
router.get('/', auth([authentication]), userServices.find)
router.get('/:id', userServices.userMe, userServices.findById)
router.patch('/:id', userServices.userMe, userServices.updateById)
// router.delete('/:id', userServices.deleteById)
router.post('/login', userServices.login)

export default router
