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

router.post('/searchHistoricalPlaceByName', searchHistoricalPlaceByName);
router.post('/searchHistoricalPlaceByTag', searchHistoricalPlaceByTag);
router.post('/searchHistoricalPlaceByCategory', searchHistoricalPlaceByCategory);

router.post('/searchMuseumByTag', searchMuseumByTag);
router.post('/searchMuseumByName', searchMuseumByName);
router.post('/searchMuseumByCategory', searchMuseumByCategory);

router.post('/searchActivityByName',searchActivityByName);
router.post('/searchActivityByCategory',searchActivityByCategory);
router.post('/searchActivityByTag',searchActivityByTag);
router.post('/searchActivityByRating',searchActivityByRating);
router.post('/searchActivityByDate',searchActivityByDate);
router.post('/searchActivityByBudget',searchActivityByBudget);

router.post('/searchItineraryByDate',searchItineraryByDate);
router.post('/searchItineraryByBudget',searchItineraryByBudget);
router.post('/searchItineraryByLanguage',searchItineraryByLanguage);
router.post('/searchItineraryByName',searchItineraryByName);
router.post('/searchItineraryByTag',searchItineraryByTag);



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
