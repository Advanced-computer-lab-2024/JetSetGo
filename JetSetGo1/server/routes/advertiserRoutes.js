const express = require('express');
const { createAdvertiserProfile, updateAdvertiserProfile, getAdvertiserProfile ,deleteActivity,createActivity, updateActivity, getActivities} = require('../controllers/advertiserController');
const router = express.Router();




// Advertiser activities 
router.post('/createActivity', createActivity);
router.patch('/updateActivity/:id', updateActivity);

router.get('/', getActivities);



// Create or Update Advertiser Profile
router.post('/create', createAdvertiserProfile);
router.patch('/update/:id', updateAdvertiserProfile);
router.get('/profile/:id', getAdvertiserProfile);
router.delete('/delete/:id', deleteActivity); // Delete an activity
module.exports = router;
