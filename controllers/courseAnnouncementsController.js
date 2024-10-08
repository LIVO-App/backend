'use strict';

const sanitizer = require('../utils/sanitizer');
const announcementSchema = require('../models/courseAnnouncementModel');
const teacherSchema = require('../models/teacherModel');
const adminSchema = require('../models/adminModel');
const studentSchema = require('../models/studentModel');

let MSG = {
    notFound: "Resource not found",
    teacherNotTeach: "The teacher does not teach in the project class specified",
    notAuthorized: "Not authorized request",
    missing_params: "Bad input. Missing required information"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_announcement = async (req, res) => {
    let is_student = false;
    let user_id = req.loggedUser._id
    if(req.loggedUser.role == "admin") {
        let admin_exists = await adminSchema.read_id(user_id)
        if(!admin_exists){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('Announcement: unauthorized access ('+new Date()+')');
            return;
        }
    } else if (req.loggedUser.role == "student") {
        let student_exist = await studentSchema.read_id(user_id)
        if(!student_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('Announcement: unauthorized access ('+new Date()+')');
            return;
        }
        is_student = true
    } else if (req.loggedUser.role == "teacher") {
        let teacher_exist = await teacherSchema.read_id(user_id)
        if(!teacher_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('Announcement: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('Announcement: unauthorized access ('+new Date()+')');
        return;
    }
    let announcement_id = req.params.announcement_id;
    let announcement = await announcementSchema.read(announcement_id, is_student);
    if(!announcement){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('Announcement: resource not found ('+new Date()+')');
        return;
    }
    let italian_title = sanitizer.encode_output(announcement.italian_title)
    let english_title = sanitizer.encode_output(announcement.english_title)
    let italian_message = sanitizer.encode_special_output(announcement.italian_message)
    let english_message = sanitizer.encode_special_output(announcement.english_message)
    let data_announcement = {
        id: announcement.id,
        italian_title: italian_title,
        english_title: english_title,
        publishment: announcement.publishment,
        italian_message: italian_message,
        english_message: english_message
    }
    let response = {
        path: '/api/v1/announcements/',
        single: true,
        query: {},
        date: new Date(),
        data: data_announcement
    }
    res.status(200).json(response);
}

module.exports.publish_announcement = async (req, res) => {
    let publisher_id = req.query.publisher_id;
    let is_admin = req.query.is_admin;
    is_admin = is_admin === "true" ? true : false;
    if(req.loggedUser.role == "teacher"){
        if(publisher_id == undefined){
            publisher_id = req.loggedUser._id;
            is_admin = false
        }
        let teacher_exist = await teacherSchema.read_id(publisher_id)
        if(publisher_id!=req.loggedUser._id || !teacher_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('project_class sections: unauthorized access ('+new Date()+')');
            return;
        }
    } else if(req.loggedUser.role == "admin") {
        if(publisher_id == undefined){
            publisher_id = req.loggedUser._id;
            is_admin = true;
        }
        let admin_exists = await adminSchema.read_id(publisher_id)
        if(publisher_id!=req.loggedUser._id || !admin_exists){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('project_class sections: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('project_class sections: unauthorized access ('+new Date()+')');
        return;
    }
    let course_id = req.query.course_id;
    let session_id = req.query.session_id;
    let sections = req.body.sections;
    if(publisher_id!=undefined && !is_admin){
        for(let i=0;i<sections.length;i++){
            let teacherTeach = await teacherSchema.isTeacherTeachingProject(publisher_id, course_id, session_id, sections[i].toUpperCase());
            if(teacherTeach==null){
                res.status(400).json({status: "error", description: MSG.missing_params})
                console.log('missing required information: teacher teach in project class ('+new Date()+')');
                return;
            }
            if(!teacherTeach){
                res.status(400).json({status: "error", description: MSG.teacherNotTeach})
                console.log('teacher doesn\'t teach in that class ('+new Date()+')');
                return;
            }
        }
    }
    let italian_title = sanitizer.encode_input(req.body.italian_title);
    let english_title = sanitizer.encode_input(req.body.english_title);
    let italian_message = sanitizer.encode_special_output(req.body.italian_message);
    let english_message = sanitizer.encode_special_output(req.body.english_message);
    let publish_date = req.body.publish_date;
    let publish = await announcementSchema.add(publisher_id, is_admin, course_id, session_id, sections, italian_title, english_title, italian_message, english_message, publish_date);
    if(publish==null){
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('no sections: announcement publishing ('+new Date()+')');
        return;
    }
    if(!publish){
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information: announcement publishing ('+new Date()+')');
        return;
    }
    let res_des = "Inserted " + publish.affectedRows + " rows";
    let response = {
        status: "accepted", 
        description: res_des,
    };
    res.status(201).json(response);
}