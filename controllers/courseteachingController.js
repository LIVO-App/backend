'use strict';

const courseteachingSchema = require('../models/courseteachingModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_teachings = async (req, res) => {
    let course_id = req.params.course_id;
    let tcs = await courseteachingSchema.read_from_course(course_id);
    if(!tcs){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('teachings: resource not found');
        return;
    }
    let data_tcs = tcs.map((tc) => {
        let teaching_ref = {
            path: "/api/v1/teachings", 
            single: true, 
            query: {},
            data: {
                id: tc.teaching_id
            }
        }
        return {
            teaching_ref: teaching_ref,
            italian_title: tc.italian_title,
            english_title: tc.english_title
        };
    });
    let response = {
        path: "/api/v1/courses/:course_id/teachings",
        single: false,
        query: {},
        date: new Date(),
        data: data_tcs
    }
    res.status(200).json(response);
}