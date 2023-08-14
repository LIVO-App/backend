'use strict';

const ordinary_classSchema = require('../models/ordinaryclassModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_addresses = async (req, res) => {
    let cls = await ordinary_classSchema.get_study_address();
    let data_cls = cls.map((cl) => {
        return {
            id: cl.id,
            italian_title: cl.italian_title,
            english_title: cl.english_title,
            italian_description: cl.italian_description,
            english_description: cl.english_description,
            max_classes: cl.max_classes
        };
    });
    let path = "/api/v1/study_addresses"
    let response = {
        path: path,
        single: false,
        query: {},
        date: new Date(),
        data: data_cls
    }
    res.status(200).json(response);
}