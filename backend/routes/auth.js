var express = require('express');
const { signUp, login } = require('../controllers/authControllers');
var router = express.Router();

/* GET home page. */
router.post('/signup',signUp);
router.post('/login', login);

module.exports = router;
