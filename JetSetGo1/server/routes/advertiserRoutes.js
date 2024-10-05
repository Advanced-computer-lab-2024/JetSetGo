const express = require('express');
const { createAdvertiserProfile, updateAdvertiserProfile, getAdvertiserProfile , createActivity, updateActivity, deleteActivity, getActivities} = require('../controllers/advertiserController');
const router = express.Router();

// Create or Update Advertiser Profile
router.post('/create', createAdvertiserProfile);
router.patch('/update/:id', updateAdvertiserProfile);
router.get('/profile/:id', getAdvertiserProfile);
router.post('/createActivity', createActivity);
router.patch('/updateActivity/:id', updateActivity);
router.delete('/:id', deleteActivity); // Delete an activity
router.get('/getActivities', getActivities);
module.exports = router;
