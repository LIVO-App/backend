'use strict';

const learningBlockSchema = require('../models/learning_blocksModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    missingParameters: "Missing required information"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_blocks = async (req, res) => {
    let school_year = req.query.school_year;
    let year_of = req.query.year_of;
    year_of = school_year != undefined ? undefined : year_of;
    let future_block = req.query.future_block;
    future_block = future_block === "true" ? true : false;
    let blocks = await learningBlockSchema.list(school_year, year_of, future_block);
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
            school_year: school_year,
            year_of: year_of,
            future_block: future_block
        },
        date: new Date(),
        data: data_blocks
    };
    res.status(200).json(response);
}

module.exports.get_block = async (req, res) => {
    let id = req.params.block_id;
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

module.exports.get_blocks_from_courses = async (req, res) => {
    let student_id = req.query.student_id;
    let courses = req.body.courses;
    let blocks = await learningBlockSchema.list_from_list_of_courses(student_id, courses);
    if(blocks==null){
        res.status(400).json({status: "error", description: MSG.missingParameters});
        console.log('list of block: missing list of courses');
        return;
    }
    let data_blocks = blocks.map( (block) => {
        return {
            course_id: block.course,
            block_id: block.block
        };
    });
    let response = {
        path: "/api/v1/learning_blocks/",
        single: true,
        query: {
            student_id: student_id
        },
        date: new Date(),
        data: data_blocks
    };
    res.status(200).json(response);
}