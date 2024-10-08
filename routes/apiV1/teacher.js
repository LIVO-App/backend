'use strict';

const express = require('express');
const router = express.Router();

const teacherHandler = require('../../controllers/teacherController');
const courseHandler = require('../../controllers/coursesController')
const tokenChecker = require('../tokenChecker');

router.get('/', tokenChecker)
router.get('/', teacherHandler.get_teachers)
router.post('/', tokenChecker)
router.post('/', teacherHandler.add_teachers)
router.get('/:teacher_id/my_project_classes', teacherHandler.get_my_project_classes);
router.get('/:teacher_id/associated_project_classes', teacherHandler.get_associated_project_classes);
router.get('/:teacher_id/my_ordinary_classes', tokenChecker);
router.get('/:teacher_id/my_ordinary_classes', teacherHandler.get_my_ordinary_classes);
router.get('/:teacher_id/tutor_classes', tokenChecker);
router.get('/:teacher_id/tutor_classes', teacherHandler.get_tutor_classes);
router.get('/:teacher_id/tutor_courses', tokenChecker);
router.get('/:teacher_id/tutor_courses', courseHandler.get_courses_for_tutors);
router.get('/:teacher_id/tutor_years', tokenChecker);
router.get('/:teacher_id/tutor_years', teacherHandler.get_tutor_years);
router.get('/:teacher_id/active_years', teacherHandler.get_active_years);
router.put('/:teacher_id', tokenChecker);
router.put('/:teacher_id', teacherHandler.update_info);
router.put('/:teacher_id/password', tokenChecker);
router.put('/:teacher_id/password', teacherHandler.update_password);
router.post('/:teacher_id/project_class', tokenChecker)
router.post('/:teacher_id/project_class', teacherHandler.add_teacher_to_project_class)
router.delete('/:teacher_id/project_class', tokenChecker)
router.delete('/:teacher_id/project_class', teacherHandler.remove_teacher_from_project_class)

module.exports = router;