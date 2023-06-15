'use strict';

const express = require('express');
const router = express.Router();

const projectclassHandler = require('../../controllers/projectClassController');
const tokenChecker = require('../tokenChecker');

router.get('/:course/:block/components', tokenChecker);
router.get('/:course/:block/components', projectclassHandler.get_project_class_components);
router.get('/:course/:block/sections', tokenChecker);
router.get('/:course/:block/sections', projectclassHandler.get_project_class_sections);

module.exports = router;