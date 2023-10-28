'use strict';

const adminModel = require('../models/adminModel');
const coursesModel = require('../models/coursesModel');
const courseteachingSchema = require('../models/courseteachingModel');
const teachingModel = require('../models/teachingModel');

let MSG = {
    notFound: "Resource not found",
    missingParameters: "Bad input. Missing required information",
    notAuthorized: "Not authorized request",
    updateFailed: "Failed to save",
    duplicateEntry: "Teaching already inserted",
    insertSuccess: "Element inserted successfully"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_teachings = async (req, res) => {
    let course_id = req.params.course_id;
    let tcs = await courseteachingSchema.read_from_course(course_id);
    if(!tcs){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('teachings: resource not found ('+new Date()+')');
        return;
    }
    let data_tcs = tcs.map((tc) => {
        let teaching_ref = {
            path: "/api/v1/teachings", 
            single: true, 
            query: {},
            data: {
                id: tc.teaching_id
            }
        }
        return {
            teaching_ref: teaching_ref,
            italian_title: tc.italian_title,
            english_title: tc.english_title
        };
    });
    let path = "/api/v1/courses/"+course_id+"/teachings";
    let response = {
        path: path,
        single: false,
        query: {},
        date: new Date(),
        data: data_tcs
    }
    res.status(200).json(response);
}

module.exports.add_single_teaching = async (req, res) => {
    if(req.loggedUser.role==="admin"){
        let admin_id = req.loggedUser._id
        let user_exist = await adminModel.read_id(admin_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('course single teaching insert: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('course single teaching insert: unauthorized access ('+new Date()+')');
        return;
    }
    let course_id = req.params.course_id;
    let course_exist = await coursesModel.read(course_id, true);
    if(!course_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('course single teaching insert: course not found ('+new Date()+')');
        return;
    }
    let teaching_id = req.query.teaching_id;
    let teaching_exist = await teachingModel.read(teaching_id);
    if(!teaching_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('course single teaching insert: teaching not found ('+new Date()+')');
        return;
    }
    let teaching_entry_exist = await courseteachingSchema.is_present(course_id, teaching_id)
    if(teaching_entry_exist){
        res.status(409).json({status: "error", description: MSG.duplicateEntry});
        console.log('course single teaching insert: duplicate entry ('+new Date()+')');
        return;
    }
    let class_teaching_insert = await courseteachingSchema.add_single(course_id, teaching_id);
    if(!class_teaching_insert){
        res.status(400).json({status: "error", description: MSG.missingParameters})
        console.log('course single growth area insert: missing parameters ('+new Date()+')')
        return
    }
    res.status(201).json({status: "inserted", description: MSG.insertSuccess})
}

module.exports.delete_teaching = async (req, res) => {
    if(req.loggedUser.role==="admin"){
        let admin_id = req.loggedUser._id
        let user_exist = await adminModel.read_id(admin_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('course single teaching remove: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('course single teaching remove: unauthorized access ('+new Date()+')');
        return;
    }
    let course_id = req.params.course_id;
    let course_exist = await coursesModel.read(course_id, true);
    if(!course_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('course single teaching remove: course not found ('+new Date()+')');
        return;
    }
    let teaching_id = req.query.teaching_id;
    let teaching_exist = await teachingModel.read(teaching_id);
    if(!teaching_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('course single teaching remove: teaching not found ('+new Date()+')');
        return;
    }
    let remove_teaching = await courseteachingSchema.remove(course_id, teaching_id)
    let res_des = "Deleted " + remove_teaching.affectedRows + " rows";
    let response = {
        status: "deleted", 
        description: res_des
    };
    res.status(200).json(response)
}