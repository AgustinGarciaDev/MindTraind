const Course = require('../models/Course');

const respondFrontend = (res,response,error) =>{
    res.json({
        success: !error ? true:false,
        response,
        error
    })
}
const errorBackend = "error 500 , avisar al  team backend";
const errorCourseNotFound = "error: Course not found";

const courseControllers = {
    //pre: el usuario es admin (passport)
    addCourse: async (req,res) => {
        let response,error;
        try {
            let newCourse = new Course(req.body);
            await newCourse.save();
            response = newCourse;

        } catch (err) {
            console.log(err);
            error = "error missing required fields ";
        }
        respondFrontend(res,response,error);
    },
    getAllCourses: async (req,res) => {
        let response,error;
        try {
            response = await Course.find().populate('coach');
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res,response,error);
    },
    getCourseById: async (req,res) => {
        const id = req.params.id;
        let response,error;

        try {
            response = Course.findById(id).populate('coach');;
            response || (error = errorCourseNotFound);
        }catch(err){
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res,response,error);
    },
    updateCourse : async (req,res) => {
        const id = req.params.id;
        let response,error;
        try {
            response = Course.findByIdAndUpdate(id,req.body,{new:true}).populate('coach');
            response || (error = errorCourseNotFound);
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res,response,error);
    },
    deleteCourse : async (req,res) => {
        const id = req.params.id;
        let response,error;
        try {
            let courseDeleted = await Course.findByIdAndDelete(id);
            courseDeleted || respondFrontend(res,response,errorCourseNotFound) ;
            response = await Course.find().populate('coach');

        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res,response,error)
    },
    
//se agregaron comentarios
//comentario rama backend


}

module.exports = courseControllers;