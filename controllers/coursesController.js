'use strict';

const sanitizer = require("../utils/sanitizer");
const courseSchema = require('../models/coursesModel');
const projectclassSchema = require('../models/projectClassModel');
const teachingCourseSchema = require('../models/courseteachingModel');
const teacherClassSchema = require('../models/classesTeacherModel');
const opentoSchema = require('../models/opentoModel');
const areaSchema = require('../models/learning_areaModel');
const contextSchema = require('../models/learningContextsModel');
const growthareaSchema = require('../models/growthAreaModel');
const sessionSchema = require('../models/learning_sessionsModel');
const teacherSchema = require('../models/teacherModel');
const ordClassSchema = require('../models/ordinaryclassModel');
const teachingSchema = require('../models/teachingModel'); // To check if teaching exists
const adminSchema = require('../models/adminModel')
const studentSchema = require('../models/studentModel');
const courseteachingModel = require('../models/courseteachingModel');
const courseGrowthAreaModel = require('../models/courseGrowthAreaModel');
const growthAreaModel = require('../models/growthAreaModel');
const subscribeModel = require('../models/subscribeModel');
const nodemailer = require('nodemailer');
let converter = require('json-2-csv');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GOOGLE_ANNOUNCEMENT_EMAIL,
      pass: process.env.GOOGLE_APP_PSW
    }
  });

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    missing_params: "Bad input. Missing required information",
    already_confirmed: "There are project classes for this course that are already confirmed. Deletion abort",
    itemAlreadyExists: "The student is already subscribe to this project class",
    pastSession: "Session already expired or imminent",
    notAuthorized: "Not authorized request",
    courseConfirmed: "The proposition you want to reject was already confirmed. In fact some students are already present",
    changedUniqueInformation: "Some information you wanted to change must remain the same. If you want to change them, please, create a new course model.",
    wrong_code: "The code length is not correct. Please try again"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_courses = async (req, res) => {
    let session_id = req.query.session_id;
    let student_id = req.query.student_id;
    let area_id = req.query.area_id;
    let context_id = req.query.context_id;
    let alone = req.query.alone;
    let courses = await courseSchema.list(student_id, area_id, session_id, context_id, alone);
    if(!courses){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('courses: resource not found('+new Date()+')');
        return;
    }
    let data_courses = courses.map((course) => {
        let learning_area_ref = {
            path: "/api/v1/learning_areas",
            single: true,
            query: {},
            data: {
                id: course.learning_area_id
            }
        }
        let italian_title = sanitizer.encode_output(course.italian_title)
        let english_title = sanitizer.encode_output(course.english_title)
        let section = sanitizer.encode_output(course.section)
        return {
            id: course.id,
            italian_title: italian_title,
            english_title: english_title,
            credits: course.credits,
            learning_area_ref: learning_area_ref,
            section: section,
            pending: course.subscribed
        };
    });
    let response = {
        path: "/api/v1/courses",
        single: true,
        query: {
            student_id: student_id,
            area_id: area_id,
            session_id: session_id,
            context_id: context_id,
            alone: alone
        },
        date: new Date(),
        data: data_courses
    };
    res.status(200).json(response);
}

