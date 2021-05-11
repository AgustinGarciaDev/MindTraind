const express = require('express')
const router = express.Router()
/* const passport = require('../config/passport')
const validator = require('../config/validator') */

const courseControllers = require('../controllers/courseControllers')

const {addCourse, getAllCourses, getCourseById, updateCourse, deleteCourse} = courseControllers

//COURSE ROUTES
router.route('/courses')
    .get(getAllCourses)
    .post(addCourse)

router.route('/courses/:id')
    .get(getCourseById)
    .put(updateCourse)
    .delete(deleteCourse)

//USER ROUTES

module.exports = router