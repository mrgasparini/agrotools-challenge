const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function ValidateLogin (username, password) {
    if(username !== 'admin')
        throw ({status: 400, message: 'Invalid username or password.' , description: "Usuário ou Senha incorretos."})

    const match = await bcrypt.compare(password, '$2b$10$O1zPk.hNSHxmPiay/2WW.e/rbqhxlbZFVPNEA/q1PpDdPFSEopUAa');
    
    if(match){
        const token = jwt.sign({ username: username }, process.env.SECRET, {
            expiresIn: "3h"
        });
        return { token: token, username: username }
    }

    throw ({status: 400, message: 'Invalid username or password.' , description: "Usuário ou Senha incorretos."})
}

async function VerifyAuthorization(req, res, next){
    try{
    const token = req.headers['x-access-token'];
    if (token === undefined) return res.status(403).json({ auth: false, message: 'Failed to authenticate.' });

    const decoded = jwt.decode(token, process.env.SECRET);
    req.username = decoded.username;
    next();
    }catch(error){
        throw res.status(403).json({ auth: false, message: 'Failed to authenticate.' })
    }
}

  module.exports = { ValidateLogin, VerifyAuthorization }