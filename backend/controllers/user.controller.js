const { UserModel } = require("../db/users")
const jwt = require('jsonwebtoken');
require("dotenv").config();
const bcryptjs = require('bcryptjs');

function generateToken(user) {
    if (user.password) {
        delete user.password
    }

    return jwt.sign({ email: user.email, password: user.password }, "process.env.JWT_SECRET_KEY");
}

async function getUser(id) {
    // try {
    console.log(id);
    const data = await UserModel.findById(id)
    res.send(data);

    // } catch (err) {
    //     console.log("check")
    //     return res.status(400).send({
    //         error: 'Invalid user id provided'
    //     })
    // }
}


async function register(body) {
    const name = body.user.name
    const email = body.user.email
    let password = body.user.password
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

async function login(body) {
    const email = body.user.email
    const password = body.user.password

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
    console.log("check1")
    const token = generateToken(user.toJSON());
    return { token: token, user: user };

}

module.exports = {
    register, login, getUser
}