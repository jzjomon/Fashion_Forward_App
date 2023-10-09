var express = require('express');
const { registerCourt } = require('../controllers/userControllers');
const fileUpload = require('express-fileupload');
const userAuth = require('../middleWares/vendorAuth');
var router = express.Router();


router.post('/register-court', fileUpload({createParentPath: true}), userAuth, registerCourt)

module.exports = router;
