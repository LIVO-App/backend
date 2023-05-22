'use strict';

const gradesSchema = require('../models/gradesModel');
const project_classSchema = require('../models/projectClassModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    notAuthorized: "Not authorized request"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_grades = async (req, res) => {
    let student_id = req.params.id;
    let course_id = req.query.course_id;
    let block_id = req.query.block_id;
    // TODO: Check if student project class relation exists before searching for the grades
    let classControl = await project_classSchema.isStudentEnrolled(student_id, course_id, block_id);
    if(!classControl){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('class grades: resource not found');
        return;
    }
    let grades = await gradesSchema.list(student_id, course_id, block_id);
    let data_grade = grades.map((grade) => {
        return {
            italian_description: grade.italian_description,
            english_description: grade.english_description,
            publication: grade.publication,
            grade: grade.grade,
            final: grade.final
        }
    })
    let response = {
        path: "/api/v1/student/:id/grades",
        single: true,
        query: {course_id: course_id, block_id: block_id},
        date: new Date(),
        data: data_grade
    }
    res.status(200).json(response);
}

module.exports.get_grades_v2 = async (req, res) => {
    let student_id = req.params.id;
    if(req.loggedUser.role == "student"){
        if(req.loggedUser._id != student_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_curriculum student: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('get_curriculum: unauthorized access');
        return;
    }
    let course_id = req.query.course_id;
    let block_id = req.query.block_id;
    // TODO: Check if student project class relation exists before searching for the grades
    let classControl = await project_classSchema.isStudentEnrolled(student_id, course_id, block_id);
    if(!classControl){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('class grades: resource not found');
        return;
    }
    let grades = await gradesSchema.list(student_id, course_id, block_id);
    let data_grade = grades.map((grade) => {
        return {
            italian_description: grade.italian_description,
            english_description: grade.english_description,
            publication: grade.publication,
            grade: grade.grade,
            final: grade.final
        }
    })
    let response = {
        path: "/api/v1/student/:id/grades",
        single: true,
        query: {course_id: course_id, block_id: block_id},
        date: new Date(),
        data: data_grade
    }
    res.status(200).json(response);
}

/*project_classSchema.isStudentEnrolled(2,4,7).then((msg) => {
    console.log(msg);
})*/