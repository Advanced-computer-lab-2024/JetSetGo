// const express = require('express');
const express = require('express');
const {showMyItineraries, updateProfile, getProfile,createProfile} = require('../controllers/tourGuideController');

const router = express.Router();


router.get('/showAll', showMyItineraries )

// const router = express.Router();

// Create or Update Tour Guide Profile
router.post('/create/:id', createProfile);
router.patch('/update/:id', updateProfile);
router.get('/profile/:id', getProfile);

//66f80af288afe7e5aff3af00
module.exports = router;
