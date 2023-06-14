'use strict';

const express = require('express');
const router = express.Router();

const studentHandler = require('../../controllers/studentController');
const inscribeHandler = require('../../controllers/inscribeController');
const gradeHandler = require('../../controllers/gradesController');
const tokenChecker = require('../tokenChecker');

router.get('/:id/curriculum', studentHandler.get_curriculum);
router.get('/:student_id/grades', gradeHandler.get_grades);
router.post('/:id/inscribe', inscribeHandler.inscribe_project_class);
router.delete('/:id/unscribe', inscribeHandler.unsubscribe_project_class);
router.post('/:student_id/grades', tokenChecker);
router.post('/:student_id/grades', gradeHandler.insert_grade);

module.exports = router;