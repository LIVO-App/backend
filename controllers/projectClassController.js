'use strict';

const projectClassesSchema = require('../models/projectClassModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    missingParameter: "Missing required information",
    notAuthorized: "Not authorized request"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_project_class_components = async (req, res) => {
    let teacher_id = req.query.teacher_id;
    let query = teacher_id ? {teacher_id: teacher_id} : {}; 
    if(req.loggedUser.role == "teacher"){
        if(teacher_id!=undefined){
            if(req.loggedUser._id != teacher_id){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('project_class components: unauthorized access');
                return;
            }
        } else {
            teacher_id = req.loggedUser._id;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('project_class components: unauthorized access');
        return;
    }
    let course_id = req.params.course;
    let block_id = req.params.block;
    let section = req.query.section;
    query["section"] = section;
    let associated_class = req.query.assoc_class;
    query["assoc_class"] = associated_class
    let cmps = await projectClassesSchema.classComponents(course_id, block_id, section, teacher_id, associated_class);
    if (!cmps) {
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log("project class components: missing parameters");
        return;
    }
    let data_cmps = cmps.map((cmp) => {
        return {
            id: cmp.id,
            name: cmp.name,
            surname: cmp.surname,
            ord_class_study_year: cmp.ordinary_class_study_year,
            ord_class_address: cmp.ordinary_class_address,
            ord_class_section: cmp.section
        }
    });
    let response = {
        path: "/api/v1/project_classes/:course/:block/components",
        single: false,
        query: query,
        date: new Date(),
        data: data_cmps
    };
    res.status(200).json(response);
}

module.exports.get_project_class_sections = async (req,res) => {
    let course_id = req.params.course;
    let block_id = req.params.block;
    let sections = await projectClassesSchema.read_section_from_course_and_block(course_id, block_id);
    if(sections == null) {
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log("project class sections: missing parameters");
        return;
    }
    if(!sections){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log("project class sections: resource not found");
        return;
    }
    let data_sections = sections.map((section) => {
        return {
            section: section.section
        }
    })
    let response = {
        path: "/api/v1/project_classes/:course/:block/sections",
        single: false,
        query: {},
        date: new Date(),
        data: data_sections
    };
    res.status(200).json(response);
}