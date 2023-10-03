'use strict';

const express = require('express');
const router = express.Router();

const gradeHandler = require('../../controllers/gradesController');
const tokenChecker = require('../tokenChecker');

router.put('/:grade_id', tokenChecker)
router.put('/:grade_id', gradeHandler.update_grade);
router.delete('/:grade_id', tokenChecker)
router.delete('/:grade_id', gradeHandler.remove_grade)

module.exports = router;