import { Router } from 'express'
import * as userServices from 'services/user'
import auth from 'middlewares/authorization'
import { authentication } from 'roleResolvers'

const router = Router()

/**
 * Generate your Swagger spec by documenting your routes:
 * https://swagger.io/specification/
 * https://jsdoc.app/
 * https://github.com/Surnet/swagger-jsdoc/blob/master/docs/GETTING-STARTED.md
 */

/**
 * @swagger
 *  /api/users:
 *     post:
 *       description: Creates a user
 *       produces:
 *         - application/json
 *       tags:
 *          - User Routes
 *       parameters:
 *         - name: body
 *           description: new user attributes
 *           in:  body
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *       responses:
 *         200:
 *           description: Created user
 * */
router.post('/', userServices.create)

router.get('/', auth([authentication]), userServices.find)

router.get('/:id', userServices.userMe, userServices.findById)

router.patch('/:id', userServices.userMe, userServices.updateById)

// router.delete('/:id', userServices.deleteById)

router.post('/login', userServices.login)

export default router
