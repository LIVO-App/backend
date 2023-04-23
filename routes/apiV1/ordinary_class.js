'use strict';

const express = require('express');
const router = express.Router();

const ordinaryclassHandler = require('../../controllers/ordinaryclassController');

router.get('/', ordinaryclassHandler.get_classes);

module.exports = router;