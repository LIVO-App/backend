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
    if(req.loggedUser.role == "teacher"){
        if(teacher_id!=undefined){
            if(req.loggedUser._id != teacher_id){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('project_class components: unauthorized access');
                return;
            }
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('project_class components: unauthorized access');
        return;
    }
    let course_id = req.params.course;
    let block_id = req.params.block;
    let section = req.query.section;
    let associated_class = req.query.assoc_class;
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
            surname: cmp.surname
        }
    });
    let response = {
        path: "/api/v1/project_classes/:course/:block/components",
        single: false,
        query: {section: section, teacher_id: teacher_id, assoc_class: associated_class},
        date: new Date(),
        data: data_cmps
    };
    res.status(200).json(response);
}