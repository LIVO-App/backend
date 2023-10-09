'use strict';

const announcementSchema = require('../models/generalAnnouncementsModel');
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
        console.log("General announcement: resource not found");
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
        path: '/api/v1/general_announcements/'+announcement.id,
        single: true,
        query: {},
        date: new Date(),
        data: data_announcement
    }
    res.status(200).json(response);
}

module.exports.get_general_announcements = async (req, res) => {
    let announcements = await announcementSchema.list();
    let data_announcement = announcements.map((announcement) => {
        return {
            id: announcement.id,
            italian_title: announcement.italian_title,
            english_title: announcement.english_title,
            publishment: announcement.publishment
        }
    })
    let response = {
        path: '/api/v1/general_announcements/',
        single: true,
        query: {},
        date: new Date(),
        data: data_announcement
    }
    res.status(200).json(response);
}

module.exports.publish_announcement = async (req, res) => {
    let admin_id = req.query.admin_id;
    is_admin = is_admin === "true" ? true : false;
    if(req.loggedUser.role == "admin") {
        if(admin_id == undefined){
            admin_id = req.loggedUser._id;
        }
        let admin_exists = await adminSchema.read_id(publisher_id)
        if(admin_id!=req.loggedUser._id || !admin_exists){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('general announcements publishment: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('general announcements publishment: unauthorized access');
        return;
    }
    let italian_title = req.body.italian_title;
    let english_title = req.body.english_title;
    let italian_message = req.body.italian_message;
    let english_message = req.body.english_message;
    let publish_date = req.body.publish_date;
    let publish = await announcementSchema.add(admin_id, italian_title, english_title, italian_message, english_message, publish_date);
    if(publish==null){
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('general announcements publishment: missing parameters');
        return;
    }
    if(!publish){
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information: general announcement publishing');
        return;
    }
    let res_des = "Inserted " + publish.affectedRows + " rows";
    let response = {
        status: "accepted", 
        description: res_des,
    };
    res.status(201).json(response);
}