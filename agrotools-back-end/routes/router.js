const express = require('express');
const router = express.Router();
const quizzesRouter = require('./quizzes');
const authRouter = require('./auth');
const answerRouter = require('./answer');

router.use('/quizzes', quizzesRouter);
router.use('/login', authRouter);
router.use('/answer', answerRouter);

module.exports = router;