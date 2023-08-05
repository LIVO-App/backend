'use strict';

const constraintSchema = require('../models/constraintModel');
const adminSchema = require('../models/adminModel')

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    missingParameters: "Missing required information"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_constraints = async (req, res) => {
    if(req.loggedUser.role == "admin"){
        let user_id = req.loggedUser._id
        let user_exist = await adminSchema.read_id(user_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('course proposition insertion: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('get constraints: unauthorized access');
        return;
    }
    let block_id = req.query.block_id
    let year_of = req.query.year_of === "true" ? true : false
    let context_id = req.query.context_id;
    let area_id = req.query.area_id;
    let study_year = req.query.study_year;
    let study_address = req.query.study_address;
    let constraints = await constraintSchema.get_constraints(block_id,year_of,context_id, area_id, study_year, study_address);
    if(constraints == null){
        res.status(400).json({status: "error", description: MSG.missingParameters});
        console.log('get constraints: missing parameters');
        return;
    }
    if (!constraints) {
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('get constraints: resource not found');
        return;
    }
    let data_constraints = constraints.map((constraint) => {
        let block_ref = {
            path: "/api/v1/learning_blocks",
            single: true,
            query: {},
            data: {
                id: constraint.learning_block_id
            }
        }
        let ord_class_ref = {
            path: "/api/v1/learning_areas",
            single: true,
            query: {},
            data: {
                study_year: constraint.ordinary_class_study_year,
                study_address: constraint.ordinary_class_study_address
            }
        }
        let area_ref = {
            path: "/api/v1/learning_areas",
            single: true,
            query: {},
            data: {
                id: constraint.learning_area_id
            }
        }
        let context_ref = {
            path: "/api/v1/learning_contexts",
            single: true,
            query: {},
            data: {
                id: constraint.learning_context_id
            }
        }
        return {
            id: constraint.id,
            learning_block_ref: block_ref,
            ordinary_class_ref: ord_class_ref,
            ordinary_class_school_year: constraint.ordinary_class_school_year,
            learning_area_ref: area_ref,
            learning_context_ref: context_ref,
            credits: constraint.credits
        }
    })
    let response = {
        path: "/api/v1/constraints",
        single: true,
        query: {
            block_id: block_id,
            year_of: year_of,
            context_id: context_id,
            area_id: area_id,
            study_year: study_year,
            study_address: study_address
        },
        date: new Date(),
        data: data_constraints
    };
    res.status(200).json(response);
}