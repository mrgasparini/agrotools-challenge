const fs = require('fs');
const fileName = 'answered-quizzes';

async function GetAnswerByUsername(username){
    try{
        let rawdata = fs.readFileSync(`./database/${fileName}.json`);
        let answerList = JSON.parse(rawdata);
        
        let requestedAnswers = [];
        
        answerList.forEach((answer) => {
            if(answer['answerUsername'] == username){
                requestedAnswers.push(answer);
                return
            }
        })

        return requestedAnswers;
    }
    catch(err){
        console.log('Failed to get answer list: ', err)
        throw err;
    }
}

async function GetAnswerById(id){
    try{
        let rawdata = fs.readFileSync(`./database/${fileName}.json`);
        let answerList = JSON.parse(rawdata);
        
        let requestedAnswer = {};

        answerList.forEach((answer) => {
            if(answer['id'] == id){
                requestedAnswer = answer;
                return
            }
        })

        return requestedAnswer;
    }
    catch(err){
        console.log('Failed to get answer list: ', err)
        throw err;
    }
}

async function RegisterAnswer(answerViewModel){
    try{
        let rawdata = fs.readFileSync(`./database/${fileName}.json`);
        let answerList = JSON.parse(rawdata);

        answerList.forEach((answer) => {
            if(answer['quizId'] == answerViewModel.quizId && answer['answerUsername'] == answerViewModel.answerUsername)
                throw {message: 'Quiz already registered.', description: "Questionário já registrado." }
        })

        answerViewModel.id = answerList.length + 1;
        answerList.push(answerViewModel);

        let data = JSON.stringify(answerList);
        fs.writeFileSync(`./database/${fileName}.json`, data);
    }
    catch(err){
        console.log('Failed to register a new answer: ', err)
        err.status = 400;
        throw err;
    }
}

module.exports = { RegisterAnswer, GetAnswerByUsername, GetAnswerById }
