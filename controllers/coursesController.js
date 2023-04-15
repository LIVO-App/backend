'use strict';

const courseSchema = require('../models/coursesModel');

let MSG = {
    notFound: "The course you tried to find does not exist.",
    updateFailed: "Failed to save"
}

module.exports.get_courses = async (req, res) => {
    let block_id = req.query.block_id;
    let student_id = req.query.student_id;
    let area_id = req.query.area_id;
    let courses = await courseSchema.list(student_id, area_id, block_id);
    let data_course = courses.map((course) => {
        return {
            id: course.id,
            italian_title: course.italian_title,
            english_title: course.english_title,
            credits: course.credits,
            italian_displayed_name: course.italian_displayed_name,
            english_displayed_name: course.english_displayed_name,
            pending: course.inscribed
        };
    });
    let response = {
        origin: "/api/v1/course",
        data: data_course
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
courseSchema.read(4)
    .then(msg => {
        //console.log(msg);
        if(msg){
            Object.keys(msg).forEach(element => {
                console.log(element+": "+msg[element]);
            });
        }
    });