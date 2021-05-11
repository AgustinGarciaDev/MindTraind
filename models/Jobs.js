const mongoose = require('mongoose')

const jobsSchemma = new mongoose.Schema({
    nameOfferent: { type: String, required: true },
    email: { type: String, required: true },
    area: [{ type: String, required: true }],
    description: { type: String, required: true },
})

const jobs = mongoose.model('user', jobsSchemma)

module.exports = jobs