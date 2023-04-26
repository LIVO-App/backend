'use strict';

const learningAreaSchema = require('../models/learning_areaModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_areas = async (req, res) => {
    let block_id = req.query.block_id;
    let all_data = req.query.all_data;
    let areas;
    if (block_id != undefined) {
        areas = await learningAreaSchema.read_from_blocks(block_id,all_data);
    } else {
        areas = await learningAreaSchema.list();
    }
    let data_areas = areas.map((area) => {
        return {
            id: area.id,
            italian_title: area.italian_title,
            english_title: area.english_title,
            italian_description: area.italian_description,
            english_description: area.english_description
        };
    });
    let response = {
        origin: "/api/v1/learning_areas/",
        single: true,
        query: {
            block_id: block_id,
            all_data: all_data
        },
        date: new Date(),
        data: data_areas
    }
    res.status(200).json(response);
}

module.exports.get_area = async (req, res) => {
    let area = await learningAreaSchema.read(req.params.id);
    if(!area){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found');
        return;
    }
    let data_area = {
        id: area.id,
        italian_title: area.italian_title,
        english_title: area.english_title,
        italian_description: area.italian_description,
        english_description: area.english_description
    };
    let response = {
        origin: "/api/v1/learning_areas/",
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

learningAreaSchema.read_from_blocks("6")
    .then(async msg => {
        console.log("=====================\nLearning areas from learning block 6");
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