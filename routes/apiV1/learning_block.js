'use strict';

const express = require('express');
const router = express.Router();

const learningBlocksHandler = require('../../controllers/learning_blocksController');

router.get('/learning_blocks', learningBlocksHandler.get_blocks);
router.get('/learning_blocks/:id', learningBlocksHandler.get_block);

module.exports = router;