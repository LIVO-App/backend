'use strict';

const inscribe_schema = require('../models/inscribeModel');

let MSG = {
    notFound: "Resource not found",
    missing_params: "Bad input. Missing required information"
}

process.env.TZ = 'Etc/Universal';

module.exports.inscribe_project_class = async (req, res) => {
    let student_id = req.body.student_id;
    let course_id = req.body.course_id;
    let block_id = req.body.block_id;
    let section = req.body.section;
    let pen_val = undefined;
    let pending = await inscribe_schema.isClassFull(course_id, block_id);
    if(!pending){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found');
        return;
    }
    if (pending.full){
        pen_val = true
    }
    let subscribe = await inscribe_schema.add(student_id, course_id, block_id, section, pen_val);
    if (!subscribe){
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information');
        return;
    }
    res_des = "Inserted " + subscribe.affectedRows + " rows";
    let response = {status: "accepted", description: res_des};
    res.status(201).json(response);
}

module.exports.unsubscribe_project_class = async (req, res) => {

}

/*inscribe_schema.isClassFull(3,7)
    .then((msg) => {
        console.log(msg.full);
    });*/
//inscribe_schema.add(3,3,7,"A",true);
//inscribe_schema.remove(3,3,7);
