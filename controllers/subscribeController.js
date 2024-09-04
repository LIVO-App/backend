'use strict';

const sanitizer = require('../utils/sanitizer')
const subscribe_schema = require('../models/subscribeModel');
const studentModel = require('../models/studentModel');
const pcModel = require('../models/projectClassModel');
const courseSchema = require('../models/coursesModel');
const sessionSchema = require('../models/learning_sessionsModel');
const adminSchema = require('../models/adminModel');
const constraintModel = require('../models/constraintModel');
const subscribeModel = require('../models/subscribeModel');
let converter = require('json-2-csv');
const nodemailer = require('nodemailer');
const projectClassModel = require('../models/projectClassModel');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GOOGLE_ANNOUNCEMENT_EMAIL,
      pass: process.env.GOOGLE_APP_PSW
    }
  });

let MSG = {
    notFound: "Resource not found",
    missing_params: "Bad input. Missing required information",
    itemAlreadyExists: "The student is already subscribed to this project class or is already subscribed to this course in a previous session",
    itemAlreadyExistsActual: "The student is already subscribed to this project class",
    itemAlreadyExistsPrevious: "The student is already subscribed to this course in a previous session",
    studentNotExist: "The student does not exist",
    maxCreditsLimit: "The student has passed the maximum number of credits for this learning area",
    notAuthorized: "Not authorized request",
    sameGroup: "The course selected is overlaped with another one you are currently enrolled in. Please select another one"
}

process.env.TZ = 'Etc/Universal';

module.exports.subscribe_project_class = async (req, res) => {
    let student_id = req.params.student_id;
    let course_id = req.query.course_id;
    let session_id = req.query.session_id;
    let section = req.query.section ?? "A";
    let context_id = req.query.context_id;
    let pen_val = undefined;
    let pending = await subscribe_schema.isClassFull(course_id, session_id);
    if(!pending){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found: full class ('+new Date()+')');
        return;
    }
    if (pending.full === "true"){
        pen_val = true
    }
    let existStudent = await studentModel.read_id(student_id);
    if(!existStudent){
        res.status(400).json({status: "error", description: MSG.studentNotExist})
        console.log('student does not exist ('+new Date()+')');
        return;
    }
    const subscriptionExists = await subscribe_schema.read(student_id, course_id, session_id, context_id, section);
    if(subscriptionExists === null){
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information: existing subscription ('+new Date()+')');
        return;
    }
    if (subscriptionExists) {
        res.status(409).send({
            status: "error", 
            description: MSG.itemAlreadyExists
        });
        console.log('record already exists ('+new Date()+')');
        return;
    }
    let cour = await courseSchema.read_learning_area(course_id);
    if(!cour){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found: learning area ('+new Date()+')');
        return;
    }
    let isMax = await studentModel.retrieve_credits(student_id, session_id, cour.learning_area_id, context_id);
    if(!isMax){
        res.status(400).json({status: "error", description: MSG.missing_params});
        console.log('missing required information: is max ('+new Date()+')');
        return;
    }
    if((Number(isMax.credits)+Number(cour.credits)) > Number(isMax.max_credits)){
        res.status(403).json({status: "error", description: MSG.maxCreditsLimit});
        console.log('max credits limit reached ('+new Date()+')');
        return;
    }
    let subscribe = await subscribe_schema.add(student_id, course_id, session_id, section, context_id, pen_val);
    if (!subscribe){
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information: subscribe ('+new Date()+')');
        return;
    }
    let res_des = "Inserted " + subscribe.rows.affectedRows + " rows";
    let response = {
        status: "accepted", 
        description: res_des,
        data: subscribe.pending
    };
    res.status(201).json(response);
}

module.exports.unsubscribe_project_class = async (req, res) => {
    let student_id = req.params.student_id;
    let course_id = req.query.course_id;
    let session_id = req.query.session_id;
    let context_id = req.query.context_id;
    let classExist = await pcModel.read(course_id, session_id);
    if(classExist === null) {
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information on class ('+new Date()+')');
        return;
    }
    if(!classExist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found: unsubscribe ('+new Date()+')');
        return;
    }
    let unsubscribe = await subscribe_schema.remove(student_id, course_id, session_id, context_id);
    let res_des = "Deleted " + unsubscribe.affectedRows + " rows";
    let response = {
        status: "deleted", 
        description: res_des
    };
    res.status(200).json(response);
}

