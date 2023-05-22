'use strict';

const classesSchema = require('../models/classesTeacherModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    missingParameter: "Missing required information"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_my_project_classes = async (req, res) => {
    let teacher_id = req.params.id;
    let block_id = req.query.block_id;
    let cls = await classesSchema.read_project_classes_teach(teacher_id, block_id);
    if (!cls){
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
                id: cl.teaching_id
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
        path: "/api/v1/teachers/:id/my_project_classes",
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
    if (!cls){
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
                id: cl.teaching_id
            }
        }
        return {
            id: cl.id,
            italian_title: cl.italian_title,
            english_title: cl.english_title,
            section: cl.section,
            teaching_ref: teaching_ref,
        }
    });
    let response = {
        path: "/api/v1/teachers/:id/associated_project_classes",
        single: false,
        query: {block_id: block_id},
        date: new Date(),
        data: data_classes
    }
    res.status(200).json(response);
}

module.exports.get_my_project_classes_v2 = async (req, res) => {
    let teacher_id = req.params.id;
    if(req.loggedUser.role == "teacher"){
        if(req.loggedUser._id != teacher_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_curriculum: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('get_curriculum: unauthorized access');
        return;
    }
    let block_id = req.query.block_id;
    let cls = await classesSchema.read_project_classes_teach(teacher_id, block_id);
    if (!cls){
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
                id: cl.teaching_id
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
        path: "/api/v2/teachers/:id/my_project_classes",
        single: false,
        query: {block_id: block_id},
        date: new Date(),
        data: data_classes
    };
    res.status(200).json(response);
}

module.exports.get_associated_project_classes_v2 = async (req, res) => {
    let teacher_id = req.params.id;
    if(req.loggedUser.role == "teacher"){
        if(req.loggedUser._id != teacher_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_curriculum: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('get_curriculum: unauthorized access');
        return;
    }
    let block_id = req.query.block_id;
    let cls = await classesSchema.read_project_classes_associated(teacher_id, block_id);
    if (!cls){
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
                id: cl.teaching_id
            }
        }
        return {
            id: cl.id,
            italian_title: cl.italian_title,
            english_title: cl.english_title,
            section: cl.section,
            teaching_ref: teaching_ref,
        }
    });
    let response = {
        path: "/api/v2/teachers/:id/associated_project_classes",
        single: false,
        query: {block_id: block_id},
        date: new Date(),
        data: data_classes
    }
    res.status(200).json(response);
}

/*classesSchema.read_project_classes_associated(3,7).then(msg => {
    for(var i=0;i<msg.length;i++){
        console.log("classes "+i);
        Object.keys(msg[i]).forEach(element => {
            console.log(element+": "+msg[i][element]);
        });
        console.log("=============");
    }
})*/