const express = require('express');
const {createTransportBooking, getTransportBooking, deleteTransportBooking,  selectPrefrences, getPrefrences} = require('../controllers/touristController');

const router = express.Router();


router.post('/newTransportBooking', createTransportBooking )
router.get('/showTransportBooking', getTransportBooking )
router.delete('/deleteTransportBooking/:id', deleteTransportBooking )

router.patch('/selectPrefrences/:id', selectPrefrences )
router.get('/myPrefrenes/:id', getPrefrences )



module.exports = router;
