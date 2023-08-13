'use strict';

const courseSchema = require('../models/coursesModel');
const ordinaryclassSchema = require('../models/ordinaryclassModel');
const projectClassesSchema = require('../models/projectClassModel')
const learning_blocksModel = require('../models/learning_blocksModel')
const studentModel = require('../models/studentModel');
const teacherModel = require('../models/teacherModel');
const adminModel = require('../models/adminModel');
const opentoSchema = require('../models/opentoModel');
const crypto = require('../utils/cipher');
const constraintModel = require('../models/constraintModel');
const inscribeModel = require('../models/inscribeModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    notAuthorized: "Not authorized request",
    missingParameters: "Missing required information",
    classToBeModified: "The project class has still to be modified. Please change it before confirm it",
    student_not_enrolled: "The student is not enrolled to the starting project class.",
    student_already_enrolled: "The student is already enrolled to the arrival project class.",
    classNotAccessible: "The class you want to move the student is not accessible to him or is not accessible for the specific learning context of the original class you want to move him from. Please choose another class.",
    notCredits: "The destination course has not the same number of credits of the start course. The student will not respect anymore the constraints you created. Please, choose another destination course."
}

process.env.TZ = 'Etc/Universal';

module.exports.get_student = async (req, res) => {
    let user_id = req.loggedUser._id;
    if(req.loggedUser.role == "teacher"){
        let teacher_esist = teacherModel.read_id(user_id);
        if(!teacher_esist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_student: unauthorized access');
            return;
        }
    } else if(req.loggedUser.role == "admin"){
        let admin_exist = adminModel.read_id(user_id)
        if(!admin_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_student: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('get_student: unauthorized access');
        return;
    }
    let student_id = req.params.student_id;
    let student = await studentModel.read_id(student_id)
    if(!student){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('get_student: student not found');
        return;
    }
    let cf = crypto.decipher(student.cf.toString())
    let gender = crypto.decipher(student.gender.toString())
    let birth_date = crypto.decipher(student.birth_date.toString())
    let address = crypto.decipher(student.address.toString())
    let ordinary_class_ref = {
        path: "/api/v1/ordinary_classes",
            single: true,
            query: {},
            data: {
                study_year: student.ordinary_class_study_year,
                study_address: student.ordinary_class_address
            }
    }
    let student_data = {
        cf: cf,
        username: student.username,
        name: student.name,
        surname: student.surname,
        gender: gender,
        birth_date: birth_date,
        address: address,
        email: student.email,
        ordinary_class_ref: ordinary_class_ref,
        class_section: student.section
    }
    let path = "/api/v1/students/"+student_id
    let response = {
        path: path,
        single: true,
        query: {},
        date: new Date(),
        data: student_data
    };
    res.status(200).json(response);
}

module.exports.get_credits_annual_progession = async (req, res) => {
    let user_id = req.loggedUser._id;
    if(req.loggedUser.role == "student"){
        let student_esist = studentModel.read_id(user_id);
        if(!student_esist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_student: unauthorized access');
            return;
        }
    } else if(req.loggedUser.role == "teacher"){
        let teacher_esist = teacherModel.read_id(user_id);
        if(!teacher_esist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_student: unauthorized access');
            return;
        }
    } else if(req.loggedUser.role == "admin"){
        let admin_exist = adminModel.read_id(user_id)
        if(!admin_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_student: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('get_student: unauthorized access');
        return;
    }
    let student_id = req.params.student_id;
    let school_year = req.query.school_year;
    let annual_constraints = await constraintModel.get_annual_constraints(student_id,school_year)
    if(!annual_constraints){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('get annual credits constraints: resource not found');
        return;
    }
    let area_id = []; // build it as an array from the annual constraints
    let context_id = []; // build it as an array from the annual constraints
    let constraints = annual_constraints.map((constr) => {
        area_id.push(constr.learning_area_id)
        context_id.push(constr.learning_context_id)
    })
    let student_progression = await studentModel.retrieve_annual_credits(student_id, school_year, area_id, context_id)
    if(!student_progression){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('get annual credits progression: resource not found');
        return;
    }
    //console.log(student_progression)
    let data_credits = []
    for(let i = 0; i<student_progression.length;i++){
        let learning_area_ref = {
            path: "/api/v1/learning_areas",
            single: true,
            query: {},
            data: {
                id: area_id[i]
            }
        }
        let learning_context_ref = {
            path: "/api/v1/learning_contexts", 
            single: true, 
            query: {},
            data: {
                id: context_id[i]
            }
        }
        data_credits.push({
            learning_area_ref: learning_area_ref,
            learning_context_ref: learning_context_ref,
            credits: student_progression[i].credits,
            max_credits: student_progression[i].max_credits
        })
    }
    let path = "/api/v1/students/"+student_id+"/annual_credits"
    let response = {
        path: path,
        single: false,
        query: {
            school_year: school_year
        },
        date: new Date(),
        data: data_credits
    };
    res.status(200).json(response);
}

module.exports.get_curriculum = async (req, res) => {
    let student_id = req.params.student_id;
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
        let learning_context_ref = {
            path: "/api/v1/learning_contexts", 
            single: true, 
            query: {},
            data: {
                id: curr.learning_context_id
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
            learning_context_ref: learning_context_ref,
            final_grade: curr.final_grade
        }
    });
    let path = "/api/v1/students/"+student_id+"/curriculum"
    let response = {
        path: path,
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
    let student_id = req.params.student_id;
    let school_year = req.query.school_year;
    let context_id = req.query.context_id;
    //console.log(req.loggedUser);
    if(req.loggedUser.role == "student"){
        let student_exist = await studentModel.read_id(student_id)
        if(!student_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_courses_v2: unauthorized access');
            return;
        }
        if(req.loggedUser._id != student_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_curriculum: unauthorized access');
            return;
        }
        let check = await ordinaryclassSchema.list(student_id, school_year);
        if(!check){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('ord_class: resource not found');
            return
        }
        let curriculum = await courseSchema.curriculum(student_id, school_year, context_id);
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
            let learning_context_ref = {
                path: "/api/v1/learning_contexts", 
                single: true, 
                query: {},
                data: {
                    id: curr.learning_context_id
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
                learning_context_ref: learning_context_ref,
                final_grade: curr.final_grade,
                future_course: curr.future_course
            }
        });
        let path = "/api/v2/students/"+student_id+"/curriculum"
        let response = {
            path: path,
            single: false,
            query: {
                school_year: school_year,
                context_id: context_id
            },
            date: new Date(),
            data: data_curr
        };
        res.status(200).json(response);
        return;
    } else if(req.loggedUser.role == "teacher"){
        let teacher_esist = await teacherModel.isTeacherEmployed(req.loggedUser._id, school_year);
        if(!teacher_esist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_curriculum: unauthorized access');
            return;
        }
        let curriculum = await courseSchema.curriculum(student_id, school_year, context_id, req.loggedUser._id);
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
            let learning_context_ref = {
                path: "/api/v1/learning_contexts", 
                single: true, 
                query: {},
                data: {
                    id: curr.learning_context_id
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
                learning_context_ref: learning_context_ref,
                final_grade: curr.final_grade,
                future_course: curr.future_course
            }
        });
        let path = "/api/v2/students/"+student_id+"/curriculum"
        let response = {
            path: path,
            single: false,
            query: {
                school_year: school_year,
                teacher_id: req.loggedUser._id,
                context_id: context_id
            },
            date: new Date(),
            data: data_curr
        };
        res.status(200).json(response);
        return;
    } else{
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('get_curriculum: unauthorized access');
        return;
    }
}

