const express = require('express');
const { createSellerProfile, updateSellerProfile, getSellerProfile } = require('../controllers/sellerController');
const router = express.Router();

// Create or Update Seller Profile
router.post('/create', createSellerProfile);
router.patch('/update/:id', updateSellerProfile);
router.get('/profile/:id', getSellerProfile);

module.exports = router;
    