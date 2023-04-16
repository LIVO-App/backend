'use strict';

const courseteachingSchema = require('../models/courseteachingModel');

module.exports.get_teachings = async (req, res) => {
    let course_id = req.params.id;
    let tcs = await courseteachingSchema.read_from_course(course_id);
    let data_tcs = tcs.map((tc) => {
        return {
            teaching_ref: {origin: "/api/v1/teachings", single: true, data: [tc.teaching_id]},
            italian_title: tc.italian_title,
            english_title: tc.english_title
        };
    });
    let response = {
        origin: "/api/v1/courses/:id/teachings",
        single: false,
        data: data_tcs
    }
    res.status(200).json(response);
}