const express = require('express')
const {getProducts, createProduct, updateProduct,filterProducts,sortByRate, searchProductName} = require('../controllers/productController')

const router = express.Router()

router.get('/',getProducts )

router.get('/filterProducts',filterProducts)
router.get('/sortByRate',sortByRate)
router.get('/searchProductName',searchProductName)
router.post('/create',createProduct)

// Update workout
router.patch('/:id', updateProduct)

module.exports=router