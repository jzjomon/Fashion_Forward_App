var express = require('express');
const { getCourts, myCourts, getCourt, getSlots } = require('../controllers/userControllers');
const auth = require('../middleWares/auth');
var router = express.Router();


router.get('/getCourts',auth, getCourts);
router.get('/myCourts', auth, myCourts);
router.get('/getCourt', auth, getCourt);
router.get('/getSlots', auth, getSlots);
  
module.exports = router;
 