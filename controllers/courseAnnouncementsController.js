'use strict';

const announcementSchema = require('../models/courseAnnouncementModel');

let MSG = {
    notFound: "Resource not found",
    missing_params: "Bad input. Missing required information"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_announcement = async (req, res) => {
    let announcement_id = req.params.announcement_id;
    let announcement = await announcementSchema.read(announcement_id);
    if(!announcement){
        res.status(404).json(MSG.notFound);
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
        query: query,
        date: new Date(),
        data: data_announcement
    }
    res.status(200).json(response);
}