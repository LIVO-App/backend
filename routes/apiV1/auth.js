'use strict';

const express = require('express');
const router = express.Router();

const authHandler = require('../../controllers/userController');
//const googleHandler = require('./googleauth');

router.post('/student_login', authHandler.student_login);

module.exports = router;