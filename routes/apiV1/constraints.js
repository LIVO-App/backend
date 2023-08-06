'use strict';

const express = require('express');
const router = express.Router();

const constraintsHandler = require('../../controllers/constraintsController');
const tokenChecker = require('../tokenChecker');

router.get('/', tokenChecker)
router.get('/', constraintsHandler.get_constraints);
router.post('/', tokenChecker)
router.post('/', constraintsHandler.insert_constraints);

module.exports = router;