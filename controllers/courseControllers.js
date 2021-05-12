const Course = require('../models/Course');

const respondFrontend = (res, response, error) => {
    res.json({
        success: !error ? true : false,
        response,
        error
    })
}
const errorBackend = "error 500 , avisar al  team backend";
const errorCourseNotFound = "error: Course not found";

const courseControllers = {
    //pre: el usuario es admin (passport)
    addCourse: async (req, res) => {
        let response, error;
        try {
            let newCourse = new Course(req.body);
            await newCourse.save();
            response = await newCourse.execPopulate({
                path: 'coach',
                select: '-_id -password'
            });

        } catch (err) {
            console.log(err);
            error = "error missing required fields ";
        }
        respondFrontend(res, response, error);
    },

    getAllCourses: async (req, res) => {
        let response, error;
        try {
            response = await Course.find()
                .populate({ path: 'coach', select: '-_id -password' })
                .populate({ path: 'students', select: '-_id -password' });
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },

    getCourseById: async (req, res) => {
        const courseId = req.params.id
        let response, error;
        try {
            response = await Course.findById(courseId)
                .populate({ path: 'coach', select: '-_id -password' })
                .populate({ path: 'students', select: '-_id -password' });
            response || (error = errorCourseNotFound);
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },

    updateCourse: async (req, res) => {
        const id = req.params.id;
        let response, error;
        try {
            await Course.findByIdAndUpdate(id, req.body, { new: true })
            response = await Course.find()
                .populate({ path: 'coach', select: '-_id -password' })
                .populate({ path: 'students', select: '-_id -password' });
            response || (error = errorCourseNotFound);
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },

    deleteCourse: async (req, res) => {
        const id = req.params.id;
        let response, error;
        try {
            let courseDeleted = await Course.findByIdAndDelete(id);
            courseDeleted || respondFrontend(res, response, errorCourseNotFound);
            response = await Course.find()
                .populate({ path: 'coach', select: '-_id -password' })
                .populate({ path: 'students', select: '-_id -password' });

        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error)
    },
    getCourseByIdUser: async (req, res) => {
        const idUser = req.params.id;
        let response, error;

        try {
            response = await Course.find({ students: { $all: [idUser] } })
                .populate({ path: 'coach', select: '-_id -password' })
                .populate({ path: 'students', select: '-_id -password' });
            response || (error = errorCourseNotFound)
        } catch (err) {
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    }

}

module.exports = courseControllers;