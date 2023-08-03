'use strict';

const projectClassesSchema = require('../models/projectClassModel');
const courseAnnouncementSchema = require('../models/courseAnnouncementModel');
const studentModel = require('../models/studentModel');
const adminModel = require('../models/adminModel');
const teacherModel = require('../models/teacherModel')
const projectClassTeacherSchema = require('../models/projectClassTeacherModel')

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    missingParameter: "Missing required information",
    notAuthorized: "Not authorized request"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_classes = async (req, res) => {
    if(req.loggedUser.role=="admin"){
        let admin_exist = await adminModel.read_id(req.loggedUser._id);
        if(!admin_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('project_class components: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('project_class list: unauthorized access');
        return;
    }
    let block_id = req.query.block_id;
    let year = req.query.year;
    let cls = await projectClassesSchema.list(block_id, year);
    if(!cls){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log("project class: missing parameters. Specified year but not learning block to use");
        return;
    }
    let data_classes = cls.map((cl) => {
        let teacher_ref = {
            path: "/api/v1/teachers", 
            single: true, 
            query: {},
            data:{
                id: cl.teacher_id
            }
        }
        let admin_ref = {
            path: "/api/v1/admins", 
            single: true, 
            query: {},
            data:{
                id: cl.admin_id
            }
        }
        return {
            course_id: cl.course_id,
            learning_block: cl.learning_block_id,
            italian_title: cl.italian_title,
            english_title: cl.english_title,
            group: cl.group,
            teacher_ref: teacher_ref,
            teacher_name: cl.teacher_name,
            teacher_surname: cl.teacher_surname,
            admin_ref: admin_ref,
            admin_name: cl.admin_name,
            admin_surname: cl.admin_surname,
            to_be_modified: cl.to_be_modified
        }
    });
    let path = "/api/v1/project_classes/"
    let response = {
        path: path,
        single: true,
        query: {block_id: block_id, year: year},
        date: new Date(),
        data: data_classes
    };
    res.status(200).json(response);
}

module.exports.get_class = async (req, res) => {
    if(req.loggedUser.role=="admin"){
        let admin_exist = await adminModel.read_id(req.loggedUser._id);
        if(!admin_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('project_class components: unauthorized access');
            return;
        }
    } else if (req.loggedUser.role == "teacher") {
        let teacher_exist = await teacherModel.read_id(req.loggedUser._id);
        if(!teacher_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('project_class components: unauthorized access');
            return;
        }
    } else if (req.loggedUser.role == "student") {
        let student_exist = await studentModel.read_id(req.loggedUser._id);
        if(!student_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('project_class components: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('project_class list: unauthorized access');
        return;
    }
    let course_id = req.params.course
    let block_id = req.params.block;
    let cl = await projectClassesSchema.read(course_id, block_id);
    if(cl==null){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log("project class: missing parameters");
        return;
    }
    if(!cl){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log("project class: resource not found");
        return;
    }
    let teacher_ref = {
        path: "/api/v1/teachers", 
        single: true, 
        query: {},
        data:{
            id: cl.teacher_id
        }
    }
    let admin_ref = {
        path: "/api/v1/admins", 
        single: true, 
        query: {},
        data:{
            id: cl.admin_id
        }
    }
    let data_class ={
        course_id: cl.course_id,
        learning_block: cl.learning_block_id,
        italian_title: cl.italian_title,
        english_title: cl.english_title,
        group: cl.group,
        teacher_ref: teacher_ref,
        teacher_name: cl.teacher_name,
        teacher_surname: cl.teacher_surname,
        admin_ref: admin_ref,
        admin_name: cl.admin_name,
        admin_surname: cl.admin_surname,
        to_be_modified: cl.to_be_modified
    }
    let path = "/api/v1/project_classes/"+course_id+"/"+block_id
    let response = {
        path: path,
        single: true,
        query: {},
        date: new Date(),
        data: data_class
    };
    res.status(200).json(response);
}

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
    } else if(req.loggedUser.role == "admin"){
        let admin_exists = await adminModel.read_id(req.loggedUser._id)
        if(!admin_exists){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('project_class components: unauthorized access');
            return;
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
    let cmps;
    if(req.loggedUser.role=="admin"){
        cmps = await projectClassesSchema.classComponents(course_id, block_id, section);
    } else {
        cmps = await projectClassesSchema.classComponents(course_id, block_id, section, teacher_id, associated_class);
    }
    
    if (!cmps) {
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log("project class components: missing parameters");
        return;
    }
    let data_cmps = cmps.map((cmp) => {
        let learning_context_ref = {
            path: "/api/v1/learning_contexts", 
            single: true, 
            query: {},
            data: {
                id: cmp.learning_context_id
            }
        }
        return {
            id: cmp.id,
            name: cmp.name,
            surname: cmp.surname,
            learning_context_ref: learning_context_ref,
            ord_class_study_year: cmp.ordinary_class_study_year,
            ord_class_address: cmp.ordinary_class_address,
            ord_class_section: cmp.section
        }
    });
    let path = "/api/v1/project_classes/"+course_id+"/"+block_id+"/components"
    let response = {
        path: path,
        single: false,
        query: query,
        date: new Date(),
        data: data_cmps
    };
    res.status(200).json(response);
}

module.exports.get_project_class_sections = async (req,res) => {
    if(req.loggedUser.role!="admin"){
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('project_class sections: unauthorized access');
        return;
    }
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
    let path = "/api/v1/project_classes/"+course_id+"/"+block_id+"/sections";
    let response = {
        path: path,
        single: false,
        query: {},
        date: new Date(),
        data: data_sections
    };
    res.status(200).json(response);
}

module.exports.get_announcments = async (req, res) => {
    let teacher_id = req.query.teacher_id;
    let query = teacher_id ? {teacher_id: teacher_id} : {};
    let admin_id = req.query.admin_id;
    query["admin_id"] = admin_id
    if(req.loggedUser.role === "teacher"){
        if(teacher_id==undefined){
            teacher_id = req.loggedUser._id;
        }
        let teacher_exists = await teacherModel.read_id(teacher_id)
        if(!teacher_exists){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_courses_v2: unauthorized access');
            return;
        }
        if(teacher_id != req.loggedUser._id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('project_class sections: unauthorized access');
            return;
        }
    }
    if(req.loggedUser.role === "admin"){
        if(admin_id==undefined){
            admin_id = req.loggedUser._id;
        }
        let admin_exist = await adminModel.read_id(admin_id)
        if(!admin_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_courses_v2: unauthorized access');
            return;
        }
        if(admin_id != req.loggedUser._id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('project_class sections: unauthorized access');
            return;
        }
    }
    let course_id = req.params.course;
    let block_id = req.params.block;
    let section = req.query.section;
    if(req.loggedUser.role === "student"){
        let student_id = req.loggedUser._id
        let student_exist = await studentModel.read_id(student_id)
        if(!student_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_courses_v2: unauthorized access');
            return;
        }
        let student_section = await studentModel.retrieve_section_from_project_class(student_id, course_id, block_id)
        if(student_section == null){
            res.status(400).json({status: "error", description: MSG.missingParameter})
            console.log('project class announcements: missing required information')
            return
        }
        if(!student_section){
            res.status(404).json({status: "error", description: MSG.notFound})
            console.log('project class announcements: section not found')
            return
        }
        section = student_section.section
    }
    query["section"] = section;
    let announcements = await courseAnnouncementSchema.list(course_id, block_id, section, teacher_id, admin_id);
    if(!announcements){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log("project class announcments: missing parameters");
        return;
    }
    let data_announcements = announcements.map((announcement) => {
        return {
            id: announcement.id,
            italian_title: announcement.italian_title,
            english_title: announcement.english_title,
            publishment: announcement.publishment
        }
    });
    let path = "/api/v1/project_classes/"+course_id+"/"+block_id+"/announcements";
    let response = {
        path: path,
        single: false,
        query: query,
        date: new Date(),
        data: data_announcements
    };
    res.status(200).json(response);
}

module.exports.get_teachers = async (req, res) => {
    if(req.loggedUser.role == "admin"){
        let admin_exist = await adminModel.read_id(req.loggedUser._id)
        if(!admin_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('project_class sections: unauthorized access');
            return;
        }
    } else if(req.loggedUser.role == "teacher"){
        let teacher_exist = await teacherModel.read_id(req.loggedUser._id)
        if(!teacher_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('project_class sections: unauthorized access');
            return;
        }
    } else if(req.loggedUser.role == "student"){
        let student_exist = await studentModel.read_id(req.loggedUser._id)
        if(!student_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('project_class sections: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('project_class sections: unauthorized access');
        return;
    }
    let course_id = req.params.course;
    let block_id = req.params.block;
    let cls = await projectClassTeacherSchema.read_from_project_class(course_id, block_id);
    if(cls===null){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log('missing parameters for project class teachers');
        return;
    }
    if(!cls){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('project_class teachers: resource not found');
        return;
    }
    let data_cls = cls.map((cl) => {
        let teacher_ref = {
            path: "/api/v1/teachers", 
            single: true, 
            query: {},
            data:{
                id: cl.id
            }
        }
        return {
            teacher_ref: cl.id,
            teacher_name: cl.name,
            teacher_surname: cl.surname,
            section: cl.section,
            main_teacher: cl.main
        };
    });
    let path = "/api/v1/project_classes/"+course_id+"/"+block_id+"/teachers"
    let response = {
        path: path,
        single: false,
        query: {},
        date: new Date(),
        data: data_cls
    }
    res.status(200).json(response);
}