import express from 'express'
import { createUser, getUser, login, deleteUser, updateUser } from '../controllers/users.controllers.js'
import { authVerification } from '../middlewares/authentication.js'

const router = express.Router()

router.post('/createUsers', createUser)
router.post('/login', login)
router.get('/getUsers', authVerification, getUser)
router.delete('/deleteUser/:id', authVerification, deleteUser)
router.put('/updateUser/:id', authVerification, updateUser)

export default router