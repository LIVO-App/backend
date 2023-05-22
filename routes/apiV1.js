'use strict';

const express = require('express');
const apiV1 = express.Router();

const authRouter = require('./apiV1/auth');
const blocksRouter = require('./apiV1/learning_block');
const areasRouter = require('./apiV1/learning_area');
const courseRouter = require('./apiV1/course');
const ordclassRouter = require('./apiV1/ordinary_class');
const studentRouter = require('./apiV1/student');
const teacherRouter = require('./apiV1/teacher');
const projclassRouter = require('./apiV1/project_class');

apiV1.use('/auth', authRouter);
apiV1.use('/learning_blocks', blocksRouter);
apiV1.use('/learning_areas', areasRouter);
apiV1.use('/courses', courseRouter);
apiV1.use('/ordinary_classes', ordclassRouter);
apiV1.use('/students',studentRouter);
apiV1.use('/teachers', teacherRouter);
apiV1.use('/project_classes', projclassRouter);

module.exports = apiV1;