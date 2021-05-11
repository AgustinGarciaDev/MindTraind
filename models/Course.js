const mongoose = require('mongoose')

const courseSchemma = new mongoose.Schema({
    nameCourse: { type: String, required: true },
    category: [{ type: String, required: true }],
    startingDate: [{ type: Date }],
    coach: { type: mongoose.Types.ObjectId, ref: 'user' },
    pictureRefence: { type: String, required: true },
    programDescription: { type: String, required: true },
    lessons: [{ type: String, videoLink: { type: String, required: true }, required: true }],
    duration: { type: Number, required: true },
    difficulty: { type: Number, required: true, min: 1, max: 5 },
})

const course = mongoose.model('course', courseSchemma)

module.exports = course