const Course = require('../models/Course');
const User = require('../models/User');

const respondFrontend = (res, response, error) => {
    res.json({
        success: !error ? true : false,
        response,
        error
    })
}
const populateOneDocument = async (document) => {
    try {
        let retorno = await document
                .populate({ path: 'coach', select: '-_id -password' })
                .populate({ path: 'students', select: '-_id -password' })
                .populate({ path: 'comments.user', select: '-_id -password' })
                .populate({ path: 'comments.reply.userReply', select: '-_id -password' })
                .execPopulate();
        return retorno;
    } catch (err) {
        console.log(err);
    }
}

const populateArrayDocument = async (documents) => {
    try {
        const opts = [
            { path: 'coach', select: '-_id -password' },
            { path: 'students', select: '-_id -password' },
            { path: 'comments.user', select: '-_id -password' },
            { path: 'comments.reply.userReply', select: '-_id -password' },
          ];
        let retorno = await Course.populate(documents,opts);
        return retorno;

    } catch (err) {
        console.log(err)
    }
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
<<<<<<< HEAD
            response = await Course.find()
                .populate({ path: 'coach', select: '-_id -password' })
=======
            let documents = await Course.find();
            response = await populateArrayDocument(documents);
>>>>>>> 24cc876232c1cb2292b22e8624d1cbd1d77cbb56

        } catch (err) {
            console.log(err);
            error = "error missing required fields ";
        }
        respondFrontend(res, response, error);
    },

    getAllCourses: async (req, res) => {
        let response, error;
        try {
            let documents = await Course.find();
            response = await populateArrayDocument(documents);
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
            let document = await Course.findById(courseId);
            response = await populateOneDocument(document);
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
            let documents = await Course.find();
            response = await populateArrayDocument(documents);
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
            /*response = await Course.find()
                .populate({ path: 'coach', select: '-_id -password' })
                .populate({ path: 'students', select: '-_id -password' })
                .populate({ path: 'comments.user', select: '-_id -password' })
                .populate({ path: 'comments.reply.userReply', select: '-_id -password' })
            */
           let documents = await  Course.find();
           response = populateArrayDocument(documents)

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
            let documents = await Course.find({ students: { $all: [idUser] } })
            response = await populateArrayDocument(documents)
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
            let document = await Course.findOneAndUpdate(querySelector, updateOperator,{ new: true });
            response = await populateOneDocument(document);

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
            let document = await Course.findOneAndUpdate(querySelector, updateOperator,{ new: true });
            response = await populateOneDocument(document);

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
            
            let document = await Course.findOneAndUpdate(querySelector, updateOperator,{ new: true });
            response = await populateOneDocument(document);

            response || (error = errorCourseNotFound);
        } catch (err) {
            console.log(e);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },
    modifyComments: async (req, res) => {
        let response, error;
        console.log(req.body)
        try {
            const idCourse = req.params.id;
            const userId = req.user._id;
            const { idComment, title, text, userEmailReply, textReply, action } = req.body;

            let querySelector;
            let updateOperator;
            switch (action) {
                case "add":

                    try {
                        const userReply = await User.findOne({ email: userEmailReply });
                        const reply = { userReply: userReply._id, textReply };
                        querySelector = { _id: idCourse };
                        updateOperator = { $push: { comments: { user: userId, title, text, reply } } };
                    } catch (err) {
                        return respondFrontend(res, response, `user with email: "${userEmailReply}" doesn't exist`)
                    }

                    break;
                case "update":
                    querySelector = { _id: idCourse, "comments._id": idComment };
                    let setValue = {};
                    if (title)
                        setValue = { "comments.$.text": text, "comments.$.title": title }
                    else
                        setValue = { "comments.$.text": text }
                    updateOperator = { $set: setValue };
                    break;
                case "delete":
                    querySelector = { _id: idCourse };
                    updateOperator = { $pull: { comments: { _id: idComment } } };
                    break;
                default:
                    error = "unknown action on modificarComentario : " + action;
                    respondFrontend(res, response, error);
            }
<<<<<<< HEAD
            response = await Course.findOneAndUpdate(querySelector, updateOperator, { new: true })
                .populate({ path: 'coach', select: '-_id -password' })
                .populate({ path: 'students', select: '-_id -password' })
                .populate({ path: 'comments.user', select: '-_id -password' })
                .populate({ path: 'comments.reply.userReply', select: '-_id -password' })

=======
            let document = await Course.findOneAndUpdate(querySelector, updateOperator,{ new: true })
            response = await populateOneDocument(document)
>>>>>>> 24cc876232c1cb2292b22e8624d1cbd1d77cbb56
            response || (error = errorCourseNotFound);

        } catch (e) {
            console.log(e)
            error = errorBD;
        }
        respondFrontend(res, response, error);

    },
}

module.exports = courseControllers;