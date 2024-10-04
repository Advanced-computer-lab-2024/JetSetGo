const express = require('express');
const {createMuseum, getMuseum, updateMuseum, deleteMuseum, createHistoricalLocation, getHistoricalLocation, updateHistoricalLocation, deleteHistoricalLocation, createTag, showMyMuseumsAndHistoricalPlaces} = require('../controllers/tourGuideController');
const router = express.Router();

router.post('/newMuseum/', createMuseum )
router.get('/showMuseum/', getMuseum )
router.patch('/showMuseum/:id', updateMuseum)
router.post('/showMuseum/:id', deleteMuseum )

router.post('/newHL/', createHistoricalLocation )
router.get('/showHL/', getHistoricalLocation )
router.patch('/updateHL/:id', updateHistoricalLocation )
router.post('/deleteHL/:id', deleteHistoricalLocation )



router.post('/newTag/', createTag )


router.get('/showAll/:username', showMyMuseumsAndHistoricalPlaces )

module.exports = router;
