const express = require('express');
const router = express.Router();
const controller = require('./controllers');

router.post('/saveReading', controller.saveReading);
router.get('/history', controller.getHistory);

module.exports = router;
