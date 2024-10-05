const express = require('express');
const { searchActivityByBudget,searchActivityByDate, searchActivityByRating,searchActivityByCategory, searchItineraryByTag,
searchItineraryByDate, searchItineraryByBudget, searchItineraryByLanguage } = require('../controllers/guestController');


const router = express.Router();


router.get('/searchActivityByRating',searchActivityByRating);
router.get('/searchActivityByDate',searchActivityByDate);
router.get('/searchActivityByCategory',searchActivityByCategory);
router.get('/searchActivityByBudget',searchActivityByBudget);

router.get('/searchItineraryByDate',searchItineraryByDate);
router.get('/searchItineraryByBudget',searchItineraryByBudget);
router.get('/searchItineraryByLanguage',searchItineraryByLanguage);
router.get('/searchItineraryByTag',searchItineraryByTag);





module.exports = router;
