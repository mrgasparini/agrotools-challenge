const fs = require('fs');
const fileName = 'quizzes';

async function GetAllQuizzes(){
    try{
        let rawdata = fs.readFileSync(`./database/${fileName}.json`);
        let quizzesList = JSON.parse(rawdata);
        
        return quizzesList;
    }
    catch(err){
        console.log('Failed to register a new quiz: ', err)
        throw err;
    }
}

async function GetQuizById(quizId){
    try{
        let rawdata = fs.readFileSync(`./database/${fileName}.json`);
        let quizzesList = JSON.parse(rawdata);
        
        let requestedQuiz;
        
        quizzesList.forEach((quiz) => {
            if(quiz['id'] == quizId){
                requestedQuiz = quiz;
                return
            }
        })

        return requestedQuiz;
    }
    catch(err){
        console.log('Failed to register a new quiz: ', err)
        throw err;
    }
}

async function RegisterQuiz(quizViewModel){
    try{
        let rawdata = fs.readFileSync(`./database/${fileName}.json`);
        let quizzesList = JSON.parse(rawdata);

        quizzesList.forEach((quiz) => {
            if(quiz['quizName'] == quizViewModel.quizName)
                throw {message: 'Quiz already registered.', description: "Questionário já registrado." }
        })

        quizViewModel.id = quizzesList.length + 1;
        quizzesList.push(quizViewModel);

        let data = JSON.stringify(quizzesList);
        fs.writeFileSync(`./database/${fileName}.json`, data);
    }
    catch(err){
        console.log('Failed to register a new quiz: ', err)
        throw err;
    }
}

module.exports = { RegisterQuiz, GetAllQuizzes, GetQuizById }
