const express = require('express');
const { sortItineraryByRating } = require('../controllers/itineraryController');
const router = express.Router();


router.get('/sortItineraryByRating', sortItineraryByRating);

module.exports = router;