const mongoose = require('mongoose')

const courseSchemma = new mongoose.Schema({
    nameCourse: { type: String, required: true },
    categories: [{ name: { type: String, required: true } }],
    coach: { type: mongoose.Types.ObjectId, ref: 'user' },
    pictureRefence: { type: String, required: true },
    programDescription: { type: String, required: true },
    lessons: [{ lessonName: { type: String, required: true }, videoLink: { type: String, required: true } }],
    duration: { type: Number, required: true },
    difficulty: { type: Number, required: true, min: 1 },
    students: { type: [{ type: mongoose.Types.ObjectId, ref: 'user' }], default: [] },
    comments: [{user:{type: mongoose.Types.ObjectId, ref:'user'},text:{type:String} }]
})
//comentarios :[{usuarioId:{type: mongoose.Types.ObjectId, ref: 'user'},comentario:{type:String} }],
const Course = mongoose.model('course', courseSchemma)

module.exports = Course