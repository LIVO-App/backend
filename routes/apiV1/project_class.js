'use strict';

const express = require('express');
const router = express.Router();

const projectclassHandler = require('../../controllers/projectClassController');

router.get('/:course/:block/components', projectclassHandler.get_project_class_components);

module.exports = router;