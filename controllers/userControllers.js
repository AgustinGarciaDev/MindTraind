const User = require('../models/User');
const bcryptsjs = require('bcryptjs')
const jwToken = require('jsonwebtoken');

const respondFrontend = (res, response, error) => {
    res.json({
        success: !error ? true : false,
        response,
        error
    })
}
const errorBackend = "error 500 , avisar al  team backend";
const errorUserNotFound = "error: User not found";

const userControllers = {
    addUser: async (req, res) => {
        let response, error;
        let { email, password } = req.body;
        try {
            let userExist = await User.findOne({ email })
            console.log(userExist)
            if (!userExist) {
                password = bcryptsjs.hashSync(password, 10);
                let newUser = new User({ ...req.body, password });
                await newUser.save();

                let token = jwToken.sign({ ...newUser }, process.env.SECRET_OR_KEY);
                response = {
                    ...newUser.toObject(),
                    _id: undefined,
                    password:undefined,
                    token,
                }
            }
            else {
                error = "This email is already in use, choose another";
            }
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },

    getAllUsers: async (req, res) => {
        let response, error;
        try {
            response = await User.find();
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },

    getUserById: async (req, res) => {
        let response, error;
        let id = req.params.id;
        try {
            response = await User.findById(id);
            response || (error = errorUserNotFound);
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },
    
    updateUser: async (req, res) => {
        let response, error;
        let id = req.params.id;
        try {
            response = await User.findByIdAndUpdate(id, req.body, { new: true });
            response || (error = errorUserNotFound);
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },

    deleteUser: async (req, res) => {
        let response, error;
        let id = req.params.id;
        try {
            let userDeleted = await User.findByIdAndRemove(id);
            userDeleted || (error = errorUserNotFound);
            response = await User.find();
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },

    loginUser: async (req, res) => {
        let response, error;
        let { email, password } = req.body;
        try {
            let userExist = await User.findOne({ email });
            if (userExist) {
                if (bcryptsjs.compareSync(password, userExist.password)) {
                    let token = jwToken.sign({ ...userExist }, process.env.SECRET_OR_KEY);
                    response = {
                        ...userExist.toObject(),
                        _id: undefined,
                        token
                    }
                } else
                    error = "Please provide a valid email and password ";
            } else
                error = "Please provide a valid email and password ";

        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },
    forcedLogin: async (req, res) => {
        
        let response = {
            ...req.user.toObject(),
            _id: undefined, password: undefined
        }
        
        respondFrontend(res, response, undefined);
    }
}

module.exports = userControllers;