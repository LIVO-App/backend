'use strict';

const express = require('express');
const router = express.Router();

const learningBlocksHandler = require('../../controllers/learning_blocksController');

router.get('/', learningBlocksHandler.get_blocks);
router.post('/correspondence', learningBlocksHandler.get_blocks_from_courses);
router.get('/:id', learningBlocksHandler.get_block);

module.exports = router;