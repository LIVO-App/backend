'use strict';

const htmlentitiesenc = require("html-entities")
const learningAreaSchema = require('../models/learning_areaModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_areas = async (req, res) => {
    let session_id = req.query.session_id;
    let all_data = req.query.all_data;
    all_data = all_data === "true" ? true : false;
    let credits = req.query.credits;
    let context_id = req.query.context_id;
    let areas;
    if (session_id != undefined) {
        if(context_id === "SPE" || context_id === undefined){
            areas = await learningAreaSchema.read_from_sessions(session_id,all_data,credits);
        } else {
            areas = await learningAreaSchema.list_personal_available_areas(session_id, all_data)
        }
    } else {
        areas = await learningAreaSchema.list();
    }
    let data_areas = areas.map((area) => {
        let italian_title = htmlentitiesenc.encode(area.italian_title, {mode: 'nonAsciiPrintable'})
        let english_title = htmlentitiesenc.encode(area.english_title, {mode: 'nonAsciiPrintable'})
        let italian_description = htmlentitiesenc.encode(area.italian_description, {mode: 'nonAsciiPrintable'})
        let english_description = htmlentitiesenc.encode(area.english_description, {mode: 'nonAsciiPrintable'})
        return {
            id: area.id,
            italian_title: italian_title,
            english_title: english_title,
            italian_description: italian_description,
            english_description: english_description,
            credits: area.credits
        };
    });
    let response = {
        path: "/api/v1/learning_areas/",
        single: true,
        query: {
            session_id: session_id,
            all_data: all_data
        },
        date: new Date(),
        data: data_areas
    }
    res.status(200).json(response);
}

module.exports.get_area = async (req, res) => {
    let area = await learningAreaSchema.read(req.params.area_id);
    if(!area){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('single learning area: resource not found ('+new Date()+')');
        return;
    }
    let italian_title = htmlentitiesenc.encode(area.italian_title, {mode: 'nonAsciiPrintable'})
        let english_title = htmlentitiesenc.encode(area.english_title, {mode: 'nonAsciiPrintable'})
        let italian_description = htmlentitiesenc.encode(area.italian_description, {mode: 'nonAsciiPrintable'})
        let english_description = htmlentitiesenc.encode(area.english_description, {mode: 'nonAsciiPrintable'})
    let data_area = {
        id: area.id,
        italian_title: italian_title,
        english_title: english_title,
        italian_description: italian_description,
        english_description: english_description
    };
    let response = {
        path: "/api/v1/learning_areas/",
        single: true,
        query: {},
        date: new Date(),
        data: data_area
    };
    res.status(200).json(response);
}

/*learningAreaSchema.list()
    .then(msg => {
        for(var i=0;i<msg.length;i++){
            console.log("Learning Area "+i);
            Object.keys(msg[i]).forEach(element => {
                console.log(element+": "+msg[i][element]);
            });
            console.log("=============");
        }
    });

learningAreaSchema.read("COM")
    .then(msg => {
        console.log("=====================\nSingle learning area");
        if (msg){
            Object.keys(msg).forEach(element => {
                console.log(element+": "+msg[element]);
            });
        }
    });

learningAreaSchema.read_from_sessions("6")
    .then(async msg => {
        console.log("=====================\nLearning areas from learning session 6");
        if(msg){
            //console.log(msg[0].learning_area_id);
            for(var i=0;i<msg.length;i++){
                console.log("Learning area: "+i);
                
                let res = await learningAreaSchema.read(msg[0].learning_area_id);
                Object.keys(res).forEach(element => {
                    console.log(element+": "+res[element]);
                });
                console.log("==============;")
            }
        }
    })*/