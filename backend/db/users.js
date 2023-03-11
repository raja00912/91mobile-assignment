const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    image: String,
    email: String,
    password: String,
    authtype: String,

}, {
    timestamps: true
})

const UserModel = mongoose.model('Users', UserSchema)

module.exports = {
    UserModel
}