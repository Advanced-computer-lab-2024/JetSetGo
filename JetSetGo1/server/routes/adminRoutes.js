const express = require('express');
const {deleteAccount,addAdmin } = require('../controllers/adminController');
const router = express.Router();

//Admin deletion or add

router.post('/add/:id', addAdmin);
router.delete('/delete/:id', deleteAccount);

module.exports = router;
