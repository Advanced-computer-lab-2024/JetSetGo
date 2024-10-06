const express = require('express');
const { getProducts, createProduct, updateProduct,filterProducts,sortByRate, searchProductName} = require('../controllers/adminController.js');
const router = express.Router();


router.get('/Products',getProducts )

router.get('/filterProducts',filterProducts)
router.get('/sortByRate',sortByRate)
router.get('/searchProductName',searchProductName)



module.exports = router;