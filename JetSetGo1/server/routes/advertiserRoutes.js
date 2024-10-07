const express = require('express');
const { createAdvertiserProfile,updateAdvertiserProfile, getAdvertiserProfile , createActivity, updateActivity, deleteActivity, getActivities ,createActivity, updateActivity, getActivities} = require('../controllers/advertiserController');
const router = express.Router();





// Advertiser activities 
router.post('/createActivity', createActivity);
router.patch('/updateActivity/:id', updateActivity);

router.get('/', getActivities);



// Create or Update Advertiser Profile
// router.post('/create', createAdvertiserProfile);
router.post('/createProfile/:id',createAdvertiserProfile);
router.patch('/updateProfile/:id', updateAdvertiserProfile);
router.get('/profile/:id', getAdvertiserProfile);
router.delete('/deleteAct/delete/:id', deleteActivity); // Delete an activity

// Advertiser activities 
router.post('/create', createActivity);
router.patch('/update/:id', updateActivity);
router.get('/', getActivities);
module.exports = router;
