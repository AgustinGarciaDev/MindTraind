const mongoose = require('mongoose')

const jobsSchemma = new mongoose.Schema({
    nameOfferent: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    urlImage: { type: String, required: true },
    jobTittle: { type: String, required: true },
    country: { type: String, required: true },
    typeJob: { type: String, required: true },
    modality: { type: String, required: true },
})

const Job = mongoose.model('job', jobsSchemma)

module.exports = Job