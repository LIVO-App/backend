'use strict';

const express = require('express');
const router = express.Router();

const studentHandler = require('../../controllers/studentController');
const inscribeHandler = require('../../controllers/inscribeController');
const gradeHandler = require('../../controllers/gradesController');
const tokenChecker = require('../tokenChecker');

router.get('/:student_id/curriculum', tokenChecker);
router.get('/:student_id/curriculum', studentHandler.get_curriculum_v2);
router.get('/:student_id/grades', tokenChecker);
router.get('/:student_id/grades', gradeHandler.get_grades_v2);
router.post('/:student_id/inscribe', tokenChecker);
router.post('/:student_id/inscribe', inscribeHandler.inscribe_project_class_v2);
router.delete('/:student_id/unscribe', tokenChecker);
router.delete('/:student_id/unscribe', inscribeHandler.unsubscribe_project_class_v2);

module.exports = router;