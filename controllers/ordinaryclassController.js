'use strict';

const { query } = require('express');
const courseSchema = require('../models/ordinaryclassModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_classes = async (req, res) => {
    let student_id = req.query.student_id;
    let school_year = req.query.school_year;
    let credits = req.query.credits;
    let descending = req.query.descending;
    let classes = await courseSchema.list(student_id, school_year, credits, descending);
    if(!classes){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found');
        return;
    }
    let data_classes = classes.map((cls) => {
        let study_year_ref = {
            path: "/api/v1/study_year", 
            single: true, 
            query: {},
            data: {
                id: cls.study_year_id
            }
        };
        let study_address_ref = {
            path: "/api/v1/study_addresses", 
            single: true, 
            query: {},
            data: {
                id: cls.study_address_id
            }
        };
        let annual_credits_ref = !credits ? undefined : {
            path: "/api/v1/annual_credits",
                single: true,
                query: {},
                data:{
                    study_year: cls.annual_credits_study_year, 
                    study_address: cls.annual_credits_address,
                    definition_year: cls.annual_credits_definition_year
                }
        };
        return {
            study_year_ref: study_year_ref,
            study_address_ref: study_address_ref,
            school_year: cls.school_year,
            italian_displayed_name: cls.italian_displayed_name,
            english_displayed_name: cls.english_displayed_name,
            annual_credits_ref: annual_credits_ref
        };
    });
    let response = {
        path: "/api/v1/ordinary_classes",
        single: true,
        query: {
            student_id: student_id,
            school_year: school_year,
            credits: credits,
            descending: descending
        },
        date: new Date(),
        data: data_classes,
    }
    res.status(200).json(response);
}
/*{
    path: ".../student"
    single: true,
    query: {
        grade: POSITIVE
    },
    data {
        id: 4,
        ...,
        grade: {
            path: ".../grades",
            single: true,
            query: {greaterThan: 5},
            data: [7,9,10] //[4,7,9,5,10]
        }
    }
}*/