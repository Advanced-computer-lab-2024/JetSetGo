const express = require('express');
const { getProducts, createProduct, updateProduct,filterProducts,sortByRate, searchProductName,} = require('../controllers/adminController.js');
const {updateInfo, getInfo,searchHistoricalPlaceByTag,searchHistoricalPlaceByName,
  searchHistoricalPlaceByCategory, searchMuseumByTag,searchMuseumByName,searchMuseumByCategory,searchActivityByBudget,searchActivityByDate, 
  searchActivityByRating,searchActivityByTag,searchActivityByCategory,
  searchActivityByName, searchItineraryByDate, searchItineraryByBudget, 
  searchItineraryByLanguage,searchItineraryByName,searchItineraryByTag,
  getUpcomingActivities, sortActivityByPrice, sortActivityByRating, getUpcomingItineraries, sortItineraryByPrice,
   sortItineraryByRating, getMuseums, filterMuseumsByTag,
    getHistoricalLocations, filterHistoricalLocationsByTag, rateActivity,addCommentToActivity, deleteCommentFromActivity, book_activity_Itinerary, cancel_booking} = require('../controllers/touristController');
    getHistoricalLocations, filterHistoricalLocationsByTag, getActivitiesByCategory,} = require('../controllers/touristController');
const router = express.Router();

const { changePassword } = require("../controllers/PasswordController");

//choose category of activities
router.get('/activities/category/:categoryId', getActivitiesByCategory);

router.patch("/change-password/:id/:modelName", changePassword);

router.get('/Products',getProducts )
router.get('/filterProducts',filterProducts)
router.get('/sortByRate',sortByRate)
router.get('/searchProductName',searchProductName)
// Create or Update Tour Guide Profile

router.patch('/update/:id', updateInfo);
router.get('/profile/:id', getInfo);



// Create or Update Tour Guide Profile

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

router.get('/filterHistoricalLocationsByTag/:id', filterHistoricalLocationsByTag);



router.put('/rating',rateActivity);

router.post('/comment',addCommentToActivity);
router.delete('/del_comment', deleteCommentFromActivity);


router.post('/book_activity_Itinerary',book_activity_Itinerary);
router.delete('/cancel_booking',cancel_booking);

module.exports = router;
