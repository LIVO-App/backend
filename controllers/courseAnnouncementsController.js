'use strict';

const announcementSchema = require('../models/courseAnnouncementModel');
const teacherSchema = require('../models/teacherModel');
const adminSchema = require('../models/adminModel')

let MSG = {
    notFound: "Resource not found",
    teacherNotTeach: "The teacher does not teach in the project class specified",
    notAuthorized: "Not authorized request",
    missing_params: "Bad input. Missing required information"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_announcement = async (req, res) => {
    let announcement_id = req.params.announcement_id;
    let announcement = await announcementSchema.read(announcement_id);
    if(!announcement){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log("Announcement: resource not found");
        return;
    }
    let data_announcement = {
        id: announcement.id,
        italian_title: announcement.italian_title,
        english_title: announcement.english_title,
        publishment: announcement.publishment,
        italian_message: announcement.italian_message,
        english_message: announcement.english_message
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
    let teacher_id = req.query.teacher_id;
    let admin_id = req.query.admin_id;
    if(req.loggedUser.role == "teacher"){
        if(teacher_id == undefined){
            teacher_id = req.loggedUser._id;
        }
        let teacher_exist = await teacherSchema.read_id(teacher_id)
        if(teacher_id!=req.loggedUser._id || !teacher_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('project_class sections: unauthorized access');
            return;
        }
    } else if(req.loggedUser.role == "admin") {
        if(admin_id == undefined){
            admin_id = req.loggedUser._id;
        }
        let admin_exists = await adminSchema.read_id(admin_id)
        if(admin_id!=req.loggedUser._id || !admin_exists){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('project_class sections: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('project_class sections: unauthorized access');
        return;
    }
    let course_id = req.query.course_id;
    let block_id = req.query.block_id;
    let sections = req.body.sections;
    if(admin_id==undefined && teacher_id != undefined){
        for(let i=0;i<sections.length;i++){
            let teacherTeach = await teacherSchema.isTeacherTeachingProject(teacher_id, course_id, block_id, sections[i]);
            if(teacherTeach==null){
                res.status(400).json({status: "error", description: MSG.missing_params})
                console.log('missing required information: teacher teach in project class');
                return;
            }
            if(!teacherTeach){
                res.status(400).json({status: "error", description: MSG.teacherNotTeach})
                console.log('teacher doesn\'t teach in that class');
                return;
            }
        }
    }
    let italian_title = req.body.italian_title;
    let english_title = req.body.english_title;
    let italian_message = req.body.italian_message;
    let english_message = req.body.english_message;
    let publish = await announcementSchema.add(teacher_id, admin_id, course_id, block_id, sections, italian_title, english_title, italian_message, english_message);
    if(publish==null){
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('no sections: announcement publishing');
        return;
    }
    if(!publish){
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information: announcement publishing');
        return;
    }
    let res_des = "Inserted " + publish.affectedRows + " rows";
    let response = {
        status: "accepted", 
        description: res_des,
    };
    res.status(201).json(response);
}