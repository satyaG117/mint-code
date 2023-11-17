const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// const {validateInput} = require('../middlewares/validate-inputs')
const { signupSchema } = require('../utils/validation-schemas')
const User = require('../models/User');

const LOCAL_MONGODB_URI = "mongodb://127.0.0.1:27017/";
const DB_NAME = "mintcode";
const SALT_ROUNDS = 12;

const allRoles = ['admin', 'user'];

const addUser = async (username, email, password, role) => {
    try {
        const userCredentials = {
            username, email, password
        }
        const { error } = signupSchema.validate(userCredentials);
        if (error) {
            throw new Error(error.message);
        }

        // check if the role is a valid one
        let i;
        for (i = 0; i < allRoles.length; i++) {
            if (role == allRoles[i]) {
                break;
            }
        }

        if (i == allRoles.length) {
            throw new Error('Undefined role');
        }

        //  proceed with connection
        await mongoose.connect(LOCAL_MONGODB_URI + DB_NAME);

        // check if a user with the username or email already exists
        let existingUser = await User.findOne({username})
        if(existingUser){
            throw new Error('User with the username already exists');
        }

        existingUser = await User.findOne({email})
        if(existingUser){
            throw new Error('User with the email already exists');
        }

        // finally insert
        userCredentials.password = await bcrypt.hash(userCredentials.password, SALT_ROUNDS);
        let newUser = new User({
            ...userCredentials, role
        })

        await newUser.save();

        console.info('User created successfully')

    } catch (err) {
        // console.error(err);
        throw new Error(err.message);
    }finally{
        await mongoose.disconnect();
    }
}

async function main() {
    await mongoose.connect(LOCAL_MONGODB_URI + DB_NAME);
}

// call main function to connnect to mongodb
main()
    .then(data => console.log("Connected to DB"))
    .catch(err => console.log(err));

if (process.argv.length != 6) {
    console.error('Script expects username, email, password and role as cmd line argument');
} else {
    try {
        addUser(process.argv[2], process.argv[3], process.argv[4], process.argv[5])
    } catch (err) {
        console.error('Failed to insert user');
    }
}