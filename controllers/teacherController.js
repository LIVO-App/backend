'use strict';

const classesSchema = require('../models/classesTeacherModel');
const ord_classSchema = require('../models/ordinaryclassModel');
const teacherSchema = require('../models/teacherModel');
const adminModel = require('../models/adminModel');
const crypto = require('../utils/cipher');
const courseSchema = require('../models/coursesModel')
const sessionSchema = require('../models/learning_sessionsModel')
const projectClassSchema = require('../models/projectClassModel');
const projectClassTeacherModel = require('../models/projectClassTeacherModel');
const fs = require('fs')

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    missingParameter: "Missing required information",
    notAuthorized: "Not authorized request",
    teacherNotEmployed: "The teacher was not employed in that school_year",
    maxTeachers: "The class you wanted to add to the teacher has already three teachers.",
    wrongSection: "Some sections you specified for the teacher does not exists. Please check the data and try again.",
    noMoreTeachers: "The class you want to remove the teacher from will not have any teacher.",
    itemAlreadyInserted: "The teacher is already teaching in all the classes you specified.",
    teacherDoNotTeachPC: "The teacher specified does not teach in the project class specified"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_teachers = async (req, res) => {
    let user_id = req.loggedUser._id;
    if(req.loggedUser.role == "teacher"){
        let teacher_esist = teacherSchema.read_id(user_id);
        if(!teacher_esist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_teacher: unauthorized access ('+new Date()+')');
            return;
        }
    } else if(req.loggedUser.role == "admin"){
        let admin_exist = adminModel.read_id(user_id)
        if(!admin_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_teacher: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('get_teacher: unauthorized access ('+new Date()+')');
        return;
    }
    let teachers = await teacherSchema.list()
    let data_teachers = teachers.map((teacher) => {
        let cf = teacher.cf != null ? crypto.decipher(teacher.cf.toString()) : undefined;
        let gender = teacher.gender != null ? crypto.decipher(teacher.gender.toString()) : undefined
        let birth_date = teacher.birth_date != null ? crypto.decipher(teacher.birth_date.toString()) : undefined
        let address = teacher.address != null ? crypto.decipher(teacher.address.toString()) : undefined
        return {
            id: teacher.id,
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
    let session_id = req.query.session_id;
    let cls = await classesSchema.read_project_classes_teach(teacher_id, session_id);
    if (!cls){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log('teacher project class: missing parameters ('+new Date()+')');
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
        query: {session_id: session_id},
        date: new Date(),
        data: data_classes
    };
    res.status(200).json(response);
}

module.exports.get_associated_project_classes = async (req, res) => {
    let teacher_id = req.params.teacher_id;
    let session_id = req.query.session_id;
    let cls = await classesSchema.read_project_classes_associated(teacher_id, session_id);
    if (!cls){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log('teacher project class: missing parameters ('+new Date()+')');
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
        query: {session_id: session_id},
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
            console.log('get_courses_v2: unauthorized access ('+new Date()+')');
            return;
        }
        if(req.loggedUser._id != teacher_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('my_project_classes: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('my_project_classes: unauthorized access ('+new Date()+')');
        return;
    }
    let session_id = req.query.session_id;
    let course_id = req.query.course_id;
    let cls = await classesSchema.read_project_classes_teach(teacher_id, session_id, course_id);
    if (!cls){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log('teacher project class: missing parameters ('+new Date()+')');
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
        query: {session_id: session_id, course_id: course_id},
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
            console.log('get_courses_v2: unauthorized access ('+new Date()+')');
            return;
        }
        if(req.loggedUser._id != teacher_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('associated_project_classes: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('associated_project_classes: unauthorized access ('+new Date()+')');
        return;
    }
    let session_id = req.query.session_id;
    let course_id = req.query.course_id;
    let cls = await classesSchema.read_project_classes_associated(teacher_id, session_id, course_id);
    if (!cls){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log('teacher project class: missing parameters ('+new Date()+')');
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
        query: {session_id: session_id, course_id: course_id},
        date: new Date(),
        data: data_classes
    }
    res.status(200).json(response);
}

module.exports.get_my_ordinary_classes = async (req, res) => {
    let teacher_id = req.params.teacher_id;
    let teaching = req.query.teaching;
    if(req.loggedUser.role == "teacher"){
        let teacher_exist = await teacherSchema.read_id(teacher_id)
        if(!teacher_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_courses_v2: unauthorized access ('+new Date()+')');
            return;
        }
        if(req.loggedUser._id != teacher_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('my_ordinary_class: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('my_ordinary_class: unauthorized access ('+new Date()+')');
        return;
    }
    let school_year = req.query.school_year;
    if(school_year!=undefined) {
        let teacher_esist = await teacherSchema.isTeacherEmployed(teacher_id, school_year);
        if(!teacher_esist){
            res.status(404).json({status: "error", description: MSG.teacherNotEmployed});
            console.log('my_ordinary_class: teacher was not employed ('+new Date()+')');
            return;
        }
    }
    let cls = await ord_classSchema.teachers_classes(teacher_id, school_year, teaching);
    if(!cls){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log('teacher ordinary class: missing parameters ('+new Date()+')');
        return;
    }
    let data_classes = cls.map((cl) => {
        return {
            study_year: cl.ordinary_class_study_year,
            address: cl.ordinary_class_address,
            school_year: cl.ordinary_class_school_year,
            section: cl.section,
            teaching: cl.teaching_id
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
        console.log('teacher active year: resource not found ('+new Date()+')');
        return; 
    }
    let full_class = req.query.full_class;
    let yrs = await teacherSchema.getActiveYears(teacher_id, full_class);
    if(!yrs){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log('teacher active year: missing parameters ('+new Date()+')');
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

module.exports.update_info = async (req, res) => {
    let teacher_id = req.params.teacher_id
    if(req.loggedUser.role == "teacher"){
        let teacher_esist = await teacherSchema.read_id(teacher_id);
        if(!teacher_esist){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('update student information: student does not exists ('+new Date()+')');
            return;
        }
        if(req.loggedUser._id != teacher_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('update student information: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('update student information: unauthorized access ('+new Date()+')');
        return;
    }
    let information = req.body.teacher_info
    let update_info = await teacherSchema.update(teacher_id, information)
    if(!update_info){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log('update student information: no parameters to change ('+new Date()+')')
        return
    }
    res.status(200).json({status: "updated", description: "Information updated successfully"})
}

module.exports.update_password = async (req, res) => {
    let teacher_id = req.params.teacher_id
    if(req.loggedUser.role == "teacher"){
        let teacher_esist = await teacherSchema.read_id(teacher_id);
        if(!teacher_esist){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('update student psw: student does not exists ('+new Date()+')');
            return;
        }
        if(req.loggedUser._id != teacher_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('update student psw: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('update student psw: unauthorized access ('+new Date()+')');
        return;
    }
    let psw = req.body.psw
    let update_psw = await teacherSchema.change_psw(teacher_id, psw)
    if(update_psw==null){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log('update student psw: no parameters to change ('+new Date()+')')
        return
    }
    if(!update_psw){
        res.status(400).json({status: "error", description: "The password is the same. Please change it."});
        console.log('update student psw: same password ('+new Date()+')')
        return
    }
    res.status(200).json({status: "updated", description: "Password updated successfully"})
}

module.exports.add_teacher_to_project_class = async (req, res) => {
    if(req.loggedUser.role == "admin"){
        let user_id = req.loggedUser._id
        let user_exist = await adminModel.read_id(user_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('new project class for teacher: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('new project class for teacher: unauthorized access ('+new Date()+')');
        return;
    }
    // Teacher exists
    let teacher_id = req.params.teacher_id;
    let teacher_esist = await teacherSchema.read_id(teacher_id)
    if(!teacher_esist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('new project class for teacher: resource not found ('+new Date()+')');
        return; 
    }
    // Check course id
    let course_id = req.body.course_id;
    let session_id = req.body.session_id;
    let sections = req.body.sections;
    let main = req.body.main;
    main = main == "true" ? true : false
    let course_exists = await courseSchema.read(course_id)
    if(!course_exists){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('new project class for teacher: resource not found ('+new Date()+')');
        return; 
    }
    // Check session id
    let session_exists = await sessionSchema.read(session_id)
    if(!session_exists){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('new project class for teacher: resource not found ('+new Date()+')');
        return; 
    }
    // Check project class
    let class_exist = await projectClassSchema.read(course_id, session_id)
    if(!class_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('new project class for teacher: resource not found ('+new Date()+')');
        return; 
    }
    // Check if we already have 3 teachers. If yes -> abort insert
    let get_teachers = await projectClassTeacherModel.read_from_project_class(course_id, session_id)
    if(!get_teachers){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log('new project class for teacher: missing parameters ('+new Date()+')');
        return; 
    }
    if(get_teachers.length === 3){
        res.status(400).json({status: "error", description: MSG.maxTeachers});
        console.log('new project class for teacher: max teachers reached ('+new Date()+')');
        return; 
    }
    let dup_entries;
    // Check if teacher is already present and for all the sections
    for(let i in get_teachers){
        let t_id = get_teachers[i].id;
        if(t_id == teacher_id){
            for(let j=0;j<sections.length;j++){
                if(get_teachers[i].section == sections[j]){
                    console.log("Teacher already teaching in a project class specified. Remove section from array of sections")
                    dup_entries = true
                    sections.splice(j, 1)
                    j = j - 1
                }
            }
        }
    }
    // Check if all the sections can exists (data in sections)
    let num_section = class_exist.num_section
    let wrong_sections;
    for(let i=0;i<sections.length;i++){
        if(sections[i].toUpperCase()>String.fromCharCode(65+num_section-1)){
            console.log("new project class for teacher: a section you specified does not exists. Removing section from array of sections");
            wrong_sections = true
            sections.splice(i, 1)
            i = i-1
        }
    }
    // Insert data
    let insert_teacher = await classesSchema.add_single_project_teach(course_id, session_id, teacher_id, sections, main);
    if(!insert_teacher){
        if(dup_entries){
            res.status(409).json({status: "error", description: MSG.itemAlreadyInserted});
            console.log('new project class for teacher: duplicate information ('+new Date()+')');
            return; 
        } else {
            res.status(400).json({status: "error", description: MSG.missingParameter});
            console.log('new project class for teacher: missing parameters ('+new Date()+')');
            return; 
        }
        
    }
    res.status(201).json({status: "accepted", description: "Added teacher to project classes specified", dup_entries: dup_entries, wrong_sections: wrong_sections})
}

module.exports.remove_teacher_from_project_class = async (req, res) => {
    if(req.loggedUser.role == "admin"){
        let user_id = req.loggedUser._id
        let user_exist = await adminModel.read_id(user_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('remove project class for teacher: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('remove project class for teacher: unauthorized access ('+new Date()+')');
        return;
    }
    // Teacher exists
    let teacher_id = req.params.teacher_id;
    let teacher_esist = await teacherSchema.read_id(teacher_id)
    if(!teacher_esist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('remove project class for teacher: resource not found ('+new Date()+')');
        return; 
    }
    // Check course id
    let course_id = req.body.course_id;
    let session_id = req.body.session_id;
    let sections = req.body.sections;
    let course_exists = await courseSchema.read(course_id)
    if(!course_exists){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('remove project class for teacher: resource not found ('+new Date()+')');
        return; 
    }
    // Check session id
    let session_exists = await sessionSchema.read(session_id)
    if(!session_exists){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('remove project class for teacher: resource not found ('+new Date()+')');
        return; 
    }
    // Check project class
    let class_exist = await projectClassSchema.read(course_id, session_id)
    if(!class_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('remove project class for teacher: resource not found ('+new Date()+')');
        return; 
    }
    // Check if we already have only 1 teachers. If yes -> abort insert
    let get_teachers = await projectClassTeacherModel.read_from_project_class(course_id, session_id)
    if(!get_teachers){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log('remove project class for teacher: missing parameters ('+new Date()+')');
        return; 
    }
    let is_present = false
    for(let i in get_teachers){
        let t_id = get_teachers[i].id;
        if(t_id == teacher_id){
            is_present = true
        }
    }
    if(!is_present){
        res.status(400).json({status: "error", description: MSG.teacherDoNotTeachPC});
        console.log('remove project class for teacher: teacher does not teach in the project class specified ('+new Date()+')');
        return; 
    }
    if(get_teachers.length === 1){
        res.status(400).json({status: "error", description: MSG.noMoreTeachers});
        console.log('remove project class for teacher: max teachers reached ('+new Date()+')');
        return; 
    }
    // Insert data
    let delete_teacher = await classesSchema.delete_single(course_id, session_id, teacher_id, sections);
    if(!delete_teacher){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log('new project class for teacher: missing parameters ('+new Date()+')');
        return; 
    }
    res.status(200).json({status: "accepted", description: "Remove teacher from project classes specified"})
}

module.exports.add_teachers = async (req, res) => {
    let user_id = req.loggedUser._id;
    if(req.loggedUser.role == "admin"){
        let admin_exist = await adminModel.read_id(user_id)
        if(!admin_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('update teacher psw: not authorized ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('update teacher psw: not authorized ('+new Date()+')');
        return;
    }
    let existing_teacher, wrong_teacher, teacher_added;
    let teacher_inserted = []
    let teacher_list = req.body.teacher_list;
    for(let teacher in teacher_list){
        let teacher_cf = teacher_list[teacher].cf
        let teacher_name = teacher_list[teacher].name
        let teacher_name_arr = teacher_name.split(" ")
        let teacher_surname = teacher_list[teacher].surname
        let teacher_surname_arr = teacher_surname.split(" ")
        let teacher_gender = teacher_list[teacher].gender
        let teacher_birth_date = teacher_list[teacher].birth_date
        let teacher_address = teacher_list[teacher].address
        let teacher_email = teacher_list[teacher].email
        let username = teacher_name_arr[0].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()+"."+teacher_surname_arr[0].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        for(let i=0; i<teacher_surname_arr.length;i++){
            username += teacher_surname_arr[i].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        }
        let user_exist = await teacherSchema.read_email(teacher_email)
        if(user_exist){
            existing_teacher = true
            console.log("User not valid")
            continue
        }
        let teacher_psw = Math.random().toString(36).slice(-8)
        let assets_link_name = username.split(".")[1]
        let assets_link = "/assets/users/teachers/"+assets_link_name
        let teacher_insert = await teacherSchema.add_teacher(teacher_cf, username, teacher_email, teacher_psw, teacher_name, teacher_surname, teacher_gender, teacher_birth_date, teacher_address, assets_link)
        if(!teacher_insert){
            wrong_teacher = true
            console.log("User not added")
            continue
        } else {
            teacher_added = true
            teacher_inserted.push(username, teacher_psw)
        }
    }
    if(!teacher_added){
        if(existing_teacher){
            res.status(409).json({status: "error", description: "All the users were already present in the database", wrong_teacher: wrong_teacher})
            console.log('Teacher insertion: users already present ('+new Date()+')')
            return
        } else {
            res.status(400).json({status: "error", description: "All the users tried to insert were wrong. Please, check them", wrong_teacher: wrong_teacher})
            console.log('Teacher insertion: missing parameters ('+new Date()+')')
            return
        }
    }
    if(!fs.existsSync('teacher.txt')){
        fs.writeFileSync('teacher.txt', "", function(err){
            if(err) console.log(err)
            console.log("Created");
        })
    }
    let file_content = fs.readFileSync('teacher.txt', 'utf8')
    let lines = file_content.split("\n")
    for (let line in lines){
        let line_arr = lines[line].split(", ")
        let user_username = line_arr[0].split(": ")[1]
        let teacher_exist = await teacherSchema.read_username(user_username)
        if(teacher_exist.first_access){
            if(teacher_inserted.find(element => element==user_username) == undefined){
                teacher_inserted.push(user_username, line_arr[1].split(": ")[1])
            }
            
        }
    }
    fs.writeFile('teacher.txt', '', function(){console.log('done')})
    let teacher_txt = ""
    for(let i = 0; i<teacher_inserted.length;i=i+2){
        teacher_txt += "username: " + teacher_inserted[i] + ", password: " + teacher_inserted[i+1] + "\n"
    }
    fs.appendFile("teacher.txt", teacher_txt, function(err){
        if(err) console.log(err)
        console.log("File created successfully")
    });
    res.status(201).json({status: "accepted", description: "New teacher users added", existing_teacher: existing_teacher, wrong_teacher: wrong_teacher})
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

module.exports.get_tutor_classes = async (req, res) => {
    let teacher_id = req.params.teacher_id;
    if(req.loggedUser.role == "teacher"){
        if(req.loggedUser._id != teacher_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('teacher tutor classes: not authorized ('+new Date()+')');
            return; 
        }
        let existingTeacher = await teacherSchema.read_id(teacher_id);
        if(!existingTeacher){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('teacher tutor classes: not authorized ('+new Date()+')');
            return; 
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('teacher tutor classes: not authorized ('+new Date()+')');
        return;
    }
    let current_session = await sessionSchema.read_current_session();
    if(!current_session){
        res.status(404).json({status: "error", description: "We are in a period that is not covered by a learning session"})
        console.log('teacher tutor classes: not in a session period ('+new Date()+')')
        return
    }
    let cls = await teacherSchema.get_tutor_classes(teacher_id, current_session.school_year);
    if(cls == null){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log('teacher tutor classes: missing parameters ('+new Date()+')');
        return;
    }
    if(!cls){
        res.status(404).json({status: "error", description: "You are not a tutor in any classes for this school year."});
        console.log('teacher tutor classes: teacher is not a tutor in this school year ('+new Date()+')');
        return;
    }
    let data_classes = cls.map((cl) => {
        return {
            study_year: cl.ordinary_class_study_year,
            address: cl.ordinary_class_address,
            school_year: cl.ordinary_class_school_year,
            section: cl.section
        }
    })
    let path = "/api/v1/teachers/"+teacher_id+"/tutor_classes";
    let response = {
        path: path,
        single: false,
        query: {},
        date: new Date(),
        data: data_classes
    }
    res.status(200).json(response);
}

module.exports.get_tutor_years = async (req, res) => {
    let teacher_id = req.params.teacher_id;
    if(req.loggedUser.role == "teacher"){
        if(req.loggedUser._id != teacher_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('teacher tutor years: not authorized ('+new Date()+')');
            return; 
        }
        let existingTeacher = await teacherSchema.read_id(teacher_id);
        if(!existingTeacher){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('teacher tutor years: not authorized ('+new Date()+')');
            return; 
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('teacher tutor years: not authorized ('+new Date()+')');
        return;
    }
    let cls = await teacherSchema.getTutorYears(teacher_id);
    if(cls == null){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log('teacher tutor years: missing parameters ('+new Date()+')');
        return;
    }
    if(!cls){
        res.status(404).json({status: "error", description: "You are not a tutor in any classes."});
        console.log('teacher tutor years: teacher is not a tutor in any classes ('+new Date()+')');
        return;
    }
    let data_classes = cls.map((cl) => cl.ordinary_class_school_year);
    let path = "/api/v1/teachers/"+teacher_id+"/tutor_years";
    let response = {
        path: path,
        single: false,
        query: {},
        date: new Date(),
        data: data_classes
    }
    res.status(200).json(response);
}