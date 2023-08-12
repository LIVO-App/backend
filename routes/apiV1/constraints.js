'use strict';

const express = require('express');
const router = express.Router();

const constraintsHandler = require('../../controllers/constraintsController');
const tokenChecker = require('../tokenChecker');

router.get('/', tokenChecker)
router.get('/', constraintsHandler.get_constraints);
router.post('/', tokenChecker)
router.post('/', constraintsHandler.insert_constraints);
router.put('/:constr_id', tokenChecker)
router.put('/:constr_id', constraintsHandler.update_constraints);
router.delete('/:constr_id', tokenChecker)
router.delete('/:constr_id', constraintsHandler.delete_constraint);

module.exports = router;