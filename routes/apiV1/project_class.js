'use strict';

const express = require('express');
const router = express.Router();

const projectclassHandler = require('../../controllers/projectClassController');
const tokenChecker = require('../tokenChecker');

router.get('/', tokenChecker);
router.get('/', projectclassHandler.get_classes);
router.get('/:course/:session/', tokenChecker);
router.get('/:course/:session/', projectclassHandler.get_class);
router.get('/:course/:session/teachers', tokenChecker);
router.get('/:course/:session/teachers', projectclassHandler.get_teachers);
router.get('/:course/:session/components', tokenChecker);
router.get('/:course/:session/components', projectclassHandler.get_project_class_components);
router.get('/:course/:session/sections', tokenChecker);
router.get('/:course/:session/sections', projectclassHandler.get_project_class_sections);
router.get('/:course/:session/announcements', tokenChecker);
router.get('/:course/:session/announcements', projectclassHandler.get_announcments);
router.delete('/:course/:session/', tokenChecker);
router.delete('/:course/:session/', projectclassHandler.delete_project_class);
router.put('/:course/:session/final_confirmation', tokenChecker)
router.put('/:course/:session/final_confirmation', projectclassHandler.final_confirmation)

module.exports = router;