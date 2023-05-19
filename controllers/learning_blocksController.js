'use strict';

const learningBlockSchema = require('../models/learning_blocksModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_blocks = async (req, res) => {
    let school_year = req.query.school_year;
    let year_of = req.query.year_of;
    let blocks = await learningBlockSchema.list(school_year, year_of);
    let data_blocks = blocks.map( (block) => {
        return {
            id: block.id,
            number: block.number,
            school_year: block.school_year,
            start: block.start,
            end: block.end
        };
    });
    let response = {
        path: "/api/v1/learning_blocks/",
        single: true,
        query: {
            school_year: school_year
        },
        date: new Date(),
        data: data_blocks
    };
    res.status(200).json(response);
}

module.exports.get_block = async (req, res) => {
    let id = req.params.id;
    let school_year = req.query.school_year;
    let block = await learningBlockSchema.read(id,school_year);
    if(!block){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('single block: resource not found');
        return;
    }
    let data_block = {
        id: block.id,
        number: block.number,
        school_year: block.school_year,
        start: block.start,
        end: block.end
    };
    let response = {
        path: "/api/v1/learning_blocks/",
        single: true,
        query: {
            school_year: school_year
        },
        date: new Date(),
        data: data_block
    };
    res.status(200).json(response);
}

