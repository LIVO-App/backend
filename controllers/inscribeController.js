'use strict';

const inscribe_schema = require('../models/inscribeModel');
const studentModel = require('../models/studentModel');
const pcModel = require('../models/projectClassModel');
const courseSchema = require('../models/coursesModel');

let MSG = {
    notFound: "Resource not found",
    missing_params: "Bad input. Missing required information",
    itemAlreadyExists: "The student is already inscribe to this project class",
    studentNotExist: "The student does not exist",
    maxCreditsLimit: "The student has passed the maximum number of credits for this learning area"
}

process.env.TZ = 'Etc/Universal';

module.exports.inscribe_project_class = async (req, res) => {
    let student_id = req.params.id;
    let course_id = req.query.course_id;
    let block_id = req.query.block_id;
    let section = req.query.section ?? "A";
    let pen_val = undefined;
    let pending = await inscribe_schema.isClassFull(course_id, block_id);
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
    const subscriptionExists = await inscribe_schema.read(student_id, course_id, block_id, section);
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
    let isMax = await studentModel.retrieve_credits(student_id, block_id, cour.learning_area_id);
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
    let subscribe = await inscribe_schema.add(student_id, course_id, block_id, section, pen_val);
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
    let student_id = req.params.id;
    let course_id = req.query.course_id;
    let block_id = req.query.block_id;
    let classExist = await pcModel.read(course_id, block_id);
    if(classExist === null) {
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information on class');
        return;
    }
    if(!classExist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found: unscribe');
        return;
    }
    let unsubscribe = await inscribe_schema.remove(student_id, course_id, block_id);
    let res_des = "Deleted " + unsubscribe.affectedRows + " rows";
    let response = {
        status: "deleted", 
        description: res_des
    };
    res.status(200).json(response);
}

/*inscribe_schema.isClassFull(3,7)
    .then((msg) => {
        console.log(msg.full);
    });*/
//inscribe_schema.add(3,3,7,"A",true);
//inscribe_schema.remove(3,3,7);
