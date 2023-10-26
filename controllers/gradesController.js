'use strict';

const gradesSchema = require('../models/gradesModel');
const project_classSchema = require('../models/projectClassModel');
const studentModel = require('../models/studentModel');
const teacherModel = require('../models/teacherModel');
const learningSessionModel = require('../models/learning_sessionsModel');
const classesTeacherModel = require('../models/classesTeacherModel');
const coursesModel = require('../models/coursesModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    notAuthorized: "Not authorized request",
    missing_params: "Bad input. Missing required information",
    studentNotExist: "The student does not exist",
    studentNotEnrolled: "The student isn't subscribe to this class",
    finalGradeAlreadyInserted: "The final grade of this course for the student selected has already been inserted",
    futureGradePublication: "You tried to add a grade to a new grade with a future publication date w.r.t. today. Abort insert."
}

process.env.TZ = 'Etc/Universal';

module.exports.get_grades = async (req, res) => {
    let student_id = req.params.student_id;
    let course_id = req.query.course_id;
    let session_id = req.query.session_id;
    let classControl = await project_classSchema.isStudentEnrolled(student_id, course_id, session_id);
    if(!classControl){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('class grades: resource not found');
        return;
    }
    let grades = await gradesSchema.list(student_id, course_id, session_id);
    let data_grade = grades.map((grade) => {
        return {
            id: grade.id,
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
        query: {course_id: course_id, session_id: session_id},
        date: new Date(),
        data: data_grade
    }
    res.status(200).json(response);
}

module.exports.get_grades_v2 = async (req, res) => {
    let student_id = req.params.student_id;
    let student_exist = await studentModel.read_id(student_id)
    if(!student_exist){
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('get_courses_v2: unauthorized access');
        return;
    }
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
    let session_id = req.query.session_id;
    let classControl = await project_classSchema.isStudentEnrolled(student_id, course_id, session_id);
    if(!classControl){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('class grades: resource not found');
        return;
    }
    let grades = await gradesSchema.list(student_id, course_id, session_id);
    let data_grade = grades.map((grade) => {
        return {
            id: grade.id,
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
        query: {course_id: course_id, session_id: session_id},
        date: new Date(),
        data: data_grade
    }
    res.status(200).json(response);
}

module.exports.insert_grade = async (req, res) => {
    let teacher_id = req.query.teacher_id;
    let course_id = req.query.course_id;
    let session_id = req.query.session_id;
    let session_exist = await learningSessionModel.read(session_id)
    if(!session_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('class grades: session not found');
        return;
    }
    if(new Date(session_exist.start) > new Date()){
        res.status(400).json({status: "error", description: "Tried to add a grade for a future class"});
        console.log('class grades: future block');
        return;
    }
    if(req.loggedUser.role == "teacher"){
        if(teacher_id==undefined){
            teacher_id = req.loggedUser._id
        }
        let teacher_exists = await teacherModel.read_id(teacher_id)
        if(!teacher_exists){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('insert_grade: unauthorized access');
            return;
        }
        if(req.loggedUser._id != teacher_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('insert_grade: unauthorized access');
            return;
        }
        // I'm the correct teacher and I'm authenticated. Check if this class I'm trying to add a vote is my class
        // project_class model con un read partendo da teacher_id, course_id e session_id
        let isMyClass = await project_classSchema.isTeacherClass(teacher_id, course_id, session_id);
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
    let ita_descr = req.body.ita_description;
    let eng_descr = req.body.eng_description;
    let publication_date = req.body.publication_date;
    let grade = req.body.grade;
    let final = req.body.final;
    // Needed to add grades to existing student
    let existStudent = await studentModel.read_id(student_id);
    if(!existStudent){
        res.status(400).json({status: "error", description: MSG.studentNotExist})
        console.log('student does not exist');
        return;
    }
    let studentSubscribe = await project_classSchema.isStudentEnrolled(student_id, course_id, session_id);
    if (!studentSubscribe){
        res.status(400).json({status: "error", description: MSG.studentNotEnrolled})
        console.log('student is not enrolled');
        return;
    }
    // Needed to check if I already added a final grade to this student. I cannot add new votes after adding the final vote of a course
    let concluded = await gradesSchema.final_grade(student_id, course_id, session_id);
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
    if(publication_date!=undefined){
        if(new Date(publication_date) > new Date()){
            res.status(400).json({status: "error", description: MSG.futureGradePublication})
            console.log('future grade publication');
            return;
        }
        let existing_grade = await gradesSchema.read_from_date(student_id, course_id, session_id, teacher_id, publication_date)
        if(existing_grade){
            res.status(409).json({status: "error", description: "Grade is already been published in that day"});
            console.log('duplicate grade inserted');
            return;
        }
    }
    
    // Launch the insertion into the database
    let ins_grade = await gradesSchema.add(student_id, teacher_id, course_id, session_id, ita_descr, eng_descr, grade, publication_date, final);
    if(!ins_grade.rows){
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information: grade insertion');
        return;
    }
    // Prepare the response
    let res_des = "Inserted "+ins_grade.rows.affectedRows + " rows";
    let response = {
        status: "accepted",
        description: res_des,
        value: ins_grade.grade
    };
    res.status(201).json(response);

}

module.exports.update_grade = async (req, res) => {
    let teacher_id = req.query.teacher_id;
    if(req.loggedUser.role == "teacher"){  
        if(teacher_id===undefined){
            teacher_id = req.loggedUser._id
        }
        if(teacher_id != req.loggedUser._id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('update_grades: unauthorized access');
            return;
        }
        let teacher_exists = await teacherModel.read_id(teacher_id)
        if(!teacher_exists){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('update_grades: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('update_grades: unauthorized access');
        return;
    }
    let grade_id = req.params.grade_id
    let grade_exist = await gradesSchema.read(grade_id)
    if(!grade_exist){
        res.status(404).json({status: "error", description: MSG.notFound})
        console.log('update_grades: grade not found')
        return
    }
    let course_id = grade_exist.project_class_course_id;
    let session_id = grade_exist.project_class_session;
    let student_id = grade_exist.student_id;
    let section = await studentModel.retrieve_section_from_project_class(student_id, course_id, session_id);
    if(!section){
        res.status(404).json({status: "error", description: MSG.notFound})
        console.log('update_grades: student not inscribe to this class')
        return
    }
    let teaches_proj = await teacherModel.isTeacherTeachingProject(teacher_id, course_id, session_id, section.section)
    if(!teaches_proj){
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('update_grades: unauthorized access');
        return;
    }
    let today = new Date()
    if (grade_exist.final){
        let publication_date = new Date(grade_exist.publication)
        let _7days = publication_date.setDate(publication_date.getDate() + 7)
        if(publication_date<today){
            if(_7days<today){
                res.status(400).json({status: "error", description: "The final grade cannot be updated by the teacher after a week from its publication. Please, contact the administrator."})
                console.log("Update final grade: Time limit expiration")
                return
            }
        }
    } else {
        let final_grade_exists = await gradesSchema.final_grade(grade_exist.student_id, course_id, session_id)
        if(final_grade_exists){
            res.status(400).json({status: "error", description: "You can't change anymore the grades of the student since there is already a final grade"})
            console.log("Update grades not final: final grade already inserted")
            return
        }
    }
    let ita_description = req.body.ita_description;
    let eng_description = req.body.eng_description;
    let grade_value = req.body.grade;
    let publication_date = req.body.publication_date;
    let update_grade = await gradesSchema.update(grade_id, ita_description, eng_description, grade_value, publication_date)
    if(!update_grade){
        res.status(400).json({status: "error", description: MSG.missing_params})
            console.log("Update grade: missing parameters")
            return
    }
    res.status(200).json({status: "updated", description: "Grade updated successfully."})
}


module.exports.remove_grade = async (req, res) => {
    let teacher_id = req.query.teacher_id;
    if(req.loggedUser.role == "teacher"){  
        if(teacher_id===undefined){
            teacher_id = req.loggedUser._id
        }
        if(teacher_id != req.loggedUser._id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('remove_grades: unauthorized access');
            return;
        }
        let teacher_exists = await teacherModel.read_id(teacher_id)
        if(!teacher_exists){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('remove_grades: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('remove_grades: unauthorized access');
        return;
    }
    let grade_id = req.params.grade_id
    let grade_exist = await gradesSchema.read(grade_id)
    if(!grade_exist){
        res.status(404).json({status: "error", description: MSG.notFound})
        console.log('remove_grades: grade not found')
        return
    }
    let course_id = grade_exist.project_class_course_id;
    let session_id = grade_exist.project_class_session;
    let student_id = grade_exist.student_id;
    let section = await studentModel.retrieve_section_from_project_class(student_id, course_id, session_id);
    if(!section){
        res.status(404).json({status: "error", description: MSG.notFound})
        console.log('remove_grades: student not inscribe to this class')
        return
    }
    let teaches_proj = await teacherModel.isTeacherTeachingProject(teacher_id, course_id, session_id, section.section)
    if(!teaches_proj){
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('remove_grades: unauthorized access');
        return;
    }
    let today = new Date()
    if (grade_exist.final){
        let publication_date = new Date(grade_exist.publication)
        let _7days = publication_date.setDate(publication_date.getDate() + 7)
        if(publication_date<today){
            if(_7days<today){
                res.status(400).json({status: "error", description: "The final grade cannot be deleted by the teacher after a week from its publication. Please, contact the administrator."})
                console.log("Remove final grade: Time limit expiration")
                return
            }
        }
    } else {
        let final_grade_exists = await gradesSchema.final_grade(grade_exist.student_id, course_id, session_id)
        if(final_grade_exists){
            res.status(400).json({status: "error", description: "You can't change anymore the grades of the student since there is already a final grade"})
            console.log("Remove grades not final: final grade already inserted")
            return
        }
    }
    let remove_grade = await gradesSchema.remove(grade_id)
    let res_des = "Deleted " + remove_grade.affectedRows + " rows";
    let response = {
        status: "deleted", 
        description: res_des
    };
    res.status(200).json(response);
}

/*project_classSchema.isStudentEnrolled(2,4,7).then((msg) => {
    console.log(msg);
})*/