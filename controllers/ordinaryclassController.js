'use strict';

const courseSchema = require('../models/ordinaryclassModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save"
}

module.exports.get_classes = async (req, res) => {
    let student_id = req.query.student_id;
    let school_year = req.query.school_year;
    let credits = req.query.credits;
    let classes = await courseSchema.list(student_id, school_year, credits);
    if(!classes){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found');
        return;
    }
    let data_classes = classes.map((cls) => {
        return {
            study_year_ref: {origin: "/api/v1/study_year", single: true, data: {id: cls.study_year_id}},
            study_address_ref: {origin: "/api/v1/study_addresses", single: true, data: {id: cls.study_address_id}},
            school_year: cls.school_year,
            italian_displayed_name: cls.italian_displayed_name,
            english_displayed_name: cls.english_displayed_name,
            annual_credits_ref: {origin: "/api/v1/annual_credits", single: true, data:{study_year: cls.annual_credits_study_year, study_address: cls.annual_credits_address,definition_year: cls.annual_credits_definition_year}}
        };
    });
    let response = {
        origin: "/api/v1/ordinary_classes",
        single: true,
        data: data_classes
    }
    res.status(200).json(response);
}