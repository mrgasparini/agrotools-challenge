const express = require('express');
const authController = require('../controller/auth');
const router = express.Router();

router.route('/').post(authController.ValidateLogin);

module.exports = router;