'use strict';

const express = require('express');
const router = express.Router();

const teacherHandler = require('../../controllers/teacherController');
const tokenChecker = require('../tokenChecker');

router.get('/:id/my_project_classes', tokenChecker);
router.get('/:id/my_project_classes', teacherHandler.get_my_project_classes_v2);
router.get('/:id/associated_project_classes', tokenChecker);
router.get('/:id/associated_project_classes', teacherHandler.get_associated_project_classes_v2);

module.exports = router;