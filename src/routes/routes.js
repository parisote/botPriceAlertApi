const express = require('express');
const router = express.Router();
const { sendAlert } = require('../controllers/alert.controller');

router.post('/', sendAlert);

module.exports = router;