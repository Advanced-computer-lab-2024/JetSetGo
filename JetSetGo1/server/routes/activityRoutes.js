const express = require('express');
const { createActivity, updateActivity, deleteActivity, getActivities, sortActivityByPrice, sortActivityByRating } = require('../controllers/activityController');
const router = express.Router();

// Advertiser activities 
router.post('/create', createActivity);
router.patch('/update/:id', updateActivity);
router.delete('/delete/:id', deleteActivity);
router.get('/', getActivities);
router.get('/sortActivityByPrice', sortActivityByPrice);
router.get('/sortActivityByRating', sortActivityByRating);

module.exports = router;
