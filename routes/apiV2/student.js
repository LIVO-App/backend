'use strict';

const express = require('express');
const router = express.Router();

const studentHandler = require('../../controllers/studentController');
const inscribeHandler = require('../../controllers/inscribeController');
const gradeHandler = require('../../controllers/gradesController');
const tokenChecker = require('../tokenChecker');

router.get('/:id/curriculum', tokenChecker);
router.get('/:id/curriculum', studentHandler.get_curriculum);
router.get('/:id/grades', tokenChecker);
router.get('/:id/grades', gradeHandler.get_grades);
router.post('/:id/inscribe', tokenChecker);
router.post('/:id/inscribe', inscribeHandler.inscribe_project_class);
router.post('/:id/unscribe', tokenChecker);
router.delete('/:id/unscribe', inscribeHandler.unsubscribe_project_class);

module.exports = router;