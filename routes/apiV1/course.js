'use strict';

const express = require('express');
const router = express.Router();

const coursesHandler = require('../../controllers/coursesController');
const opentoHandler = require('../../controllers/opentoController');
const courseteachingHandler = require('../../controllers/courseteachingController');
const courseGrowthAreaHandler = require('../../controllers/courseGrowthAreaController');
const tokenChecker = require('../tokenChecker');

router.get('/', coursesHandler.get_courses);
router.get('/:course_id', coursesHandler.get_course);
router.get('/:course_id/opento', opentoHandler.get_institute_classes);
router.post('/:course_id/opento', tokenChecker);
router.post('/:course_id/opento', opentoHandler.add_single_access);
router.delete('/:course_id/opento', tokenChecker);
router.delete('/:course_id/opento', opentoHandler.delete_access);
router.get('/:course_id/teachings', courseteachingHandler.get_teachings);
router.post('/:course_id/teachings', tokenChecker);
router.post('/:course_id/teachings', courseteachingHandler.add_single_teaching);
router.delete('/:course_id/teachings', tokenChecker);
router.delete('/:course_id/teachings', courseteachingHandler.delete_teaching);
router.get('/:course_id/growth_areas', courseGrowthAreaHandler.get_growth_areas);
router.post('/:course_id/growth_areas', tokenChecker);
router.post('/:course_id/growth_areas', courseGrowthAreaHandler.add_single_growth_area);
router.delete('/:course_id/growth_areas', tokenChecker);
router.delete('/:course_id/growth_areas', courseGrowthAreaHandler.delete_growth_area);
router.delete('/:course_id', tokenChecker);
router.delete('/:course_id', coursesHandler.delete_course);
router.put('/:course_id', tokenChecker)
router.put('/:course_id', coursesHandler.update_course)

module.exports = router;