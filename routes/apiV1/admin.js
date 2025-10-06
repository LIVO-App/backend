'use strict';

const express = require('express');
const router = express.Router();

const adminHandler = require('../../controllers/adminController');
const tokenChecker = require('../tokenChecker');

router.get('/:admin_id', tokenChecker)
router.get('/:admin_id', adminHandler.get_admin);
router.put('/:admin_id', tokenChecker);
router.put('/:admin_id', adminHandler.update_info);
router.put('/:admin_id/password', tokenChecker);
router.put('/:admin_id/password', adminHandler.update_password);
router.post('/', tokenChecker)
router.post('/', adminHandler.add_admins)

module.exports = router;