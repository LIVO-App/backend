'use strict';

const express = require('express');
const router = express.Router();

const learningAreasHandler = require('../../controllers/learning_areasController');

router.get('/', learningAreasHandler.get_areas);
router.get('/:area_id', learningAreasHandler.get_area);

module.exports = router;