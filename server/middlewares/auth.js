const jwt = require('jsonwebtoken');

const HttpError = require('../models/HttpError');

module.exports.setUserRole = (role) => {
    return (req, res, next) => {
        req.userRole = role;
        next();
    }
}

// used to check the role of a user, if not logged in then role stays null, no error is thrown
module.exports.getUserRole = (req, res, next) => {
    req.userData = {}
    req.userData.role = null;

    try {
        if (req.headers?.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            if (token) {
                const payload = jwt.verify(token, process.env.JWT_KEY);
                console.log("Payload : ", payload);
                // attach payload to the req object
                req.userData = payload;
            }
        }

    } catch (err) {
        console.log(err);
    }
    next();
}

module.exports.isLoggedIn = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        // auth header doesn't exist

        if (!req.headers.authorization) {
            throw new Error("Authorization header absent")
        }
        // Bearer <token>
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error("Token absent")
        }

        const payload = jwt.verify(token, process.env.JWT_KEY);
        console.log("Payload : ", payload);
        // attach payload to the req object
        req.userData = payload;
        return next();

    } catch (err) {
        console.log(err);
        return next(new HttpError(401, "Token verification failed"))
    }
}

module.exports.isAdmin = (req, res, next) => {
    try {
        // if logged in and admin then proceed
        if(req.userData && req.userData.role === 'admin'){
            return next()
        }
        return next(new HttpError(401, "Unauthorized to perform this action"));
    } catch (err) {
        next(new HttpError(500, "Server error"));
    }
}