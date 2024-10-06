const express = require('express');
const { createSellerProfile, updateSellerProfile, getSellerProfile, 
    getProducts, createProduct, updateProduct,filterProducts,sortByRate, searchProductName } = require('../controllers/sellerController');
const router = express.Router();

// Create or Update Seller Profile
router.post('/create/:id', createSellerProfile);
router.patch('/update/:id', updateSellerProfile);
router.get('/profile/:id', getSellerProfile);


router.get('/Products',getProducts )
router.get('/filterProducts',filterProducts)
router.get('/sortByRate',sortByRate)
router.get('/searchProductName',searchProductName)
router.post('/createProduct',createProduct)
// Update workout
router.patch('/product/:id', updateProduct)


module.exports = router;
    