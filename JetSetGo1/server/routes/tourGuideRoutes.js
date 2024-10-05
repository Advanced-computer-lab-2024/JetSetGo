const express = require('express');
const { createProfile, updateProfile, getProfile } = require('../controllers/tourGuideController');
const router = express.Router();

// Add this above other routes
router.post('/test', (req, res) => {
    res.send('Tour Guide Test Route is working!');
});


// Create or Update Tour Guide Profile
router.post('/create/:id', createProfile);
router.patch('/update/:id', updateProfile);
router.get('/profile/:id', getProfile);


//66f80af288afe7e5aff3af00
module.exports = router;
