const mongoose = require('mongoose')

const userSchemma = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String, required: true },
    role: { type: String, required: true },
    googleUser: {type: Boolean, default: false}
})

const user = mongoose.model('user', userSchemma)

module.exports = user