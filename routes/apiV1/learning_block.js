'use strict';

const express = require('express');
const router = express.Router();

const learningBlocksHandler = require('../../controllers/learning_blocksController');
const tokenChecker = require('../tokenChecker')

router.get('/', learningBlocksHandler.get_blocks);
router.post('/correspondence', learningBlocksHandler.get_blocks_from_courses);
router.get('/:block_id', learningBlocksHandler.get_block);
router.post('/', tokenChecker);
router.post('/', learningBlocksHandler.add_blocks);
router.put('/:block_id', tokenChecker)
router.put('/:block_id', learningBlocksHandler.update_block)

module.exports = router;