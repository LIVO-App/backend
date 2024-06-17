'use strict';

const sanitizer = require('../utils/sanitizer')
const ordinary_classSchema = require('../models/ordinaryclassModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_addresses = async (req, res) => {
    let cls = await ordinary_classSchema.get_study_address();
    let data_cls = cls.map((cl) => {
        let italian_title = sanitizer.encode_output(cl.italian_title)
        let english_title = sanitizer.encode_output(cl.english_title)
        let italian_description = sanitizer.encode_output(cl.italian_description)
        let english_description = sanitizer.encode_output(cl.english_description)
        return {
            id: cl.id,
            italian_title: italian_title,
            english_title: english_title,
            italian_description: italian_description,
            english_description: english_description,
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