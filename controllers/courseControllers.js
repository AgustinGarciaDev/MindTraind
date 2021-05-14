const Course = require('../models/Course');
const User = require('../models/User');

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
            response = await Course.find()

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
        const idUser = req.user._id;
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
    },

    modifyCategories: async (req, res) => {
        let response, error;
        let idCourse = req.params.id;
        const { action, idCategory, newNameCategory } = req.body;
        let querySelector, updateOperator;

        switch (action) {
            case "add":
                querySelector = { _id: idCourse };
                updateOperator = { $push: { categories: { name: newNameCategory } } };
                break;
            case "update":
                querySelector = { _id: idCourse, "categories._id": idCategory }
                updateOperator = { $set: { "categories.$.name": newNameCategory } };
                break;
            case "delete":
                querySelector = { _id: idCourse };
                updateOperator = { $pull: { categories: { _id: idCategory } } };
                break;
            default:
                respondFrontend(res, response, `error, unknown action: "${action} "`);
                break;
        }
        try {
            response = await Course.findOneAndUpdate(querySelector, updateOperator, { new: true })
                .populate({ path: 'coach', select: '-_id -password' })
                .populate({ path: 'students', select: '-_id -password' });

            response || (error = errorCourseNotFound);
        } catch (err) {
            console.log(e);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },

    modifyLesson: async (req, res) => {
        let response, error;
        let idCourse = req.params.id;
        const { action, idLesson, newName, newVideoLink } = req.body;
        let querySelector, updateOperator;

        switch (action) {
            case "add":
                querySelector = { _id: idCourse };
                updateOperator = { $push: { lessons: { lessonName: newName, videoLink: newVideoLink } } };
                break;
            case "update":
                querySelector = { _id: idCourse, "lessons._id": idLesson }
                updateOperator = { $set: { "lessons.$.lessonName": newName, "lessons.$.videoLink": newVideoLink } };
                break;
            case "delete":
                querySelector = { _id: idCourse };
                updateOperator = { $pull: { lessons: { _id: idLesson } } };
                break;
            default:
                respondFrontend(res, response, `error, unknown action: "${action} "`);
                break;
        }
        try {
            response = await Course.findOneAndUpdate(querySelector, updateOperator, { new: true })
                .populate({ path: 'coach', select: '-_id -password' })
                .populate({ path: 'students', select: '-_id -password' });

            response || (error = errorCourseNotFound);
        } catch (err) {
            console.log(e);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },


    modifyStudents: async (req, res) => {
        let response, error;
        let idCourse = req.params.id;
        let idUser = req.user._id;
        const { action } = req.body;
        let querySelector, updateOperator;

        switch (action) {
            case "add":
                querySelector = { _id: idCourse };
                updateOperator = { $push: { students: idUser } };
                break;
            /*case "update":
                querySelector = {_id:idCourse, "lessons._id": idLesson}
                updateOperator = {$set: {"lessons.$.lessonName" : newName,"lessons.$.videoLink":newVideoLink}};
                break;*/
            case "delete":
                querySelector = { _id: idCourse };
                updateOperator = { $pull: { students: idUser } };
                break;
            default:
                return respondFrontend(res, response, `error, unknown action: "${action} "`);

        }
        try {
            response = await Course.findOneAndUpdate(querySelector, updateOperator, { new: true })
                .populate({ path: 'coach', select: '-_id -password' })
                .populate({ path: 'students', select: '-_id -password' });

            response || (error = errorCourseNotFound);
        } catch (err) {
            console.log(e);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },
    modifyComments: async (req, res) => {
        let response, error;
        try {
            const idCourse = req.params.id;
            const userId = req.user._id;
            const {idComment,text,userEmailReply,textReply,action} = req.body ;
            
            let querySelector ;
            let updateOperator ;
            switch(action){
                case "add":

                    try {
                        const userReply = await User.findOne({email:userEmailReply});
                        const reply = {userReply:userReply._id,textReply};
                        querySelector = {_id : idCourse };
                        updateOperator = { $push:{ comments:{ user:userId,text,reply} } };    
                    } catch (err) {
                        return respondFrontend(res,response,`user with email: "${userEmailReply}" doesn't exist` )
                    }
                    
                    break;
                case "update": 
                    querySelector = { _id : idCourse ,"comments._id":idComment  } ; 
                    updateOperator = {$set : {"comments.$.text": text }}; 
                    break;
                case "delete" : 
                    querySelector = { _id: idCourse };
                    updateOperator = {$pull : {comments:{_id : idComment}}}; 
                    break;
                default:
                    error = "unknown action on modificarComentario : " + action;
                    respondFrontend(res,response,error);
            }
            response = await Course.findOneAndUpdate(querySelector, updateOperator,{ new: true })
            .populate({ path: 'coach', select: '-_id -password' })
            .populate({ path: 'students', select: '-_id -password' })
            .populate({ path: 'comments.user', select: '-_id -password' })
            .populate({ path: 'comments.reply.userReply', select: '-_id -password' })

            response || (error = errorCourseNotFound);
            
        } catch (e) {
            console.log(e)
            error = errorBD;
        }
        respondFrontend(res, response, error) ;
        
    },
}

module.exports = courseControllers;