const express = require('express');
const { createAdvertiserProfile,updateAdvertiserProfile, getAdvertiserProfile , createActivity, updateActivity, deleteActivity, getActivities } = require('../controllers/advertiserController');
const { changePassword } = require("../controllers/PasswordController");
const router = express.Router();

router.patch("/change-password/:id/:modelName", changePassword);

// Advertiser activities 
router.post('/createActivity', createActivity);
router.patch('/updateActivity/:id', updateActivity);

router.get('/', getActivities);
const {showMyActivities} = require('../controllers/advertiserController');



// Create or Update Advertiser Profile
// router.post('/create', createAdvertiserProfile);
router.post('/createProfile/:id',createAdvertiserProfile);
router.patch('/updateProfile/:id', updateAdvertiserProfile);
router.get('/profile/:id', getAdvertiserProfile);
router.delete('/deleteAct/delete/:id', deleteActivity); // Delete an activity
router.patch('/update/:id', updateAdvertiserProfile);
router.get('/profile/:id', getAdvertiserProfile);
router.delete('/:id', deleteActivity); // Delete an activity
// Advertiser activities 
router.post('/create', createActivity);
router.patch('/update/:id', updateActivity);
// router.get('/', getActivities);
router.get('/showAll', showMyActivities )

module.exports = router;
