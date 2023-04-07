'use strict';

const express = require('express');
const apiV1 = express.Router();

const authRouter = require('./apiV1/auth');

apiV1.use('/auth', authRouter);

module.exports = apiV1;