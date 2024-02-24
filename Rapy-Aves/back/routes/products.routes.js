import express from 'express'
import { createProducts, getProducts, deleteProducts, getProductsByCategory, updateProduct } from '../controllers/products.controllers.js'
import { authVerification } from '../middlewares/authentication.js'
const router = express.Router()

router.post('/createProducts', createProducts)
router.get('/getProducts', authVerification, getProducts)
router.get('/getProductsCategory/:category', authVerification, getProductsByCategory)
router.delete('/deleteProducts/:id', authVerification, deleteProducts)
router.put('/updateProduct/:id', authVerification, updateProduct)

export default router 