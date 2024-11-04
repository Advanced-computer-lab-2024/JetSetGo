const express = require('express');
const { createSellerProfile, updateSellerProfile, getSellerProfile, 
    getProducts, createProduct, updateProduct,filterProducts,sortByRate, searchProductName,getSingleProduct, 
    archieved_on,
    getSales} = require('../controllers/sellerController');
const router = express.Router();
//const SellerController = require('../controllers/sellerController')
const {uploadLogo} = require('../controllers/sellerController');

router.patch('/:id/upload-profile-image', uploadLogo.single('image'), SellerController.uploadProfileImage);


// const sellerController = require('../controllers/sellerController');
//  multer = require('../config/multer');
// router.patch('/:id/upload-profile-image', multer.single('image'), sellerController.uploadProfileImage);



const { changePassword } = require("../controllers/PasswordController");
router.patch("/change-password/:id/:modelName", changePassword);

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
router.patch('/archieved/:id',archieved_on )

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
router.get('/sales',getSales)
module.exports = router;
    