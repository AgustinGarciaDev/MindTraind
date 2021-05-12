const mongoose = require('mongoose')

const courseSchemma = new mongoose.Schema({
    nameCourse: { type: String, required: true },
    category: [{ name: { type: String, required: true } }],
    /*     startingDate: [{ type: Date }], */
    coach: { type: mongoose.Types.ObjectId, ref: 'user' },
    pictureRefence: { type: String, required: true },
    programDescription: { type: String, required: true },
    lessons: [{ lessonName: { type: String, required: true }, videoLink: { type: String, required: true } }],
    duration: { type: Number, required: true },
    difficulty: { type: Number, required: true, min: 1, max: 5 },
    students: { type: [{ type: mongoose.Types.ObjectId, ref: 'user' }], default: [] }
    //[{type: mongoose.Types.ObjectId,ref: 'user'}]
})

const Course = mongoose.model('course', courseSchemma)

module.exports = Course