'use strict';

const express = require('express');
const router = express.Router();

const coursesHandler = require('../../controllers/coursesController');

router.get('/', coursesHandler.get_courses);

module.exports = router;