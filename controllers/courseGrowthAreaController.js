'use strict';

const sanitizer = require('../utils/sanitizer');
const adminModel = require('../models/adminModel');
const growthAreaModel = require('../models/courseGrowthAreaModel');
const coursesModel = require('../models/coursesModel');
const personalGrowthAreaModel = require('../models/growthAreaModel')

let MSG = {
    notFound: "Resource not found",
    missingParameters: "Bad input. Missing required information",
    notAuthorized: "Not authorized request",
    updateFailed: "Failed to save",
    duplicateEntry: "Growth area already inserted",
    insertSuccess: "Element inserted successfully"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_growth_areas = async (req, res) => {
    let course_id = req.params.course_id;
    let cls = await growthAreaModel.read_from_course(course_id);
    if(!cls){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('course growth areas: resource not found ('+new Date()+')');
        return;
    }
    let data_cls = cls.map((cl) => {
        let growth_area_ref = {
            path: "/api/v1/growth_areas", 
            single: true, 
            query: {},
            data: {
                id: cl.growth_area_id
            }
        }
        let italian_title = sanitizer.encode_output(cl.italian_title)
        let english_title = sanitizer.encode_output(cl.english_title)
        let italian_description = sanitizer.encode_output(cl.italian_description)
        let english_description = sanitizer.encode_output(cl.english_description)
        return {
            growth_area_ref: growth_area_ref,
            italian_title: italian_title,
            english_title: english_title,
            italian_description: italian_description,
            english_description: english_description
        };
    });
    let path = "/api/v1/courses/"+course_id+"/growth_areas"
    let response = {
        path: path,
        single: false,
        query: {},
        date: new Date(),
        data: data_cls
    }
    res.status(200).json(response);
}

module.exports.add_single_growth_area = async (req, res) => {
    if(req.loggedUser.role==="admin"){
        let admin_id = req.loggedUser._id
        let user_exist = await adminModel.read_id(admin_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('course single growth area insert: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('course single growth area insert: unauthorized access ('+new Date()+')');
        return;
    }
    let course_id = req.params.course_id;
    let course_exist = await coursesModel.read(course_id, true);
    if(!course_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('course single growth area insert: course not found ('+new Date()+')');
        return;
    }
    let growth_area_id = req.query.growth_area_id;
    let growth_area_exist = await personalGrowthAreaModel.read(growth_area_id);
    if(!growth_area_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('course single growth area insert: growth area not found ('+new Date()+')');
        return;
    }
    let growth_area_entry_exist = await growthAreaModel.is_present(course_id, growth_area_id)
    if(growth_area_entry_exist){
        res.status(409).json({status: "error", description: MSG.duplicateEntry});
        console.log('course single growth area insert: duplicate entry ('+new Date()+')');
        return;
    }
    let class_area_insert = await growthAreaModel.add_single(course_id, growth_area_id);
    if(!class_area_insert){
        res.status(400).json({status: "error", description: MSG.missingParameters})
        console.log('course single growth area insert: missing parameters ('+new Date()+')')
        return
    }
    res.status(201).json({status: "inserted", description: MSG.insertSuccess})
}

module.exports.delete_growth_area = async (req, res) => {
    if(req.loggedUser.role==="admin"){
        let admin_id = req.loggedUser._id
        let user_exist = await adminModel.read_id(admin_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('course single growth area remove: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('course single growth area remove: unauthorized access ('+new Date()+')');
        return;
    }
    let course_id = req.params.course_id;
    let course_exist = await coursesModel.read(course_id, true);
    if(!course_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('course single growth area remove: course not found ('+new Date()+')');
        return;
    }
    let growth_area_id = req.query.growth_area_id;
    let growth_area_exist = await personalGrowthAreaModel.read(growth_area_id);
    if(!growth_area_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('course single growth area remove: growth area not found ('+new Date()+')');
        return;
    }
    let remove_area = await growthAreaModel.remove(course_id, growth_area_id)
    let res_des = "Deleted " + remove_area.affectedRows + " rows";
    let response = {
        status: "deleted", 
        description: res_des
    };
    res.status(200).json(response)
}