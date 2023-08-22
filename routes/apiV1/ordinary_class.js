'use strict';

const express = require('express');
const router = express.Router();

const ordinaryclassHandler = require('../../controllers/ordinaryclassController');
const tokenChecker = require('../tokenChecker');

router.get('/', ordinaryclassHandler.get_classes);
router.get('/:study_year/:address/components', tokenChecker);
router.get('/:study_year/:address/components', ordinaryclassHandler.get_components);
router.get('/:student/:session/', ordinaryclassHandler.get_student_class);

module.exports = router;