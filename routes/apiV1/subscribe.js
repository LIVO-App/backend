'use strict';

const express = require('express');
const router = express.Router();

const subscribeHandler = require('../../controllers/subscribeController');
const tokenChecker = require('../tokenChecker');

router.get('/export', tokenChecker)
router.get('/export', subscribeHandler.subscription_export);

module.exports = router;