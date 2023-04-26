'use strict';

const express = require('express');
const router = express.Router();

const inscribeHandler = require('../../controllers/inscribeController');

router.post('/:id/inscribe', inscribeHandler.inscribe_project_class);
router.delete('/:id/unscribe', inscribeHandler.unsubscribe_project_class);

module.exports = router;