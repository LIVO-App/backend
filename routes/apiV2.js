'use strict';

const express = require('express');
const apiV2 = express.Router();

const studentRouter = require('./apiV2/student');
const courseRouter = require('./apiV2/course');
//const teacherRouter = require('./apiV1/teacher');

apiV2.use('/students',studentRouter);
apiV2.use('/courses', courseRouter);

module.exports = apiV2;