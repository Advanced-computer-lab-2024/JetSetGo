const express = require('express');
const {deleteAccount,addAdmin,getAllUsers } = require('../controllers/adminController');
const router = express.Router();

//Admin deletion or add

router.post('/add', addAdmin);
router.delete('/delete/:modelName/:id', deleteAccount);
router.get('/:role/list',getAllUsers);

module.exports = router;
