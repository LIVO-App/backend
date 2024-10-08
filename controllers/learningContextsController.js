'use strict';

const sanitizer = require('../utils/sanitizer')
const learningContextModel = require('../models/learningContextsModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_contexts = async (req, res) => {
    let student_id = req.query.student_id;
    let session_id = req.query.session_id;
    let contexts = await learningContextModel.list(student_id, session_id);
    let data_contexts = contexts.map((context) => {
        let italian_title = sanitizer.encode_output(context.italian_title)
        let english_title = sanitizer.encode_output(context.english_title)
        let italian_description = sanitizer.encode_output(context.italian_description)
        let english_description = sanitizer.encode_output(context.english_description)
        return {
            id: context.id,
            italian_title: italian_title,
            english_title: english_title,
            italian_description: italian_description,
            english_description: english_description,
            credits: context.credits
        };
    });
    let response = {
        path: "/api/v1/learning_contexts/",
        single: true,
        query: {},
        date: new Date(),
        data: data_contexts
    }
    res.status(200).json(response);
}

module.exports.get_contexts_from_courses = async (req, res) => {
    let student_id = req.query.student_id;
    let session_id = req.query.session_id;
    let courses = req.body.courses;
    let contexts = await learningContextModel.list_from_list_of_courses(student_id, session_id, courses);
    if(contexts==null){
        res.status(400).json({status: "error", description: MSG.missingParameters});
        console.log('list of session: missing list of courses ('+new Date()+')');
        return;
    }
    let data_contexts = contexts.map( (context) => {
        return {
            course_id: context.course,
            context_id: context.context
        };
    });
    let response = {
        path: "/api/v1/learning_contexts/",
        single: true,
        query: {
            student_id: student_id,
            session_id: session_id
        },
        date: new Date(),
        data: data_contexts
    };
    res.status(200).json(response);
}