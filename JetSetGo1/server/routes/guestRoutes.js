const express = require('express');
const { registerGuest } = require('../controllers/guestController');
const router = express.Router();

// Guest Registration
router.post('/register', registerGuest);

module.exports = router;
