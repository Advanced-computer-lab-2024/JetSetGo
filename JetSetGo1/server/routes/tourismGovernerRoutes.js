const express = require('express');
const {createMuseumOrHistoricalPlace, getMuseumOrHistoricalPlace, updateMuseumOrHistoricalPlace, deleteMuseumOrHistoricalPlace, createTag, showMyMuseumsAndHistoricalPlaces} = require('../controllers/tourismGovernerController');

const router = express.Router();

router.post('/showAll/:username', createMuseumOrHistoricalPlace )
router.get('/showAll/', getMuseumOrHistoricalPlace )
router.patch('/showAll/:id', updateMuseumOrHistoricalPlace )
router.post('/showAll/:id', deleteMuseumOrHistoricalPlace )


router.post('/showAll/', createTag )


router.get('/showAll/:username', showMyMuseumsAndHistoricalPlaces )

module.exports = router;
