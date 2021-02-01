const express = require('express');
const quizController = require('../controller/quiz');
const authController = require('../controller/auth');
const router = express.Router();

router.route("/").get(quizController.GetAllQuizzes);

router.route("/").post(authController.VerifyAuthorization, quizController.RegisterQuiz);

router.route("/:id").get(authController.VerifyAuthorization, quizController.GetQuizById);

module.exports = router;
