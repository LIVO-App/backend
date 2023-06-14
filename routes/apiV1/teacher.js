'use strict';

const express = require('express');
const router = express.Router();

const teacherHandler = require('../../controllers/teacherController');
const tokenChecker = require('../tokenChecker');

router.get('/:teacher_id/my_project_classes', teacherHandler.get_my_project_classes);
router.get('/:teacher_id/associated_project_classes', teacherHandler.get_associated_project_classes);
router.get('/:teacher_id/my_ordinary_classes', tokenChecker);
router.get('/:teacher_id/my_ordinary_classes', teacherHandler.get_my_ordinary_classes);
router.get('/:teacher_id/active_years', teacherHandler.get_active_years);

module.exports = router;