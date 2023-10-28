'use strict';

const courseSchema = require('../models/ordinaryclassModel');
const ordinaryclassModel = require('../models/ordinaryclassModel');
const teacherModel = require('../models/teacherModel');
const adminSchema = require('../models/adminModel');
const learningSessionModel = require('../models/learning_sessionsModel');
const constraint_schema = require('../models/constraintModel');
const studentModel = require('../models/studentModel');
const teachingModel = require('../models/teachingModel')

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    missingParameter: "Missing required information",
    notAuthorized: "Not authorized request"
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
        console.log('resource not found ('+new Date()+')');
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

module.exports.get_components = async (req, res) => {
    let study_year = req.params.study_year;
    let address = req.params.address;
    let school_year = req.query.school_year;
    let section = req.query.section!=undefined ? req.query.section.toUpperCase() : undefined;
    let admin_user = false
    if(req.loggedUser.role == "teacher"){
        let teach = await teacherModel.isTeacherTeaching(req.loggedUser._id, study_year, address, school_year, section);
        //console.log(teach);
        if(teach==null){
            res.status(400).json({status: "error", description: MSG.missingParameter});
            console.log('ordinary_class components: missing parameters teacher ('+new Date()+')');
            return;
        }
        if(!teach){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('my_ordinary_class: unauthorized access. Not my class ('+new Date()+')');
            return;
        }
    } else if (req.loggedUser.role == "admin") {
        let adminexists = await adminSchema.read_id(req.loggedUser._id)
        if(!adminexists){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('my_ordinary_class: unauthorized access. ('+new Date()+')');
            return;
        }
        admin_user = true
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('my_ordinary_class: unauthorized access ('+new Date()+')');
        return;
    }
    let cmps = await ordinaryclassModel.components(study_year, address, school_year, section, admin_user);
    if (!cmps) {
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log('ordinary class components: missing parameters ('+new Date()+')');
        return;
    }
    let data_cmps = cmps.map((cmp) => {
        return {
            id: cmp.id,
            name: cmp.name,
            surname: cmp.surname,
            orientation_credits: cmp.orientation_credits,
            clil_credits: cmp.clil_credits
        }
    });
    let path = "/api/v1/ordinary_classes/"+study_year+"/"+address+"/components"
    let response = {
        path: path,
        single: false,
        query: {school_year: school_year, section: section},
        date: new Date(),
        data: data_cmps
    };
    res.status(200).json(response);
}

