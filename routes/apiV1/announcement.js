'use strict';

const express = require('express');
const router = express.Router();

const announcementHandler = require('../../controllers/courseAnnouncementsController');
const tokenChecker = require('../tokenChecker');

router.get('/:announcement_id', tokenChecker);
router.get('/:announcement_id', announcementHandler.get_announcement);
router.post('/', tokenChecker);
router.post('/', announcementHandler.publish_announcement);

module.exports = router;