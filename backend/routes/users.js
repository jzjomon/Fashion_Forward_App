var express = require('express');
const { registerCourt, getCourts, myCourts, getCourt } = require('../controllers/userControllers');
const fileUpload = require('express-fileupload');
const userAuth = require('../middleWares/vendorAuth');
var router = express.Router();


router.post('/register-court', fileUpload({createParentPath: true}), userAuth, registerCourt); 
router.get('/getCourts',userAuth, getCourts);
router.get('/myCourts', userAuth, myCourts);
router.get('/getCourt', userAuth, getCourt);
  
module.exports = router;
 