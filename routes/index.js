const express = require('express')
const router = express.Router()
/* const passport = require('../config/passport')
const validator = require('../config/validator') */

const courseControllers = require('../controllers/courseControllers')
const userControllers = require('../controllers/userControllers')

const {addCourse, getAllCourses, getCourseById, updateCourse, deleteCourse} = courseControllers
const {addUser, getAllUsers, getUserById, updateUser, deleteUser} = userControllers

//COURSE ROUTES
router.route('/courses')
    .get(getAllCourses)
    .post(addCourse)

router.route('/courses/:id')
    .get(getCourseById)
    .put(updateCourse)
    .delete(deleteCourse)

//USER ROUTES
router.route('/users')
    .post(addUser)
    .get(getAllUsers)

router.route('/users/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)
    
module.exports = router