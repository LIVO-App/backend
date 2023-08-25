'use strict';

const express = require('express');
const router = express.Router();

const studentHandler = require('../../controllers/studentController');
const subscribeHandler = require('../../controllers/subscribeController');
const gradeHandler = require('../../controllers/gradesController');
const tokenChecker = require('../tokenChecker');

router.get('/:student_id', tokenChecker)
router.get('/:student_id', studentHandler.get_student);
router.get('/:student_id/curriculum', studentHandler.get_curriculum);
router.get('/:student_id/grades', gradeHandler.get_grades);
router.post('/:student_id/subscribe', subscribeHandler.subscribe_project_class);
router.delete('/:student_id/unsubscribe', subscribeHandler.unsubscribe_project_class);
router.post('/:student_id/grades', tokenChecker);
router.post('/:student_id/grades', gradeHandler.insert_grade);
router.get('/:student_id/project_classes', tokenChecker);
router.get('/:student_id/project_classes', studentHandler.get_project_classes);
router.get('/:student_id/annual_credits', tokenChecker);
router.get('/:student_id/annual_credits', studentHandler.get_credits_annual_progession);
router.put('/:student_id', tokenChecker);
router.put('/:student_id', studentHandler.update_info);
router.put('/:student_id/password', tokenChecker);
router.put('/:student_id/password', studentHandler.update_password);
router.put('/:student_id/move_class', tokenChecker);
router.put('/:student_id/move_class', studentHandler.move_class_component);

module.exports = router;