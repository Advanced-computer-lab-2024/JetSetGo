const express = require('express');
const { getItineraries,sortItineraryByPrice, sortItineraryByRating } = require('../controllers/itineraryController');
const router = express.Router();


router.get('/', getItineraries);
router.get('/sortItineraryByPrice', sortItineraryByPrice);
router.get('/sortItineraryByRating', sortItineraryByRating);


module.exports = router;