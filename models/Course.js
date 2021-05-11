const mongoose = require('mongoose')

const courseSchemma = new mongoose.Schema({

})

const course = mongoose.model('course', courseSchemma )

module.exports =  course