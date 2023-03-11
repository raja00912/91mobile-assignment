const { UserModel } = require("../db/users")
const jwt = require('jsonwebtoken')
require("dotenv").config();


async function register({ name, email, password }) {
    const existing = await UserModel.findOne({ email })

    if (existing) {
        throw new Error('User already exists')
    }

    user = await UserModel.create({
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