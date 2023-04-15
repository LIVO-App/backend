'use strict';

const express = require('express');
const router = express.Router();

const coursesHandler = require('../../controllers/coursesController');
const opentoHandler = require('../../controllers/opentoController');
const courseteachingHandler = require('../../controllers/courseteachingController');
const coursecontexHandler = require('../../controllers/coursecontextController');

router.get('/', coursesHandler.get_courses);
router.get('/:id', coursesHandler.get_course);
router.get('/:id/opento', opentoHandler.get_institute_classes);
router.get('/:id/teachings', courseteachingHandler.get_teachings);
router.get('/:id/learning_contexts', coursecontexHandler.get_contexts);

module.exports = router;