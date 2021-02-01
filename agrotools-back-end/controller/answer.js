const answerService = require('../service/answer');
const answerRepository = require('../repository/answer');

async function RegisterAnswer(req, res) {
    try{
        const response = await answerService.RegisterAnswer(req.body.quizViewModel, req.username);
        return res.status(200).json({message: 'Answer successfully registered.', description: "Resposta salva com sucesso."})
    } catch(err){
        return res.status(err.status ? err.status : 403).json({auth: false, message: err.message, description: err.description})
    }
}

async function GetAnswerByUsername(req, res){
    try{
        const answers = await answerRepository.GetAnswerByUsername(req.username);
        if(answers.length < 1) throw {status: 404, message: "Answer not found.", description: "Nenhuma Resposta encontrada."}
        
        return res.json(answers);
    }  catch(err) {
        if(err.status == 404)
            return res.status(404).json({message: err.message, description: err.description})
        return res.status(400).json({message: err.message, description: err.description})
    }
}


async function GetAnswerById(req, res){
    try{
        const answer = await answerRepository.GetAnswerById(req.params.id);
        if(answer === undefined) throw {status: 404, message: "Answer not found.", description: "Nenhuma Resposta encontrada."}
        
        return res.json(answer);
    }  catch(err) {
        if(err.status == 404)
            return res.status(404).json({message: err.message, description: err.description})
        return res.status(400).json({message: err.message, description: err.description})
    }
}

module.exports = { RegisterAnswer, GetAnswerByUsername, GetAnswerById };