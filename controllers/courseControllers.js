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
        let retorno = await Course.populate(documents, opts);
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
            let documents = await Course.find();
            response = await populateArrayDocument(documents);

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
            let documents = await Course.find();
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
            let document = await Course.findOneAndUpdate(querySelector, updateOperator, { new: true });
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
            let document = await Course.findOneAndUpdate(querySelector, updateOperator, { new: true });
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

            let document = await Course.findOneAndUpdate(querySelector, updateOperator, { new: true });
            response = await populateOneDocument(document);

            response || (error = errorCourseNotFound);
        } catch (err) {
            console.log(e);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },
    modifyComments: async (req, res) => {
        console.log(req.body)
        console.log(req.params.id)
        let response, error;
        try {
            console.log(req.user)
            const idCourse = req.params.id;
            const userId = req.user._id;
            const { idComment, title, text, action } = req.body;
            let querySelector;
            let updateOperator;
            switch (action) {
                case "add":
                    //requiere idCourse, text, title
                    try {
                        querySelector = { _id: idCourse };
                        updateOperator = { $push: { comments: { user: userId, title, text, } } };
                    } catch (err) {
                        return respondFrontend(res, response, `user with email: "${userEmailReply}" doesn't exist`)
                    }
                    break;
                case "update":
                    //requiere idCourse, idComment, text,title
                    querySelector = { _id: idCourse, "comments._id": idComment };
                    updateOperator = { $set: { "comments.$.text": text, "comments.$.title": title } };
                    break;
                case "delete":
                    //requiere idCourse, idComment
                    querySelector = { _id: idCourse };
                    updateOperator = { $pull: { comments: { _id: idComment } } };
                    break;
                default:
                    error = "unknown action on modificarComentario : " + action;
                    return respondFrontend(res, response, error);
            }
            let document = await Course.findOneAndUpdate(querySelector, updateOperator, { new: true })
            response = await populateOneDocument(document)
            response || (error = "course or comment not found");

        } catch (e) {
            console.log(e)
            error = errorBD;
        }
        respondFrontend(res, response, error);

    },
    replyAComment: async (req, res) => {
        let response, error, querySelector, updateOperator;
        try {
            const idUser = req.user._id;
            const idCourse = req.params.id;

            const { idComment, action, textReply, idCommentReply } = req.body;

            switch (action) {
                case "add":
                    //requiere  idCourse, idComment , idUser, textReply
                    querySelector = { _id: idCourse, "comments._id": idComment };
                    updateOperator = { $push: { "comments.$.reply": { userReply: idUser, textReply } } }
                    break;
                case "update":
                    let course = await Course.findById(idCourse);
                    let newComments = course.comments.map(aComment => {
                        if (aComment._id.toString() === idComment) {
                            let newReply = aComment.reply.map(aReply => {
                                if (aReply._id.toString() === idCommentReply)
                                    return { ...aReply.toObject(), textReply }
                                return aReply;
                            })

                            return { ...aComment.toObject(), reply: newReply }
                        }
                        return aComment
                    })
                    let newCourse = { ...course.toObject(), comments: newComments }
                    querySelector = { _id: idCourse };
                    updateOperator = { ...newCourse }
                    break;
                case "delete":
                    //requiere  idCourse, idComment , idUser, textReply
                    querySelector = { _id: idCourse, "comments._id": idComment };
                    updateOperator = { $pull: { "comments.$.reply": { _id: idCommentReply } } }
                    break;
                default:
                    error = "unknown action on replyAComment : " + action;
                    return respondFrontend(res, response, error);
            }
            let document = await Course.findOneAndUpdate(querySelector, updateOperator, { new: true });
            response = await populateOneDocument(document);
            response || (error = "course or document not found")
        } catch (err) {
            console.log(err);
        }
        respondFrontend(res, response, error);
    }

}

module.exports = courseControllers;