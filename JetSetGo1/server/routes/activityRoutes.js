const express = require('express');
const { createActivity, updateActivity, deleteActivity, getActivities } = require('../controllers/activityController');
const router = express.Router();

// Advertiser activities 
router.post('/create', createActivity);
router.patch('/update/:id', updateActivity);
router.delete('/delete/:id', deleteActivity);
router.get('/', getActivities);

module.exports = router;
