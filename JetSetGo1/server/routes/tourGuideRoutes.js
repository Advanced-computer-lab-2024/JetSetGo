const express = require('express');
const { updateProfile, getProfile } = require('../controllers/tourGuideController');
const router = express.Router();

// Create or Update Tour Guide Profile
// router.post('/create', createProfile);
router.patch('/update/:id', updateProfile);
router.get('/profile/:id', getProfile);

//66f80af288afe7e5aff3af00
module.exports = router;
