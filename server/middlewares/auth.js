const jwt = require('jsonwebtoken');

const HttpError = require('../models/HttpError');

module.exports.isLoggedIn = (req, res, next) =>{
    if(req.method === 'OPTIONS'){
        next();
    }

    try{
        // auth header doesn't exist
        if(!req.header.authorization){
            throw new Error("Authorization header absent")
        }
        // Bearer <token>
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            throw new Error("Token absent")
        }

        const payload = jwt.verify(token, process.env.JWT_KEY);
        console.log("Payload : ", payload);
        // attach payload to the req object
        req.userData = payload;
        return next();

    }catch(err){
        console.log(err);
        return next(new HttpError(401, "Token verification failed"))
    }
}