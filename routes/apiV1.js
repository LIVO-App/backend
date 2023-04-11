'use strict';

const express = require('express');
const apiV1 = express.Router();

const authRouter = require('./apiV1/auth');
const blocksRouter = require('./apiV1/learning_block');

apiV1.use('/auth', authRouter);
apiV1.use('/blocks', blocksRouter);

module.exports = apiV1;