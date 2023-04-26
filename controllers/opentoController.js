'use strict';

const opentoSchema = require('../models/opentoModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_institute_classes = async (req, res) => {
    let course_id = req.params.id;
    let cls = await opentoSchema.read_from_course(course_id);
    if(!cls){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found');
        return;
    }
    let data_cls = cls.map((cl) => {
        let study_year_ref = {
            path: "/api/v1/study_year", 
            single: true, 
            query: {},
            data:{
                id: cl.study_year_id
            }
        }
        let study_address_ref = {
            path: "/api/v1/study_addresses", 
            single: true, 
            query: {},
            data: {
                id: cl.study_address_id
            }
        }
        return {
            study_year_ref: study_year_ref,
            study_address_ref: study_address_ref,
            italian_title: cl.italian_title,
            english_title: cl.english_title,
            presidium: cl.presidium,
            main_study_year: cl.main_study_year
        };
    });
    let response = {
        path: "/api/v1/courses/:id/opento",
        single: false,
        query: {},
        date: new Date(),
        data: data_cls
    }
    res.status(200).json(response);
}