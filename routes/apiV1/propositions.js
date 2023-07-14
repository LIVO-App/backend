'use strict';

const express = require('express');
const router = express.Router();

const coursesHandler = require('../../controllers/coursesController');
const tokenChecker = require('../tokenChecker');

router.get('/', tokenChecker);
router.get('/', coursesHandler.get_courses_model);
router.get('/courses', tokenChecker);
router.get('/courses', coursesHandler.get_courses_proposition); // For single proposition we use /api/v1/courses/:course_id

module.exports = router;