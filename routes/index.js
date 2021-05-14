const express = require('express')
const router = express.Router()
const passport = require('passport')
const validator = require('../config/validator') 
const courseValidator = require('../config/courseValidator')

const courseControllers = require('../controllers/courseControllers')
const userControllers = require('../controllers/userControllers')
const jobControllers = require('../controllers/jobControllers')

const {addCourse, getAllCourses, getCourseById, updateCourse, deleteCourse,getCourseByIdUser, modifyCategories, modifyLesson, modifyStudents,modifyComments, replyAComment} = courseControllers
const {addUser, getAllUsers, getUserById, updateUser, deleteUser,loginUser,forcedLogin} = userControllers
const {addJob,getAllJobs,getJobById,updateJob,deleteJob} = jobControllers

//COURSE ROUTES
router.route('/courses')
    .get(getAllCourses)
    .post(courseValidator ,addCourse)

router.route('/courses/:id')
    .get(getCourseById)
    .put(updateCourse)
    .delete(deleteCourse)
router.route('/coursesOfUser')
    .get(passport.authenticate('jwt',{session:false}),getCourseByIdUser)

router.route('/coursesmodifyCategory/:id')
    .put(modifyCategories);

router.route('/coursesmodifyLesson/:id')
    .put(modifyLesson)

router.route('/coursesmodifyStudents/:id')
    .put(passport.authenticate('jwt',{session:false}),modifyStudents)

router.route('/coursesmodifyComments/:id')
    .put(passport.authenticate('jwt',{session:false}),modifyComments)    

router.route('/coursesReplyAComment/:id')
    .put(passport.authenticate('jwt',{session:false}),replyAComment)    
    
//USER ROUTES
router.route('/users')
    .get(getAllUsers)

router.route('/users/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

router.route('/users/signup')
    .post(validator,addUser)
router.route('/users/login')
    .post(loginUser)

router.route('/usersforcedlogin')
.get(passport.authenticate('jwt',{session:false}),forcedLogin)


//JOB ROUTES
router.route('/jobs')
    .post(addJob)
    .get(getAllJobs)

router.route('/jobs/:id')
    .get(getJobById)
    .put(updateJob)
    .delete(deleteJob)

module.exports = router