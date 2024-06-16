'use strict';

const htmlentitiesenc = require("html-entities")
const growth_areaSchema = require('../models/growthAreaModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_areas = async (req, res) => {
    let areas = await growth_areaSchema.list();
    let data_areas = areas.map((area) => {
        let italian_title = htmlentitiesenc.encode(area.italian_title, {mode: 'nonAsciiPrintable'})
        let english_title = htmlentitiesenc.encode(area.english_title, {mode: 'nonAsciiPrintable'})
        let italian_description = htmlentitiesenc.encode(area.italian_description, {mode: 'nonAsciiPrintable'})
        let english_description = htmlentitiesenc.encode(area.english_description, {mode: 'nonAsciiPrintable'})
        return {
            id: area.id,
            italian_title: italian_title,
            english_title: english_title,
            italian_description: italian_description,
            english_description: english_description
        };
    });
    let response = {
        path: "/api/v1/growth_areas/",
        single: true,
        query: {},
        date: new Date(),
        data: data_areas
    }
    res.status(200).json(response);
}