const express = require('express');
const answerController = require('../controller/answer');
const authController = require('../controller/auth');
const router = express.Router();

router.route("/").post(authController.VerifyAuthorization, answerController.RegisterAnswer);

router.route("/").get(authController.VerifyAuthorization, answerController.GetAnswerByUsername);

router.route("/:id").get(authController.VerifyAuthorization, answerController.GetAnswerById);

module.exports = router;