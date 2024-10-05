const express = require('express');
const {updateInfo, getInfo,searchHistoricalPlaceByTag,searchHistoricalPlaceByName,
    searchHistoricalPlaceByCategory, searchMuseumeByTag,searchMuseumeByName,searchMuseumeByCategory } = require('../controllers/touristController');
const router = express.Router();

// Create or Update Tour Guide Profile

router.patch('/update/:id', updateInfo);
router.get('/profile/:id', getInfo);

router.get('/searchHistoricalPlaceByName', searchHistoricalPlaceByName);
router.get('/searchHistoricalPlaceByTag', searchHistoricalPlaceByTag);
router.get('/searchHistoricalPlaceByCategory', searchHistoricalPlaceByCategory);

router.get('/searchMuseumeByTag', searchMuseumeByTag);
router.get('/searchMuseumeByName', searchMuseumeByName);
router.get('/searchMuseumeByCategory', searchMuseumeByCategory);


//66f80af288afe7e5aff3af00
module.exports = router;