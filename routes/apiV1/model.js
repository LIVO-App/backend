'use strict';

const express = require('express');
const router = express.Router();

const coursesHandler = require('../../controllers/coursesController');
const tokenChecker = require('../tokenChecker');

router.get('/', tokenChecker);
router.get('/', coursesHandler.get_courses_model);

module.exports = router;