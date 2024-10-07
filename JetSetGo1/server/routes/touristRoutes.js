const express = require('express');
const { getProducts, createProduct, updateProduct,filterProducts,sortByRate, searchProductName,} = require('../controllers/adminController.js');
const {updateInfo, getInfo } = require('../controllers/touristController');
const router = express.Router();


router.get('/Products',getProducts )
router.get('/filterProducts',filterProducts)
router.get('/sortByRate',sortByRate)
router.get('/searchProductName',searchProductName)
// Create or Update Tour Guide Profile

router.patch('/update/:id', updateInfo);
router.get('/profile/:id', getInfo);


//66f80af288afe7e5aff3af00
module.exports = router;






