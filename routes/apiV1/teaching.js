'use strict';

const express = require('express');
const router = express.Router();

const teachingHandler = require('../../controllers/teachingsController');

router.get('/', teachingHandler.get_teachings);
router.get('/:teaching_id', teachingHandler.get_teaching);

module.exports = router;