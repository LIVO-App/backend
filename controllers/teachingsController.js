'use strict';

const htmlentitiesenc = require("html-entities")
const teachingsSchema = require('../models/teachingModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_teachings = async (req, res) => {
    let teachings = await teachingsSchema.list();
    let data_teachings = teachings.map((teaching) => {
        let italian_title = htmlentitiesenc.encode(teaching.italian_title, {mode: 'nonAsciiPrintable'})
        let english_title = htmlentitiesenc.encode(teaching.english_title, {mode: 'nonAsciiPrintable'})
        let italian_description = htmlentitiesenc.encode(teaching.italian_description, {mode: 'nonAsciiPrintable'})
        let english_description = htmlentitiesenc.encode(teaching.english_description, {mode: 'nonAsciiPrintable'})
        return {
            id: teaching.id,
            italian_title: italian_title,
            english_title: english_title,
            italian_description: italian_description,
            english_description: english_description
        };
    });
    let response = {
        path: "/api/v1/teachings/",
        single: true,
        query: {},
        date: new Date(),
        data: data_teachings
    }
    res.status(200).json(response);
}

module.exports.get_teaching = async (req, res) => {
    let teaching_id = req.params.teaching_id;
    let teaching = await teachingsSchema.read(teaching_id);
    if(!teaching){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('single teaching: resource not found ('+new Date()+')');
        return;
    }
    let italian_title = htmlentitiesenc.encode(teaching.italian_title, {mode: 'nonAsciiPrintable'})
    let english_title = htmlentitiesenc.encode(teaching.english_title, {mode: 'nonAsciiPrintable'})
    let italian_description = htmlentitiesenc.encode(teaching.italian_description, {mode: 'nonAsciiPrintable'})
    let english_description = htmlentitiesenc.encode(teaching.english_description, {mode: 'nonAsciiPrintable'})
    let data_teachings = {
        id: teaching.id,
        italian_title: italian_title,
        english_title: english_title,
        italian_description: italian_description,
        english_description: english_description
    };
    let response = {
        path: "/api/v1/teachings/"+teaching_id,
        single: true,
        query: {},
        date: new Date(),
        data: data_teachings
    }
    res.status(200).json(response);
}