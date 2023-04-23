'use strict';

const express = require('express');
const apiV1 = express.Router();

const authRouter = require('./apiV1/auth');
const blocksRouter = require('./apiV1/learning_block');
const areasRouter = require('./apiV1/learning_area');
const courseRouter = require('./apiV1/course');
const ordclassRouter = require('./apiV1/ordinary_class');

apiV1.use('/auth', authRouter);
apiV1.use('/learning_blocks', blocksRouter);
apiV1.use('/learning_areas', areasRouter);
apiV1.use('/courses', courseRouter);
apiV1.use('/ordinary_classes', ordclassRouter);

module.exports = apiV1;