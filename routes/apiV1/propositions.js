'use strict';

const express = require('express');
const router = express.Router();

const coursesHandler = require('../../controllers/coursesController');
const tokenChecker = require('../tokenChecker');

router.get('/', tokenChecker);
router.get('/', coursesHandler.get_courses_model);
router.get('/export', tokenChecker);
router.get('/export', coursesHandler.propositions_export)
router.post('/', tokenChecker);
router.post('/', coursesHandler.add_proposition);
router.put('/approval', tokenChecker);
router.put('/approval', coursesHandler.approve_proposals)

module.exports = router;