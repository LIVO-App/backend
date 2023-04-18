'use strict';

const express = require('express');
const cors = require('cors');

// require apiV1 routes
const apiV1 = require('./routes/apiV1.js');

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send('Hello World!');
})

app.use('/api/v1', apiV1);

module.exports = app;
