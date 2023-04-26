'use strict';

const inscribe_schema = require('../models/inscribeModel');

let MSG = {
    notFound: "Resource not found",
    missing_params: "Bad input. Missing required information",
    itemAlreadyExists: "The student is already inscribe to this project class"
}

process.env.TZ = 'Etc/Universal';

module.exports.inscribe_project_class = async (req, res) => {
    let student_id = req.params.id;
    let course_id = req.query.course_id;
    let block_id = req.query.block_id;
    let section = req.query.section;
    let pen_val = undefined;
    let pending = await inscribe_schema.isClassFull(course_id, block_id);
    if(!pending){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found');
        return;
    }
    if (pending.full === "true"){
        pen_val = true
    }
    
    const subscriptionExists = await inscribe_schema.read(student_id, course_id, block_id, section);
    if(subscriptionExists === null){
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information');
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
    let subscribe = await inscribe_schema.add(student_id, course_id, block_id, section, pen_val);
    if (!subscribe){
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information');
        return;
    }
    let res_des = "Inserted " + subscribe.affectedRows + " rows";
    let response = {
        status: "accepted", 
        description: res_des
    };
    res.status(201).json(response);
}

module.exports.unsubscribe_project_class = async (req, res) => {
    let student_id = req.params.id;
    let course_id = req.query.course_id;
    let block_id = req.query.block_id;
    let unsubscribe = await inscribe_schema.remove(student_id, course_id, block_id);
    if (!unsubscribe){
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information');
        return;
    };
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
