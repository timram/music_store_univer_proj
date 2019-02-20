const express = require('express');
const uploadImage = require('../controllers/uploadImage');

const router = new express.Router();

router.post('/upload', uploadImage);

module.exports = router;