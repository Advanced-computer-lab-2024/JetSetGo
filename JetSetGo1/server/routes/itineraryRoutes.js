const express = require('express');
const {searchItineraryByPreferenes, searchItineraryByDate, searchItineraryByBudget, 
searchItineraryByLanguage,searchItineraryByCategory,searchItineraryByName,searchItineraryByTag
 } = require('../controllers/itineraryController');
const router = express.Router();

router.get('/searchByPreference',searchItineraryByPreferenes);
router.get('/searchByDate',searchItineraryByDate);
router.get('/searchByBudget',searchItineraryByBudget);
router.get('/searchByLanguage',searchItineraryByLanguage);
router.get('/searchByName',searchItineraryByName);
router.get('/searchByCategory',searchItineraryByCategory);
router.get('/searchByTag',searchItineraryByTag);




module.exports = router;