module.exports.get_courses_v2 = async (req, res) => {
    let session_id = req.query.session_id;
    let student_id = req.query.student_id;
    let query_student_id = student_id;
    if(req.loggedUser.role == "student"){
        if(student_id==undefined){
            student_id = req.loggedUser._id
        }
        let student_exist = await studentSchema.read_id(student_id)
        if(!student_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_courses_v2: unauthorized access ('+new Date()+')');
            return;
        }  
        if(req.loggedUser._id != student_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_courses_v2: unauthorized access ('+new Date()+')');
            return;
        }
    } else if (req.loggedUser.role == "admin"){
        let admin_exist = await adminSchema.read_id(req.loggedUser._id);
        if(!admin_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('get_courses_models: unauthorized access ('+new Date()+')');
                return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('get_courses_v2: unauthorized access ('+new Date()+')');
        return;
    }
    let area_id = req.query.area_id;
    let context_id = req.query.context_id;
    let alone = req.query.alone;
    let courses = await courseSchema.list(student_id, area_id, session_id, context_id, alone);
    if(!courses){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('courses: resource not found ('+new Date()+')');
        return;
    }
    let data_courses = courses.map((course) => {
        let learning_area_ref = {
            path: "/api/v1/learning_areas",
            single: true,
            query: {},
            data: {
                id: course.learning_area_id
            }
        }
        let italian_title = sanitizer.encode_output(course.italian_title)
        let english_title = sanitizer.encode_output(course.english_title)
        let section = sanitizer.encode_output(course.section)
        return {
            id: course.id,
            italian_title: italian_title,
            english_title: english_title,
            credits: course.credits,
            learning_area_ref: learning_area_ref,
            group: course.group,
            pending: course.subscribed,
            section: section,
            final_confirmation: course.final_confirmation,
        };
    });
    let response = {
        path: "/api/v2/courses",
        single: true,
        query: {
            student_id: query_student_id,
            area_id: area_id,
            session_id: session_id,
            context_id: context_id,
            alone: alone
        },
        date: new Date(),
        data: data_courses
    };
    res.status(200).json(response);
}

module.exports.get_course = async (req, res) => {
    let course_id = req.params.course_id;
    let admin_info = req.query.admin_info;
    let course = await courseSchema.read(course_id, admin_info);
    if(!course){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('single course: resource not found ('+new Date()+')');
        return;
    }
    let proposer_teacher_ref = {
        path: "/api/v1/teacher", 
        single: true, 
        query: {},
        data: {
            id: course.proposer_teacher_id
        }
    };
    let certifying_admin_ref = {
        path: "/api/v1/admin", 
        single: true, 
        query: {},
        data: {
            id: course.certifying_admin_id
        }
    };
    let learning_area_ref = {
        path: "/api/v1/learning_areas",
        single: true,
        query: {},
        data: {
            id: course.learning_area_id
        }
    }
    let italian_title = sanitizer.encode_output(course.italian_title)
    let english_title = sanitizer.encode_output(course.english_title)
    let italian_description = sanitizer.encode_special_output(course.italian_description)
    let english_description = sanitizer.encode_special_output(course.english_description)
    let italian_expected_learning_results = sanitizer.encode_special_output(course.italian_expected_learning_results)
    let english_expected_learning_results = sanitizer.encode_special_output(course.english_expected_learning_results)
    let italian_criterions = sanitizer.encode_special_output(course.italian_criterions)
    let english_criterions = sanitizer.encode_special_output(course.english_criterions)
    let italian_activities = sanitizer.encode_special_output(course.italian_activities)
    let english_activities = sanitizer.encode_special_output(course.english_activities)
    let learning_area_ita = sanitizer.encode_output(course.learning_area_ita)
    let learning_area_eng = sanitizer.encode_output(course.learning_area_eng)
    let growth_area_ita = sanitizer.encode_output(course.italian_growth_area)
    let growth_area_eng = sanitizer.encode_output(course.english_growth_area)
    let teacher_name = sanitizer.encode_output(course.teacher_name)
    let teacher_surname = sanitizer.encode_output(course.teacher_surname)
    let admin_name = sanitizer.encode_output(course.admin_name)
    let admin_surname = sanitizer.encode_output(course.admin_surname)
    let data_course = {
        id: course.id,
        italian_title: italian_title,
        english_title: english_title,
        creation_date: course.creation_date,
        italian_description: italian_description,
        english_description: english_description,
        up_hours: course.up_hours,
        credits: course.credits,
        italian_expected_learning_results: italian_expected_learning_results,
        english_expected_learning_results: english_expected_learning_results,
        italian_criterions: italian_criterions,
        english_criterions: english_criterions,
        italian_activities: italian_activities,
        english_activities: english_activities,
        learning_area_ref: learning_area_ref,
        italian_learning_area: learning_area_ita,
        english_learning_area: learning_area_eng,
        italian_growth_area: growth_area_ita,
        english_growth_area: growth_area_eng,
        min_students: course.min_students,
        max_students: course.max_students,
        proposer_teacher_ref: proposer_teacher_ref,
        teacher_name: teacher_name,
        teacher_surname: teacher_surname,
        certifying_admin_ref: certifying_admin_ref,
        admin_name: admin_name,
        admin_surname: admin_surname,
        admin_confirmation: course.admin_confirmation
    };
    let response = {
        path: "/api/v1/courses",
        single: true,
        query: {
            admin_info: admin_info
        },
        date: new Date(),
        data: data_course
    };
    res.status(200).json(response);
}

module.exports.get_courses_model = async (req, res) => {
    let teacher_id = req.query.teacher_id;
    let is_admin = true;
    if (req.loggedUser.role == "teacher"){
        if(teacher_id != undefined){
            let teacher_esist = await teacherSchema.read_id(teacher_id);
            if(!teacher_esist){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('get_courses_models: unauthorized access ('+new Date()+')');
                return;
            }
            if(req.loggedUser._id != teacher_id){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('get_courses_models: unauthorized access ('+new Date()+')');
                return;
            }
        } else {
            teacher_id = req.loggedUser._id
            let teacher_esist = await teacherSchema.read_id(teacher_id);
            if(!teacher_esist){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('get_courses_models: unauthorized access ('+new Date()+')');
                return;
            }
        }
        is_admin = false
    } else if (req.loggedUser.role == "admin"){
        let admin_exist = await adminSchema.read_id(req.loggedUser._id);
        if(!admin_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('get_courses_models: unauthorized access ('+new Date()+')');
                return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('get_courses_v2: unauthorized access ('+new Date()+')');
        return;
    }
    let session_id = req.query.session_id;
    let school_year = req.query.school_year;
    let session_exist, school_year_exist
    if(session_id!=undefined){
        session_exist = await sessionSchema.read(session_id)
        if(!session_exist){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('resource not found: learning session ('+new Date()+')');
            return;
        }
    }
    if(school_year!=undefined){
        school_year_exist = await sessionSchema.year_exist(school_year)
        if(!school_year_exist){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('resource not found: school year not defined in learning sessions ('+new Date()+')');
            return;
        }
    }
    let recent_models = req.query.recent_models;
    let actual_recent_models = parseInt(recent_models);
    if (isNaN(actual_recent_models) && recent_models === "true"){
        actual_recent_models = true
    } else if (isNaN(actual_recent_models) && recent_models === "false"){
        actual_recent_models = false
    } else if(actual_recent_models<0){
        actual_recent_models = 0
    }
    let not_confirmed = req.query.not_confirmed;
    if (not_confirmed!=undefined){
        not_confirmed = not_confirmed === "true" ? true : false
    }
    let models;
    if (typeof(actual_recent_models)=="number" || (typeof(actual_recent_models)=="boolean" && actual_recent_models)){
        models = await courseSchema.get_course_models(actual_recent_models, school_year)
    } else {
        if(school_year_exist!=undefined && session_exist!=undefined){
            if(school_year != session_exist.school_year){
                res.status(400).json({status: "error", description: "The session and the school year you passed are not in the same school year definition. Please try again."});
                console.log('get_course_models: school year not equal to session school_year ('+new Date()+')');
                return;
            }
            models = await courseSchema.get_models(teacher_id, not_confirmed, is_admin, school_year)
        } else if(school_year_exist!=undefined){
            models = await courseSchema.get_models(teacher_id, not_confirmed, is_admin, school_year)
        } else if(session_exist!=undefined){
            models = await courseSchema.get_class_models(teacher_id, not_confirmed, is_admin, session_id);
        } else {
            models = await courseSchema.get_models(teacher_id, not_confirmed, is_admin)
        }
    }
    //console.log(models)
    let data_models = await Promise.all(models.map(async (model) => {
        let preferences;
        if(session_exist!=undefined && (typeof(actual_recent_models)=="boolean" && !actual_recent_models)){
            preferences = 0
            let pending_students = await subscribeModel.get_pending_students(model.id, session_id)
            if(pending_students!=false){
                preferences = pending_students.length;
            }
        }
        let course_ref = {
            path: "/api/v1/courses",
            single: true,
            query: {},
            data: {
                id: model.id
            }
        }
        let proposer_teacher_ref
        if(model.proposer_teacher_id!=undefined){
            proposer_teacher_ref = {
                path: "/api/v1/teacher", 
                single: true, 
                query: {},
                data: {
                    id: model.proposer_teacher_id
                }
            }; 
        }
        let certifying_admin_ref
        if(model.certifying_admin_id!=undefined){
            certifying_admin_ref = {
                path: "/api/v1/admin", 
                single: true, 
                query: {},
                data: {
                    id: model.certifying_admin_id
                }
            };
        }
        let project_class_code = sanitizer.encode_output(model.project_class_code)
        let italian_title = sanitizer.encode_output(model.italian_title)
        let english_title = sanitizer.encode_output(model.english_title)
        let admin_name = sanitizer.encode_output(model.admin_name)
        let admin_surname = sanitizer.encode_output(model.admin_surname)
        let teacher_name = sanitizer.encode_output(model.teacher_name)
        let teacher_surname = sanitizer.encode_output(model.teacher_surname)
        return{
            course_ref: course_ref,
            italian_title: italian_title,
            english_title: english_title,
            creation_school_year: model.creation_school_year,
            learning_session_id: model.learning_session_id,
            project_class_confirmation_date: model.project_class_confirmation_date,
            project_class_to_be_modified: model.project_class_to_be_modified,
            project_class_code: project_class_code,
            course_confirmation_date: model.course_confirmation_date,
            course_to_be_modified: model.course_to_be_modified,
            certifying_admin_ref: certifying_admin_ref,
            admin_name: admin_name,
            admin_surname: admin_surname,
            proposer_teacher_ref: proposer_teacher_ref,
            teacher_name: teacher_name,
            teacher_surname: teacher_surname,
            preferences: preferences
        }
    }))
    let response = {
        path: "/api/v1/propositions",
        single: true,
        query: {
            teacher_id: teacher_id,
            recent_models: recent_models,
            not_confirmed: not_confirmed,
            school_year: school_year,
            session_id: session_id
        },
        date: new Date(),
        data: data_models
    };
    res.status(200).json(response);
}

module.exports.add_proposition = async (req, res) => {
    let wrong_context, wrong_ord_class, wrong_teaching, wrong_teacher, wrong_growth_area = undefined; //Variables to identify if there are some values that are not valid in insertion
    let teacher_id = req.query.teacher_id;
    if(req.loggedUser.role == "teacher"){
        if(teacher_id == undefined){
            teacher_id = req.loggedUser._id;
        }
        let user_exist = await teacherSchema.read_id(teacher_id)
        if(teacher_id!=req.loggedUser._id || !user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('course proposition insertion: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('course proposition insertion: unauthorized access ('+new Date()+')');
        return;
    }
    let course_id = req.body.course_id;
    let ita_title = sanitizer.encode_input(req.body.italian_title);
    let eng_title = sanitizer.encode_input(req.body.english_title);
    let ita_descr = sanitizer.encode_special_output(req.body.italian_descr);
    let eng_descr = sanitizer.encode_special_output(req.body.english_descr);
    let ita_exp_l = sanitizer.encode_special_output(req.body.italian_exp_l);
    let eng_exp_l = sanitizer.encode_special_output(req.body.english_exp_l);
    let ita_cri = sanitizer.encode_special_output(req.body.italian_cri);
    let eng_cri = sanitizer.encode_special_output(req.body.english_cri);
    let ita_act = sanitizer.encode_special_output(req.body.italian_act);
    let eng_act = sanitizer.encode_special_output(req.body.english_act);
    let up_hours = req.body.up_hours;
    let credits = req.body.credits;
    let area_id = req.body.area_id;
    let growth_list = req.body.growth_list; //Its an array like teaching_list
    let min_students = req.body.min_students;
    let max_students = req.body.max_students;
    let area_id_exists = await areaSchema.read(area_id); // Is learning area present in the database
    if(!area_id_exists){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found: learning area ('+new Date()+')');
        return;
    }
    /*let growth_id_exists = await growthareaSchema.read(growth_id) // Is growth area present in the dataset
    if(!growth_id_exists){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found: growth area');
        return;
    }*/
    let session_id = req.body.session_id;
    let session_id_exists = await sessionSchema.read(session_id); // Is learning session present in the database
    if(!session_id_exists){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found: learning session ('+new Date()+')');
        return;
    }
    let session_year = session_id_exists.school_year
    //Check if session starting date is ahead in time of at least 10 days
    let starting_date = new Date(session_id_exists.start)
    let today = new Date()
    let _10days = today.setDate(today.getDate() + 10)
    if (starting_date <= today || starting_date <= _10days){
        res.status(400).json({status: "error", description: MSG.pastSession});
        console.log('course proposition insertion: tried to add a proposition for a session already started ('+new Date()+')');
        return;
    }
    // Add new classes
    let access_object = req.body.access_object;
    // Add new teachings
    let teaching_list = req.body.teaching_list;
    // Add new project class proposal (no confirmation of admin yet)
    if (req.body.project_class_code != undefined && req.body.project_class_code.length != 8) {
        res.status(400).json({status: "error", description: MSG.wrong_code})
        console.log('course proposition: project class code is not of the correct size ('+new Date()+')');
        return;
    }
    let project_class_code = sanitizer.encode_input(req.body.project_class_code);
    let ita_class_name = sanitizer.encode_input(req.body.italian_class_name);
    let eng_class_name = sanitizer.encode_input(req.body.english_class_name);
    let class_group = req.body.class_group;
    let num_section = req.body.num_section;
    // Add teachers of the course into project_teach
    let teacher_list = req.body.teacher_list;
    let new_course_id = course_id == undefined ? true : false
    let publication = undefined;
    let course_exist, course_id_exist, same_year;
    if(!new_course_id){
        course_id_exist = await courseSchema.read(course_id);
    } else {
        course_id_exist = false
    }
    if(course_id_exist){
        if(course_id_exist.italian_title == ita_title && course_id_exist.creation_school_year == session_year){
            same_year = true
        } else {
            same_year = await courseSchema.already_inserted_year(ita_title, eng_title, session_year)
            if(same_year == null){
                res.status(400).json({status: "error", description: MSG.missing_params, course_exist: false})
                console.log('missing required information: new course proposal addition, check if course proposal inserted today with same title ('+new Date()+')');
                return;
            }
        }
    } else {
        same_year = await courseSchema.already_inserted_year(ita_title, eng_title, session_year)
        if(same_year == null){
            res.status(400).json({status: "error", description: MSG.missing_params, course_exist: false})
            console.log('missing required information: new course proposal addition, check if course proposal inserted today with same title ('+new Date()+')');
            return;
        }
    }
    course_exist = await courseSchema.read_complete(ita_title, eng_title, up_hours, credits, area_id, min_students, max_students)
    if(course_exist){
        course_id = course_exist
    } else {
        course_id = 0
    }
    if(course_id==0 || course_id == undefined){
        if(min_students+4>max_students){
            res.status(400).json({status: "error", description: "Range of possible students too short. Increase it and try again."});
            console.log('add proposition: range of students too small ('+new Date()+')');
            return;
        }
    }
    //console.log(course_id)
    // Let's now check if there is any new value in the other objects. If there are new ordinary classes or contexts or new teachings, add new course
    let new_classes, new_teachings, new_growth_area = false
    // Check information about classes that can access the new course
    let context_exist, class_exist, already_present, study_year, study_address, growth_exist, growth_area_present;
    // Remove non valid contexts and classes
    if(access_object!=undefined){
        for(var context in access_object){
            context_exist = await contextSchema.read(context)
            if(!context_exist){ // The learning context exists?
                console.log(`The context with id ${context} does not exists. Removing it from the access_object`)
                wrong_context = true
                delete access_object[context]
                continue         
            }
            for(let index=0;index<access_object[context].length;index++){
                study_year = access_object[context][index].study_year;
                let study_year_exist = await ordClassSchema.check_study_year(study_year)
                if(!study_year_exist){
                    console.log(`The study year ${study_year} does not exists. Removing class from the list of classes for a learning context`)
                    wrong_ord_class = true
                    access_object[context].splice(index, 1)
                    index = index - 1
                    continue
                }
                study_address = access_object[context][index].study_address;
                let study_address_exists = await ordClassSchema.check_study_address(study_address)
                if(!study_address_exists){
                    console.log(`The study address ${study_address_exists} does not exists. Removing class from the list of classes for a learning context`)
                    wrong_ord_class = true
                    access_object[context].splice(index, 1)
                    index = index - 1
                    continue
                }
                let study_address_max_num = study_address_exists.num_classes
                if(study_year>study_address_max_num){
                    console.log(`The class ${study_year} ${study_address} does not exists. Removing it from the list of classes for a learning context`)
                    wrong_ord_class = true
                    access_object[context].splice(index, 1)
                    index = index - 1
                    continue
                }
            }
            if(access_object[context].length == 0){
                // If all classes where invalid, delete the context from the object
                console.log(`All the classes for context ${context} does not exist. Removing it from the object`)
                wrong_context = true
                delete access_object[context]
            }
        }
    }
    if(access_object!=undefined){
        for(var context in access_object){
            // Loop through all valid classes in a context
            for(let index=0;index<access_object[context].length;index++){
                study_year = access_object[context][index].study_year;
                study_address = access_object[context][index].study_address;
                already_present = await opentoSchema.is_present(course_id, context, study_year, study_address) // The class exists for this school year
                if(!already_present){ // If a class is not present, it means we have a new value -> add new course
                    new_classes = true
                }
            }
        }
    }
    let teaching_exist, teaching_present;
    if(teaching_list != undefined){
        // Remove non valid teachings in order to have right values in case of insertion
        for(let i = 0; i<teaching_list.length;i++){
            if(i>=3){
                console.log(`Teaching ${teaching_list[i]} is more. There should be at most 3 teachings per course proposal. Removing it from the list of teachings`)
                wrong_teaching = true // Set variable to true
                teaching_list.splice(i,1)
                i = i - 1
            } else {
                teaching_exist = await teachingSchema.read(teaching_list[i])
                if(!teaching_exist){ // The teaching exists in the database
                    console.log(`Teaching ${teaching_list[i]} does not exists. Removing it from the list of teachings`)
                    wrong_teaching = true // Set variable to true
                    teaching_list.splice(i, 1) // Remove wrong teaching from list
                    i = i-1 // It's needed since splice does also a reindexing. Meaning we will skip the control of 1 index
                }
            } 
        }
        for(let i = 0; i<teaching_list.length; i++){
            teaching_present = await teachingCourseSchema.is_present(course_id, teaching_list[i])
            if(!teaching_present){ // If a teaching is not present, it means we have a new value -> add new course
                new_teachings = true // If a context is new, it means we add new classes, so its the same
            }
        }
    }
    // Check growth areas
    if(growth_list!=undefined){
        // Remove non valid teachings in order to have right values in case of insertion
        for(let i = 0; i<growth_list.length;i++){
            if(i>=3){
                console.log(`Teaching ${growth_list[i]} is more. There should be at most 3 teachings per course proposal. Removing it from the list of teachings`)
                wrong_growth_area = true // Set variable to true
                growth_list.splice(i,1)
                i = i - 1
            } else {
                growth_exist = await growthAreaModel.read(growth_list[i])
                if(!growth_exist){ // The teaching exists in the database
                    console.log(`Teaching ${growth_list[i]} does not exists. Removing it from the list of teachings`)
                    wrong_growth_area = true // Set variable to true
                    growth_list.splice(i, 1) // Remove wrong teaching from list
                    i = i-1 // It's needed since splice does also a reindexing. Meaning we will skip the control of 1 index
                }
            } 
        }
        for(let i = 0; i<growth_list.length; i++){
            growth_area_present = await courseGrowthAreaModel.is_present(course_id, growth_list[i])
            if(!growth_area_present){ // If a teaching is not present, it means we have a new value -> add new course
                new_growth_area = true // If a context is new, it means we add new classes, so its the same
            }
        }
    }
    if((new_teachings || new_classes || new_growth_area) && !same_year){
        course_exist = false
    }
    // If course_id in request body is not undefined and all the other values related only to the course already exist,
    // we are using a previous proposal and simply use it in another learning_session
    // Else, if even one value is new, we are adding the course again as a new model
    if(!course_exist && !same_year){
        // Set new_course_id to true if it was not already done since we created a new course by modifying an existing model
        new_course_id = true
        //If the course does not exist, add new course to course table
        let new_course = await courseSchema.add_proposition(ita_title, eng_title, session_year, ita_descr, eng_descr, up_hours, credits, ita_exp_l, eng_exp_l, ita_cri, eng_cri, ita_act, eng_act, area_id, min_students, max_students, teacher_id);
        if(!new_course){
            if(course_exist){
                course_exist = true
            }
            res.status(400).json({status: "error", description: MSG.missing_params, course_exist: course_exist})
            console.log('missing required information: new course proposal addition ('+new Date()+')');
            return;
        }
        //Get inserted course table for other insertions
        // If course_id was setted from request, we update it with the new instance model
        course_id = new_course.rows.insertId.toString()
        publication = new_course.date
        let opentoIns = await opentoSchema.add(course_id, access_object);
        if(!opentoIns){
            if(new_course_id){
                if(course_exist){
                    course_exist = true
                }
                // If error occurs and the course added is new, delete entry added in course
                res.status(400).json({status: "error", description: MSG.missing_params, wrong_ord_class: wrong_ord_class, wrong_context: wrong_context, course_exist: class_exist})
                console.log('missing required information: new course proposal addition. Accessible classes ('+new Date()+')');
                await courseSchema.deleteProposal(course_id);
                return
            }
        }
        // Add informations about teaching of the course
        let teaching_ins = await teachingCourseSchema.add(course_id, teaching_list)
        if(!teaching_ins){
            if(new_course_id){
                if(course_exist){
                    course_exist = true
                }
                // If error occurs, delete entries in accessible table and entry added in course
                res.status(400).json({status: "error", description: MSG.missing_params, wrong_ord_class: wrong_ord_class, wrong_context: wrong_context, wrong_teaching: wrong_teaching, course_exist: course_exist})
                console.log('missing required information: new course proposal addition. Teachings ('+new Date()+')');
                await opentoSchema.delete(course_id)
                await courseSchema.deleteProposal(course_id)
                return 
            } 
        }
        let growth_area_ins = await courseGrowthAreaModel.add(course_id, growth_list)
        if(!growth_area_ins){
            if(new_course_id){
                if(course_exist){
                    course_exist = true
                }
                res.status(400).json({status: "error", description: MSG.missing_params, wrong_ord_class: wrong_ord_class, wrong_context: wrong_context, wrong_teaching: wrong_teaching, wrong_growth_area: wrong_growth_area, course_exist: course_exist})
                console.log('missing required information: new course proposal addition. Growth area ('+new Date()+')');
                await teachingCourseSchema.delete(course_id)
                await opentoSchema.delete(course_id)
                await courseSchema.deleteProposal(course_id)
                return 
            }
        }
    }
    let course_wrong_value = false
    if((wrong_context || wrong_ord_class || wrong_teaching || wrong_growth_area) && new_course_id) {
        await courseSchema.add_to_be_modified(course_id)
        course_wrong_value = true
    }
    let proj_class_exists = await projectclassSchema.read(course_id, session_id)
    if(proj_class_exists && course_exist){
        course_exist = true
        proj_class_exists = true
        res.status(409).json({status: "error", description: MSG.itemAlreadyExists, course_exist: course_exist, proj_class_exists:proj_class_exists})
        console.log('Duplicate entry for course proposal insertion ('+new Date()+')')
        return
    }
    // The teachers in teacher_list exists?
    let teacher_exists
    let possible_sections = num_section != undefined ? num_section : 0
    // Teacher list is structure in this way: [{teacher_id, main, sections:[]}]
    if(teacher_list!=undefined){
        for(let i=0;i<teacher_list.length;i++){
            let t_id = teacher_list[i]["teacher_id"]
            let sections = teacher_list[i]["sections"]
            teacher_exists = await teacherSchema.read_id(t_id)
            if(!teacher_exists){
                console.log(`Teacher with id ${t_id} does not exists. Removing it from the list of associated teachers`)
                wrong_teacher = true
                teacher_list.splice(i,1) // Without throwing an error, we simply remove the teacher that does not exists 
                i = i-1 // It's needed since splice does also a reindexing. Meaning we will skip the control of 1 index
            } else {
                for(let j=0;j<sections.length;j++){
                    if(sections[j].toUpperCase()>String.fromCharCode(65+possible_sections)){
                        console.log(`Requested add new class for teacher ${t_id} with section ${sections[j]}, but it is not available. Removing it from the list of the sections of the teachers`)
                        sections.splice(j,1)
                        j = j-1
                    }
                }
                if(sections.length==0){
                    console.log(`No more sections for teacher ${t_id}. Removing it from the list of associated teachers`)
                    wrong_teacher = true
                    teacher_list.splice(i,1) // Without throwing an error, we simply remove the teacher that does not exists 
                    i = i-1 // It's needed since splice does also a reindexing. Meaning we will skip the control of 1 index
                }
            }
            
        }
    } else {
        teacher_list = [];
        let sections = [];
        for(let i=0; i<num_section;i++){
            sections.push(String.fromCharCode(65+i))
        }
        teacher_list.push({teacher_id: teacher_id, main: 1, sections: sections})
    }
    let myself = false
    for(let i=0; i<teacher_list.length && !myself;i++){
        if(teacher_list[i]["teacher_id"]==teacher_id){
            myself = true
        }
    }
    if(!myself){
        let sections = [];
        for(let i=0; i<num_section;i++){
            sections.push(String.fromCharCode(65+i))
        }
        teacher_list.push({teacher_id: teacher_id, main: 1, sections: sections})
    }
    let teacher_present, new_teacher
    if(proj_class_exists){
        for(let i=0;i<teacher_list.length;i++){
            let t_id = teacher_list[i]["teacher_id"]
            let main_teacher = teacher_list[i]["main"]
            let sections = teacher_list[i]["sections"]
            for(let j=0;j<sections.length;j++){
                teacher_present = await teacherClassSchema.is_present(course_id, session_id, sections[j].toUpperCase(), t_id, main_teacher);
                if(!teacher_present){
                    new_teacher = true
                }
            }
            
        }
    }
    //console.log(course_id)
    let proj_class_ins = await projectclassSchema.add(course_id, session_id, project_class_code, ita_class_name, eng_class_name, class_group, num_section, teacher_id);
    if(!proj_class_ins){
        if(!course_exist){ // If the course was not inside the database, delete all the information about it
            res.status(400).json({status: "error", description: MSG.missing_params, wrong_ord_class: wrong_ord_class, wrong_context: wrong_context, wrong_teaching: wrong_teaching, wrong_growth_area: wrong_growth_area, course_exist: course_exist})
            console.log('missing required information: new course proposal addition. Project class ('+new Date()+')');
            await courseGrowthAreaModel.delete(course_id)
            await teachingCourseSchema.delete(course_id)
            await opentoSchema.delete(course_id)
            await courseSchema.deleteProposal(course_id)
            return
        } else {
            if(course_exist){
                course_exist = true
            }
            res.status(400).json({status: "error", description: MSG.missing_params, course_exist: course_exist})
            console.log('missing required information: new course proposal addition. Project class ('+new Date()+')');
            return
        }
    }
    let teachers_ins = await teacherClassSchema.add_project_teach(course_id, session_id, teacher_list);
    if(!teachers_ins){
        if(!course_exist){
            res.status(400).json({status: "error", description: MSG.missing_params, wrong_ord_class: wrong_ord_class, wrong_context: wrong_context, wrong_teaching: wrong_teaching, wrong_teacher: wrong_teacher, wrong_growth_area: wrong_growth_area, course_exist: course_exist})
            console.log('missing required information: new course proposal addition. Project class ('+new Date()+')');
            await projectclassSchema.delete(course_id, session_id)
            await courseGrowthAreaModel.delete(course_id)
            await teachingCourseSchema.delete(course_id)
            await opentoSchema.delete(course_id)
            await courseSchema.deleteProposal(course_id)
            return
        } else {
            if(!proj_class_exists){
                course_exist = true
                await projectclassSchema.delete(course_id, session_id)
                res.status(400).json({status: "error", description: MSG.missing_params, course_exist: course_exist})
                console.log('missing required information: new course proposal addition. Project teach insertion ('+new Date()+')');
                return
            }
        }
    }
    if((wrong_teacher || course_wrong_value) && !proj_class_exists){
        await projectclassSchema.add_to_be_modified(course_id, session_id)
    }
    if(course_exist){
        course_exist = true
    }
    res.status(201).json({
        status: "accepted",
        description: "Course proposal inserted", 
        course_id: course_id, 
        publication: publication, 
        course_exist: course_exist, 
        wrong_ord_class: wrong_ord_class, 
        wrong_context: wrong_context, 
        wrong_teaching: wrong_teaching, 
        wrong_teacher: wrong_teacher,
        wrong_growth_area: wrong_growth_area
    });
}

module.exports.approve_proposals = async (req, res) => {
    let admin_id;
    if(req.loggedUser.role==="admin"){
        admin_id = req.loggedUser._id
        let user_exist = await adminSchema.read_id(admin_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('course proposition approval: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('course proposition approval: unauthorized access ('+new Date()+')');
        return;
    }
    let course_id = req.query.course_id;
    let session_id = req.query.session_id;
    let course_exist = await courseSchema.read(course_id, true);
    if(!course_exist){
        res.status(404).json({status: "error", description: MSG.notFound})
        console.log('resource not found: course approval course_id ('+new Date()+')');
        return
    }
    let session_exist = await sessionSchema.read(session_id)
    if(!session_exist){
        res.status(404).json({status: "error", description: MSG.notFound})
        console.log('resource not found: session course approval ('+new Date()+')');
        return
    }
    let approved = req.query.approved;
    approved = approved === "false" ? 0 : 1;
    let proj_class = req.query.proj_class;
    proj_class = (proj_class === "true" || proj_class == 1) ? 1 : 0;
    if(approved && proj_class){
        let class_exist = await projectclassSchema.read(course_id, session_id)
        if(class_exist == null){
            res.status(400).json({status: "error", description: MSG.missing_params})
            console.log('missing parameters: project class course approval ('+new Date()+')');
            return
        }
        if(!class_exist){
            res.status(404).json({status: "error", description: MSG.notFound})
            console.log('resource not found: project class course approval ('+new Date()+')');
            return
        }
    }
    if(approved){
        let course_approval = await courseSchema.approve_proposal(course_id, session_id, admin_id, approved, proj_class)
        if(!course_approval){
            res.status(400).json({status: "error", description: MSG.missing_params})
            console.log('missing required information: course approval ('+new Date()+')');
            return
        }
        let proj_class_deleted = !proj_class;
        if(proj_class_deleted){
            await teacherClassSchema.delete(course_id, session_id)
            await projectclassSchema.delete(course_id, session_id)
        }
        
        res.status(200).json({status: "accepted", description: "Resources updated successfully", confirmation_date: course_approval.confirmation_date, project_class_deleted: proj_class_deleted})
    } else {
        let students_in = await projectclassSchema.classComponents(course_id, session_id)
        if(students_in.length>0){
            res.status(400).json({status: "error", description: MSG.courseConfirmed})
            console.log('The proposition you tried to reject was already been approved ('+new Date()+')')
            return
        }
        let course_del = false
        await teacherClassSchema.delete(course_id, session_id)
        await projectclassSchema.delete(course_id, session_id)
        let get_class_sessions = await projectclassSchema.get_sessions(course_id)
        if(!get_class_sessions){
            await courseGrowthAreaModel.delete(course_id)
            await courseteachingModel.delete(course_id)
            await opentoSchema.delete(course_id)
            await courseSchema.deleteProposal(course_id)
            course_del = true
        }
        res.status(200).json({status: "deleted", description: "Proposition deleted since it was not approved", course_deleted: course_del})
    }
    
    
}

module.exports.delete_course = async (req, res) => {
    if(req.loggedUser.role==="admin"){
        let admin_id = req.loggedUser._id
        let user_exist = await adminSchema.read_id(admin_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('course proposition approval: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('course proposition approval: unauthorized access ('+new Date()+')');
        return;
    }
    let course_id = req.params.course_id;
    let course_exist = await courseSchema.read(course_id, true);
    if(!course_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('course deletion: course does not exists ('+new Date()+')');
        return;
    }
    let sessions = await projectclassSchema.get_sessions(course_id)
    if(!sessions){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('course deletion: course does not exists ('+new Date()+')');
        return;
    }
    let project_class_confirmed;
    for(let i in sessions){
        project_class_confirmed = await projectclassSchema.class_confirmed_exists(course_id, sessions[i].learning_session_id)
        if(project_class_confirmed){
            res.status(400).json({status: "error", description: MSG.already_confirmed});
            console.log('course deletion: project classes already confirmed ('+new Date()+')');
            return;
        }
    }
    for(let i in sessions){
        await teacherClassSchema.delete(course_id, sessions[i].learning_session_id)
        await projectclassSchema.delete(course_id, sessions[i].learning_session_id)
    }
    await courseGrowthAreaModel.delete(course_id)
    await opentoSchema.delete(course_id)
    await teachingCourseSchema.delete(course_id)
    await courseSchema.deleteProposal(course_id)
    res.status(200).json({status: "deleted", description: "Course deleted successfully"});
}

module.exports.update_course = async (req, res) => {
    if(req.loggedUser.role==="admin"){
        let admin_id = req.loggedUser._id
        let user_exist = await adminSchema.read_id(admin_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('course update: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('course update: unauthorized access ('+new Date()+')');
        return;
    }
    let course_id = req.params.course_id;
    let course_exist = await courseSchema.read(course_id, true)
    if(!course_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('course update: course not found ('+new Date()+')');
        return;
    }
    let ita_title = sanitizer.encode_input(req.body.italian_title);
    let eng_title = sanitizer.encode_input(req.body.english_title);
    let ita_descr = sanitizer.encode_special_output(req.body.italian_descr);
    let eng_descr = sanitizer.encode_special_output(req.body.english_descr);
    let ita_exp_l = sanitizer.encode_special_output(req.body.italian_exp_l);
    let eng_exp_l = sanitizer.encode_special_output(req.body.english_exp_l);
    let ita_cri = sanitizer.encode_special_output(req.body.italian_cri);
    let eng_cri = sanitizer.encode_special_output(req.body.english_cri);
    let ita_act = sanitizer.encode_special_output(req.body.italian_act);
    let eng_act = sanitizer.encode_special_output(req.body.english_act);
    let up_hours = req.body.up_hours;
    let credits = req.body.credits;
    let area_id = req.body.area_id;
    let growth_list = req.body.growth_list;
    let min_students = req.body.min_students;
    let max_students = req.body.max_students;
    let course_not_updated;
    if(course_exist.admin_confirmation!=undefined){
        if(eng_title==undefined && eng_descr==undefined && eng_exp_l==undefined && eng_cri == undefined && eng_act==undefined){
            course_not_updated = true
        }
    }
    let area_id_exists
    if(area_id!=undefined){
        area_id_exists = await areaSchema.read(area_id); // Is learning area present in the database
        if(!area_id_exists){
            res.status(404).json({status: "error", description: MSG.notFound,course_not_updated:course_not_updated});
            console.log('resource not found: learning area ('+new Date()+')');
            return;
        }
    }
    /*let growth_id_exists
    if(growth_id!=undefined){
        growth_id_exists = await growthareaSchema.read(growth_id) // Is growth area present in the dataset
        if(!growth_id_exists){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('resource not found: growth area');
            return;
        }
    }*/
    if(ita_title!=undefined){
        if(course_exist.italian_title != ita_title){
            res.status(400).json({status: "error", description: MSG.changedUniqueInformation, course_not_updated: course_not_updated});
            console.log('course update: changed some important information ('+new Date()+')');
            return;
        }
    }
    let session_id = req.body.session_id;
    let session_id_exists = await sessionSchema.read(session_id); // Is learning session present in the database
    if(!session_id_exists){
        res.status(404).json({status: "error", description: MSG.notFound, course_not_updated: course_not_updated});
        console.log('resource not found: learning session ('+new Date()+')');
        return;
    }
    let access_object = req.body.access_object;
    let teaching_list = req.body.teaching_list;
    if (req.body.project_class_code != undefined && req.body.project_class_code.length != 8) {
        res.status(400).json({status: "error", description: MSG.wrong_code})
        console.log('course proposition: project class code is not of the correct size ('+new Date()+')');
        return;
    }
    let project_class_code = sanitizer.encode_input(req.body.project_class_code);
    let ita_class_name = sanitizer.encode_input(req.body.italian_class_name);
    let eng_class_name = sanitizer.encode_input(req.body.english_class_name);
    let class_group = req.body.class_group;
    let num_section = req.body.num_section;
    let teacher_list = req.body.teacher_list;
    let starting_date = session_id_exists.start
    let today = new Date()
    let _10days = new Date(today).setDate(today.getDate() + 10)
    if (starting_date < today){
        res.status(400).json({status: "error", description: MSG.pastSession});
        console.log('course update: the session is a past session. The data of the project class were not updated ('+new Date()+')');
        return;
    }
    // If session is imminent or current or is the first future session (the one where the students are choosing the courses) you cannot change the class group
    if(starting_date == today || starting_date <= _10days) {
        class_group = undefined
    } else {
        let past_session = await sessionSchema.read(session_id-1)
        if(past_session){
            let past_starting_date = new Date(past_session.start)
            if(past_starting_date <= today || past_starting_date <= _10days){
                class_group = undefined
            }
        }
    }
    let wrong_context, wrong_ord_class, wrong_teacher, wrong_teaching, wrong_growth_area
    let new_classes, new_teachings, new_teacher, new_growth_area = false
    let context_exist, already_present, teacher_exist, teacher_present, teaching_present, teaching_exist, growth_area_exist, growth_area_present
    let study_year, study_address
    if(access_object!=undefined){
        for(var context in access_object){
            context_exist = await contextSchema.read(context)
            if(!context_exist){ // The learning context exists?
                console.log(`The context with id ${context} does not exists. Removing it from the access_object`)
                wrong_context = true
                delete access_object[context]
                continue         
            }
            for(let index=0;index<access_object[context].length;index++){
                study_year = access_object[context][index].study_year;
                let study_year_exist = await ordClassSchema.check_study_year(study_year)
                if(!study_year_exist){
                    console.log(`The study year ${study_year} does not exists. Removing class from the list of classes for a learning context`)
                    wrong_ord_class = true
                    access_object[context].splice(index, 1)
                    index = index - 1
                    continue
                }
                study_address = access_object[context][index].study_address;
                let study_address_exists = await ordClassSchema.check_study_address(study_address)
                if(!study_address_exists){
                    console.log(`The study address ${study_address_exists} does not exists. Removing class from the list of classes for a learning context`)
                    wrong_ord_class = true
                    access_object[context].splice(index, 1)
                    index = index - 1
                    continue
                }
                let study_address_max_num = study_address_exists.num_classes
                if(study_year>study_address_max_num){
                    console.log(`The class ${study_year} ${study_address} does not exists. Removing it from the list of classes for a learning context`)
                    wrong_ord_class = true
                    access_object[context].splice(index, 1)
                    index = index - 1
                    continue
                }
            }
            if(access_object[context].length == 0){
                // If all classes where invalid, delete the context from the object
                console.log(`All the classes for context ${context} does not exist. Removing it from the object`)
                wrong_context = true
                delete access_object[context]
            }
        }
    }
    if(access_object!=undefined){
        for(var context in access_object){
            // Loop through all valid classes in a context
            for(let index=0;index<access_object[context].length;index++){
                study_year = access_object[context][index].study_year; 
                study_address = access_object[context][index].study_address;
                already_present = await opentoSchema.is_present(course_id, context, study_year, study_address) // The class exists for this school year
                if(!already_present){ // If a class is not present, it means we have a new value -> add new course
                    access_object[context].splice(index, 1)
                    index = index-1
                    new_classes = true
                }
            }
            if(access_object[context].length == 0){
                // If all classes where invalid, delete the context from the object
                console.log(`All the classes for context ${context} are new. Removing it from the object`)
                new_classes = true
                delete access_object[context]
            }
        }
    }
    if(teaching_list != undefined){
        // Remove non valid teachings in order to have right values in case of insertion
        for(let i = 0; i<teaching_list.length;i++){
            if(i>=3){
                console.log(`Teaching ${teaching_list[i]} is more. There should be at most 3 teachings per course proposal. Removing it from the list of teachings`)
                wrong_teaching = true // Set variable to true
                teaching_list.splice(i,1)
                i = i - 1
            } else {
                teaching_exist = await teachingSchema.read(teaching_list[i])
                if(!teaching_exist){ // The teaching exists in the database
                    console.log(`Teaching ${teaching_list[i]} does not exists. Removing it from the list of teachings`)
                    wrong_teaching = true // Set variable to true
                    teaching_list.splice(i, 1) // Remove wrong teaching from list
                    i = i-1 // It's needed since splice does also a reindexing. Meaning we will skip the control of 1 index
                }
            } 
        }
        for(let i = 0; i<teaching_list.length; i++){
            teaching_present = await teachingCourseSchema.is_present(course_id, teaching_list[i])
            if(!teaching_present){ // If a teaching is not present, it means we have a new value -> add new course
                new_teachings = true // If a context is new, it means we add new classes, so its the same
                teaching_list.splice(i,1)
                i = i - 1
            }
        }
        if(teaching_list.length == 0){
            new_teachings = true
        }
    }
    if(growth_list != undefined){
        // Remove non valid teachings in order to have right values in case of insertion
        for(let i = 0; i<growth_list.length;i++){
            if(i>=3){
                console.log(`Teaching ${growth_list[i]} is more. There should be at most 3 teachings per course proposal. Removing it from the list of teachings`)
                wrong_growth_area = true // Set variable to true
                growth_list.splice(i,1)
                i = i - 1
            } else {
                growth_area_exist = await growthAreaModel.read(growth_list[i])
                if(!growth_area_exist){ // The teaching exists in the database
                    console.log(`Teaching ${growth_list[i]} does not exists. Removing it from the list of teachings`)
                    wrong_growth_area = true // Set variable to true
                    growth_list.splice(i, 1) // Remove wrong teaching from list
                    i = i-1 // It's needed since splice does also a reindexing. Meaning we will skip the control of 1 index
                }
            } 
        }
        for(let i = 0; i<growth_list.length; i++){
            growth_area_present = await courseGrowthAreaModel.is_present(course_id, growth_list[i])
            if(!growth_area_present){ // If a teaching is not present, it means we have a new value -> add new course
                new_growth_area = true // If a context is new, it means we add new classes, so its the same
                growth_list.splice(i,1)
                i = i - 1
            }
        }
        if(growth_list.length == 0){
            new_teachings = true
        }
    }
    if(access_object!=undefined){
        for(let context in access_object){
            if(access_object[context].length==0){
                delete access_object[context]
                continue
            }
            for(let index=0;index<access_object[context].length;index++){
                if(Object.keys(access_object[context][index]).length==0){
                    access_object[context].splice(index, 1)
                    index = index - 1
                    continue
                }
                if(access_object[context][index].study_year==undefined || access_object[context][index].study_address==undefined || access_object[context][index].presidium==undefined || access_object[context][index].main_study_year==undefined){
                    access_object[context].splice(index, 1)
                    index = index - 1
                    continue
                }
                let context_id = context
                let study_year = access_object[context][index].study_year;
                let study_address = access_object[context][index].study_address;
                let presidium = access_object[context][index].presidium > 0 ? 1 : 0;
                let main_study_year = access_object[context][index].main_study_year > 0 ? 1 : 0;
                let access_update = await opentoSchema.update(course_id, context_id, study_year, study_address, presidium, main_study_year)
            }
        }
    }
    let course_update = await courseSchema.update_course(course_id, eng_title, ita_descr, eng_descr, up_hours, credits, ita_exp_l, eng_exp_l, ita_cri, eng_cri, ita_act, eng_act, area_id, min_students, max_students);
    //let access_update = await opentoSchema.update(course_id, access_object)
    let new_project_class;
    let proj_class_exists = await projectclassSchema.read(course_id, session_id)
    if(!proj_class_exists){
        new_project_class = true
    }
    let project_class_update = false
    let teacher_update
    if(!new_project_class || new_project_class == undefined){
        project_class_update = await projectclassSchema.update(course_id, session_id, project_class_code, ita_class_name, eng_class_name, class_group, num_section)
        let possible_sections = await projectclassSchema.get_section_number(course_id, session_id)
        possible_sections = possible_sections == 0 ? 0 : possible_sections.num_section
        if(teacher_list!=undefined){
            for(let i=0;i<teacher_list.length;i++){
                let t_id = teacher_list[i]["teacher_id"]
                let sections = teacher_list[i]["sections"]
                teacher_exist = await teacherSchema.read_id(t_id)
                if(!teacher_exist){
                    console.log(`Teacher with id ${t_id} does not exists. Removing it from the list of associated teachers`)
                    wrong_teacher = true
                    teacher_list.splice(i,1) // Without throwing an error, we simply remove the teacher that does not exists 
                    i = i-1 // It's needed since splice does also a reindexing. Meaning we will skip the control of 1 index
                } else {
                    for(let j=0;j<sections.length;j++){
                        if(sections[j].toUpperCase()>String.fromCharCode(65+possible_sections)){
                            console.log(`Requested add new class for teacher ${t_id} with section ${sections[j]}, but it is not available. Removing it from the list of the sections of the teachers`)
                            sections.splice(j,1)
                            j = j-1
                        }
                    }
                    if(sections.length==0){
                        console.log(`No more sections for teacher ${t_id}. Removing it from the list of associated teachers`)
                        wrong_teacher = true
                        teacher_list.splice(i,1) // Without throwing an error, we simply remove the teacher that does not exists 
                        i = i-1 // It's needed since splice does also a reindexing. Meaning we will skip the control of 1 index
                    }
                }
                
            }
        }
        
        if(teacher_list!=undefined){
            for(let i=0;i<teacher_list.length;i++){
                let t_id = teacher_list[i]["teacher_id"]
                let main_teacher = teacher_list[i]["main"]
                let sections = teacher_list[i]["sections"]
                for(let j=0;j<sections.length;j++){
                    teacher_present = await teacherClassSchema.is_present(course_id, session_id, sections[j].toUpperCase(), t_id, main_teacher);
                    if(!teacher_present){
                        new_teacher = true
                        sections.splice(j,1)
                        j = j-1
                    }
                }
                if(sections.length==0){
                    console.log(`No more sections for teacher ${t_id}. Removing it from the list of associated teachers`)
                    new_teacher = true
                    teacher_list.splice(i,1) // Without throwing an error, we simply remove the teacher that does not exists 
                    i = i-1 // It's needed since splice does also a reindexing. Meaning we will skip the control of 1 index
                }
                //console.log(i)
            }
        }
        if(teacher_list!=undefined){
            for(let i=0;i<teacher_list.length;i++){
                let teacher_id = teacher_list[i]["teacher_id"]
                let main_teacher = teacher_list[i]["main"]
                let sections = teacher_list[i]["sections"]
                for(let j=0;j<sections.length;j++){
                    teacher_update = await teacherClassSchema.update(course_id, session_id, teacher_id, main_teacher, sections[j])
                }
            }
        }
        //teacher_update = await teacherClassSchema.update(course_id, session_id, teacher_list)
    }
    if(course_update == false && access_update == false && project_class_update == false && teacher_update == false){
        res.status(400).json({
            status: "error", 
            description: "Update failed. No information to be updated.", 
            wrong_context: wrong_context, 
            wrong_ord_class: wrong_ord_class,
            wrong_teacher: wrong_teacher, 
            wrong_teaching: wrong_teaching,
            wrong_growth_area: wrong_growth_area,
            new_classes: new_classes, 
            new_teachings: new_teachings, 
            new_teacher: new_teacher,
            new_growth_area: new_growth_area,
            course_not_updated: course_not_updated
        })
        return
    }
    res.status(200).json({
        status: "updated",
        description: "Course and class updated successfully",
        wrong_context: wrong_context, 
        wrong_ord_class: wrong_ord_class,
        wrong_teacher: wrong_teacher, 
        wrong_teaching: wrong_teaching,
        wrong_growth_area: wrong_growth_area,
        new_classes: new_classes, 
        new_teachings: new_teachings, 
        new_teacher: new_teacher,
        new_growth_area: new_growth_area
    })
}

module.exports.propositions_export = async (req, res) => {
    if(req.loggedUser.role==="admin"){
        let admin_id = req.loggedUser._id
        let user_exist = await adminSchema.read_id(admin_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('course update: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('course update: unauthorized access ('+new Date()+')');
        return;
    }
    let current_session = await sessionSchema.read_current_session();
    if(!current_session){
        res.status(404).json({status: "error", description: "We are in a period that is not covered by a learning session"})
        console.log('export_propositions: not in a session period ('+new Date()+')')
        return
    }
    let current_session_id = current_session.id;
    let future_session_id = current_session_id+1;
    let session_id_exists = await sessionSchema.read(future_session_id); // Is learning session present in the database
    if(!session_id_exists){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found: future learning session ('+new Date()+')');
        return;
    }
    if(current_session.school_year!=session_id_exists.school_year){
        res.status(400).json({status: "error", description: "The current learning session is the last one of the school year."})
        console.log('export_propositions: last session of the school year ('+new Date()+')')
        return;
    }
    let non_confirmed_proj_class = await courseSchema.get_class_models(undefined, true, true, future_session_id);
    let confirmed_courses_without_class = await courseSchema.get_models(undefined, false, true, session_id_exists.school_year);
    let csv_data = []
    let codice_classe_progetto, titolo_italiano, titolo_inglese,sessione_di_apprendimento,gruppo,insegnante_proposto,area_di_apprendimento,crediti,min_studenti,max_studenti,contesto_specifico,contesto_personale;
    for(let i in non_confirmed_proj_class){
        let course_id = non_confirmed_proj_class[i].id
        sessione_di_apprendimento = non_confirmed_proj_class[i].learning_session_id
        let course_data = await courseSchema.read(course_id, true);
        let class_data = await projectclassSchema.read(course_id, sessione_di_apprendimento);
        let opento_data = await opentoSchema.read_from_course(course_id);
        codice_classe_progetto = sanitizer.decode_text(non_confirmed_proj_class[i].project_class_code)
        titolo_italiano = sanitizer.decode_text(non_confirmed_proj_class[i].italian_title)
        titolo_inglese = sanitizer.decode_text(non_confirmed_proj_class[i].english_title)
        gruppo = class_data.group
        insegnante_proposto = sanitizer.decode_text(non_confirmed_proj_class[i].teacher_surname) + '_'+sanitizer.decode_text(non_confirmed_proj_class[i].teacher_name)
        area_di_apprendimento = course_data.learning_area_id
        crediti = course_data.credits
        min_studenti = course_data.min_students
        max_studenti = course_data.max_students
        contesto_specifico = ""
        contesto_personale = ""
        for(let j in opento_data){
            if(opento_data[j].learning_context_id === "SPE"){
                contesto_specifico += opento_data[j].study_year_id + '_' + opento_data[j].study_address_id +','
            } else if(opento_data[j].learning_context_id === "PER"){
                contesto_personale += opento_data[j].study_year_id + '_' + opento_data[j].study_address_id + ','
            }
        }
        if(contesto_specifico[contesto_specifico.length-1]==','){
            contesto_specifico = contesto_specifico.slice(0,-1);
        }
        if(contesto_personale[contesto_personale.length-1]==','){
            contesto_personale = contesto_personale.slice(0,-1);
        }
        let csv_row = {
            codice_classe_progetto: codice_classe_progetto,
            titolo_italiano: titolo_italiano,
            titolo_inglese: titolo_inglese,
            sessione_di_apprendimento: sessione_di_apprendimento,
            gruppo: gruppo,
            insegnante_proposto: insegnante_proposto,
            area_di_apprendimento: area_di_apprendimento,
            crediti: crediti,
            min_studenti: min_studenti,
            max_studenti: max_studenti,
            contesto_specifico: contesto_specifico,
            contesto_personale: contesto_personale
        }
        csv_data.push(csv_row)
    }
    for(let i in confirmed_courses_without_class){
        let course_id = confirmed_courses_without_class[i].id
        sessione_di_apprendimento = confirmed_courses_without_class[i].learning_session_id
        let course_data = await courseSchema.read(course_id, true);
        let class_data = undefined;
        let opento_data = await opentoSchema.read_from_course(course_id);
        codice_classe_progetto = sanitizer.decode_text(confirmed_courses_without_class[i].project_class_code)
        titolo_italiano = sanitizer.decode_text(confirmed_courses_without_class[i].italian_title)
        titolo_inglese = sanitizer.decode_text(confirmed_courses_without_class[i].english_title)
        gruppo = class_data == undefined
        insegnante_proposto = sanitizer.decode_text(confirmed_courses_without_class[i].teacher_surname) + '_'+sanitizer.decode_text(confirmed_courses_without_class[i].teacher_name)
        area_di_apprendimento = course_data.learning_area_id
        crediti = course_data.credits
        min_studenti = course_data.min_students
        max_studenti = course_data.max_students
        contesto_specifico = ""
        contesto_personale = ""
        for(let j in opento_data){
            if(opento_data[j].learning_context_id === "SPE"){
                contesto_specifico += opento_data[j].study_year_id + '_' + opento_data[j].study_address_id +','
            } else if(opento_data[j].learning_context_id === "PER"){
                contesto_personale += opento_data[j].study_year_id + '_' + opento_data[j].study_address_id + ','
            }
        }
        if(contesto_specifico[contesto_specifico.length-1]==','){
            contesto_specifico = contesto_specifico.slice(0,-1);
        }
        if(contesto_personale[contesto_personale.length-1]==','){
            contesto_personale = contesto_personale.slice(0,-1);
        }
        let csv_row = {
            titolo_italiano: titolo_italiano,
            titolo_inglese: titolo_inglese,
            sessione_di_apprendimento: sessione_di_apprendimento,
            gruppo: gruppo,
            insegnante_proposto: insegnante_proposto,
            area_di_apprendimento: area_di_apprendimento,
            crediti: crediti,
            min_studenti: min_studenti,
            max_studenti: max_studenti,
            contesto_specifico: contesto_specifico,
            contesto_personale: contesto_personale
        }
        csv_data.push(csv_row)
    }
    const csv = await converter.json2csv(csv_data);
    /*
    let mailOptions = {
        from: process.env.GOOGLE_ANNOUNCEMENT_EMAIL,
        to: 'pietro.fronza@studenti.unitn.it',
        subject: "Corsi da approvare",
        text: "Ciao Claudio,\nIn allegato trovi il file csv con i corsi che dobbiamo approvare per la prossima sessione.",
        attachments: [{filename: 'propositions.csv', content: csv,}]
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });*/
    res.attachment('propositions.csv').send(csv)
}

module.exports.get_courses_for_tutors = async (req, res) => {
    let session_id = req.query.session_id;
    let teacher_id = req.params.teacher_id;
    if(req.loggedUser.role == "teacher"){
        if(teacher_id==undefined){
            teacher_id = req.loggedUser._id
        }
        let teacher_esist = await teacherSchema.read_id(teacher_id)
        if(!teacher_esist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_courses_for_tutors: unauthorized access ('+new Date()+')');
            return;
        }  
        if(req.loggedUser._id != teacher_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_courses_for_tutors: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('get_courses_for_tutors: unauthorized access ('+new Date()+')');
        return;
    }
    let area_id = req.query.area_id;
    let context_id = req.query.context_id;
    let courses = await courseSchema.list_for_teacher(teacher_id, area_id, session_id, context_id);
    if(!courses){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('get_courses_for_tutors: resource not found ('+new Date()+')');
        return;
    }
    let data_courses = courses.map((course) => {
        let learning_area_ref = {
            path: "/api/v1/learning_areas",
            single: true,
            query: {},
            data: {
                id: course.learning_area_id
            }
        }
        let italian_title = sanitizer.encode_output(course.italian_title)
        let english_title = sanitizer.encode_output(course.english_title)
        let section = sanitizer.encode_output(course.section)
        return {
            id: course.id,
            italian_title: italian_title,
            english_title: english_title,
            credits: course.credits,
            learning_area_ref: learning_area_ref,
            group: course.group,
            section: section
        };
    });
    let response = {
        path: "/api/v1/teachers/"+teacher_id+"/tutor_courses",
        single: false,
        query: {
            area_id: area_id,
            session_id: session_id,
            context_id: context_id
        },
        date: new Date(),
        data: data_courses
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