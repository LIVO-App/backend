'use strict';

const express = require('express');
const router = express.Router();

const authHandler = require('../../controllers/userController');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const gcl_id = process.env.GOOGLE_CLIENT_ID;
const gcl_secret = process.env.GOOGLE_CLIENT_SECRET;
