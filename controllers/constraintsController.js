'use strict';

const constraintSchema = require('../models/constraintModel');
const adminSchema = require('../models/adminModel')

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    missingParameters: "Missing required information"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_constraints = async (req, res) => {
    if(req.loggedUser.role == "admin"){
        let user_id = req.loggedUser._id
        let user_exist = await adminSchema.read_id(user_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('course proposition insertion: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('get constraints: unauthorized access');
        return;
    }
}