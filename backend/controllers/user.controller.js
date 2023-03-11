const { UserModel } = require("../db/users")
const jwt = require('jsonwebtoken')
require("dotenv").config();


async function register({ name, email, password }) {
    console.log("abc")
    const existing = await UserModel.findOne({ email }) || false;
    if (existing) {
        throw new Error('User already exists')
    }


    let user = await UserModel.create({
        name, email, password,
        authtype: 'email-password'
    });

    user = user.toJSON()
    delete user.password;
    return user;
}

module.exports = {
    register
}