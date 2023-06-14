'use strict';

const express = require('express');
const router = express.Router();

const studentHandler = require('../../controllers/studentController');
const inscribeHandler = require('../../controllers/inscribeController');
const gradeHandler = require('../../controllers/gradesController');
const tokenChecker = require('../tokenChecker');

router.get('/:id/curriculum', tokenChecker);
router.get('/:id/curriculum', studentHandler.get_curriculum_v2);
router.get('/:student_id/grades', tokenChecker);
router.get('/:student_id/grades', gradeHandler.get_grades_v2);
router.post('/:id/inscribe', tokenChecker);
router.post('/:id/inscribe', inscribeHandler.inscribe_project_class_v2);
router.delete('/:id/unscribe', tokenChecker);
router.delete('/:id/unscribe', inscribeHandler.unsubscribe_project_class_v2);

module.exports = router;