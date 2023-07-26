'use strict';

const express = require('express');
const router = express.Router();

const studentHandler = require('../../controllers/studentController');
const inscribeHandler = require('../../controllers/inscribeController');
const gradeHandler = require('../../controllers/gradesController');
const tokenChecker = require('../tokenChecker');

router.get('/:student_id', tokenChecker)
router.get('/:student_id', studentHandler.get_student);
router.get('/:student_id/curriculum', studentHandler.get_curriculum);
router.get('/:student_id/grades', gradeHandler.get_grades);
router.post('/:student_id/inscribe', inscribeHandler.inscribe_project_class);
router.delete('/:student_id/unscribe', inscribeHandler.unsubscribe_project_class);
router.post('/:student_id/grades', tokenChecker);
router.post('/:student_id/grades', gradeHandler.insert_grade);
router.get('/:student_id/project_classes', tokenChecker);
router.get('/:student_id/project_classes', studentHandler.get_credits_annual_progession);
router.get('/:student_id/annual_credits', tokenChecker);
router.get('/:student_id/annual_credits', studentHandler.get_credits_annual_progession);

module.exports = router;