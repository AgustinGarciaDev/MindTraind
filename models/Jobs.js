const mongoose = require('mongoose')

const jobsSchemma = new mongoose.Schema({
    nameOfferent: { type: String, required: true },
    email: { type: String, required: true },
    area: [{ type: String, required: true }],
    description: { type: String, required: true },
    urlImage:{type:String, required:true}
})

const Job = mongoose.model('job', jobsSchemma)

module.exports = Job