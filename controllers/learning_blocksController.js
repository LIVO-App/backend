'use strict';

const learningBlockSchema = require('../models/learning_blocksModel');

let MSG = {
    notFound: "The learning block you tried to find does not exist.",
    updateFailed: "Failed to save"
}

module.exports.get_blocks = async (req, res) => {
    let blocks = await learningBlockSchema.list();
    let response = blocks.map( (block) => {
        return {
            self: "/api/v1/learning_blocks/"+ block.id,
            number: block.number,
            school_year: block.school_year,
            start: block.start,
            end: block.end
        };
    });
    res.status(200).json(response);
}

module.exports.get_block = async (req, res) => {
    let block = await learningBlockSchema.read(req.params.id);
    let response = {
        self: "/api/v1/blocks/learning_blocks/"+ block.id,
        number: block.number,
        school_year: block.school_year,
        start: block.start,
        end: block.end
    };
    res.status(200).json(response);
}

