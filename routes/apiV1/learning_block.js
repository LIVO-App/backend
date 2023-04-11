'use strict';

const express = require('express');
const router = express.Router();

const learningBlocksHandler = require('../../controllers/learning_blocksController');

router.get('/', learningBlocksHandler.get_blocks);
router.get('/:id', learningBlocksHandler.get_block);

module.exports = router;