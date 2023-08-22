'use strict';

const express = require('express');
const router = express.Router();

const study_addressHandler = require('../../controllers/studyAddressController');
const tokenChecker = require('../tokenChecker');

router.get('/', study_addressHandler.get_addresses);

module.exports = router;