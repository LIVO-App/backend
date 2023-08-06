'use strict';

const constraintSchema = require('../models/constraintModel');
const adminSchema = require('../models/adminModel');
const learning_blocksModel = require('../models/learning_blocksModel');
const learning_areaModel = require('../models/learning_areaModel');
const learningContextsModel = require('../models/learningContextsModel');
const ordinaryclassModel = require('../models/ordinaryclassModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    itemAlreadyExists: "The constraints are all already presents",
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
    if(block_id!=undefined){
        let block_exists = await learning_blocksModel.read(block_id)
        if(!block_exists){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('get constraints block_id: resource not found');
            return;
        }
    }
    if(area_id!=undefined){
        let area_exists = await learning_areaModel.read(area_id)
        if(!area_exists){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('get constraints area_id: resource not found');
            return;
        }
    }
    if(context_id!=undefined){
        let context_exists = await learningContextsModel.read(context_id)
        if(!context_exists){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('get constraints context_id: resource not found');
            return;
        }
    }
    if(study_address!=undefined && study_year!=undefined){
        let ord_class_exists = await ordinaryclassModel.read(study_year, study_address, block_id)
        if(!ord_class_exists){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('get constraints ordinary_class: resource not found');
            return;
        }
    }
    
    let constraints = await constraintSchema.get_constraints(block_id,year_of,context_id, area_id, study_year, study_address);
    if(!constraints){
        res.status(400).json({status: "error", description: MSG.missingParameters});
        console.log('get constraints: missing parameters');
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

module.exports.insert_constraints = async (req, res) => {
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
    let constraints_object = req.body.constraints_object;
    let block_exists, context_exists, area_exists, class_exist, study_year, study_address, context_id, area_id, credits;
    let wrong_block, wrong_context, wrong_area, wrong_class, constraint_present = undefined;
    if(constraints_object!=undefined){
        for(var block in constraints_object){
            block_exists = await learning_blocksModel.read(block);
            if(!block_exists){
                console.log(`The block with id ${block} does not exist. Removing it from constraints_object`);
                wrong_block = true;
                delete constraints_object[block];
                continue;
            }
            for(let index=0;index<constraints_object[block].length;index++){
                
                context_id = constraints_object[block][index].context_id;
                context_exists = await learningContextsModel.read(context_id);
                if(!context_exists){
                    console.log(`The context with id ${context_id} does not exist. Removing the constraint from the block array`);
                    wrong_context = true;
                    constraints_object[block].splice(index, 1);
                    index = index-1;
                    continue;
                }
                area_id = constraints_object[block][index].area_id;
                if(area_id!=undefined){
                    area_exists = await learning_areaModel.read(area_id);
                    if(!area_exists){
                        console.log(`The learning area with id ${area_id} does not exist. Removing the constraint from the block array`);
                        wrong_area = true;
                        constraints_object[block].splice(index, 1);
                        index = index-1;
                        continue;
                    }
                }
                credits = constraints_object[block][index].credits;
                let classes = constraints_object[block][index].classes;
                for(let j=0;j<classes.length;j++){
                    study_year = classes[j].study_year;
                    study_address = classes[j].study_address;
                    class_exist = await ordinaryclassModel.read(study_year, study_address, block);
                    if(!class_exist){
                        console.log(`Ordinary class ${study_year} ${study_address} does not exist. Removing it from the list of classes of a certain constraint`);
                        wrong_class = true
                        classes.splice(j, 1);
                        j = j-1;
                    } else {
                        constraint_present = await constraintSchema.is_present(context_id, study_year, study_address, area_id, block)
                        if(constraint_present){
                            console.log(`The constraint is already present for this class in the period inserted. Removing the class from the list of classes`)
                            constraint_present = true
                            classes.splice(j, 1);
                            j = j-1;
                        }
                    }
                }
                if(constraints_object[block].length == 0){
                    console.log(`All constraints inserted for a learning block are wrong or already present. Removing learning block key`)
                    wrong_block = true
                    delete constraints_object[block]
                }
            }
        }
    }
    let constraints_insert = await constraintSchema.add_block_constraints(constraints_object);
    if(!constraints_insert){
        res.status(409).json({status: "error", description: MSG.itemAlreadyExists, wrong_block: wrong_block, wrong_area: wrong_area, wrong_context: wrong_context, wrong_class: wrong_class, constraint_present: constraint_present})
        console.log('duplicated information: new block constraints addition');
        return;
    }
    let years_to_check = []
    let num_updated, num_inserted = 0
    // Get sum of all constraints for each year of the block_id and insert this sum in the constraints table.
    // If already present do an update. Else simply insert it
    if(constraints_object!=undefined){
        // In this cicle, get school_year of a block and then check if it is already present. If no, then check if constraints exists.
        // Else, do nothing and check the following block.
        for(let block in constraints_object){
            let block_exists = await learning_blocksModel.read(block)
            if (!block_exists) {
                console.log(`The block with id ${block} does not exist. Removing it from constraints_object`);
                wrong_block = true;
                delete constraints_object[block];
                continue;
            }
            let year_of = block_exists.school_year
            if(years_to_check.find((element) => element == year_of) == undefined){
                let possible_annual_constraints = await constraintSchema.get_constraint_sum(school_year);
                for(let row in possible_annual_constraints){
                    let cl_study_year = possible_annual_constraints[row].ordinary_class_study_year;
                    let cl_study_address = possible_annual_constraints[row].ordinary_class_address;
                    let cl_school_year = possible_annual_constraints[row].ordinary_class_school_year;
                    let learning_area_id = possible_annual_constraints[row].learning_area_id;
                    let learning_context_id = possible_annual_constraints[row].learning_context_id;
                    let total_credits = possible_annual_constraints[row].total_credits;
                    let annual_constraint_exist = await constraintSchema.is_annual_constraint_present(learning_context_id, cl_study_year, cl_study_address, learning_area_id, cl_school_year)
                    if(annual_constraint_exist.result){
                        // Update already existing credit model
                        let annual_constraint_id = annual_constraint_exist.id
                        let update_constraints = await constraintSchema.update_annual_constraint(total_credits, annual_constraint_id);
                        if(update_constraints.changedRows != 0){
                            num_updated = num_updated + update_constraints.changedRows
                        }
                        
                    } else {
                        // Insert new annual credit model
                        let annual_credits_model_exists = await constraintSchema.annual_credits_model_exists(cl_study_year, cl_study_address, cl_school_year)
                        if(!annual_credits_model_exists){
                            let annual_credits_definition_insert = await constraintSchema.annual_credits_definition(cl_study_year, cl_study_address, cl_school_year)
                        }
                        let insert_constraints = await constraintSchema.insert_annual_constraint(cl_study_year, cl_study_address, cl_school_year, learning_area_id, learning_context_id, total_credits)
                        num_inserted = num_inserted + 1
                    }
                }
                years_to_check.push(year_of)
            }
        }
    }
    res.status(201).json({
        status: "accepted",
        description: "Constraints inserted", 
        wrong_block: wrong_block,
        wrong_area: wrong_area,
        wrong_class: wrong_class,
        wrong_context: wrong_context,
        constraint_present: constraint_present,
        num_inserted: num_inserted,
        num_updated: num_updated
    });

}