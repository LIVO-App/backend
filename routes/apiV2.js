'use strict';

const express = require('express');
const apiV2 = express.Router();

const studentRouter = require('./apiV2/student');
//const teacherRouter = require('./apiV1/teacher');

apiV2.use('/students',studentRouter);

module.exports = apiV2;