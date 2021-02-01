const answerRepository = require('../repository/answer');
const quizRepository = require('../repository/quiz');

async function RegisterAnswer(answerViewModel, username){
    try{

        if(!answerViewModel.quizId || answerViewModel.questions.length === 0) {
            throw {status: 400, message: 'Invalid Model.', description: "Não foi possível salvar o questionário. Preencha todos os campos." }
        }

        let quiz = quizRepository.GetQuizById(answerViewModel.quizId);

        if(quiz === undefined) 
            throw {status: 400, message: 'Invalid Quiz.', description: "Questionário não encontrado" };
    
        answerViewModel.questions.forEach((question) => {
            if(!question.questionName || question.questionName == '' || question.questionName == undefined || question.questionValue == '' || question.questionValue == undefined)
                throw {status: 400, message: 'Invalid Model.', description: "Não foi possível salvar o questionário. Preencha todos os campos." }
        })
    
        let answer = {};
        answer.answerUsername = username;
        answer.quizName = answerViewModel.name; 
        answer.quizId = answerViewModel.quizId;
        answer.questions = [];
        
        answerViewModel.questions.forEach((question) => {
            answer.questions.push({
                questionName: question.questionName,
                questionValue: question.questionValue
            })
        });
        
        await answerRepository.RegisterAnswer(answer);
        return;
    } catch(err){
        err.status = 400;
        throw err;
    }
}

module.exports = { RegisterAnswer }