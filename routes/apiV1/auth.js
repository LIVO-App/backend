'use strict';

const express = require('express');
const router = express.Router();

const authHandler = require('../../controllers/userControllerLogin');
const googleHandler = require('./googleauth');
const tokenChecker = require('../tokenChecker');

router.post('/student_login', authHandler.student_login);
router.post('/admin_login', authHandler.admin_login);
router.post('/teacher_login', authHandler.teacher_login);
router.post('/refresh', authHandler.refresh);
router.use('/google', googleHandler);
router.post('/logout', tokenChecker, authHandler.logout);

module.exports = router;