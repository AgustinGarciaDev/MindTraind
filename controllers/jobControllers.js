const Job = require('../models/Jobs');


const respondFrontend = (res, response, error) => {
    res.json({
        success: !error ? true : false,
        response,
        error
    })
}
const errorBackend = "error 500 , avisar al  team backend";
const errorJobNotFound = "error: Job not found";

const jobControllers = {
    addJob = async (req,res) => {
        let respuesta, error;
        try {
            respuesta = new Job(req.body);
            await respuesta.save();
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(req,res);
    },
    getAllJobs = async (req,res) => {
        let respuesta, error;
        try {
            respuesta = await Job.find();
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(req,res);
    },
    getJobById = async (req,res) => {
        const id = req.params.id;
        let respuesta, error;
        try {
            respuesta = await Job.findById(id);
            respuesta || (error = errorJobNotFound)
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(req,res);
    },
    updateJob: async (req,res) => {
        const id = req.params.id;
        let respuesta, error;
        try {
            respuesta = await Job.findByIdAndUpdate(id,req.body,{new:true});
            respuesta || (error = errorJobNotFound);
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(req,res);
    },
    deleteJob: async (req,res) => {
        const id = req.params.id;
        let respuesta, error;
        try {
            respuesta = await Job.findByIdAndDelete(id);
            respuesta || (error = errorJobNotFound);
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(req,res);
    }

}

module.exports = jobControllers;

