'use strict';

const sanitizer = require('../utils/sanitizer')
const growth_areaSchema = require('../models/growthAreaModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_areas = async (req, res) => {
    let areas = await growth_areaSchema.list();
    let data_areas = areas.map((area) => {
        let italian_title = sanitizer.encode_output(area.italian_title)
        let english_title = sanitizer.encode_output(area.english_title)
        let italian_description = sanitizer.encode_output(area.italian_description)
        let english_description = sanitizer.encode_output(area.english_description)
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