'use strict';

const htmlentitiesenc = require("html-entities")
const announcementSchema = require('../models/generalAnnouncementsModel');
const teacherSchema = require('../models/teacherModel');
const adminSchema = require('../models/adminModel');
const studentSchema = require('../models/studentModel');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GOOGLE_ANNOUNCEMENT_EMAIL,
      pass: process.env.GOOGLE_APP_PSW
    }
  });

let MSG = {
    notFound: "Resource not found",
    teacherNotTeach: "The teacher does not teach in the project class specified",
    notAuthorized: "Not authorized request",
    missing_params: "Bad input. Missing required information"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_announcement = async (req, res) => {
    let user_id = req.loggedUser._id
    if(req.loggedUser.role == "admin") {
        let admin_exists = await adminSchema.read_id(user_id)
        if(!admin_exists){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('general announcements publishment: unauthorized access ('+new Date()+')');
            return;
        }
    } else if (req.loggedUser.role == "student") {
        let student_exist = await studentSchema.read_id(user_id)
        if(!student_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('general announcements publishment: unauthorized access ('+new Date()+')');
            return;
        }
    } else if (req.loggedUser.role == "teacher") {
        let teacher_exist = await teacherSchema.read_id(user_id)
        if(!teacher_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('general announcements publishment: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('general announcements publishment: unauthorized access ('+new Date()+')');
        return;
    }
    let announcement_id = req.params.announcement_id;
    let announcement = await announcementSchema.read(announcement_id);
    if(!announcement){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('General announcement: resource not found ('+new Date()+')');
        return;
    }
    let italian_title = htmlentitiesenc.encode(announcement.italian_title, {mode: 'nonAsciiPrintable'})
    let english_title = htmlentitiesenc.encode(announcement.english_title, {mode: 'nonAsciiPrintable'})
    let italian_message = htmlentitiesenc.encode(announcement.italian_message, {mode: 'nonAsciiPrintable'})
    let english_message = htmlentitiesenc.encode(announcement.english_message, {mode: 'nonAsciiPrintable'})
    let data_announcement = {
        id: announcement.id,
        italian_title: italian_title,
        english_title: english_title,
        publishment: announcement.publishment,
        italian_message: italian_message,
        english_message: english_message
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
    let user_id = req.loggedUser._id
    if(req.loggedUser.role == "admin") {
        let admin_exists = await adminSchema.read_id(user_id)
        if(!admin_exists){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('general announcements publishment: unauthorized access ('+new Date()+')');
            return;
        }
    } else if (req.loggedUser.role == "student") {
        let student_exist = await studentSchema.read_id(user_id)
        if(!student_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('general announcements publishment: unauthorized access ('+new Date()+')');
            return;
        }
    } else if (req.loggedUser.role == "teacher") {
        let teacher_exist = await teacherSchema.read_id(user_id)
        if(!teacher_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('general announcements publishment: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('general announcements publishment: unauthorized access ('+new Date()+')');
        return;
    }
    let announcements = await announcementSchema.list();
    let data_announcement = announcements.map((announcement) => {
        let italian_title = htmlentitiesenc.encode(announcement.italian_title, {mode: 'nonAsciiPrintable'})
        let english_title = htmlentitiesenc.encode(announcement.english_title, {mode: 'nonAsciiPrintable'})
        return {
            id: announcement.id,
            italian_title: italian_title,
            english_title: english_title,
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
    if(req.loggedUser.role == "admin") {
        if(admin_id == undefined){
            admin_id = req.loggedUser._id;
        }
        let admin_exists = await adminSchema.read_id(admin_id)
        if(admin_id!=req.loggedUser._id || !admin_exists){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('general announcements publishment: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('general announcements publishment: unauthorized access ('+new Date()+')');
        return;
    }
    let italian_title = htmlentitiesenc.encode(req.body.italian_title);
    let english_title = htmlentitiesenc.encode(req.body.english_title);
    let italian_message = htmlentitiesenc.encode(req.body.italian_message);
    let english_message = htmlentitiesenc.encode(req.body.english_message);
    let publish_date = req.body.publish_date;
    let publish = await announcementSchema.add(admin_id, italian_title, english_title, italian_message, english_message, publish_date);
    if(!publish){
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information: general announcement publishing ('+new Date()+')');
        return;
    }
    let res_des = "Inserted " + publish.affectedRows + " rows";
    let response = {
        status: "accepted", 
        description: res_des,
    };
    let mailOptions = {
        from: process.env.GOOGLE_ANNOUNCEMENT_EMAIL,
        to: 'pietro.fronza@studenti.unitn.it',
        subject: italian_title,
        text: italian_message
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.status(201).json(response);
}