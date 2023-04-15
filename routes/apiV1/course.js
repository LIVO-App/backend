'use strict';

const express = require('express');
const router = express.Router();

const coursesHandler = require('../../controllers/coursesController');
const opentoHandler = require('../../controllers/opentoController');

router.get('/', coursesHandler.get_courses);
router.get('/:id', coursesHandler.get_course);
router.get('/:id/opento', opentoHandler.get_institute_classes);

module.exports = router;