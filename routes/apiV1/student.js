'use strict';

const express = require('express');
const router = express.Router();

const studentHandler = require('../../controllers/studentController');
const inscribeHandler = require('../../controllers/inscribeController');
const gradeHandler = require('../../controllers/gradesController');

router.get('/:id/curriculum', studentHandler.get_curriculum);
router.get('/:id/grades', gradeHandler.get_grades);
router.post('/:id/inscribe', inscribeHandler.inscribe_project_class);
router.delete('/:id/unscribe', inscribeHandler.unsubscribe_project_class);

module.exports = router;