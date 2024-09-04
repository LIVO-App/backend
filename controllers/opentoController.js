'use strict';

const sanitizer = require('../utils/sanitizer');
const adminModel = require('../models/adminModel');
const coursesModel = require('../models/coursesModel');
const learningContextsModel = require('../models/learningContextsModel');
const learning_sessionsModel = require('../models/learning_sessionsModel');
const opentoSchema = require('../models/opentoModel');
const ordinaryclassModel = require('../models/ordinaryclassModel');

let MSG = {
    notFound: "Resource not found",
    missingParameters: "Bad input. Missing required information",
    notAuthorized: "Not authorized request",
    updateFailed: "Failed to save",
    duplicateEntry: "Class already inserted",
    insertSuccess: "Element inserted successfully"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_institute_classes = async (req, res) => {
    let course_id = req.params.course_id;
    let cls = await opentoSchema.read_from_course(course_id);
    if(!cls){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('open_to: resource not found ('+new Date()+')');
        return;
    }
    let data_cls = cls.map((cl) => {
        let study_year_ref = {
            path: "/api/v1/study_year", 
            single: true, 
            query: {},
            data:{
                id: cl.study_year_id
            }
        }
        let study_address_ref = {
            path: "/api/v1/study_addresses", 
            single: true, 
            query: {},
            data: {
                id: cl.study_address_id
            }
        }
        let learning_context_ref = {
            path: "/api/v1/learning_contexts", 
            single: true, 
            query: {},
            data: {
                id: cl.learning_context_id
            }
        }
        let italian_title = sanitizer.encode_output(cl.italian_title)
        let english_title = sanitizer.encode_output(cl.english_title)
        return {
            study_year_ref: study_year_ref,
            study_address_ref: study_address_ref,
            italian_title: italian_title,
            english_title: english_title,
            presidium: cl.presidium,
            main_study_year: cl.main_study_year,
            learning_context_ref: learning_context_ref
        };
    });
    let path = "/api/v1/courses/"+course_id+"/opento"
    let response = {
        path: path,
        single: false,
        query: {},
        date: new Date(),
        data: data_cls
    }
    res.status(200).json(response);
}

module.exports.add_single_access = async (req, res) => {
    if(req.loggedUser.role==="admin"){
        let admin_id = req.loggedUser._id
        let user_exist = await adminModel.read_id(admin_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('open_to single addition: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('open_to single addition: unauthorized access ('+new Date()+')');
        return;
    }
    let course_id = req.params.course_id;
    let course_exist = await coursesModel.read(course_id, true);
    if(!course_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('open_to single addition: course not found ('+new Date()+')');
        return;
    }
    let context_id = req.query.context_id;
    let context_exist = await learningContextsModel.read(context_id)
    if(!context_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('open_to single addition: context not found ('+new Date()+')');
        return;
    }
    let study_address = req.query.study_address;
    let study_address_exists = await ordinaryclassModel.check_study_address(study_address);
    if(!study_address_exists){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('open_to single addition: study address not found ('+new Date()+')');
        return;
    }
    let study_year = req.query.study_year;
    let study_year_exist = await ordinaryclassModel.check_study_year(study_year)
    if(!study_year_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('open_to single addition: study year not found ('+new Date()+')');
        return;
    }
    let session_id = req.query.session_id;
    let session_exist = await learning_sessionsModel.read(session_id)
    if(!session_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('open_to single addition: session not found ('+new Date()+')');
        return;
    }
    let ord_class_exist = await ordinaryclassModel.read(study_year, study_address, session_id)
    if(!ord_class_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('open_to single addition: ordinary class not found ('+new Date()+')');
        return;
    }
    let access_exist = await opentoSchema.is_present(course_id, context_id, study_year, study_address)
    if(access_exist){
        res.status(409).json({status: "error", description: MSG.duplicateEntry});
        console.log('open_to single addition: duplicate entry ('+new Date()+')');
        return;
    }
    let main_study_year = req.query.main_study_year === "true" ? true : false;
    let presidium = req.query.presidium === "true" ? true : false;
    let class_access_insert = await opentoSchema.add_single(course_id, context_id, study_year, study_address, presidium, main_study_year);
    if(!class_access_insert){
        res.status(400).json({status: "error", description: MSG.missingParameters})
        console.log('open_to single addition: missing parameters ('+new Date()+')')
        return
    }
    res.status(201).json({status: "inserted", description: MSG.insertSuccess})
}

module.exports.delete_access = async (req, res) => {
    if(req.loggedUser.role==="admin"){
        let admin_id = req.loggedUser._id
        let user_exist = await adminModel.read_id(admin_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('open_to single remove: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('open_to single remove: unauthorized access ('+new Date()+')');
        return;
    }
    let course_id = req.params.course_id;
    let course_exist = await coursesModel.read(course_id, true);
    if(!course_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('open_to single remove: course not found ('+new Date()+')');
        return;
    }
    let context_id = req.query.context_id;
    let context_exist = await learningContextsModel.read(context_id)
    if(!context_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('open_to single remove: context not found ('+new Date()+')');
        return;
    }
    let study_address = req.query.study_address;
    let study_address_exists = await ordinaryclassModel.check_study_address(study_address);
    if(!study_address_exists){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('open_to single remove: study address not found ('+new Date()+')');
        return;
    }
    let study_year = req.query.study_year;
    let study_year_exist = await ordinaryclassModel.check_study_year(study_year)
    if(!study_year_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('open_to single remove: study year not found ('+new Date()+')');
        return;
    }
    if(study_address_exists.max_classes<study_year){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('open_to single remove: study year not planned for the study address ('+new Date()+')');
        return;
    }
    let access_revoke = await opentoSchema.remove(course_id, context_id, study_year, study_address)
    let res_des = "Deleted " + access_revoke.affectedRows + " rows";
    let response = {
        status: "deleted", 
        description: res_des
    };
    res.status(200).json(response)
}