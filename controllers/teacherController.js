'use strict';

const classesSchema = require('../models/classesTeacherModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save"
}

process.env.TZ = 'Etc/Universal';



/*classesSchema.read_project_classes_teach(3, 7).then(msg => {
    for(var i=0;i<msg.length;i++){
        console.log("classes "+i);
        Object.keys(msg[i]).forEach(element => {
            console.log(element+": "+msg[i][element]);
        });
        console.log("=============");
    }
});

classesSchema.read_project_classes_associated(3,7).then(msg => {
    for(var i=0;i<msg.length;i++){
        console.log("classes "+i);
        Object.keys(msg[i]).forEach(element => {
            console.log(element+": "+msg[i][element]);
        });
        console.log("=============");
    }
})*/