import express from 'express'
import * as UserController from '../controllers/userController.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/profile', auth, UserController.profile)
router.put('/profile', auth, UserController.updateProfile)
router.delete('/delete', auth, UserController.deleteUser)

export default router
