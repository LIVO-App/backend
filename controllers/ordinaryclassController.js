'use strict';

const courseSchema = require('../models/ordinaryclassModel');
const ordinaryclassModel = require('../models/ordinaryclassModel');
const teacherModel = require('../models/teacherModel');
const adminSchema = require('../models/adminModel');
const learningSessionModel = require('../models/learning_sessionsModel');
const constraint_schema = require('../models/constraintModel')

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
        console.log('resource not found');
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
            console.log("ordinary_class components: missing parameters teacher");
            return;
        }
        if(!teach){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('my_ordinary_class: unauthorized access. Not my class');
            return;
        }
    } else if (req.loggedUser.role == "admin") {
        let adminexists = await adminSchema.read_id(req.loggedUser._id)
        if(!adminexists){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('my_ordinary_class: unauthorized access.');
            return;
        }
        admin_user = true
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('my_ordinary_class: unauthorized access');
        return;
    }
    let cmps = await ordinaryclassModel.components(study_year, address, school_year, section, admin_user);
    if (!cmps) {
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log("ordinary class components: missing parameters");
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
        console.log('not in order students: session not found');
        return;
    }
    let section = req.query.section!=undefined ? req.query.section.toUpperCase() : undefined;
    if(req.loggedUser.role == "teacher"){
        let school_year = session_exist.school_year
        let teach = await teacherModel.isTeacherTeaching(req.loggedUser._id, study_year, address, school_year, section);
        //console.log(teach);
        if(teach==null){
            res.status(400).json({status: "error", description: MSG.missingParameter});
            console.log("ordinary_class components: missing parameters teacher");
            return;
        }
        if(!teach){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('my_ordinary_class: unauthorized access. Not my class');
            return;
        }
    } else if (req.loggedUser.role == "admin") {
        let adminexists = await adminSchema.read_id(req.loggedUser._id)
        if(!adminexists){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('my_ordinary_class: unauthorized access.');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('my_ordinary_class: unauthorized access');
        return;
    }
    let constraints_exist = await constraint_schema.get_constraints(session_id, false, undefined, undefined, study_year, address)
    if(!constraints_exist){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log("constraints for ordinary class: missing parameters");
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
        console.log("ordinary class components not in order: missing parameters");
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
        console.log("student ordinary clas: missing parameters");
        return;
    }
    if(!cl){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log("ordinary class components: resource not found");
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