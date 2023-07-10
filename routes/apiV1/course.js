'use strict';

const express = require('express');
const router = express.Router();

const coursesHandler = require('../../controllers/coursesController');
const opentoHandler = require('../../controllers/opentoController');
const courseteachingHandler = require('../../controllers/courseteachingController');

router.get('/', coursesHandler.get_courses);
router.get('/:course_id', coursesHandler.get_course);
router.get('/:course_id/opento', opentoHandler.get_institute_classes);
router.get('/:course_id/teachings', courseteachingHandler.get_teachings);

module.exports = router;