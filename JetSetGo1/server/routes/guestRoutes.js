const express = require('express');
const { searchActivityByBudget,searchActivityByDate, searchActivityByRating,searchActivityByCategory, searchItineraryByTag,
searchItineraryByDate, searchItineraryByBudget, searchItineraryByLanguage,getUpcomingActivities, sortActivityByPrice,
 sortActivityByRating, getUpcomingItineraries, sortItineraryByPrice, sortItineraryByRating, getMuseums,
  filterMuseumsByTag, getHistoricalLocations, filterHistoricalLocationsByTag } = require('../controllers/guestController');
const router = express.Router();


router.get('/searchActivityByRating',searchActivityByRating);
router.get('/searchActivityByDate',searchActivityByDate);
router.get('/searchActivityByCategory',searchActivityByCategory);
router.get('/searchActivityByBudget',searchActivityByBudget);

router.get('/searchItineraryByDate',searchItineraryByDate);
router.get('/searchItineraryByBudget',searchItineraryByBudget);
router.get('/searchItineraryByLanguage',searchItineraryByLanguage);
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
