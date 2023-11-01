const express = require('express');
const userAuth = require('../middleWares/vendorAuth');
const router = express.Router();
const { addTimings } = require('../controllers/vendorControllers.js')

router.post('/addTimings', userAuth, addTimings);


module.exports = router;