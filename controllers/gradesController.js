'use strict';

const gradesSchema = require('../models/gradesModel');
const project_classSchema = require('../models/projectClassModel');
const studentModel = require('../models/studentModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    notAuthorized: "Not authorized request",
    missing_params: "Bad input. Missing required information",
    studentNotExist: "The student does not exist",
    studentNotEnrolled: "The student isn't inscribe to this class",
    finalGradeAlreadyInserted: "The final grade of this course for the student selected has already been inserted"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_grades = async (req, res) => {
    let student_id = req.params.student_id;
    let course_id = req.query.course_id;
    let block_id = req.query.block_id;
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
    let path = "/api/v1/student/"+student_id+"/grades"
    let response = {
        path: path,
        single: true,
        query: {course_id: course_id, block_id: block_id},
        date: new Date(),
        data: data_grade
    }
    res.status(200).json(response);
}

module.exports.get_grades_v2 = async (req, res) => {
    let student_id = req.params.student_id;
    if(req.loggedUser.role == "student"){
        if(req.loggedUser._id != student_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_grades: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('get_grades: unauthorized access');
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
    let path = "/api/v2/student/"+student_id+"/grades"
    let response = {
        path: path,
        single: true,
        query: {course_id: course_id, block_id: block_id},
        date: new Date(),
        data: data_grade
    }
    res.status(200).json(response);
}

module.exports.insert_grade = async (req, res) => {
    let teacher_id = req.query.teacher_id;
    let course_id = req.query.course_id;
    let block_id = req.query.block_id;
    if(req.loggedUser.role == "teacher"){
        if(req.loggedUser._id != teacher_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('insert_grade: unauthorized access');
            return;
        }
        // I'm the correct teacher and I'm authenticated. Check if this class I'm trying to add a vote is my class
        // project_class model con un read partendo da teacher_id, course_id e block_id
        let isMyClass = await project_classSchema.isTeacherClass(teacher_id, course_id, block_id);
        if(!isMyClass){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('insert_grade: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('insert_grade: unauthorized access');
        return;
    }
    let student_id = req.params.student_id;
    let ita_descr = req.query.ita_description;
    let eng_descr = req.query.eng_description;
    let grade = req.query.grade;
    let final = req.query.final;
    // Needed to add grades to existing student
    let existStudent = await studentModel.read_id(student_id);
    if(!existStudent){
        res.status(400).json({status: "error", description: MSG.studentNotExist})
        console.log('student does not exist');
        return;
    }
    let studentInscribe = await project_classSchema.isStudentEnrolled(student_id, course_id, block_id);
    if (!studentInscribe){
        res.status(400).json({status: "error", description: MSG.studentNotEnrolled})
        console.log('student is not enrolled');
        return;
    }
    // Needed to check if I already added a final grade to this student. I cannot add new votes after adding the final vote of a course
    let concluded = await gradesSchema.final_grade(student_id, course_id, block_id);
    if(concluded==null){
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('course concluded: missing parameters');
        return;
    }
    if(concluded){
        res.status(403).json({status: "error", description: MSG.finalGradeAlreadyInserted});
        console.log('final grade already inserted');
        return;
    }
    // Launch the insertion into the database
    let ins_grade = await gradesSchema.add(student_id, teacher_id, course_id, block_id, ita_descr, eng_descr, grade, final);
    if(!ins_grade){
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information: grade insertion');
        return;
    }
    // Prepare the response
    let res_des = "Inserted "+ins_grade.affectedRows + " rows";
    let response = {
        status: "accepted",
        description: res_des
    };
    res.status(201).json(response);

}

/*project_classSchema.isStudentEnrolled(2,4,7).then((msg) => {
    console.log(msg);
})*/