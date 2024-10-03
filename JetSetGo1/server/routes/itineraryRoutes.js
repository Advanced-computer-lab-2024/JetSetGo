const express = require('express');
const {createItinerary, getItineraries,sortItineraryByPrice, sortItineraryByRating } = require('../controllers/itineraryController');
const router = express.Router();

router.post('/create', createItinerary);
router.get('/', getItineraries);
router.get('/sortItineraryByPrice', sortItineraryByPrice);
router.get('/sortItineraryByRating', sortItineraryByRating);


module.exports = router;