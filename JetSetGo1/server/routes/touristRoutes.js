const express = require('express');
const {updateInfo, getInfo } = require('../controllers/touristController');
const router = express.Router();

// Create or Update Tour Guide Profile

router.patch('/update/:id', updateInfo);
router.get('/profile/:id', getInfo);

//66f80af288afe7e5aff3af00
module.exports = router;
