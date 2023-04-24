'use strict';

const courseSchema = require('../models/coursesModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_courses = async (req, res) => {
    let block_id = req.query.block_id;
    let student_id = req.query.student_id;
    let area_id = req.query.area_id;
    let courses = await courseSchema.list(student_id, area_id, block_id);
    if(!courses){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found');
        return;
    }
    let data_courses = courses.map((course) => {
        return {
            id: course.id,
            italian_title: course.italian_title,
            english_title: course.english_title,
            credits: course.credits,
            italian_displayed_name: course.italian_displayed_name,
            english_displayed_name: course.english_displayed_name,
            pending: course.inscribed
        };
    });
    let response = {
        origin: "/api/v1/courses",
        single: true,
        data: data_courses
    };
    res.status(200).json(response);
}

module.exports.get_course = async (req, res) => {
    let course_id = req.params.id;
    let admin_info = req.query.admin_info;
    let course = await courseSchema.read(course_id, admin_info);
    if(!course){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found');
        return;
    }
    let data_course = {
        id: course.id,
        italian_title: course.italian_title,
        english_title: course.english_title,
        creation_date: course.creation_date,
        italian_description: course.italian_description,
        english_description: course.english_description,
        up_hours: course.up_hours,
        credits: course.credits,
        italian_expected_learning_results: course.italian_expected_learning_results,
        english_expected_learning_results: course.english_expected_learning_results,
        italian_criterions: course.italian_criterions,
        english_criterions: course.english_criterions,
        italian_activities: course.italian_activities,
        english_activities: course.english_activities,
        learning_area_ita: course.learning_area_ita,
        learning_area_eng: course.learning_area_eng,
        growth_area_ita: course.growth_area_ita,
        growth_area_eng: course.growth_area_eng,
        min_students: course.min_students,
        max_students: course.max_students,
        proposer_teacher_ref: {origin: "/api/v1/teacher", single: true, data: {id: course.proposer_teacher_id}},
        teacher_name: course.teacher_name,
        teacher_surname: course.teacher_surname,
        certifying_admin_ref: {origin: "/api/v1/admin", single: true, data: {id: course.certifying_admin_id}},
        admin_name: course.admin_name,
        admin_surname: course.admin_surname,
        admin_confirmation: course.admin_confirmation
    };
    let response = {
        origin: "/api/v1/courses",
        single: true,
        data: data_course
    };
    res.status(200).json(response);
}

/*courseSchema.list(1, undefined, 7)
    .then(msg => {
        //console.log(msg);
        for(var i=0; i<msg.length;i++){
            console.log("Course "+i);
            Object.keys(msg[i]).forEach(element => {
                console.log(element+": "+msg[i][element]);
            });
            console.log("==============");
        }
    });
*/
/*courseSchema.read(4)
    .then(msg => {
        //console.log(msg);
        if(msg){
            Object.keys(msg).forEach(element => {
                console.log(element+": "+msg[element]);
            });
        }
    });*/