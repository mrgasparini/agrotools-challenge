const quizRepository = require('../repository/quiz');

async function RegisterQuiz(quizViewModel){
    try{
        if(!quizViewModel.name || quizViewModel.questions.length === 0) 
            throw {message: 'Invalid Model.', description: "Não foi possível salvar o questionário. Preencha todos os campos." }
    
        quizViewModel.questions.forEach((question) => {
            if(!question.questionName || question.mandatoryField == null || question.mandatoryField == undefined)
                throw {message: 'Invalid Model.', description: "Não foi possível salvar o questionário. Preencha todos os campos." }
        })
    
        let quiz = {};
        quiz.description = quizViewModel.description
        quiz.quizName = quizViewModel.name;
        quiz.createDate = new Date();
        quiz.questions = [];
        
        quizViewModel.questions.forEach((question) => {
            quiz.questions.push({
                questionName: question.questionName,
                mandatoryField: question.mandatoryField
            })
        });
        
        await quizRepository.RegisterQuiz(quiz);
        return;
    } catch(err){
        throw err;
    }
}

module.exports = { RegisterQuiz }