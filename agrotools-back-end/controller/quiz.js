const quizService = require('../service/quiz');
const quizRepository = require('../repository/quiz');

async function GetAllQuizzes(req, res){
    try{
        const quizzes = await quizRepository.GetAllQuizzes();
        if(quizzes.length < 1) throw {status: 404, message: "Quiz not found.", description: "Nenhum questionário encontrado."}
        
        return res.json(quizzes);
    }  catch(err) {
        if(err.status == 404)
            return res.status(404).json({message: err.message, description: err.description})
        return res.status(400).json({message: err.message, description: err.description})
    }
}

async function GetQuizById(req, res){
    try{
        let quiz = await quizRepository.GetQuizById(req.params.id);
        if(quiz == undefined) throw {status: 404, message: "Quiz not found.", description: "Questionário não encontrado."}
        return res.json(quiz);
    }  catch(err) {
        if(err.status == 404)
            return res.status(404).json({message: err.message, description: err.description})
        return res.status(400).json({message: err.message, description: err.description})
    }
}

async function RegisterQuiz(req, res){
    try{
        await quizService.RegisterQuiz(req.body.quizViewModel);
        return res.status(200).json({message: 'Quiz successfully registered.', description: "Questionário salvo com sucesso."})
    } catch(err){
        return res.status(400).json({message: err.message, description: err.description})
    }
}

module.exports = { RegisterQuiz, GetAllQuizzes, GetQuizById }