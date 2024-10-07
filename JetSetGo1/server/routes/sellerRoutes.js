const express = require('express');
const { createSellerProfile, updateSellerProfile, getSellerProfile, 
    getProducts, createProduct, updateProduct,filterProducts,sortByRate, searchProductName,getSingleProduct } = require('../controllers/sellerController');
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
router.get('/getSingleProduct/:id', getSingleProduct)
// Update workout
router.patch('/product/:id', updateProduct)

const multer = require('multer');

// Define multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Then, use it in your route
router.post('/createProduct', upload.single('picture'), createProduct);

module.exports = router;
    