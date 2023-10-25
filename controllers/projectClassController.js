'use strict';

const projectClassesSchema = require('../models/projectClassModel');
const courseAnnouncementSchema = require('../models/courseAnnouncementModel');
const studentModel = require('../models/studentModel');
const adminModel = require('../models/adminModel');
const teacherModel = require('../models/teacherModel')
const projectClassTeacherSchema = require('../models/projectClassTeacherModel');
const courseSchema = require('../models/coursesModel')
const learning_sessionsModel = require('../models/learning_sessionsModel');
const classesTeacherModel = require('../models/classesTeacherModel');
const subscribeSchema = require('../models/subscribeModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    has_grades: "The project class you want to delete already has grades. Abort deletion",
    missingParameter: "Missing required information",
    notAuthorized: "Not authorized request",
    minStudents: "Not reached min students. You can't confirm the class",
    maxStudents: "Too many students. Please check the components of the class",
    classToBeModified: "The project class has still to be modified. Please change it before confirm it",
    alreadyConfirmed: "The project class was already confirmed definitely-",
    pastSession: "The learning session of this course is not imminent. Cannot confirm definetely the course"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_classes = async (req, res) => {
    if(req.loggedUser.role=="admin"){
        let admin_exist = await adminModel.read_id(req.loggedUser._id);
        if(!admin_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('project_classes: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('project_class list: unauthorized access');
        return;
    }
    let session_id = req.query.session_id;
    let year = req.query.year;
    let cls = await projectClassesSchema.list(session_id, year);
    if(!cls){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log("project class: missing parameters. Specified year but not learning session to use");
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
            learning_session: cl.learning_session_id,
            italian_title: cl.italian_title,
            english_title: cl.english_title,
            group: cl.group,
            teacher_ref: teacher_ref,
            teacher_name: cl.teacher_name,
            teacher_surname: cl.teacher_surname,
            admin_ref: admin_ref,
            admin_name: cl.admin_name,
            admin_surname: cl.admin_surname,
            to_be_modified: cl.to_be_modified,
            final_confirmation: cl.final_confirmation,
        }
    });
    let path = "/api/v1/project_classes/"
    let response = {
        path: path,
        single: true,
        query: {session_id: session_id, year: year},
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
            console.log('project_class: unauthorized access');
            return;
        }
    } else if (req.loggedUser.role == "teacher") {
        let teacher_exist = await teacherModel.read_id(req.loggedUser._id);
        if(!teacher_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('project_class: unauthorized access');
            return;
        }
    } else if (req.loggedUser.role == "student") {
        let student_exist = await studentModel.read_id(req.loggedUser._id);
        if(!student_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('project_class: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('project_class: unauthorized access');
        return;
    }
    let course_id = req.params.course
    let session_id = req.params.session;
    let cl = await projectClassesSchema.read(course_id, session_id);
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
        learning_session: cl.learning_session_id,
        italian_title: cl.italian_title,
        english_title: cl.english_title,
        group: cl.group,
        teacher_ref: teacher_ref,
        teacher_name: cl.teacher_name,
        teacher_surname: cl.teacher_surname,
        admin_ref: admin_ref,
        admin_name: cl.admin_name,
        admin_surname: cl.admin_surname,
        to_be_modified: cl.to_be_modified,
        final_confirmation: cl.final_confirmation,
    }
    let path = "/api/v1/project_classes/"+course_id+"/"+session_id
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
    let associated_class = undefined;
    let course_id = req.params.course;
    let session_id = req.params.session;
    let section = req.query.section != undefined ? req.query.section.toUpperCase() : req.query.section;
    query["section"] = section;
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
        let teaches_proj = await teacherModel.isTeacherTeachingProject(teacher_id, course_id, session_id, section)
        if(!teaches_proj){
            let assoc_class = await classesTeacherModel.read_project_classes_associated(teacher_id, session_id, course_id)
            if(assoc_class.length == 0){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('update_grades: unauthorized access');
                return;
            }
            associated_class = true
        } else {
            associated_class = false
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
    let cmps;
    if(req.loggedUser.role=="admin"){
        cmps = await projectClassesSchema.classComponents(course_id, session_id, section);
    } else {
        cmps = await projectClassesSchema.classComponents(course_id, session_id, section, teacher_id, associated_class);
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
    let path = "/api/v1/project_classes/"+course_id+"/"+session_id+"/components"
    let response = {
        path: path,
        single: false,
        query: query,
        date: new Date(),
        data: {
            associated_teacher: associated_class,
            components: data_cmps
        }
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
    let session_id = req.params.session;
    let sections = await projectClassesSchema.read_section_from_course_and_session(course_id, session_id);
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
    let path = "/api/v1/project_classes/"+course_id+"/"+session_id+"/sections";
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
    let publisher_id = req.query.publisher_id;
    let query = publisher_id ? {publisher_id: publisher_id} : {};
    let is_admin = req.query.is_admin;
    query["is_admin"] = is_admin
    if(req.loggedUser.role === "teacher"){
        if(publisher_id==undefined){
            publisher_id = req.loggedUser._id;
            is_admin = 0
        }
        let teacher_exists = await teacherModel.read_id(publisher_id)
        if(!teacher_exists){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_courses_v2: unauthorized access');
            return;
        }
        if(publisher_id != req.loggedUser._id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('project_class sections: unauthorized access');
            return;
        }
    }
    if(req.loggedUser.role === "admin"){
        if(publisher_id==undefined){
            publisher_id = req.loggedUser._id;
            is_admin = 1
        }
        let admin_exist = await adminModel.read_id(publisher_id)
        if(!admin_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_courses_v2: unauthorized access');
            return;
        }
        if(publisher_id != req.loggedUser._id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('project_class sections: unauthorized access');
            return;
        }
    }
    let course_id = req.params.course;
    let session_id = req.params.session;
    let section = req.query.section;
    let is_student = false
    if(req.loggedUser.role === "student"){
        let student_id = req.loggedUser._id
        let student_exist = await studentModel.read_id(student_id)
        if(!student_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_courses_v2: unauthorized access');
            return;
        }
        let student_section = await studentModel.retrieve_section_from_project_class(student_id, course_id, session_id)
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
        is_student = true
    }
    query["section"] = section;
    let announcements = await courseAnnouncementSchema.list(course_id, session_id, section, publisher_id, is_admin, is_student);
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
    let path = "/api/v1/project_classes/"+course_id+"/"+session_id+"/announcements";
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
    let session_id = req.params.session;
    let cls = await projectClassTeacherSchema.read_from_project_class(course_id, session_id);
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
            teacher_ref: teacher_ref,
            teacher_name: cl.name,
            teacher_surname: cl.surname,
            section: cl.section,
            main_teacher: cl.main
        };
    });
    let path = "/api/v1/project_classes/"+course_id+"/"+session_id+"/teachers"
    let response = {
        path: path,
        single: false,
        query: {},
        date: new Date(),
        data: data_cls
    }
    res.status(200).json(response);
}

module.exports.delete_project_class = async (req, res) => {
    if(req.loggedUser.role==="admin"){
        let admin_id = req.loggedUser._id
        let user_exist = await adminModel.read_id(admin_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('project_class deletion: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('project_class deletion: unauthorized access');
        return;
    }
    let course_id = req.params.course;
    let course_exist = await courseSchema.read(course_id, true);
    if(!course_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('project_class deletion: course does not exists');
        return;
    }
    let session_id = req.params.session;
    let session_exist = await learning_sessionsModel.read(session_id)
    if(!session_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('project_class deletion: session does not exists');
        return;
    }
    let starting_date = new Date(session_exist.start)
    let today = new Date()
    if (starting_date <= today){
        res.status(400).json({status: "error", description: MSG.pastSession});
        console.log('project class deletion: tried to delete a project class helded in a session already started');
        return;
    }
    let project_class_exist = await projectClassesSchema.read(course_id, session_id);
    if(!project_class_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('project_class deletion: project class does not exists');
        return;
    }
    let num_section = project_class_exist.num_section;
    let existing_grades = await projectClassesSchema.grades_present(course_id, session_id)
    if(existing_grades){
        res.status(400).json({status: "error", description: MSG.has_grades});
        console.log('project class deletion: project classes already has grades');
        return;
    }
    let components;
    for(let i=0;i<num_section;i++){
        components = await projectClassesSchema.classComponents(course_id, session_id, String.fromCharCode(65+i))
        if(components){
            for(let j in components){
                await subscribeSchema.remove(components[j].id, course_id, session_id, components[j].learning_context_id)
            }
        }
    }
    await classesTeacherModel.delete(course_id, session_id)
    await projectClassesSchema.delete(course_id, session_id)
    res.status(200).json({status: "deleted", description: "Project class deleted successfully"});
}

module.exports.final_confirmation = async (req, res) => {
    let user_id = req.loggedUser._id
    if(req.loggedUser.role == "admin"){
        let admin_exist = await adminModel.read_id(user_id)
        if(!admin_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('project course final confirmation: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('project course final confirmation: unauthorized access');
        return;
    }
    let course_id = req.params.course;
    let course_exist = await courseSchema.read(course_id, true);
    if(!course_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('project course final confirmation: course does not exists');
        return;
    }
    let session_id = req.params.session;
    let session_exist = await learning_sessionsModel.read(session_id)
    if(!session_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('project course final confirmation: session does not exists');
        return;
    }
    let project_class_exist = await projectClassesSchema.read(course_id, session_id);
    if(!project_class_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('project course final confirmation: project class does not exists');
        return;
    }
    if(project_class_exist.to_be_modified == "true"){
        res.status(400).json({status: "error", description: MSG.classToBeModified});
        console.log('project course final confirmation: project class needs to be modified');
        return;
    }
    if(project_class_exist.final_confirmation != null){
        res.status(400).json({status: "error", description: MSG.alreadyConfirmed});
        console.log('project course final confirmation: project class already confirmed');
        return;
    }
    let starting_date = new Date(session_exist.start)
    let today = new Date()
    let _10days = today.setDate(today.getDate() + 10)
    if (!(starting_date < today && starting_date <= _10days)){
        res.status(400).json({status: "error", description: MSG.pastSession});
        console.log('project class final confimation: the session is not an imminent session. Abort confirmation');
        return;
    }
    let min_students = course_exist.min_students
    let max_students = course_exist.max_students
    let num_section = project_class_exist.num_section;
    // Check that the components are at least min_students and at most max_students for all the classes
    for(let i=0;i<num_section;i++){
        let components = await projectClassesSchema.classComponents(course_id, session_id, String.fromCharCode(65+i))
        if(components.length<min_students){
            res.status(400).json({status: "error", description: MSG.minStudents});
            console.log('project course final confirmation: project class does not have min students required');
            return;
        }
        if(components.length>max_students){
            res.status(400).json({status: "error", description: MSG.maxStudents});
            console.log('project course final confirmation: project class has too much students w.r.t. the ones required');
            return;
        }
    }
    // If all goes right: update with final confirmation and add new announcement for start of course.
    let final_confirmation = await projectClassesSchema.final_confirmation(course_id, session_id, true)
    if(!final_confirmation){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log('project course final confirmation: missing parameters');
        return;
    }
    // Retrieve the class again to get the final confirmation date
    project_class_exist = await projectClassesSchema.read(course_id, session_id);
    let confimation_date = project_class_exist.final_confirmation;
    let italian_title = req.body.italian_title
    let english_title = req.body.english_title
    let italian_message = req.body.italian_message
    let english_message = req.body.english_message
    italian_title = italian_title == undefined ? "Inizio del corso" : italian_title;
    english_title = english_title == undefined ? "Start of the course" : english_title;
    italian_message = italian_message == undefined ? "Il corso inizierà oggi "+starting_date+". Recati nell'aula predisposta." : italian_message
    english_message = english_message == undefined ? "The course will start today "+starting_date+". Please, go to the arranged class." : english_message
    for(let i=0;i<num_section;i++){
        let first_announcement = await courseAnnouncementSchema.add(user_id, true, course_id, session_id, String.fromCharCode(65+i), italian_title, english_title, italian_message, english_message, starting_date)
        if(!first_announcement){
            await projectClassesSchema.final_confirmation(course_id, session_id)
            res.status(400).json({status: "error", description: MSG.missingParameter});
            console.log('project course final confirmation: final message parameters');
            return;
        }
    }
    res.status(201).json({status: "updated", description: "Project class confirmed definetly. Added first message of the course", confimation_date: confimation_date})
}