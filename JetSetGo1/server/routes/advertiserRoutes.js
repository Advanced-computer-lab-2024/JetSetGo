const express = require('express');
const {showMyActivities} = require('../controllers/advertiserController');

const router = express.Router();


router.get('/showAll/:username', showMyActivities )

module.exports = router;
