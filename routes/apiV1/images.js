'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer()

const imageHandler = require('../../controllers/imagesController');
const tokenChecker = require('../tokenChecker');

router.get('/:obj_type/:obj_id/', tokenChecker);
router.get('/:obj_type/:obj_id/', upload.none());
router.get('/:obj_type/:obj_id/', imageHandler.retrieve_files);
router.delete('/:obj_type/:obj_id/', tokenChecker);
router.delete('/:obj_type/:obj_id/', upload.none());
router.delete('/:obj_type/:obj_id/', imageHandler.delete_files);
router.post('/:obj_type/:obj_id/upload', tokenChecker);
router.post('/:obj_type/:obj_id/upload', upload.array('images'));
router.post('/:obj_type/:obj_id/upload', imageHandler.upload_files);


module.exports = router;