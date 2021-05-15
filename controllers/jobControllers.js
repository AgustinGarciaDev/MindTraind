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
    addJob : async (req,res) => {
        let response, error;
        try {
            let newJob = new Job(req.body);
            await newJob.save();
            response = await Job.find();
        } catch (err) {
            console.log(err);
            error = "error missing required fields ";
        }
        respondFrontend(res,response,error);
    },
    getAllJobs : async (req,res) => {
        let response, error;
        try {
            response = await Job.find();
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res,response,error);
    },
    getJobById : async (req,res) => {
        const id = req.params.id;
        let response, error;
        try {
            response = await Job.findById(id);
            response || (error = errorJobNotFound)
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res,response,error);
    },
    updateJob: async (req,res) => {
        const id = req.params.id;
        let response, error;
        try {
            response = await Job.findByIdAndUpdate(id,req.body,{new:true});
            response || (error = errorJobNotFound);
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res,response,error);
    },
    deleteJob: async (req,res) => {
        const id = req.params.id;
        let response, error;
        try {
            response = await Job.findByIdAndDelete(id);
            response || (error = errorJobNotFound);
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res,response,error);
    }

}

module.exports = jobControllers;

