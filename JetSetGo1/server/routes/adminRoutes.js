const express = require('express');
const { create_pref_tag, get_pref_tag, update_pref_tag, delete_pref_tag, create_act_category, get_act_category, update_act_category, delete_act_category, add_tourism_governer, view_tourism_governer} = require('../controllers/adminController.js');
const router = express.Router();

// Advertiser activities 
router.post('/createtag', create_pref_tag);
router.patch('/updatetag', update_pref_tag);
router.delete('/deletetag/:id', delete_pref_tag);
router.get('/tag', get_pref_tag);


router.post('/create_category', create_act_category);
router.patch('/update_category', update_act_category);
router.delete('/delete_category/:id', delete_act_category);
router.get('/category', get_act_category);


router.post('/create_tourism_governer', add_tourism_governer);
router.get('/', view_tourism_governer);

module.exports = router;