'use strict';

const { response } = require('express');
const classesSchema = require('../models/classesTeacherModel');
const ord_classSchema = require('../models/ordinaryclassModel');
const teacherSchema = require('../models/teacherModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    missingParameter: "Missing required information",
    notAuthorized: "Not authorized request",
    teacherNotEmployed: "The teacher was not employed in that school_year"
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
            console.log('my_project_classes: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('my_project_classes: unauthorized access');
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
            console.log('associated_project_classes: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('associated_project_classes: unauthorized access');
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

module.exports.get_my_ordinary_classes = async (req, res) => {
    let teacher_id = req.params.id;
    if(req.loggedUser.role == "teacher"){
        if(req.loggedUser._id != teacher_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('my_ordinary_class: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('my_ordinary_class: unauthorized access');
        return;
    }
    let school_year = req.query.school_year;
    if(school_year!=undefined) {
        let teacher_esist = await teacherSchema.isTeacherEmployed(teacher_id, school_year);
        if(!teacher_esist){
            res.status(404).json({status: "error", description: MSG.teacherNotEmployed});
            console.log('my_ordinary_class: teacher was not employed');
            return;
        }
    }
    let cls = await ord_classSchema.teachers_classes(teacher_id, school_year);
    if(!cls){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log("teacher ordinary class: missing parameters");
        return;
    }
    let data_classes = cls.map((cl) => {
        return {
            study_year: cl.ordinary_class_study_year,
            address: cl.ordinary_class_address,
            school_year: cl.ordinary_class_school_year,
            section: cl.section
        }
    });
    let response = {
        path: "/api/v2/teachers/:id/my_ordinary_classes",
        single: false,
        query: {school_year: school_year},
        date: new Date(),
        data: data_classes
    }
    res.status(200).json(response);
}

module.exports.get_active_years = async (req, res) => {
    let teacher_id = req.params.id;
    let yrs = await teacherSchema.getActiveYears(teacher_id);
    let data_years = yrs.map((yr) => {
        return {
            year: yr.ordinary_class_school_year
        }
    })
    let response = {
        path: "/api/v1/teachers/:id/active_years",
        single: false,
        query: {},
        date: new Date(),
        data: data_years
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