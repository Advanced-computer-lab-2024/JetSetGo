const express = require('express');
const {createMuseum, getMuseum, updateMuseum, deleteMuseum, createHistoricalLocation, getHistoricalLocation, updateHistoricalLocation, deleteHistoricalLocation, createTag, showMyMuseumsAndHistoricalPlaces} = require('../controllers/tourismGovernerController');
const router = express.Router();


const { changePassword } = require('../controllers/PasswordController');
const authMiddleware = require('../controllers/authMiddleware');

router.post('/change-password', authMiddleware, changePassword);


router.post('/newMuseum', createMuseum )
router.get('/showMuseum/:id', getMuseum )
router.patch('/updateMuseum/:id', updateMuseum)
router.delete('/deleteMuseum/:id', deleteMuseum )

router.post('/newHL', createHistoricalLocation )
router.get('/showHL/:id', getHistoricalLocation )
router.patch('/updateHL/:id', updateHistoricalLocation )
router.delete('/deleteHL/:id', deleteHistoricalLocation )



router.post('/newTag', createTag )


router.get('/showAll', showMyMuseumsAndHistoricalPlaces )

module.exports = router;
