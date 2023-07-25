'use strict';

const courseSchema = require('../models/coursesModel');
const ordinaryclassSchema = require('../models/ordinaryclassModel');
const studentModel = require('../models/studentModel');
const teacherModel = require('../models/teacherModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    notAuthorized: "Not authorized request",
    missingParameters: "Missing required information"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_curriculum = async (req, res) => {
    let student_id = req.params.student_id;
    let school_year = req.query.school_year;
    let check = await ordinaryclassSchema.list(student_id, school_year);
    if(!check){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('ord_class: resource not found');
        return
    }
    let curriculum = await courseSchema.curriculum(student_id, school_year);
    if(!curriculum){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('curriculum: resource not found');
        return;
    }
    let data_curr = curriculum.map((curr) => {
        let learning_area_ref = {
            path: "/api/v1/learning_areas",
            single: true,
            query: {},
            data: {
                id: curr.learning_area_id
            }
        }
        let learning_context_ref = {
            path: "/api/v1/learning_contexts", 
            single: true, 
            query: {},
            data: {
                id: curr.learning_context_id
            }
        }
        return {
            id: curr.course_id,
            italian_title: curr.italian_title,
            english_title: curr.english_title,
            italian_displayed_name: curr.italian_displayed_name,
            english_displayed_name: curr.english_displayed_name,
            section: curr.section,
            credits: curr.credits,
            learning_area_ref: learning_area_ref,
            learning_context_ref: learning_context_ref,
            final_grade: curr.final_grade
        }
    });
    let path = "/api/v1/students/"+student_id+"/curriculum"
    let response = {
        path: path,
        single: false,
        query: {
            school_year: school_year
        },
        date: new Date(),
        data: data_curr
    };
    res.status(200).json(response);
}

module.exports.get_curriculum_v2 = async (req, res) => {
    let student_id = req.params.student_id;
    let school_year = req.query.school_year;
    let context_id = req.query.context_id;
    //console.log(req.loggedUser);
    if(req.loggedUser.role == "student"){
        let student_exist = await studentModel.read_id(student_id)
        if(!student_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_courses_v2: unauthorized access');
            return;
        }
        if(req.loggedUser._id != student_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_curriculum: unauthorized access');
            return;
        }
        let check = await ordinaryclassSchema.list(student_id, school_year);
        if(!check){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('ord_class: resource not found');
            return
        }
        let curriculum = await courseSchema.curriculum(student_id, school_year, context_id);
        if(!curriculum){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('curriculum: resource not found');
            return;
        }
        let data_curr = curriculum.map((curr) => {
            let learning_area_ref = {
                path: "/api/v1/learning_areas",
                single: true,
                query: {},
                data: {
                    id: curr.learning_area_id
                }
            }
            let learning_context_ref = {
                path: "/api/v1/learning_contexts", 
                single: true, 
                query: {},
                data: {
                    id: curr.learning_context_id
                }
            }
            return {
                id: curr.course_id,
                italian_title: curr.italian_title,
                english_title: curr.english_title,
                italian_displayed_name: curr.italian_displayed_name,
                english_displayed_name: curr.english_displayed_name,
                section: curr.section,
                credits: curr.credits,
                learning_area_ref: learning_area_ref,
                learning_context_ref: learning_context_ref,
                final_grade: curr.final_grade,
                future_course: curr.future_course
            }
        });
        let path = "/api/v2/students/"+student_id+"/curriculum"
        let response = {
            path: path,
            single: false,
            query: {
                school_year: school_year,
                context_id: context_id
            },
            date: new Date(),
            data: data_curr
        };
        res.status(200).json(response);
        return;
    } else if(req.loggedUser.role == "teacher"){
        let teacher_esist = await teacherModel.isTeacherEmployed(req.loggedUser._id, school_year);
        if(!teacher_esist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_curriculum: unauthorized access');
            return;
        }
        let curriculum = await courseSchema.curriculum(student_id, school_year, context_id, req.loggedUser._id);
        if(!curriculum){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('curriculum: resource not found');
            return;
        }
        let data_curr = curriculum.map((curr) => {
            let learning_area_ref = {
                path: "/api/v1/learning_areas",
                single: true,
                query: {},
                data: {
                    id: curr.learning_area_id
                }
            }
            let learning_context_ref = {
                path: "/api/v1/learning_contexts", 
                single: true, 
                query: {},
                data: {
                    id: curr.learning_context_id
                }
            }
            return {
                id: curr.course_id,
                italian_title: curr.italian_title,
                english_title: curr.english_title,
                italian_displayed_name: curr.italian_displayed_name,
                english_displayed_name: curr.english_displayed_name,
                section: curr.section,
                credits: curr.credits,
                learning_area_ref: learning_area_ref,
                learning_context_ref: learning_context_ref,
                final_grade: curr.final_grade,
                future_course: curr.future_course
            }
        });
        let path = "/api/v2/students/"+student_id+"/curriculum"
        let response = {
            path: path,
            single: false,
            query: {
                school_year: school_year,
                teacher_id: req.loggedUser._id,
                context_id: context_id
            },
            date: new Date(),
            data: data_curr
        };
        res.status(200).json(response);
        return;
    } else{
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('get_curriculum: unauthorized access');
        return;
    }
}

module.exports.get_project_classes = async (req,res) => {
    let student_id = req.params.student_id;
    if(req.loggedUser.role === "student"){
        let student_exist = await studentModel.read_id(student_id)
        if(!student_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_courses_v2: unauthorized access');
            return;
        }
        if(req.loggedUser._id != student_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('student project classes: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('student project classes: unauthorized access');
        return;
    }
    let block_id = req.query.block_id;
    let cls = await studentModel.retrieve_project_classes(student_id, block_id);
    if(!cls){
        res.status(400).json({status: "error", description: MSG.missingParameters});
        console.log('student project classes: missing required information');
        return;
    }
    let data_cls = cls.map((cl) => {
        return {
            id: cl.course_id,
            italian_title: cl.italian_title,
            english_title: cl.english_title,
            section: cl.section
        }
    });
    let path = "/api/v1/students/"+student_id+"/project_classes";
    let response = {
        path: path,
        single: false,
        query: {block_id: block_id},
        date: new Date(),
        data: data_cls
    };
    res.status(200).json(response);
}