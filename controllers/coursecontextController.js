'use strict';

const coursecontexController = require('../models/coursecontextModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_contexts = async (req, res) => {
    let course_id = req.params.course_id;
    let cxs = await coursecontexController.read_from_course(course_id);
    if(!cxs){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('contexts: resource not found');
        return;
    }
    let data_cxs = cxs.map((cx) => {
        let learning_context_ref = {
            path: "/api/v1/learning_contexts", 
            single: true, 
            query: {},
            data: {
                id: cx.learning_context_id
            }
        }
        return {
            learning_context_ref: learning_context_ref,
            italian_title: cx.italian_title,
            english_title: cx.english_title
        };
    });
    let path = "/api/v1/courses/"+course_id+"/learning_contexts";
    let response = {
        path: path,
        single: false,
        query: {},
        date: new Date(),
        data: data_cxs
    }
    res.status(200).json(response);
}