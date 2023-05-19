'use strict';

const classesSchema = require('../models/classesTeacherModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    missingParameter: "Missing required parameters"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_my_project_classes = async (req, res) => {
    let teacher_id = req.params.id;
    let block_id = req.query.block_id;
    let cls = await classesSchema.read_project_classes_teach(teacher_id, block_id);
    if (!classes){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log("teacher project class: missing parameters");
        return;
    }
    let data_classes = cls.map((cl) => {
        let teaching_ref = {
            path: "/api/v1/teachings", 
            single: true, 
            query: {},
            data: {
                id: tc.teaching_id
            }
        }
        return {
            id: cl.id,
            italian_title: cl.italian_title,
            english_title: cl.english_title,
            section: cl.section,
            teaching_ref: teaching_ref,
            my_teaching: cl.my_teaching
        }
    });
    let response = {
        path: "/api/v1/teacher/:id/my_project_classes",
        single: false,
        query: {block_id: block_id},
        date: new Date(),
        data: data_classes
    };
    res.status(200).json(response);
}

module.exports.get_associated_project_classes = async (req, res) => {
    let teacher_id = req.params.id;
    let block_id = req.query.block_id;
    let cls = await classesSchema.read_project_classes_associated(teacher_id, block_id);
    if (!classes){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log("teacher project class: missing parameters");
        return;
    }
    let data_classes = cls.map((cl) => {
        let teaching_ref = {
            path: "/api/v1/teachings", 
            single: true, 
            query: {},
            data: {
                id: tc.teaching_id
            }
        }
        return {
            id: cl.id,
            italian_title: cl.italian_title,
            english_title: cl.english_title,
            teaching_ref: teaching_ref,
        }
    });
    let response = {
        path: "/api/v1/teacher/:id/associated_project_classes",
        single: false,
        query: {block_id: block_id},
        date: new Date(),
        data: data_classes
    }
    res.status(200).json(response);
}

/*classesSchema.read_project_classes_teach(3, 7).then(msg => {
    for(var i=0;i<msg.length;i++){
        console.log("classes "+i);
        Object.keys(msg[i]).forEach(element => {
            console.log(element+": "+msg[i][element]);
        });
        console.log("=============");
    }
});

classesSchema.read_project_classes_associated(3,7).then(msg => {
    for(var i=0;i<msg.length;i++){
        console.log("classes "+i);
        Object.keys(msg[i]).forEach(element => {
            console.log(element+": "+msg[i][element]);
        });
        console.log("=============");
    }
})*/