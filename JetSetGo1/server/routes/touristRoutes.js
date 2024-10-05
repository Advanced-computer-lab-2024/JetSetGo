const express = require('express');
const {updateInfo, getInfo,searchHistoricalPlaceByTag,searchHistoricalPlaceByName,
searchHistoricalPlaceByCategory, searchMuseumByTag,searchMuseumByName,searchMuseumByCategory,searchActivityByBudget,searchActivityByDate, 
searchActivityByRating,searchActivityByTag,searchActivityByCategory,
searchActivityByName, searchItineraryByDate, searchItineraryByBudget, 
searchItineraryByLanguage,searchItineraryByName,searchItineraryByTag  } = require('../controllers/touristController');

const router = express.Router();

// Create or Update Tour Guide Profile

router.patch('/update/:id', updateInfo);
router.get('/profile/:id', getInfo);

router.get('/searchHistoricalPlaceByName', searchHistoricalPlaceByName);
router.get('/searchHistoricalPlaceByTag', searchHistoricalPlaceByTag);
router.get('/searchHistoricalPlaceByCategory', searchHistoricalPlaceByCategory);

router.get('/searchMuseumByTag', searchMuseumByTag);
router.get('/searchMuseumByName', searchMuseumByName);
router.get('/searchMuseumByCategory', searchMuseumByCategory);

router.get('/searchActivityByName',searchActivityByName);
router.get('/searchActivityByCategory',searchActivityByCategory);
router.get('/searchActivityByTag',searchActivityByTag);
router.get('/searchActivityByRating',searchActivityByRating);
router.get('/searchActivityByDate',searchActivityByDate);
router.get('/searchActivityByBudget',searchActivityByBudget);

router.get('/searchItineraryByDate',searchItineraryByDate);
router.get('/searchItineraryByBudget',searchItineraryByBudget);
router.get('/searchItineraryByLanguage',searchItineraryByLanguage);
router.get('/searchItineraryByName',searchItineraryByName);
router.get('/searchItineraryByTag',searchItineraryByTag);



//66f80af288afe7e5aff3af00
module.exports = router;