'use strict';

const coursecontexController = require('../models/coursecontextModel');

module.exports.get_contexts = async (req, res) => {
    let course_id = req.params.id;
    let cxs = await coursecontexController.read_from_course(course_id);
    let data_cxs = cxs.map((cx) => {
        return {
            learning_context_ref: {origin: "/api/v1/learning_contexts", data: [cx.learning_context_id]},
            italian_title: cx.italian_title,
            english_title: cx.english_title
        };
    });
    let response = {
        origin: "/api/v1/courses/:id/learning_contexts",
        data: data_cxs
    }
    res.status(200).json(response);
}