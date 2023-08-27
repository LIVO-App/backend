'use strict';

const express = require('express');
const router = express.Router();

const ordinaryclassHandler = require('../../controllers/ordinaryclassController');
const tokenChecker = require('../tokenChecker');

router.get('/', ordinaryclassHandler.get_classes);
router.post('/', tokenChecker);
router.post('/', ordinaryclassHandler.add_ordinary_classes);
router.get('/:study_year/:address/components', tokenChecker);
router.get('/:study_year/:address/components', ordinaryclassHandler.get_components);
router.post('/:study_year/:address/components', tokenChecker);
router.post('/:study_year/:address/components', ordinaryclassHandler.add_student_to_ordinary_classes);
router.post('/:study_year/:address/teachers', tokenChecker);
router.post('/:study_year/:address/teachers', ordinaryclassHandler.add_teacher_to_ordinary_classes);
router.get('/:study_year/:address/non_compliant', tokenChecker);
router.get('/:study_year/:address/non_compliant', ordinaryclassHandler.get_not_in_order_components);
router.get('/:student/:session/', ordinaryclassHandler.get_student_class);

module.exports = router;