'use strict';

const learningContextModel = require('../models/learningContextsModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_contexts = async (req, res) => {
    let student_id = req.query.student_id;
    let block_id = req.query.block_id;
    let contexts = await learningContextModel.list(student_id, block_id);
    let data_contexts = contexts.map((context) => {
        return {
            id: context.id,
            italian_title: context.italian_title,
            english_title: context.english_title,
            italian_description: context.italian_description,
            english_description: context.english_description,
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
    let block_id = req.query.block_id;
    let courses = req.body.courses;
    let contexts = await learningContextModel.list_from_list_of_courses(student_id, block_id, courses);
    if(contexts==null){
        res.status(400).json({status: "error", description: MSG.missingParameters});
        console.log('list of block: missing list of courses');
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
            block_id: block_id
        },
        date: new Date(),
        data: data_contexts
    };
    res.status(200).json(response);
}