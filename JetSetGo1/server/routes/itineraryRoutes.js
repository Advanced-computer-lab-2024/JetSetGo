const express = require('express');
const {searchItineraryByPreferenes, searchItineraryByDate, searchItineraryByBudget, 
searchItineraryByLanguage } = require('../controllers/itineraryController');
const router = express.Router();

router.get('/searchByPreference',searchItineraryByPreferenes);
router.get('/searchByDate',searchItineraryByDate);
router.get('/searchByBudget',searchItineraryByBudget);
router.get('/searchByLanguage',searchItineraryByLanguage);

module.exports = router;
