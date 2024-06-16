'use strict';

const htmlentitiesenc = require("html-entities")
const ordinary_classSchema = require('../models/ordinaryclassModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_addresses = async (req, res) => {
    let cls = await ordinary_classSchema.get_study_address();
    let data_cls = cls.map((cl) => {
        let italian_title = htmlentitiesenc.encode(cl.italian_title, {mode: 'nonAsciiPrintable'})
        let english_title = htmlentitiesenc.encode(cl.english_title, {mode: 'nonAsciiPrintable'})
        let italian_description = htmlentitiesenc.encode(cl.italian_description, {mode: 'nonAsciiPrintable'})
        let english_description = htmlentitiesenc.encode(cl.english_description, {mode: 'nonAsciiPrintable'})
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