'use strict';

const express = require('express');
const router = express.Router();

const authHandler = require('../../controllers/userControllerLogin');
const googleHandler = require('./googleauth');

router.post('/student_login', authHandler.student_login);
router.post('/admin_login', authHandler.admin_login);
router.post('/teacher_login', authHandler.teacher_login);
router.use('/google', googleHandler);

module.exports = router;