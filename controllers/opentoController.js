'use strict';

const opentoSchema = require('../models/opentoModel');

module.exports.get_institute_classes = async (req, res) => {
    let course_id = req.params.id;
    let cls = await opentoSchema.read_from_course(course_id);
    let data_cls = cls.map((cl) => {
        return {
            study_year_ref: {origin: "/api/v1/study_year", single: true, data:[cl.study_year_id]},
            study_address_ref: {origin: "/api/v1/study_addresses", single: true, data: [cl.study_address_id]},
            italian_title: cl.italian_title,
            english_title: cl.english_title,
            presidium: cl.presidium,
            main_study_year: cl.main_study_year
        };
    });
    let response = {
        origin: "/api/v1/courses/:id/opento",
        single: false,
        data: data_cls
    }
    res.status(200).json(response);
}