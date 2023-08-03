'use strict';

const classesSchema = require('../models/classesTeacherModel');
const ord_classSchema = require('../models/ordinaryclassModel');
const teacherSchema = require('../models/teacherModel');
const adminModel = require('../models/adminModel');
const crypto = require('../utils/cipher');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    missingParameter: "Missing required information",
    notAuthorized: "Not authorized request",
    teacherNotEmployed: "The teacher was not employed in that school_year"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_teachers = async (req, res) => {
    let user_id = req.loggedUser._id;
    if(req.loggedUser.role == "teacher"){
        let teacher_esist = teacherSchema.read_id(user_id);
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
    let teachers = await teacherSchema.list()
    let data_teachers = teachers.map((teacher) => {
        let cf = crypto.decipher(teacher.cf.toString())
        let gender = crypto.decipher(teacher.gender.toString())
        let birth_date = crypto.decipher(teacher.birth_date.toString())
        let address = crypto.decipher(teacher.address.toString())
        return {
            cf: cf,
            username: teacher.username,
            name: teacher.name,
            surname: teacher.surname,
            gender: gender,
            birth_date: birth_date,
            address: address,
            email: teacher.email
        }
    })
    let path = "/api/v1/teachers/"
    let response = {
        path: path,
        single: true,
        query: {},
        date: new Date(),
        data: data_teachers
    };
    res.status(200).json(response);
}

module.exports.get_my_project_classes = async (req, res) => {
    let teacher_id = req.params.teacher_id;
    let block_id = req.query.block_id;
    let cls = await classesSchema.read_project_classes_teach(teacher_id, block_id);
    if (!cls){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log("teacher project class: missing parameters");
        return;
    }
    let data_classes = cls.map((cl) => {
        let teaching_ref = {
            path: "/api/v1/teachings", 
            single: true, 
            query: {},
            data: {
                id: cl.teaching_id
            }
        }
        return {
            id: cl.id,
            italian_title: cl.italian_title,
            english_title: cl.english_title,
            section: cl.section,
            teaching_ref: teaching_ref,
            my_teaching: cl.my_teaching
        }
    });
    let path = "/api/v1/teachers/"+teacher_id+"/my_project_classes"
    let response = {
        path: path,
        single: false,
        query: {block_id: block_id},
        date: new Date(),
        data: data_classes
    };
    res.status(200).json(response);
}

module.exports.get_associated_project_classes = async (req, res) => {
    let teacher_id = req.params.teacher_id;
    let block_id = req.query.block_id;
    let cls = await classesSchema.read_project_classes_associated(teacher_id, block_id);
    if (!cls){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log("teacher project class: missing parameters");
        return;
    }
    let data_classes = cls.map((cl) => {
        let teaching_ref = {
            path: "/api/v1/teachings", 
            single: true, 
            query: {},
            data: {
                id: cl.teaching_id
            }
        }
        return {
            id: cl.id,
            italian_title: cl.italian_title,
            english_title: cl.english_title,
            section: cl.section,
            teaching_ref: teaching_ref,
        }
    });
    let path = "/api/v1/teachers/"+teacher_id+"/associated_project_classes"
    let response = {
        path: path,
        single: false,
        query: {block_id: block_id},
        date: new Date(),
        data: data_classes
    }
    res.status(200).json(response);
}

module.exports.get_my_project_classes_v2 = async (req, res) => {
    let teacher_id = req.params.teacher_id;
    if(req.loggedUser.role == "teacher"){
        let teacher_exist = await teacherSchema.read_id(teacher_id)
        if(!teacher_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_courses_v2: unauthorized access');
            return;
        }
        if(req.loggedUser._id != teacher_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('my_project_classes: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('my_project_classes: unauthorized access');
        return;
    }
    let block_id = req.query.block_id;
    let course_id = req.query.course_id;
    let cls = await classesSchema.read_project_classes_teach(teacher_id, block_id, course_id);
    if (!cls){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log("teacher project class: missing parameters");
        return;
    }
    let data_classes = cls.map((cl) => {
        let teaching_ref = {
            path: "/api/v1/teachings", 
            single: true, 
            query: {},
            data: {
                id: cl.teaching_id
            }
        }
        return {
            id: cl.id,
            italian_title: cl.italian_title,
            english_title: cl.english_title,
            section: cl.section,
            teaching_ref: teaching_ref,
            my_teaching: cl.my_teaching
        }
    });
    let path = "/api/v2/teachers/"+teacher_id+"/my_project_classes"
    let response = {
        path: path,
        single: false,
        query: {block_id: block_id, course_id: course_id},
        date: new Date(),
        data: data_classes
    };
    res.status(200).json(response);
}

module.exports.get_associated_project_classes_v2 = async (req, res) => {
    let teacher_id = req.params.teacher_id;
    if(req.loggedUser.role == "teacher"){
        let teacher_exist = await teacherSchema.read_id(teacher_id)
        if(!teacher_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_courses_v2: unauthorized access');
            return;
        }
        if(req.loggedUser._id != teacher_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('associated_project_classes: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('associated_project_classes: unauthorized access');
        return;
    }
    let block_id = req.query.block_id;
    let course_id = req.query.course_id;
    let cls = await classesSchema.read_project_classes_associated(teacher_id, block_id, course_id);
    if (!cls){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log("teacher project class: missing parameters");
        return;
    }
    let data_classes = cls.map((cl) => {
        let teaching_ref = {
            path: "/api/v1/teachings", 
            single: true, 
            query: {},
            data: {
                id: cl.teaching_id
            }
        }
        return {
            id: cl.id,
            italian_title: cl.italian_title,
            english_title: cl.english_title,
            section: cl.section,
            teaching_ref: teaching_ref,
        }
    });
    let path = "/api/v2/teachers/"+teacher_id+"/associated_project_classes"
    let response = {
        path: path,
        single: false,
        query: {block_id: block_id, course_id: course_id},
        date: new Date(),
        data: data_classes
    }
    res.status(200).json(response);
}

module.exports.get_my_ordinary_classes = async (req, res) => {
    let teacher_id = req.params.teacher_id;
    if(req.loggedUser.role == "teacher"){
        let teacher_exist = await teacherSchema.read_id(teacher_id)
        if(!teacher_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_courses_v2: unauthorized access');
            return;
        }
        if(req.loggedUser._id != teacher_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('my_ordinary_class: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('my_ordinary_class: unauthorized access');
        return;
    }
    let school_year = req.query.school_year;
    if(school_year!=undefined) {
        let teacher_esist = await teacherSchema.isTeacherEmployed(teacher_id, school_year);
        if(!teacher_esist){
            res.status(404).json({status: "error", description: MSG.teacherNotEmployed});
            console.log('my_ordinary_class: teacher was not employed');
            return;
        }
    }
    let cls = await ord_classSchema.teachers_classes(teacher_id, school_year);
    if(!cls){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log("teacher ordinary class: missing parameters");
        return;
    }
    let data_classes = cls.map((cl) => {
        return {
            study_year: cl.ordinary_class_study_year,
            address: cl.ordinary_class_address,
            school_year: cl.ordinary_class_school_year,
            section: cl.section
        }
    });
    let path = "/api/v1/teachers/"+teacher_id+"/my_ordinary_classes";
    let response = {
        path: path,
        single: false,
        query: {school_year: school_year},
        date: new Date(),
        data: data_classes
    }
    res.status(200).json(response);
}

module.exports.get_active_years = async (req, res) => {
    let teacher_id = req.params.teacher_id;
    let existingTeacher = await teacherSchema.read_id(teacher_id);
    if(!existingTeacher){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log("teacher active year: resource not found");
        return; 
    }
    let full_class = req.query.full_class;
    let yrs = await teacherSchema.getActiveYears(teacher_id, full_class);
    if(!yrs){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log("teacher active year: missing parameters");
        return;
    }
    let data_years = yrs.map((yr) => {
        return {
            study_year: yr.ordinary_class_study_year,
            address: yr.ordinary_class_address,
            year: yr.ordinary_class_school_year
        }
    })
    let path = "/api/v1/teachers/"+teacher_id+"/active_years";
    let response = {
        path: path,
        single: false,
        query: {full_class: full_class},
        date: new Date(),
        data: data_years
    }
    res.status(200).json(response);
}

/*classesSchema.read_project_classes_associated(3,7).then(msg => {
    for(var i=0;i<msg.length;i++){
        console.log("classes "+i);
        Object.keys(msg[i]).forEach(element => {
            console.log(element+": "+msg[i][element]);
        });
        console.log("=============");
    }
})*/