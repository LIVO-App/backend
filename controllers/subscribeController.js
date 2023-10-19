'use strict';

const subscribe_schema = require('../models/subscribeModel');
const studentModel = require('../models/studentModel');
const pcModel = require('../models/projectClassModel');
const courseSchema = require('../models/coursesModel');
const sessionSchema = require('../models/learning_sessionsModel')

let MSG = {
    notFound: "Resource not found",
    missing_params: "Bad input. Missing required information",
    itemAlreadyExists: "The student is already subscribed to this project class or is already subscribed to this course in a previous session",
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
        console.log('resource not found: full class');
        return;
    }
    if (pending.full === "true"){
        pen_val = true
    }
    let existStudent = await studentModel.read_id(student_id);
    if(!existStudent){
        res.status(400).json({status: "error", description: MSG.studentNotExist})
        console.log('student does not exist');
        return;
    }
    const subscriptionExists = await subscribe_schema.read(student_id, course_id, session_id, context_id, section);
    if(subscriptionExists === null){
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information: existing subscription');
        return;
    }
    if (subscriptionExists) {
        res.status(409).send({
            status: "error", 
            description: MSG.itemAlreadyExists
        });
        console.log("record already exists");
        return;
    }
    let cour = await courseSchema.read_learning_area(course_id);
    if(!cour){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found: learning area');
        return;
    }
    let isMax = await studentModel.retrieve_credits(student_id, session_id, cour.learning_area_id, context_id);
    if(!isMax){
        res.status(400).json({status: "error", description: MSG.missing_params});
        console.log('missing required information: is max');
        return;
    }
    if((Number(isMax.credits)+Number(cour.credits)) > Number(isMax.max_credits)){
        res.status(403).json({status: "error", description: MSG.maxCreditsLimit});
        console.log('max credits limit reached');
        return;
    }
    let subscribe = await subscribe_schema.add(student_id, course_id, session_id, section, context_id, pen_val);
    if (!subscribe){
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information: subscribe');
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
        console.log('missing required information on class');
        return;
    }
    if(!classExist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found: unsubscribe');
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
            console.log('subscribe: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('subscribe: unauthorized access');
        return;
    }
    let course_id = req.query.course_id;
    let session_id = req.query.session_id;
    let session_exist = await sessionSchema.read(session_id)
    if(!session_exist){
        res.status(404).json({status: "error", description: MSG.notFound})
        console.log('subscription: session does not exist');
        return;
    }
    if(session_exist.open_day>new Date()){
        res.status(400).json({status: "error", description: "The orientation day date is not already passed. You cannot subscribe to the course."})
        console.log('orientation day not passed');
        return;
    }
    let context_id = req.query.context_id;
    let existStudent = await studentModel.read_id(student_id);
    if(!existStudent){
        res.status(400).json({status: "error", description: MSG.studentNotExist})
        console.log('student does not exist');
        return;
    }
    const subscriptionExists = await subscribe_schema.read(student_id, course_id, context_id);
    if(subscriptionExists === null){
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information: existing subscription');
        return;
    }
    if (subscriptionExists) {
        res.status(409).send({
            status: "error", 
            description: MSG.itemAlreadyExists
        });
        console.log("record already exists");
        return;
    }
    let cour = await courseSchema.read_learning_area(course_id);
    if(!cour){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found: learning area');
        return;
    }
    let isMax = await studentModel.retrieve_credits(student_id, session_id, cour.learning_area_id, context_id);
    if(!isMax){
        res.status(400).json({status: "error", description: MSG.missing_params});
        console.log('missing required information: is max');
        return;
    }
    if((Number(isMax.credits)+Number(cour.credits)) > Number(isMax.max_credits)){
        res.status(403).json({status: "error", description: MSG.maxCreditsLimit});
        console.log('max credits limit reached');
        return;
    }
    let notSameGroup = await subscribe_schema.not_same_group(course_id, session_id, student_id, cour.learning_area_id, context_id);
    if(!notSameGroup){
        res.status(403).json({status: "error", description: MSG.sameGroup})
        console.log('group already selected')
        return;
    }
    let pen_val = undefined;
    let section = await subscribe_schema.getAvailableSection(course_id, session_id);
    if(section == null){
        res.status(400).json({status: "error", description: MSG.missing_params});
        console.log('mising required information: section');
        return;
    }
    if (section === ""){
        pen_val = true
    }
    let subscribe = await subscribe_schema.add(student_id, course_id, session_id, section.toUpperCase(), context_id, pen_val);
    if (!subscribe){
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information: subscribe');
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
            console.log('unsubscribe: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('unsubscribe: unauthorized access');
        return;
    }
    let course_id = req.query.course_id;
    let session_id = req.query.session_id;
    let context_id = req.query.context_id;
    let classExist = await pcModel.read(course_id, session_id);
    if(classExist === null) {
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information on class');
        return;
    }
    if(!classExist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found: unsubscribe');
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
        console.log('missing required information on class for pending students');
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
            let notSameGroup = await subscribe_schema.not_same_group(course_id, session_id, pending_student_id, cour.learning_area_id);
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
            console.log("A student was removed from pending")
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
            console.log('unsubscribe: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('unsubscribe: unauthorized access');
        return;
    }
    let course_id = req.query.course_id;
    let session_id = req.query.session_id;
    let outcome = req.query.outcome === "true" ? 1 : 0
    let existStudent = await studentModel.read_id(student_id);
    if(!existStudent){
        res.status(400).json({status: "error", description: MSG.studentNotExist})
        console.log('student does not exist');
        return;
    }
    let classExist = await pcModel.read(course_id, session_id);
    if(classExist === null) {
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information on class');
        return;
    }
    if(!classExist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found: unsubscribe');
        return;
    }
    let student_subscription = await subscribe_schema.read(student_id, course_id, session_id)
        if(!student_subscription){
            res.status(403).json({status: "error", description: MSG.notAuthorized})
            console.log("Subscription does not exist")
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
            console.log('missing required information on class for pending students');
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
                let notSameGroup = await subscribe_schema.not_same_group(course_id, session_id, pending_student_id, cour.learning_area_id);
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
                console.log("A student was removed from pending")
                break
            }
        } else {
            console.log("No pending students")
        }
        res.status(200).json(response)
        return
    } else {
        if(student_subscription.pending!=null){
            let pending = await subscribe_schema.isClassFull(course_id, session_id);
            if(!pending){
                res.status(404).json({status: "error", description: MSG.notFound});
                console.log('resource not found: full class');
                return;
            }
            if (pending.full === "false"){
                let pending_section = await subscribe_schema.getAvailableSection(course_id, session_id);
                if(pending_section===""){
                    res.status(400).json({status: "error", description: "Something went wrong"})
                    console.log('pending removal didn\'t succeded')
                    return
                }
                let remove_pending = await subscribe_schema.remove_pending(student_id, course_id, session_id, pending_section.toUpperCase())
                res.status(200).json({status: "updated", description: "The student is now subscribed to the course since a slot is now free"})
                console.log("Student is now subscribed to the course")
                return
            }
            res.status(200).json({status: "not updated", description: "The student will remain in pending list since there are no slot available. It will become subscribed if one slot will be available before the starting of the courses. It has still express its liking into taking the course in future editions."})
            console.log("Student is still in pending list of the course")
            return
        }
        res.status(200).json({status: "accepted", description: "The student is enrolled to this course"})
        console.log("Student is enrolled definetely.")
        return
    }
}
/*subscribe_schema.isClassFull(3,7)
    .then((msg) => {
        console.log(msg.full);
    });*/
//subscribe_schema.add(3,3,7,"A",true);
//subscribe_schema.remove(3,3,7);
