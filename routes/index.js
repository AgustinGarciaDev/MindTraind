const express = require('express')
const router = express.Router()
const passport = require('passport')
const validator = require('../config/validator') 

const courseControllers = require('../controllers/courseControllers')
const userControllers = require('../controllers/userControllers')
const jobControllers = require('../controllers/jobControllers')

const {addCourse, getAllCourses, getCourseById, updateCourse, deleteCourse,getCourseByIdUser, modifyCategories, modifyLesson} = courseControllers
const {addUser, getAllUsers, getUserById, updateUser, deleteUser} = userControllers
const {addJob,getAllJobs,getJobById,updateJob,deleteJob} = jobControllers

//COURSE ROUTES
router.route('/courses')
    .get(getAllCourses)
    .post(addCourse)

router.route('/courses/:id')
    .get(getCourseById)
    .put(updateCourse)
    .delete(deleteCourse)
router.route('/coursesOfUser/:id')
    .get(getCourseByIdUser)

router.route('/courses/modifyCategory/:id')
    .put(modifyCategories);

router.route('/courses/modifyLesson/:id')
    .put(modifyLesson)

//USER ROUTES
router.route('/users')
    .post(addUser)
    .get(getAllUsers)

router.route('/users/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

router.route('/jobs')
    .post(addJob)
    .get(getAllJobs)

router.route('/jobs/:id')
    .get(getJobById)
    .put(updateJob)
    .delete(deleteJob)

module.exports = router