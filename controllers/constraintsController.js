'use strict';

const constraintSchema = require('../models/constraintModel');
const adminSchema = require('../models/adminModel');
const learning_sessionsModel = require('../models/learning_sessionsModel');
const learning_areaModel = require('../models/learning_areaModel');
const learningContextsModel = require('../models/learningContextsModel');
const ordinaryclassModel = require('../models/ordinaryclassModel');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    notAuthorized: "Not authorized request",
    itemAlreadyExists: "The constraints are all already presents",
    pastSession: "Session already expired or imminent. You can't change the constraints",
    firstFutureSession: "First future session. The students are choosing their courses right now. You can't change the constraints",
    missingParameters: "Missing required information"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_constraints = async (req, res) => {
    if(req.loggedUser.role == "admin"){
        let user_id = req.loggedUser._id
        let user_exist = await adminSchema.read_id(user_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get constraints: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('get constraints: unauthorized access ('+new Date()+')');
        return;
    }
    let session_id = req.query.session_id
    let year_of = req.query.year_of === "true" ? true : false
    let context_id = req.query.context_id;
    let area_id = req.query.area_id;
    let study_year = req.query.study_year;
    let study_address = req.query.study_address;
    if(session_id!=undefined){
        let session_exists = await learning_sessionsModel.read(session_id)
        if(!session_exists){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('get constraints session_id: resource not found ('+new Date()+')');
            return;
        }
    }
    if(area_id!=undefined){
        let area_exists = await learning_areaModel.read(area_id)
        if(!area_exists){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('get constraints area_id: resource not found ('+new Date()+')');
            return;
        }
    }
    if(context_id!=undefined){
        let context_exists = await learningContextsModel.read(context_id)
        if(!context_exists){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('get constraints context_id: resource not found ('+new Date()+')');
            return;
        }
    }
    if(study_address!=undefined && study_year!=undefined){
        let ord_class_exists = await ordinaryclassModel.read(study_year, study_address, session_id)
        if(!ord_class_exists){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('get constraints ordinary_class: resource not found ('+new Date()+')');
            return;
        }
    }
    
    let constraints = await constraintSchema.get_constraints(session_id,year_of,context_id, area_id, study_year, study_address);
    if(!constraints){
        res.status(400).json({status: "error", description: MSG.missingParameters});
        console.log('get constraints: missing parameters ('+new Date()+')');
        return;
    }
    let data_constraints = constraints.map((constraint) => {
        let session_ref = {
            path: "/api/v1/learning_sessions",
            single: true,
            query: {},
            data: {
                id: constraint.learning_session_id
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
            learning_session_ref: session_ref,
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
            session_id: session_id,
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
            console.log('constraints insertion: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('constraints insertion: unauthorized access ('+new Date()+')');
        return;
    }
    let constraints_object = req.body.constraints_object;
    let session_exists, context_exists, area_exists, class_exist, study_year, study_address, context_id, area_id, credits;
    let wrong_session, wrong_context, wrong_area, wrong_class, constraint_present = undefined;
    if(constraints_object!=undefined){
        for(var session in constraints_object){
            session_exists = await learning_sessionsModel.read(session);
            if(!session_exists){
                console.log(`The session with id ${session} does not exist. Removing it from constraints_object`);
                wrong_session = true;
                delete constraints_object[session];
                continue;
            }
            // Check the session is not past, current, imminent or the first one that is immimediatly future (the one where the students are choosing new courses)
            let starting_date = new Date(session_exists.start)
            let today = new Date()
            let _10days = today.setDate(today.getDate() + 10)
            if (starting_date <= today || starting_date <= _10days){
                console.log(`The session with id ${session} is a past, current or imminent. Removing it from constraints_object`);
                wrong_session = true;
                delete constraints_object[session];
                continue;
            } else {
                let past_session = await learning_sessionsModel.read(session-1)
                if(past_session){
                    let past_starting_date = new Date(past_session.start)
                    if(past_starting_date <= today || past_starting_date <= _10days){
                        console.log(`The session with id ${session} is the first future session where students are choosing new constraints. Removing it from constraints_object`);
                        wrong_session = true;
                        delete constraints_object[session];
                        continue;
                    }
                }
            }
            for(let index=0;index<constraints_object[session].length;index++){
                context_id = constraints_object[session][index].context_id;
                context_exists = await learningContextsModel.read(context_id);
                if(!context_exists){
                    console.log(`The context with id ${context_id} does not exist. Removing the constraint from the session array`);
                    wrong_context = true;
                    constraints_object[session].splice(index, 1);
                    index = index-1;
                    continue;
                }
                area_id = constraints_object[session][index].area_id;
                if(area_id!=undefined){
                    area_exists = await learning_areaModel.read(area_id);
                    if(!area_exists){
                        console.log(`The learning area with id ${area_id} does not exist. Removing the constraint from the session array`);
                        wrong_area = true;
                        constraints_object[session].splice(index, 1);
                        index = index-1;
                        continue;
                    }
                }
                credits = constraints_object[session][index].credits;
                let classes = constraints_object[session][index].classes;
                for(let j=0;j<classes.length;j++){
                    study_year = classes[j].study_year;
                    study_address = classes[j].study_address;
                    class_exist = await ordinaryclassModel.read(study_year, study_address, session);
                    if(!class_exist){
                        console.log(`Ordinary class ${study_year} ${study_address} does not exist. Removing it from the list of classes of a certain constraint`);
                        wrong_class = true
                        classes.splice(j, 1);
                        j = j-1;
                    } else {
                        constraint_present = await constraintSchema.is_present(context_id, study_year, study_address, area_id, session)
                        if(constraint_present){
                            console.log(`The constraint is already present for this class in the period inserted. Removing the class from the list of classes`)
                            constraint_present = true
                            classes.splice(j, 1);
                            j = j-1;
                        }
                    }
                }
                if(classes.length == 0){
                    console.log(`All classes inserted for the constraint were wrong or already present. Removing element from session array`)
                    wrong_class = true
                    constraints_object[session].splice(index, 1);
                    index = index-1;
                    continue;
                }
                if(constraints_object[session].length == 0){
                    console.log(`All constraints inserted for a learning session are wrong or already present. Removing learning session key`)
                    wrong_session = true
                    delete constraints_object[session]
                }
            }
        }
    }
    let num_constraints_inserted = 0
    let constraints_insert = await constraintSchema.add_session_constraints(constraints_object);
    if(!constraints_insert){
        if(!constraint_present){
            res.status(400).json({status: "error", description: MSG.missingParameters, wrong_session: wrong_session, wrong_area: wrong_area, wrong_context: wrong_context, wrong_class: wrong_class, constraint_present: constraint_present})
            console.log('missing required information: new session constraints addition ('+new Date()+')');
            return;
        } else {
            res.status(409).json({status: "error", description: MSG.itemAlreadyExists, wrong_session: wrong_session, wrong_area: wrong_area, wrong_context: wrong_context, wrong_class: wrong_class, constraint_present: constraint_present})
            console.log('duplicated information: new session constraints addition ('+new Date()+')');
            return;
        }
    }
    num_constraints_inserted = constraints_insert.affectedRows;
    /*let years_to_check = []
    let num_updated, num_annual_constraints_inserted = 0
    // Get sum of all constraints for each year of the session_id and insert this sum in the constraints table.
    // If already present do an update. Else simply insert it
    if(constraints_object!=undefined){
        // In this cicle, get school_year of a session and then check if it is already present. If no, then check if constraints exists.
        // Else, do nothing and check the following session.
        for(let session in constraints_object){
            let session_exists = await learning_sessionsModel.read(session)
            if (!session_exists) {
                console.log(`The session with id ${session} does not exist. Removing it from constraints_object`);
                wrong_session = true;
                delete constraints_object[session];
                continue;
            }
            let year_of = session_exists.school_year
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
                        num_annual_constraints_inserted = num_annual_constraints_inserted + 1
                    }
                }
                years_to_check.push(year_of)
            }
        }
    }*/
    let starting_id = constraints_insert.insertId.toString()
    res.status(201).json({
        status: "accepted",
        description: "Constraints inserted", 
        wrong_session: wrong_session,
        wrong_area: wrong_area,
        wrong_class: wrong_class,
        wrong_context: wrong_context,
        constraint_present: constraint_present,
        starting_id: starting_id, //Starting id of the ones inserted
        num_constraints_inserted: num_constraints_inserted
        /*num_annual_constraints_inserted: num_annual_constraints_inserted,
        num_updated: num_updated*/
    });

}

module.exports.delete_constraint = async (req, res) => {
    if(req.loggedUser.role == "admin"){
        let user_id = req.loggedUser._id
        let user_exist = await adminSchema.read_id(user_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('deletion constraints: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('delete constraints: unauthorized access ('+new Date()+')');
        return;
    }
    let constr_id = req.params.constr_id
    let constr_exist = await constraintSchema.read(constr_id)
    if(!constr_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('constraint deletion: resource not found ('+new Date()+')');
        return;
    }
    let session_id = constr_exist.learning_session_id
    let session_exists = await learning_sessionsModel.read(session_id)
    let starting_date = new Date(session_exists.start)
    let today = new Date()
    let _10days = today.setDate(today.getDate() + 10)
    if (starting_date <= today || starting_date <= _10days){
        res.status(400).json({status: "error", description: MSG.pastSession});
        console.log('constraint deletion: the session is a past, current or imminent session. Abort delete ('+new Date()+')');
        return;
    } else {
        let past_session = await learning_sessionsModel.read(session_id-1)
        if(past_session){
            let past_starting_date = new Date(past_session.start)
            if(past_starting_date <= today || past_starting_date <= _10days){
                res.status(400).json({status: "error", description: MSG.firstFutureSession});
                console.log('constraint deletion: the session is the first future session, where the students are choosing the next courses. You can\'t change the constraints. Abort delete ('+new Date()+')');
                return;
            }
        }
    }
    await constraintSchema.delete_constraint(constr_id)
    res.status(200).json({status: "deleted", description: "Constraint deleted successfully"});
}

module.exports.update_constraints = async (req, res) => {
    if(req.loggedUser.role == "admin"){
        let user_id = req.loggedUser._id
        let user_exist = await adminSchema.read_id(user_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('update constraints: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('update constraints: unauthorized access ('+new Date()+')');
        return;
    }
    let constr_id = req.params.constr_id
    let constr_exist = await constraintSchema.read(constr_id)
    if(!constr_exist){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('constraint update: resource not found ('+new Date()+')');
        return;
    }
    let session_id = constr_exist.learning_session_id
    let session_exists = await learning_sessionsModel.read(session_id)
    let starting_date = new Date(session_exists.start)
    let today = new Date()
    let _10days = today.setDate(today.getDate() + 10)
    if (starting_date <= today || starting_date <= _10days){
        res.status(400).json({status: "error", description: MSG.pastSession});
        console.log('constraint deletion: the session is a past, current or imminent session. Abort update ('+new Date()+')');
        return;
    } else {
        let past_session = await learning_sessionsModel.read(session_id-1)
        if(past_session){
            let past_starting_date = new Date(past_session.start)
            if(past_starting_date <= today || past_starting_date <= _10days){
                res.status(400).json({status: "error", description: MSG.firstFutureSession});
                console.log('constraint deletion: the session is the first future session, where the students are choosing the next courses. You can\'t change the constraints. Abort update ('+new Date()+')');
                return;
            }
        }
    }
    let num_credits = req.body.num_credits;
    let update_constraints = await constraintSchema.update(constr_id, num_credits)
    if(!update_constraints){
        res.status(400).json({status: "error", description: MSG.missingParameters});
        console.log('constraint update: missing parameters ('+new Date()+')');
        return;
    }
    res.status(200).json({status: "updated", description: "Constraint updated successfully"})
}