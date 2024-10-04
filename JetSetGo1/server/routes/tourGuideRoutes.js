const express = require('express');
const {showMyItineraries} = require('../controllers/tourGuideController');

const router = express.Router();


router.get('/showAll/:username', showMyItineraries )

module.exports = router;
