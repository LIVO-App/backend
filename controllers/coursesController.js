'use strict';

const courseSchema = require('../models/coursesModel');

let MSG = {
    notFound: "The course you tried to find does not exist.",
    updateFailed: "Failed to save"
}

courseSchema.list(1, undefined, 7)
    .then(msg => {
        //console.log(msg);
        for(var i=0; i<msg.length;i++){
            console.log("Course "+i);
            Object.keys(msg[i]).forEach(element => {
                console.log(element+": "+msg[i][element]);
            });
            console.log("==============");
        }
    })