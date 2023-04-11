'use strict';

const express = require('express');
const apiV1 = express.Router();

const authRouter = require('./apiV1/auth');
const blocksRouter = require('./apiV1/learning_block');
const areasRouter = require('./apiV1/learning_area');

apiV1.use('/auth', authRouter);
apiV1.use('/learning_blocks', blocksRouter);
apiV1.use('/learning_areas', areasRouter);

module.exports = apiV1;