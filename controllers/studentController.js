'use strict';

const courseSchema = require('../models/coursesModel');
const ordinaryclassSchema = require('../models/ordinaryclassModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    notAuthorized: "Not authorized request"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_curriculum = async (req, res) => {
    let student_id = req.params.id;
    let school_year = req.query.school_year;
    let check = await ordinaryclassSchema.list(student_id, school_year);
    if(!check){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('ord_class: resource not found');
        return
    }
    let curriculum = await courseSchema.curriculum(student_id, school_year);
    if(!curriculum){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('curriculum: resource not found');
        return;
    }
    let data_curr = curriculum.map((curr) => {
        let learning_area_ref = {
            path: "/api/v1/learning_areas",
            single: true,
            query: {},
            data: {
                id: curr.learning_area_id
            }
        }
        return {
            id: curr.course_id,
            italian_title: curr.italian_title,
            english_title: curr.english_title,
            italian_displayed_name: curr.italian_displayed_name,
            english_displayed_name: curr.english_displayed_name,
            section: curr.section,
            credits: curr.credits,
            learning_area_ref: learning_area_ref,
            final_grade: curr.final_grade
        }
    });
    let response = {
        path: "/api/v1/student/:id/curriculum",
        single: false,
        query: {
            school_year: school_year
        },
        date: new Date(),
        data: data_curr
    };
    res.status(200).json(response);
}

module.exports.get_curriculum_v2 = async (req, res) => {
    let student_id = req.params.id;
    //console.log(req.loggedUser);
    if(req.loggedUser.role == "student"){
        if(req.loggedUser._id != student_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_curriculum: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('get_curriculum: unauthorized access');
        return;
    }
    let school_year = req.query.school_year;
    let check = await ordinaryclassSchema.list(student_id, school_year);
    if(!check){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('ord_class: resource not found');
        return
    }
    let curriculum = await courseSchema.curriculum(student_id, school_year);
    if(!curriculum){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('curriculum: resource not found');
        return;
    }
    let data_curr = curriculum.map((curr) => {
        let learning_area_ref = {
            path: "/api/v1/learning_areas",
            single: true,
            query: {},
            data: {
                id: curr.learning_area_id
            }
        }
        return {
            id: curr.course_id,
            italian_title: curr.italian_title,
            english_title: curr.english_title,
            italian_displayed_name: curr.italian_displayed_name,
            english_displayed_name: curr.english_displayed_name,
            section: curr.section,
            credits: curr.credits,
            learning_area_ref: learning_area_ref,
            final_grade: curr.final_grade
        }
    });
    let response = {
        path: "/api/v2/student/:id/curriculum",
        single: false,
        query: {
            school_year: school_year
        },
        date: new Date(),
        data: data_curr
    };
    res.status(200).json(response);
}