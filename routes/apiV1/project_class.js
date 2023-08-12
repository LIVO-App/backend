'use strict';

const express = require('express');
const router = express.Router();

const projectclassHandler = require('../../controllers/projectClassController');
const tokenChecker = require('../tokenChecker');

router.get('/', tokenChecker);
router.get('/', projectclassHandler.get_classes);
router.get('/:course/:block/', tokenChecker);
router.get('/:course/:block/', projectclassHandler.get_class);
router.get('/:course/:block/teachers', tokenChecker);
router.get('/:course/:block/teachers', projectclassHandler.get_teachers);
router.get('/:course/:block/components', tokenChecker);
router.get('/:course/:block/components', projectclassHandler.get_project_class_components);
router.get('/:course/:block/sections', tokenChecker);
router.get('/:course/:block/sections', projectclassHandler.get_project_class_sections);
router.get('/:course/:block/announcements', tokenChecker);
router.get('/:course/:block/announcements', projectclassHandler.get_announcments);
router.delete('/:course/:block/', tokenChecker);
router.delete('/:course/:block/', projectclassHandler.delete_project_class);
router.put('/:course/:block/final_confirmation', tokenChecker)
router.put('/:course/:block/final_confirmation', projectclassHandler.final_confirmation)

module.exports = router;