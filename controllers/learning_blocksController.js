'use strict';

const learningBlockSchema = require('../models/learning_blocksModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save"
}

module.exports.get_blocks = async (req, res) => {
    let school_year = req.query.school_year;
    let blocks = await learningBlockSchema.list(school_year);
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
        origin: "/api/v1/learning_blocks/",
        single: true,
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
        console.log('resource not found');
        return;
    }
    let data_block = {
        self: block.id,
        number: block.number,
        school_year: block.school_year,
        start: block.start,
        end: block.end
    };
    let response = {
        origin: "/api/v1/learning_blocks/",
        single: true,
        data: data_block
    };
    res.status(200).json(response);
}

