const authService = require('../service/auth');

async function ValidateLogin(req, res) {
    try{
        const response = await authService.ValidateLogin(req.body.username, req.body.password);
        return res.status(200).json({auth: true, token: response.token, username: response.username})
    } catch(err){
        return res.status(err.status ? err.status : 403).json({auth: false, message: err.message, description: err.description})
    }
}

async function VerifyAuthorization(req, res, next){
    await authService.VerifyAuthorization(req, res, next)
}

module.exports = { ValidateLogin, VerifyAuthorization };