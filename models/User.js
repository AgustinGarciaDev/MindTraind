const mongoose = require('mongoose')

const userSchemma = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String, required: true },
    role: { type: String, default : "student" },
    googleUser: {type: Boolean, default: false}
})

const User = mongoose.model('user', userSchemma)

module.exports = User