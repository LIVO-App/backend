'use strict';

const growthAreaModel = require('../models/courseGrowthAreaModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_growth_areas = async (req, res) => {
    let course_id = req.params.course_id;
    let cls = await growthAreaModel.read_from_course(course_id);
    if(!cls){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('course growth areas: resource not found');
        return;
    }
    let data_cls = cls.map((cl) => {
        let growth_area_ref = {
            path: "/api/v1/growth_areas", 
            single: true, 
            query: {},
            data: {
                id: cl.growth_area_id
            }
        }
        return {
            growth_area_ref: growth_area_ref,
            italian_title: cl.italian_title,
            english_title: cl.english_title,
            italian_description: cl.italian_description,
            english_description: cl.english_description
        };
    });
    let path = "/api/v1/courses/"+course_id+"/growth_areas"
    let response = {
        path: path,
        single: false,
        query: {},
        date: new Date(),
        data: data_cls
    }
    res.status(200).json(response);
}