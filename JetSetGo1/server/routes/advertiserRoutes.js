const express = require('express');
const { updateAdvertiserProfile, getAdvertiserProfile ,deleteActivity} = require('../controllers/advertiserController');
// const router = express.Router();
const router = express.Router();


// Create or Update Advertiser Profile
// router.post('/create', createAdvertiserProfile);
router.patch('/update/:id', updateAdvertiserProfile);
router.get('/profile/:id', getAdvertiserProfile);
router.delete('/:id', deleteActivity); // Delete an activity
const {showMyActivities} = require('../controllers/advertiserController');



router.get('/showAll', showMyActivities )

module.exports = router;
