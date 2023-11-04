const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const HttpError = require('../models/HttpError');
const User = require('../models/User');

const SALT_ROUNDS = 12;



module.exports.signupUser = async (req, res, next) => {

    let newUser, token;
    const { username, email, password } = req.body;
    try {
        // check for existing user accounts
        let existingUser;
        existingUser = await User.findOne({ username });
        if (existingUser) {
            return next(new HttpError(409, 'Username already in use'));
        }

        existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new HttpError(409, 'Email already in use'));
        }

        // create new user
        // hash password
        let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        newUser = new User({
            username, email, password: hashedPassword
        })

        await newUser.save();

        token = jwt.sign({ userId: newUser._id, username, email }, process.env.JWT_KEY);
    } catch (err) {
        console.log(err);
        return next(new HttpError(500, 'Error encountered during signup'))
    }

    res.status(201).json({
        success: true,
        user: {
            userId: newUser._id,
            username,
            email
        },
        token
    })
}

module.exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    let targetUser, isPasswordValid = false, token;
    try {
        targetUser = await User.findOne({ email });
        // if no such user exists
        if (!targetUser) {
            return next(new HttpError(401, "Invalid credentials [email]"));
        }
        isPasswordValid = await bcrypt.compare(password, targetUser.password);
        // password is wrong
        if(!isPasswordValid) {
            return next(new HttpError(401, "Invalid credentials [password]"));
        }

        // if password valid then generate token
        token = jwt.sign({ userId: targetUser._id, username: targetUser.username, email }, process.env.JWT_KEY);

    } catch (err) {
        console.log(err);
        return next(new HttpError(500, 'Error encountered during signup'))
    }

    res.status(200).json({
        success: true,
        user: {
            userId: targetUser._id,
            username: targetUser.username,
            email
        },
        token
    })
}