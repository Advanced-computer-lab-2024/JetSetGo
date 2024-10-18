const express = require('express');
const {showMyActivities, createTransportation, getTransportation, updateTransportation, deleteTransportation} = require('../controllers/advertiserController');

const router = express.Router();


router.post('/newTransportation', createTransportation )
router.get('/showTransportation', getTransportation )
router.patch('/updateTransportation/:id', updateTransportation)
router.delete('/deleteTransportation/:id', deleteTransportation )


router.get('/showAll', showMyActivities )


module.exports = router;
