'use strict';

const learningContextModel = require('../models/learningContextsModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_contexts = async (req, res) => {
    let contexts = await learningContextModel.list();
    let data_contexts = contexts.map((context) => {
        return {
            id: context.id,
            acronym: context.acronym,
            italian_title: context.italian_title,
            english_title: context.english_title,
            italian_description: context.italian_description,
            english_description: context.english_description
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

