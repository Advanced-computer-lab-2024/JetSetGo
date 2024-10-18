const express = require('express');
const {createTransportBooking, getTransportBooking, deleteTransportBooking} = require('../controllers/touristController');

const router = express.Router();


router.post('/newTransportBooking', createTransportBooking )
router.get('/showTransportBooking', getTransportBooking )
router.delete('/deleteTransportBooking/:id', deleteTransportBooking )


module.exports = router;
