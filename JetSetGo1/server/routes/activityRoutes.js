const express = require('express');
const { createActivity, updateActivity, deleteActivity, getActivities,searchActivityByBudget,searchActivityByDate,
searchActivityByRating,searchActivityByTag,searchActivityByCategory,searchActivityByName } = require('../controllers/activityController');
const router = express.Router();

// Advertiser activities 
router.post('/create', createActivity);
router.patch('/update/:id', updateActivity);
router.delete('/delete/:id', deleteActivity);
router.get('/', getActivities);

router.get('/searchByName',searchActivityByName);
router.get('/searchByCategory',searchActivityByCategory);
router.get('/searchByTag',searchActivityByTag);
router.get('/searchByRating',searchActivityByRating);
router.get('/searchByDate',searchActivityByDate);
router.get('/searchByBudget',searchActivityByBudget);



module.exports = router;
