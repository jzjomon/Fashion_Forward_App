var express = require('express');
const { registerCourt } = require('../controllers/userControllers');
const fileUpload = require('express-fileupload');
var router = express.Router();


router.post('/register-court',fileUpload({createParentPath: true}),registerCourt)

module.exports = router;
