const express = require('express');
const {authLogin, authSignup} = require('../controllers/auth.controller');

const router = express.Router();

router.post('/auth/login',authLogin);
router.post('/auth/signup',authSignup);

module.exports = router;