'use strict';

const express = require('express');
const router = express.Router();

const learningSessionsHandler = require('../../controllers/learning_sessionsController');
const tokenChecker = require('../tokenChecker')

router.get('/', learningSessionsHandler.get_sessions);
router.post('/correspondence', learningSessionsHandler.get_sessions_from_courses);
router.get('/school_years', learningSessionsHandler.get_school_years);
router.get('/:session_id', learningSessionsHandler.get_session);
router.post('/', tokenChecker);
router.post('/', learningSessionsHandler.add_sessions);
router.put('/:session_id', tokenChecker)
router.put('/:session_id', learningSessionsHandler.update_session)

module.exports = router;