const { UserModel } = require("../db/users")
const jwt = require('jsonwebtoken');
require("dotenv").config();
const bcryptjs = require('bcryptjs');

// function generateToken(user) {
//     if (user.password) {
//         delete user.password
//     }

//     return jwt.sign(user, process.env.JWT_SECRET_KEY)
// }


async function register({ name, email, password }) {
    console.log("abc")
    const existing = await UserModel.findOne({ email }) || false;
    if (existing) {
        throw new Error('User already exists')
    }

    password = bcryptjs.hashSync(password);


    let user = await UserModel.create({
        name, email, password,
        authtype: 'email-password'
    });

    user = user.toJSON()
    delete user.password;
    return user;
}

async function login({ email, password }) {
    const user = await UserModel.findOne({
        email,
        authtype: 'email-password'
    }).select('_id name image email password')

    if (!user) {
        throw new Error('User does not exist')
    }

    const match = bcryptjs.compareSync(password, user.password)

    if (!match) {
        throw new Error('The password is incorrect')
    }

    const token = jwt.sign(user, process.env.JWT_SECRET_KEY);
    console.log(token)
    return token;

}

module.exports = {
    register, login
}