module.exports.get_project_classes = async (req,res) => {
    let student_id = req.params.student_id;
    if(req.loggedUser.role === "student"){
        let student_exist = await studentModel.read_id(student_id)
        if(!student_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_courses_v2: unauthorized access');
            return;
        }
        if(req.loggedUser._id != student_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('student project classes: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('student project classes: unauthorized access');
        return;
    }
    let block_id = req.query.block_id;
    let cls = await studentModel.retrieve_project_classes(student_id, block_id);
    if(!cls){
        res.status(400).json({status: "error", description: MSG.missingParameters});
        console.log('student project classes: missing required information');
        return;
    }
    let data_cls = cls.map((cl) => {
        return {
            id: cl.course_id,
            italian_title: cl.italian_title,
            english_title: cl.english_title,
            section: cl.section
        }
    });
    let path = "/api/v1/students/"+student_id+"/project_classes";
    let response = {
        path: path,
        single: false,
        query: {block_id: block_id},
        date: new Date(),
        data: data_cls
    };
    res.status(200).json(response);
}

module.exports.update_info = async (req, res) => {
    let student_id = req.params.student_id
    if(req.loggedUser.role == "student"){
        let student_exist = await studentModel.read_id(student_id);
        if(!student_exist){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('update student information: student does not exists');
            return;
        }
        if(req.loggedUser._id != student_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('update student information: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('update student information: unauthorized access');
        return;
    }
    let information = req.body.student_info
    let update_info = await studentModel.update(student_id, information)
    if(!update_info){
        res.status(400).json({status: "error", description: MSG.missingParameters});
        console.log('update student information: no parameters to change')
        return
    }
    res.status(200).json({status: "updated", description: "Information updated successfully"})
}

module.exports.update_password = async (req, res) => {
    let student_id = req.params.student_id
    if(req.loggedUser.role == "student"){
        let student_exist = await studentModel.read_id(student_id);
        if(!student_exist){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('update student psw: student does not exists');
            return;
        }
        if(req.loggedUser._id != student_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('update student psw: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('update student psw: unauthorized access');
        return;
    }
    let psw = req.body.psw
    let update_psw = await studentModel.change_psw(student_id, psw)
    if(update_psw==null){
        res.status(400).json({status: "error", description: MSG.missingParameters});
        console.log('update student psw: no parameters to change')
        return
    }
    if(!update_psw){
        res.status(400).json({status: "error", description: "The password is the same. Please change it."});
        console.log('update student psw: same password')
        return
    }
    res.status(200).json({status: "updated", description: "Password updated successfully"})
}

module.exports.move_class_component = async (req, res) => {
    let user_id = req.loggedUser._id
    if(req.loggedUser.role == "admin"){
        let admin_exist = await adminModel.read_id(user_id)
        if(!admin_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('project class update components: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('project class update components: unauthorized access');
        return;
    }
    let student_id = req.params.student_id
    let start_class = req.body.from
    let start_course_id = start_class.course_id;
    let course_exist = await courseSchema.read(start_course_id, true);
    if(!course_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('project class update components: course does not exists');
        return;
    }
    let start_block_id = start_class.block_id;
    let block_exist = await learning_blocksModel.read(start_block_id)
    if(!block_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('project class update components: block does not exists');
        return;
    }
    let start_project_class_exist = await projectClassesSchema.read(start_course_id, start_block_id);
    if(!start_project_class_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('project class update components: project class does not exists');
        return;
    }
    if(start_project_class_exist.to_be_modified == "true"){
        res.status(400).json({status: "error", description: MSG.classToBeModified});
        console.log('project class update components: project class needs to be modified');
        return;
    }
    // Check if student is part of start project class
    let is_student_present = await projectClassesSchema.getStudentSectionandContext(student_id, start_course_id, start_block_id)
    if(!is_student_present){
        res.status(400).json({status: "error", description: MSG.student_not_enrolled});
        console.log('project class update components: student is not enrolled to start project class. Abort move class');
        return;
    }
    let start_class_section = is_student_present.section
    let start_class_context = is_student_present.learning_context_id
    // Check if the components go under min_students
    let start_components = await projectClassesSchema.classComponents(start_course_id, start_block_id, start_class_section)
    if(start_components.length==course_exist.min_students){
        res.status(400).json({status: "error", description: MSG.minStudents});
        console.log('project course update components: project class will not have min students required');
        return;
    }
    let arrival_class = req.body.to
    let arrival_course_id = arrival_class.course_id
    let arrival_course_exist = await courseSchema.read(arrival_course_id, true);
    if(!arrival_course_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('project class update components: course does not exists');
        return;
    }
    if(course_exist.credits != arrival_course_exist.credits){
        res.status(400).json({status: "error", description: MSG.notCredits});
        console.log('project class update components: the course you want to move the student has not the same number of credits of the original one.')
        return
    }
    let arrival_block_id = arrival_class.block_id
    let arrival_block_exist = await learning_blocksModel.read(arrival_block_id)
    if(!arrival_block_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('project class update components: block does not exists');
        return;
    }
    let arrival_class_section = arrival_class.section
    let arrival_project_class_exist = await projectClassesSchema.read(arrival_course_id, arrival_block_id);
    if(!arrival_project_class_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('project class fupdate components: project class does not exists');
        return;
    }
    if(arrival_project_class_exist.to_be_modified == "true"){
        res.status(400).json({status: "error", description: MSG.classToBeModified});
        console.log('project course update components: project class needs to be modified');
        return;
    }
    // Check if destination project class is accessible to student
    let is_class_accessible = await opentoSchema.is_course_accessible(student_id, arrival_course_id, arrival_block_id, start_class_context);
    if(is_class_accessible == null){
        res.status(400).json({status: "error", description: MSG.missingParameters});
        console.log('project class update components: missing parameters. Is arrival project class accessible')
        return
    }
    if(!is_class_accessible){
        res.status(400).json({status: "error", description: MSG.classNotAccessible});
        console.log('project class update components: the course is not accessible for the student given the learning context of the starting class')
        return
    }
    // Check if student is not enrolled to any section of the destination project class
    let is_student_present_dest = await projectClassesSchema.isStudentEnrolled(student_id, arrival_course_id, arrival_block_id)
    if(is_student_present_dest){
        res.status(400).json({status: "error", description: MSG.student_already_enrolled});
        console.log('project class update components: student is enrolled to the destination project class. Abort move class');
        return;
    }
    // Check if destination is already full
    let arrival_components = await projectClassesSchema.classComponents(arrival_course_id, arrival_block_id, arrival_class_section)
    if(arrival_components.length==arrival_course_exist.max_students){
        res.status(400).json({status: "error", description: MSG.minStudents});
        console.log('project course update components: project class has max students required');
        return;
    }
    let unscribeStudent = await inscribeModel.remove(student_id, start_course_id, start_block_id, start_class_context);
    let inscribeStudent = await inscribeModel.add(student_id, arrival_course_id, arrival_block_id, arrival_class_section, start_class_context);
    if(!inscribeStudent){
        res.status(400).json({status: "error", description: MSG.missingParameters});
        console.log('project class update components: missing parameters. Inscribe to destination')
        return
    }
    res.status(201).json({status: "accepted", description: "Student moved successfully"})
}