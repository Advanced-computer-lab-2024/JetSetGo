const express = require('express');
const {registerTourist,registerTourGuide,registerAdvertiser, registerSeller } = require('../controllers/RegisterController');
const router = express.Router();

// Guest Registration
router.post('/registerTourist',registerTourist );
router.post('/registerTourGuide',registerTourGuide );
router.post('/registerAdvertiser',registerAdvertiser );
router.post('/registerSeller',registerSeller );

module.exports = router;
