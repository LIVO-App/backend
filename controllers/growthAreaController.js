'use strict';

const growth_areaSchema = require('../models/growthAreaModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_areas = async (req, res) => {
    let areas = await growth_areaSchema.list();
    let data_areas = areas.map((area) => {
        return {
            id: area.id,
            italian_title: area.italian_title,
            english_title: area.english_title,
            italian_description: area.italian_description,
            english_description: area.english_description
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