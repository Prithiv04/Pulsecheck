const express = require('express');
const router = express.Router();
const controllers = require('./controllers/index.js');

router.post('/saveReading', controllers.saveReading);
router.get('/history', controllers.getHistory);

module.exports = router;
