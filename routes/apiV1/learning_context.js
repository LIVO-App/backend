'use strict';

const express = require('express');
const router = express.Router();

const learningContextsHandler = require('../../controllers/learningContextsController');

router.get('/', learningContextsHandler.get_contexts);
router.post('/correspondence', learningContextsHandler.get_contexts_from_courses);

module.exports = router;