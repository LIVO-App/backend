'use strict';

const express = require('express');
const router = express.Router();

const growth_areaHandler = require('../../controllers/growthAreaController');
const tokenChecker = require('../tokenChecker');

router.get('/', growth_areaHandler.get_areas);

module.exports = router;