module.exports.get_not_in_order_components = async (req, res) => {
    let study_year = req.params.study_year;
    let address = req.params.address;
    let session_id = req.query.session_id;
    let session_exist = await learningSessionModel.read(session_id)
    if(!session_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('not in order students: session not found ('+new Date()+')');
        return;
    }
    let section = req.query.section!=undefined ? req.query.section.toUpperCase() : undefined;
    if(req.loggedUser.role == "teacher"){
        let school_year = session_exist.school_year
        let teach = await teacherModel.isTeacherTeaching(req.loggedUser._id, study_year, address, school_year, section);
        //console.log(teach);
        if(teach==null){
            res.status(400).json({status: "error", description: MSG.missingParameter});
            console.log('ordinary_class components: missing parameters teacher ('+new Date()+')');
            return;
        }
        if(!teach){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('my_ordinary_class: unauthorized access. Not my class ('+new Date()+')');
            return;
        }
    } else if (req.loggedUser.role == "admin") {
        let adminexists = await adminSchema.read_id(req.loggedUser._id)
        if(!adminexists){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('my_ordinary_class: unauthorized access. ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('my_ordinary_class: unauthorized access ('+new Date()+')');
        return;
    }
    let constraints_exist = await constraint_schema.get_constraints(session_id, false, undefined, undefined, study_year, address)
    if(!constraints_exist){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log('constraints for ordinary class: missing parameters ('+new Date()+')');
        return;
    }
    let constraints_list = constraints_exist.map((constraint) => {
        return {
            learning_area_id: constraint.learning_area_id,
            learning_context_id: constraint.learning_context_id
        }
    })
    let cmps = await ordinaryclassModel.not_in_order_students(study_year, address, session_id, section, constraints_list);
    if (!cmps) {
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log('ordinary class components not in order: missing parameters ('+new Date()+')');
        return;
    }
    let data_cmps = cmps.map((cmp) => {
        return {
            id: cmp.id,
            name: cmp.name,
            surname: cmp.surname,
            orientation_credits: cmp.orientation_credits,
            clil_credits: cmp.clil_credits
        }
    });
    let path = "/api/v1/ordinary_classes/"+study_year+"/"+address+"/non_compliant"
    let response = {
        path: path,
        single: false,
        query: {session_id: session_id, section: section},
        date: new Date(),
        data: data_cmps
    };
    res.status(200).json(response);
}

module.exports.get_student_class = async (req, res) => {
    let student_id = req.params.student;
    let session_id = req.params.session;
    let cl = await ordinaryclassModel.read_from_student_and_session(student_id, session_id);
    if(cl == null){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log('student ordinary clas: missing parameters ('+new Date()+')');
        return;
    }
    if(!cl){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('ordinary class components: resource not found ('+new Date()+')');
        return;
    }
    let data_cl = {
        study_year: cl.ordinary_class_study_year,
        address: cl.ordinary_class_address,
        section: cl.section
    }
    let path = "/api/v1/ordinary_classes/"+student_id+"/"+session_id+"/"
    let response = {
        path: path,
        single: false,
        query: {},
        date: new Date(),
        data: data_cl
    }
    res.status(200).json(response);
}

module.exports.add_ordinary_classes = async (req, res) => {
    let user_id = req.loggedUser._id;
    if(req.loggedUser.role == "admin"){
        let admin_exist = await adminSchema.read_id(user_id)
        if(!admin_exist){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('update student psw: student does not exists ('+new Date()+')');
            return;
        }
    }
    let existing_class, wrong_class, class_added;
    let classes_list = req.body.classes_list;
    for(let cl in classes_list){
        let cl_study_year = classes_list[cl].study_year
        let year_exist = await ordinaryclassModel.check_study_year(cl_study_year)
        if(!year_exist){
            wrong_class = true
            continue
        }
        let cl_study_address = classes_list[cl].study_address
        let address_exist = await ordinaryclassModel.check_study_address(cl_study_address)
        if(!address_exist){
            wrong_class = true
            continue
        }
        let cl_school_year = classes_list[cl].school_year
        let cl_italian_displayed_name = classes_list[cl].italian_displayed_name
        let cl_english_displayed_name = classes_list[cl].english_displayed_name
        let class_exist = await ordinaryclassModel.read_with_year(cl_study_year, cl_study_address, cl_school_year)
        if(class_exist){
            existing_class = true
            console.log("Class not added")
            continue
        }
        let class_insert = await ordinaryclassModel.add_ordinary_class(cl_study_year, cl_study_address, cl_school_year, cl_italian_displayed_name, cl_english_displayed_name)
        if(!class_insert){
            wrong_class = true
            console.log("Class not added")
            continue
        } else {
            class_added = true
        }
    }
    if(!class_added){
        if(existing_class){
            res.status(409).json({status: "error", description: "All the classes were already present in the database", wrong_class: wrong_class})
            console.log('Class insertion: classes already present ('+new Date()+')')
            return
        } else {
            res.status(400).json({status: "error", description: "All the classes tried to insert were wrong. Please, check them", wrong_class: wrong_class})
            console.log('Class insertion: missing parameters ('+new Date()+')')
            return
        }
    }
    res.status(201).json({status: "accepted", description: "New ordinary classes added", existing_class: existing_class, wrong_class: wrong_class})
}

module.exports.add_student_to_ordinary_classes = async (req, res) => {
    let user_id = req.loggedUser._id;
    if(req.loggedUser.role == "admin"){
        let admin_exist = await adminSchema.read_id(user_id)
        if(!admin_exist){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('update student psw: student does not exists ('+new Date()+')');
            return;
        }
    }
    let study_year = req.params.study_year
    let year_exist = await ordinaryclassModel.check_study_year(study_year)
    if(!year_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('add students to class: study year not found ('+new Date()+')');
        return;
    }
    let study_address = req.params.address
    let address_exist = await ordinaryclassModel.check_study_address(study_address)
    if(!address_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('add students to class: study year not found ('+new Date()+')');
        return;
    }
    let school_year = req.query.school_year
    let section = req.query.section
    let existing_comp, wrong_comp, comp_added;
    let student_list = req.body.student_list;
    for(let student in student_list){
        let student_id = student_list[student]
        let student_exist = await studentModel.read_id(student_id)
        if(!student_exist){
            wrong_comp = true
            continue
        }
        let component_exist = await ordinaryclassModel.students_classes(student_id, school_year)
        if(component_exist.length!=0){
            existing_comp = true
            continue
        }
        let component_insert = await ordinaryclassModel.add_student_to_class(student_id, study_year, study_address, school_year, section)
        if(!component_insert){
            wrong_comp = true
            console.log("Component not added")
            continue
        } else {
            comp_added = true
        }
    }
    if(!comp_added){
        if(existing_comp){
            res.status(409).json({status: "error", description: "All the components were already present in the database", wrong_comp: wrong_comp})
            console.log('Ordinary class component insertion: components already present ('+new Date()+')')
            return
        } else {
            res.status(400).json({status: "error", description: "All the components tried to insert were wrong. Please, check them", wrong_comp: wrong_comp})
            console.log('Ordinary class component insertion: missing parameters ('+new Date()+')')
            return
        }
    }
    res.status(201).json({status: "accepted", description: "New members of ordinary class added", existing_comp: existing_comp, wrong_comp: wrong_comp})
}

module.exports.add_teacher_to_ordinary_classes = async (req, res) => {
    let user_id = req.loggedUser._id;
    if(req.loggedUser.role == "admin"){
        let admin_exist = await adminSchema.read_id(user_id)
        if(!admin_exist){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('update student psw: student does not exists ('+new Date()+')');
            return;
        }
    }
    let study_year = req.params.study_year
    let year_exist = await ordinaryclassModel.check_study_year(study_year)
    if(!year_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('add students to class: study year not found ('+new Date()+')');
        return;
    }
    let study_address = req.params.address
    let address_exist = await ordinaryclassModel.check_study_address(study_address)
    if(!address_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('add students to class: study year not found ('+new Date()+')');
        return;
    }
    let school_year = req.query.school_year
    let section = req.query.section
    let existing_teach, wrong_teach, teach_added;
    let teacher_list = req.body.teacher_list;
    for(let teacher in teacher_list){
        let teacher_id = teacher_list[teacher].id
        let teacher_coordinator = teacher_list[teacher].coordinator > 0 ? 1 : 0
        let teacher_exist = await teacherModel.read_id(teacher_id)
        if(!teacher_exist){
            wrong_teach = true
            continue
        }
        let teachers_exist = await ordinaryclassModel.teachers_classes(teacher_id, school_year)
        if(teachers_exist.length!=0){
            existing_teach = true
            continue
        }
        let teaching_list = teacher_list[teacher].teaching_list;
        for(let teaching in teaching_list){
            let teaching_id = teaching_list[teaching];
            let teaching_exist = await teachingModel.read(teaching_id)
            if(!teaching_exist){
                wrong_teach = true
                continue
            }
            let teacher_insert = await ordinaryclassModel.add_teacher_to_class(teacher_id, study_year, study_address, school_year, section, teaching_id, teacher_coordinator)
            if(!teacher_insert){
                wrong_teach = true
                console.log("Teacher not added")
                continue
            } else {
                teach_added = true
            }
        }
        
    }
    if(!teach_added){
        if(existing_teach){
            res.status(409).json({status: "error", description: "All the teachers were already present in the database", wrong_teach: wrong_teach})
            console.log('Ordinary class teachers insertion: teacher already present ('+new Date()+')')
            return
        } else {
            res.status(400).json({status: "error", description: "All the teachers tried to insert were wrong. Please, check them", wrong_teach: wrong_teach})
            console.log('Ordinary class teachers insertion: missing parameters ('+new Date()+')')
            return
        }
    }
    res.status(201).json({status: "accepted", description: "New teachers of ordinary class added", existing_teach: existing_teach, wrong_teach: wrong_teach})
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