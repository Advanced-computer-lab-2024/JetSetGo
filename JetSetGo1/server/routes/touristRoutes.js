const express = require('express');
const {updateInfo, getInfo,searchHistoricalPlaceByTag,searchHistoricalPlaceByName,
searchHistoricalPlaceByCategory, searchMuseumByTag,searchMuseumByName,searchMuseumByCategory,searchActivityByBudget,searchActivityByDate, 
searchActivityByRating,searchActivityByTag,searchActivityByCategory,
searchActivityByName, searchItineraryByDate, searchItineraryByBudget, 
searchItineraryByLanguage,searchItineraryByName,searchItineraryByTag,
getUpcomingActivities, sortActivityByPrice, sortActivityByRating, getUpcomingItineraries, sortItineraryByPrice,
 sortItineraryByRating, getMuseums, filterMuseumsByTag,
  getHistoricalLocations, filterHistoricalLocationsByTag  } = require('../controllers/touristController');

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



router.get('/getUpcomingActivities', getUpcomingActivities);
router.get('/sortActivityByPrice', sortActivityByPrice);
router.get('/sortActivityByRating', sortActivityByRating);
router.get('/getUpcomingItineraries',getUpcomingItineraries);
router.get('/sortItineraryByPrice', sortItineraryByPrice);
router.get('/sortItineraryByRating', sortItineraryByRating);
router.get('/getMuseums', getMuseums);
router.get('/filterMuseumsByTag/:id', filterMuseumsByTag);
router.get('/getHistoricalLocations', getHistoricalLocations);
router.get('/filterHistoricalLocationsByTag/:id', filterHistoricalLocationsByTag);

module.exports = router;
