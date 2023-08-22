'use strict';

const adminModel = require('../models/adminModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    missingParameter: "Missing required information",
    notAuthorized: "Not authorized request",
    teacherNotEmployed: "The teacher was not employed in that school_year"
}

process.env.TZ = 'Etc/Universal';

module.exports.update_info = async (req, res) => {
    let admin_id = req.params.admin_id
    if(req.loggedUser.role == "admin"){
        let admin_exist = await adminModel.read_id(admin_id);
        if(!admin_exist){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('update student information: student does not exists');
            return;
        }
        if(req.loggedUser._id != admin_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('update student information: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('update student information: unauthorized access');
        return;
    }
    let information = req.body.student_info
    let update_info = await adminModel.update(admin_id, information)
    if(!update_info){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log('update student information: no parameters to change')
        return
    }
    res.status(200).json({status: "updated", description: "Information updated successfully"})
}

module.exports.update_password = async (req, res) => {
    let admin_id = req.params.admin_id
    if(req.loggedUser.role == "student"){
        let admin_exist = await adminModel.read_id(admin_id);
        if(!admin_exist){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('update student psw: student does not exists');
            return;
        }
        if(req.loggedUser._id != admin_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('update student psw: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('update student psw: unauthorized access');
        return;
    }
    let psw = req.body.psw
    let update_psw = await adminModel.change_psw(admin_id, psw)
    if(update_psw==null){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log('update student psw: no parameters to change')
        return
    }
    if(!update_psw){
        res.status(400).json({status: "error", description: "The password is the same. Please change it."});
        console.log('update student psw: same password')
        return
    }
    res.status(200).json({status: "updated", description: "Password updated successfully"})
}