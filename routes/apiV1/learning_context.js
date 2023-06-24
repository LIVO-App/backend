'use strict';

const express = require('express');
const router = express.Router();

const learningContextsHandler = require('../../controllers/learningContextsController');

router.get('/', learningContextsHandler.get_contexts);

module.exports = router;