module.exports.subscribe_project_class_v2 = async (req, res) => {
    let student_id = req.params.student_id;
    if(req.loggedUser.role == "student"){
        if(req.loggedUser._id != student_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('subscribe: unauthorized access ('+new Date()+')');
            return;
        }
    } else if (req.loggedUser.role == "admin") {
        let admin_id = req.loggedUser._id
        let user_exist = await adminSchema.read_id(admin_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('subscription of student from admin: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('subscribe: unauthorized access ('+new Date()+')');
        return;
    }
    let course_id = req.query.course_id;
    let session_id = req.query.session_id;
    let session_exist = await sessionSchema.read(session_id)
    if(!session_exist){
        res.status(404).json({status: "error", description: MSG.notFound})
        console.log('subscription: session does not exist ('+new Date()+')');
        return;
    }
    if(new Date(session_exist.open_day)>new Date()){
        res.status(400).json({status: "error", description: "The orientation day date is not already passed. You cannot subscribe to the course."})
        console.log('orientation day not passed ('+new Date()+')');
        return;
    }
    let context_id = req.query.context_id;
    let existStudent = await studentModel.read_id(student_id);
    if(!existStudent){
        res.status(400).json({status: "error", description: MSG.studentNotExist})
        console.log('student does not exist ('+new Date()+')');
        return;
    }
    const subscriptionExists = await subscribe_schema.read(student_id, course_id);
    if(subscriptionExists === null){
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information: existing subscription ('+new Date()+')');
        return;
    } else if (subscriptionExists !== false) {
        if (subscriptionExists.project_class_session == session_id) {
            res.status(409).send({
                status: "error", 
                description: MSG.itemAlreadyExistsActual,
                specified_session: true,
            });
            console.log('record already exists: student already subscribed ('+new Date()+')');
            return;
        } else {
            res.status(409).send({
                status: "error", 
                description: MSG.itemAlreadyExistsPrevious,
                specified_session: false,
            });
            console.log('record already exists: student subscribed in another session ('+new Date()+')');
            return;
        }
    }
    let cour = await courseSchema.read_learning_area(course_id);
    if(!cour){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found: learning area ('+new Date()+')');
        return;
    }
    let isMax = await studentModel.retrieve_credits(student_id, session_id, cour.learning_area_id, context_id);
    if(!isMax){
        res.status(400).json({status: "error", description: MSG.missing_params});
        console.log('missing required information: is max ('+new Date()+')');
        return;
    }
    if((Number(isMax.credits)+Number(cour.credits)) > Number(isMax.max_credits)){
        res.status(403).json({status: "error", description: MSG.maxCreditsLimit});
        console.log('max credits limit reached ('+new Date()+')');
        return;
    }
    let notSameGroup = await subscribe_schema.not_same_group(course_id, session_id, student_id, cour.learning_area_id, context_id);
    if(!notSameGroup){
        res.status(403).json({status: "error", description: MSG.sameGroup})
        console.log('group already selected ('+new Date()+')')
        return;
    }
    let pen_val = undefined;
    let section = await subscribe_schema.getAvailableSection(course_id, session_id);
    if(section == null){
        res.status(400).json({status: "error", description: MSG.missing_params});
        console.log('mising required information: section ('+new Date()+')');
        return;
    }
    if (section === ""){
        pen_val = true
    }
    let subscribe = await subscribe_schema.add(student_id, course_id, session_id, section.toUpperCase(), context_id, pen_val);
    if (!subscribe){
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information: subscribe ('+new Date()+')');
        return;
    }
    let res_des = "Inserted " + subscribe.rows.affectedRows + " rows";
    let response = {
        status: "accepted", 
        description: res_des,
        data: subscribe.pending
    };
    res.status(201).json(response);
}

module.exports.unsubscribe_project_class_v2 = async (req, res) => {
    let student_id = req.params.student_id;
    if(req.loggedUser.role == "student"){
        if(req.loggedUser._id != student_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('unsubscribe: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('unsubscribe: unauthorized access ('+new Date()+')');
        return;
    }
    let course_id = req.query.course_id;
    let session_id = req.query.session_id;
    let context_id = req.query.context_id;
    let classExist = await pcModel.read(course_id, session_id);
    if(classExist === null) {
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information on class ('+new Date()+')');
        return;
    }
    if(!classExist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found: unsubscribe ('+new Date()+')');
        return;
    }
    let unsubscribe = await subscribe_schema.remove(student_id, course_id, session_id, context_id);
    let res_des = "Deleted " + unsubscribe.affectedRows + " rows";
    let response = {
        status: "deleted", 
        description: res_des
    };
    let pending_students = await subscribe_schema.get_pending_students(course_id, session_id)
    if(!pending_students){
        response["pending"] = MSG.missing_params
        res.status(200).json(response)
        console.log('missing required information on class for pending students ('+new Date()+')');
        return;
    }
    if(pending_students.length > 0){
        for(let row in pending_students){
            let pending_student_id = pending_students[row].student_id;
            let pending_context_id = pending_students[row].learning_context_id;
            let cour = await courseSchema.read_learning_area(course_id);
            if(!cour){
                continue
            }
            let isMax = await studentModel.retrieve_credits(pending_student_id, session_id, cour.learning_area_id, pending_context_id);
            if(!isMax){
                continue
            }
            if((Number(isMax.credits)+Number(cour.credits)) > Number(isMax.max_credits)){
                continue
            }
            let notSameGroup = await subscribe_schema.not_same_group(course_id, session_id, pending_student_id, cour.learning_area_id, pending_context_id);
            if(!notSameGroup){
                continue
            }
            let pending_section = await subscribe_schema.getAvailableSection(course_id, session_id);
            if(pending_section == null){
                continue
            }
            if(pending_section === ""){
                continue // It is still in pending for some reason
            }
            let remove_pending = await subscribe_schema.remove_pending(pending_student_id, course_id, session_id, pending_section)
            console.log('A student was removed from pending ('+new Date()+')')
            break
        }
    } else {
        console.log("No pending students")
    }
    res.status(200).json(response)
    return
}

module.exports.subscription_confirmation = async (req, res) => {
    let student_id = req.params.student_id;
    if(req.loggedUser.role == "student"){
        if(req.loggedUser._id != student_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('unsubscribe: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('unsubscribe: unauthorized access ('+new Date()+')');
        return;
    }
    let course_id = req.query.course_id;
    let session_id = req.query.session_id;
    let outcome = req.query.outcome === "true" ? 1 : 0
    let existStudent = await studentModel.read_id(student_id);
    if(!existStudent){
        res.status(400).json({status: "error", description: MSG.studentNotExist})
        console.log('student does not exist ('+new Date()+')');
        return;
    }
    let classExist = await pcModel.read(course_id, session_id);
    if(classExist === null) {
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information on class ('+new Date()+')');
        return;
    }
    if(!classExist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found: unsubscribe ('+new Date()+')');
        return;
    }
    let student_subscription = await subscribe_schema.read(student_id, course_id, session_id)
    if(!student_subscription){
        res.status(403).json({status: "error", description: MSG.notAuthorized})
        console.log('Subscription does not exist ('+new Date()+')')
        return
    }
    if(!outcome){
        let unsubscribe = await subscribe_schema.remove(student_id, course_id, session_id, student_subscription.learning_context_id);
        let res_des = "Deleted " + unsubscribe.affectedRows + " rows";
        let response = {
            status: "deleted", 
            description: res_des
        };
        let pending_students = await subscribe_schema.get_pending_students(course_id, session_id)
        if(!pending_students){
            response["pending"] = MSG.missing_params
            res.status(200).json(response)
            console.log('missing required information on class for pending students ('+new Date()+')');
            return;
        }
        if(pending_students.length > 0){
            for(let row in pending_students){
                let pending_student_id = pending_students[row].student_id;
                let pending_context_id = pending_students[row].learning_context_id;
                let cour = await courseSchema.read_learning_area(course_id);
                if(!cour){
                    continue
                }
                let isMax = await studentModel.retrieve_credits(pending_student_id, session_id, cour.learning_area_id, pending_context_id);
                if(!isMax){
                    continue
                }
                if((Number(isMax.credits)+Number(cour.credits)) > Number(isMax.max_credits)){
                    continue
                }
                let notSameGroup = await subscribe_schema.not_same_group(course_id, session_id, pending_student_id, cour.learning_area_id, pending_context_id);
                if(!notSameGroup){
                    continue
                }
                let pending_section = await subscribe_schema.getAvailableSection(course_id, session_id);
                if(pending_section == null){
                    continue
                }
                if(pending_section === ""){
                    continue // It is still in pending for some reason
                }
                let remove_pending = await subscribe_schema.remove_pending(pending_student_id, course_id, session_id, pending_section)
                console.log('A student was removed from pending ('+new Date()+')')
                break
            }
        } else {
            console.log('No pending students ('+new Date()+')')
        }
        res.status(200).json(response)
        return
    } else {
        if(student_subscription.pending!=null){
            let pending = await subscribe_schema.isClassFull(course_id, session_id);
            if(!pending){
                res.status(404).json({status: "error", description: MSG.notFound});
                console.log('resource not found: full class ('+new Date()+')');
                return;
            }
            if (pending.full === "false"){
                let pending_section = await subscribe_schema.getAvailableSection(course_id, session_id);
                if(pending_section===""){
                    res.status(400).json({status: "error", description: "Something went wrong"})
                    console.log('pending removal didn\'t succeded ('+new Date()+')')
                    return
                }
                let remove_pending = await subscribe_schema.remove_pending(student_id, course_id, session_id, pending_section.toUpperCase())
                res.status(200).json({status: "updated", description: "The student is now subscribed to the course since a slot is now free"})
                console.log('Student is now subscribed to the course ('+new Date()+')')
                return
            }
            res.status(200).json({status: "not updated", description: "The student will remain in pending list since there are no slot available. It will become subscribed if one slot will be available before the starting of the courses. It has still express its liking into taking the course in future editions."})
            console.log('Student is still in pending list of the course ('+new Date()+')')
            return
        }
        res.status(200).json({status: "accepted", description: "The student is enrolled to this course"})
        console.log('Student is enrolled definetely. ('+new Date()+')')
        return
    }
}

module.exports.subscription_export = async (req, res) => {
    if(req.loggedUser.role==="admin"){
        let admin_id = req.loggedUser._id
        let user_exist = await adminSchema.read_id(admin_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('subscription export: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('subscription export: unauthorized access ('+new Date()+')');
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
    // Get all students in school_year of the next session with their ordinary class
    let student_list = await studentModel.list_with_class(session_id_exists.school_year);
    let csv_data = []
    // Write csv
    // For each student, get its constraints and then fill the csv file
    let nome_studente, cognome_studente, titolo_italiano, gruppo, area_di_apprendimento, contesto_di_apprendimento
    for(let i in student_list){ 
        let student_id = student_list[i].id
        nome_studente = sanitizer.decode_text(student_list[i].name)
        cognome_studente = sanitizer.decode_text(student_list[i].surname)
        let classe_ordinaria = student_list[i].ordinary_class_study_year + ' ' + student_list[i].ordinary_class_address
        let get_constraints
        //let student_subscriptions = await studentModel.retrieve_project_classes(student_id, future_session_id)
        get_constraints = await constraintModel.get_constraints(future_session_id, undefined, undefined, undefined, student_list[i].ordinary_class_study_year, student_list[i].ordinary_class_address)
        //let constraints_list = []
        for(let constraint in get_constraints){
            contesto_di_apprendimento = get_constraints[constraint].learning_context_id;
            let credits = get_constraints[constraint].credits;
            area_di_apprendimento = get_constraints[constraint].learning_area_id != null ? get_constraints[constraint].learning_area_id : "";
            //constraints_list.push({context_id: context_id, learning_area_id: learning_area_id, max_credits: max_credits})
            let check_subs = await subscribeModel.check_subscription(student_id, future_session_id, contesto_di_apprendimento, area_di_apprendimento)
            //console.log(check_subs)
            if(check_subs.length>0){
                for(let j in check_subs){
                    let course_credits = check_subs[j].credits
                    titolo_italiano = sanitizer.decode_text(check_subs[j].italian_title)
                    let class_related = await projectClassModel.read(check_subs[j].project_class_course_id, future_session_id)
                    gruppo = class_related.group
                    let csv_row = {
                        id_studente: student_id,
                        nome: nome_studente,
                        cognome: cognome_studente,
                        classe_ordinaria: classe_ordinaria,
                        titolo_italiano: titolo_italiano,
                        gruppo: gruppo,
                        area_di_apprendimento: area_di_apprendimento,
                        contesto_di_apprendimento: contesto_di_apprendimento,
                        crediti: course_credits
                    }
                    csv_data.push(csv_row)
                    credits = credits - course_credits
                }
            }
            if (credits > 0){
                let csv_row = {
                    id_studente: student_id,
                    nome: nome_studente,
                    cognome: cognome_studente,
                    classe_ordinaria: classe_ordinaria,
                    titolo_italiano: '',
                    gruppo: '',
                    area_di_apprendimento: area_di_apprendimento,
                    contesto_di_apprendimento: contesto_di_apprendimento,
                    crediti: credits
                }
                csv_data.push(csv_row)
            }
        }
    }
    const csv = await converter.json2csv(csv_data);
    
    let _filename = 'subscriptions'+new Date().toLocaleDateString('en-GB')+'.csv'
    let filename = _filename.replace(/[/]/g,"")
    /*let mailOptions = {
        from: process.env.GOOGLE_ANNOUNCEMENT_EMAIL,
        to: 'pietro.fronza@studenti.unitn.it',
        subject: "Iscrizioni da controllare",
        text: "Ciao Claudio,\nIn allegato trovi il file csv con tutti gli studenti e i vari corsi a cui si sono iscritti.",
        attachments: [{filename: filename, content: csv,}]
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });*/
    //res.status(200).json({status: 'success', description: 'Data exported'})
    res.attachment(filename).send(csv)
}
/*subscribe_schema.isClassFull(3,7)
    .then((msg) => {
        console.log(msg.full);
    });*/
//subscribe_schema.add(3,3,7,"A",true);
//subscribe_schema.remove(3,3,7);
