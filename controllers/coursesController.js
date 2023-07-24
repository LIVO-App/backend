'use strict';

const courseSchema = require('../models/coursesModel');
const projectclassSchema = require('../models/projectClassModel');
const teachingCourseSchema = require('../models/courseteachingModel');
const teacherClassSchema = require('../models/classesTeacherModel');
const opentoSchema = require('../models/opentoModel');
const areaSchema = require('../models/learning_areaModel');
const contextSchema = require('../models/learningContextsModel');
const growthareaSchema = require('../models/growthAreaModel');
const blockSchema = require('../models/learning_blocksModel');
const teacherSchema = require('../models/teacherModel');
const ordClassSchema = require('../models/ordinaryclassModel');
const teachingSchema = require('../models/teachingModel'); // To check if teaching exists
const adminSchema = require('../models/adminModel')
const studentSchema = require('../models/studentModel')

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    missing_params: "Bad input. Missing required information",
    itemAlreadyExists: "The student is already inscribe to this project class",
    notAuthorized: "Not authorized request"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_courses = async (req, res) => {
    let block_id = req.query.block_id;
    let student_id = req.query.student_id;
    let area_id = req.query.area_id;
    let context_id = req.query.context_id;
    let alone = req.query.alone;
    let courses = await courseSchema.list(student_id, area_id, block_id, context_id, alone);
    if(!courses){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('courses: resource not found');
        return;
    }
    let data_courses = courses.map((course) => {
        let learning_area_ref = {
            path: "/api/v1/learning_areas",
            single: true,
            query: {},
            data: {
                id: course.learning_area_id
            }
        }
        return {
            id: course.id,
            italian_title: course.italian_title,
            english_title: course.english_title,
            credits: course.credits,
            learning_area_ref: learning_area_ref,
            section: course.section,
            pending: course.inscribed
        };
    });
    let response = {
        path: "/api/v1/courses",
        single: true,
        query: {
            student_id: student_id,
            area_id: area_id,
            block_id: block_id,
            context_id: context_id,
            alone: alone
        },
        date: new Date(),
        data: data_courses
    };
    res.status(200).json(response);
}

module.exports.get_courses_v2 = async (req, res) => {
    let block_id = req.query.block_id;
    let student_id = req.query.student_id;
    if(student_id!=undefined){
        let student_exist = await studentModel.read_id(student_id)
        if(!student_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_courses_v2: unauthorized access');
            return;
        }
        if(req.loggedUser.role == "student"){
            if(req.loggedUser._id != student_id){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('get_courses_v2: unauthorized access');
                return;
            }
        } else {
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_courses_v2: unauthorized access');
            return;
        }
    }
    let area_id = req.query.area_id;
    let context_id = req.query.context_id;
    let alone = req.query.alone;
    let courses = await courseSchema.list(student_id, area_id, block_id, context_id, alone);
    if(!courses){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('courses: resource not found');
        return;
    }
    let data_courses = courses.map((course) => {
        let learning_area_ref = {
            path: "/api/v1/learning_areas",
            single: true,
            query: {},
            data: {
                id: course.learning_area_id
            }
        }
        return {
            id: course.id,
            italian_title: course.italian_title,
            english_title: course.english_title,
            credits: course.credits,
            learning_area_ref: learning_area_ref,
            group: course.group,
            pending: course.inscribed,
            section: course.section
        };
    });
    let response = {
        path: "/api/v2/courses",
        single: true,
        query: {
            student_id: student_id,
            area_id: area_id,
            block_id: block_id,
            context_id: context_id,
            alone: alone
        },
        date: new Date(),
        data: data_courses
    };
    res.status(200).json(response);
}

module.exports.get_course = async (req, res) => {
    let course_id = req.params.course_id;
    let admin_info = req.query.admin_info;
    let course = await courseSchema.read(course_id, admin_info);
    if(!course){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('single course: resource not found');
        return;
    }
    let proposer_teacher_ref = {
        path: "/api/v1/teacher", 
        single: true, 
        query: {},
        data: {
            id: course.proposer_teacher_id
        }
    };
    let certifying_admin_ref = {
        path: "/api/v1/admin", 
        single: true, 
        query: {},
        data: {
            id: course.certifying_admin_id
        }
    };
    let data_course = {
        id: course.id,
        italian_title: course.italian_title,
        english_title: course.english_title,
        creation_date: course.creation_date,
        italian_description: course.italian_description,
        english_description: course.english_description,
        up_hours: course.up_hours,
        credits: course.credits,
        italian_expected_learning_results: course.italian_expected_learning_results,
        english_expected_learning_results: course.english_expected_learning_results,
        italian_criterions: course.italian_criterions,
        english_criterions: course.english_criterions,
        italian_activities: course.italian_activities,
        english_activities: course.english_activities,
        italian_learning_area: course.learning_area_ita,
        english_learning_area: course.learning_area_eng,
        italian_growth_area: course.growth_area_ita,
        english_growth_area: course.growth_area_eng,
        min_students: course.min_students,
        max_students: course.max_students,
        proposer_teacher_ref: proposer_teacher_ref,
        teacher_name: course.teacher_name,
        teacher_surname: course.teacher_surname,
        certifying_admin_ref: certifying_admin_ref,
        admin_name: course.admin_name,
        admin_surname: course.admin_surname,
        admin_confirmation: course.admin_confirmation
    };
    let response = {
        path: "/api/v1/courses",
        single: true,
        query: {
            admin_info: admin_info
        },
        date: new Date(),
        data: data_course
    };
    res.status(200).json(response);
}

module.exports.get_courses_model = async (req, res) => {
    let teacher_id = req.query.teacher_id;
    if (req.loggedUser.role == "teacher"){
        if(teacher_id != undefined){
            if(req.loggedUser._id != teacher_id){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('get_courses_v2: unauthorized access');
                return;
            }
        } else {
            teacher_id = req.loggedUser._id
        }
    } else if (req.loggedUser.role != "admin"){
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('get_courses_v2: unauthorized access');
        return;
    }
    let recent_models = req.query.recent_models;
    if (recent_models!=undefined){
        recent_models = recent_models > 0 ? recent_models : 0
    }
    let not_confirmed = req.query.not_confirmed;
    if (not_confirmed!=undefined){
        not_confirmed = not_confirmed === "true" ? true : false
    }
    let models = await courseSchema.get_models(teacher_id, recent_models, not_confirmed);
    let data_models = models.map((model) => {
        let course_ref = {
            path: "/api/v1/courses",
            single: true,
            query: {},
            data: {
                id: model.id
            }
        }
        return{
            course_ref: course_ref,
            italian_title: model.italian_title,
            english_title: model.english_title,
            creation_school_year: model.creation_school_year,
            project_class_confirmation_date: model.project_class_confirmation_date,
            project_class_to_be_modified: model.project_class_to_be_modified,
            course_confirmation_date: model.course_confirmation_date,
            course_to_be_modified: model.course_to_be_modified
        }
    })
    let response = {
        path: "/api/v1/propositions",
        single: true,
        query: {
            teacher_id: teacher_id,
            recent_models: recent_models,
            not_confirmed: not_confirmed
        },
        date: new Date(),
        data: data_models
    };
    res.status(200).json(response);
}

module.exports.add_proposition = async (req, res) => {
    let wrong_context, wrong_ord_class, wrong_teaching, wrong_teacher = undefined; //Variables to identify if there are some values that are not valid in insertion
    let teacher_id = req.query.teacher_id;
    if(req.loggedUser.role == "teacher"){
        if(teacher_id == undefined){
            teacher_id = req.loggedUser._id;
        }
        let user_exist = await teacherSchema.read_id(teacher_id)
        if(teacher_id!=req.loggedUser._id || !user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('course proposition insertion: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('course proposition insertion: unauthorized access');
        return;
    }
    let course_id = req.body.course_id;
    let ita_title = req.body.ita_title;
    let eng_title = req.body.eng_title;
    let ita_descr = req.body.ita_descr;
    let eng_descr = req.body.eng_descr;
    let up_hours = req.body.up_hours;
    let credits = req.body.credits;
    let ita_exp_l = req.body.ita_exp_l;
    let eng_exp_l = req.body.eng_exp_l;
    let ita_cri = req.body.ita_cri;
    let eng_cri = req.body.eng_cri;
    let ita_act = req.body.ita_act;
    let eng_act = req.body.eng_act;
    let area_id = req.body.area_id;
    let growth_id = req.body.growth_id;
    let min_students = req.body.min_students;
    let max_students = req.body.max_students;
    let area_id_exists = await areaSchema.read(area_id); // Is learning area present in the database
    if(!area_id_exists){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found: learning area');
        return;
    }
    let growth_id_exists = await growthareaSchema.read(growth_id) // Is growth area present in the dataset
    if(!growth_id_exists){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found: growth area');
        return;
    }
    let block_id = req.body.block_id;
    let block_id_exists = await blockSchema.read(block_id); // Is learning block present in the database
    if(!block_id_exists){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('resource not found: learning block');
        return;
    }
    let block_year = block_id_exists.school_year
    // Add new classes
    let access_object = req.body.access_object;
    // Add new teachings
    let teaching_list = req.body.teaching_list;
    // Add new project class proposal (no confirmation of admin yet)
    let ita_class_name = req.body.ita_class_name;
    let eng_class_name = req.body.eng_class_name;
    let class_group = req.body.class_group;
    // Add teachers of the course into project_teach
    let teacher_list = req.body.teacher_list;
    let main_teachers = req.body.main_teachers; //Array of equal length of teacher_list
    let new_course_id = course_id == undefined ? true : false
    let publication = undefined;
    let course_exist, course_id_exist, same_year;
    if(!new_course_id){
        course_id_exist = await courseSchema.read(course_id);
    } else {
        course_id_exist = false
    }
    if(course_id_exist){
        if(course_id_exist.italian_title == ita_title && course_id_exist.english_title == eng_title && course_id_exist.creation_school_year == creation_school_year){
            same_year = true
        } else {
            same_year = await courseSchema.already_inserted_year(ita_title, eng_title, block_year)
            if(same_year == null){
                res.status(400).json({status: "error", description: MSG.missing_params, course_exist: course_exist})
                console.log('missing required information: new course proposal addition, check if course proposal inserted today with same title');
                return;
            }
        }
    } else {
        same_year = await courseSchema.already_inserted_year(ita_title, eng_title, block_year)
        if(same_year == null){
            res.status(400).json({status: "error", description: MSG.missing_params, course_exist: course_exist})
            console.log('missing required information: new course proposal addition, check if course proposal inserted today with same title');
            return;
        }
    }
    
    course_exist = await courseSchema.read_complete(ita_title, eng_title, up_hours, credits, area_id, growth_id, min_students, max_students, teacher_id)
    if(course_exist){
        course_id = course_exist
    } else {
        course_id = 0
    }
    // Let's now check if there is any new value in the other objects. If there are new ordinary classes or contexts or new teachings, add new course
    let new_classes, new_teachings
    // Check information about classes that can access the new course
    let context_exist, class_exist, already_present, study_year, study_address;
    // Remove non valid contexts and classes
    if(access_object!=undefined){
        for(var context in access_object){
            context_exist = await contextSchema.read(context)
            if(!context_exist){ // The learning context exists?
                console.log(`The context with id ${context} does not exists. Removing it from the access_object`)
                wrong_context = true
                delete access_object[context]
                continue         
            }
            for(let index=0;index<access_object[context].length;index++){
                study_year = access_object[context][index].study_year;
                study_address = access_object[context][index].study_address;
                class_exist = await ordClassSchema.read(study_year, study_address, block_id) // The class exists for this school year
                if(!class_exist){
                    console.log(`Ordinary class ${study_year} ${study_address} does not exists. Removing it from the list of classes for a learning context`)
                    wrong_ord_class = true
                    access_object[context].splice(index, 1)
                    index = index-1 // It's needed since splice does also a reindexing. Meaning we will skip the control of 1 index
                }
            }
            if(access_object[context].length == 0){
                // If all classes where invalid, delete the context from the object
                console.log(`All the classes for context ${context} does not exist. Removing it from the object`)
                wrong_context = true
                delete access_object[context]
            }
        }
    }
    if(access_object!=undefined){
        for(var context in access_object){
            // Loop through all valid classes in a context
            for(let index=0;index<access_object[context].length;index++){
                study_year = access_object[context][index].study_year;
                study_address = access_object[context][index].study_address;
                already_present = await opentoSchema.is_present(course_id, context, study_year, study_address) // The class exists for this school year
                if(!already_present){ // If a class is not present, it means we have a new value -> add new course
                    new_classes = true
                }
            }
        }
    }
    let teaching_exist, teaching_present;
    if(teaching_list != undefined){
        // Remove non valid teachings in order to have right values in case of insertion
        for(let i = 0; i<teaching_list.length;i++){
            teaching_exist = await teachingSchema.read(teaching_list[i])
            if(!teaching_exist){ // The teaching exists in the database
                console.log(`Teaching ${teaching_list[i]} does not exists. Removing it from the list of teachings`)
                wrong_teaching = true // Set variable to true
                teaching_list.splice(i, 1) // Remove wrong teaching from list
                i = i-1 // It's needed since splice does also a reindexing. Meaning we will skip the control of 1 index
            }
        }
        for(let i = 0; i<teaching_list.length; i++){
            teaching_present = await teachingCourseSchema.is_present(course_id, teaching_list[i])
            if(!teaching_present){ // If a teaching is not present, it means we have a new value -> add new course
                new_teachings = true // If a context is new, it means we add new classes, so its the same
            }
        }
    }
    if((new_teachings || new_classes) && !same_year){
        course_exist = false
    }
    // If course_id in request body is not undefined and all the other values related only to the course already exist,
    // we are using a previous proposal and simply use it in another learning_block
    // Else, if even one value is new, we are adding the course again as a new model
    if(!course_exist && !same_year){
        // Set new_course_id to true if it was not already done since we created a new course by modifying an existing model
        new_course_id = true
        //If the course does not exist, add new course to course table
        let new_course = await courseSchema.add_proposition(ita_title, eng_title, block_year, ita_descr, eng_descr, up_hours, credits, ita_exp_l, eng_exp_l, ita_cri, eng_cri, ita_act, eng_act, area_id, growth_id, min_students, max_students, teacher_id);
        if(!new_course){
            res.status(400).json({status: "error", description: MSG.missing_params, course_exist: course_exist})
            console.log('missing required information: new course proposal addition');
            return;
        }
        //Get inserted course table for other insertions
        // If course_id was setted from request, we update it with the new instance model
        course_id = new_course.rows.insertId
        publication = new_course.date
        let opentoIns = await opentoSchema.add(course_id, access_object);
        if(!opentoIns){
            if(new_course_id){
                // If error occurs and the course added is new, delete entry added in course
                res.status(400).json({status: "error", description: MSG.missing_params, wrong_ord_class: wrong_ord_class, wrong_context: wrong_context, course_exist: course_exist})
                console.log('missing required information: new course proposal addition. Accessible classes');
                await courseSchema.deleteProposal(course_id);
                return
            }
        }
        // Add informations about teaching of the course
        let teaching_ins = await teachingCourseSchema.add(course_id, teaching_list)
        if(!teaching_ins){
            if(new_course_id){
                // If error occurs, delete entries in accessible table and entry added in course
                res.status(400).json({status: "error", description: MSG.missing_params, wrong_ord_class: wrong_ord_class, wrong_context: wrong_context, wrong_teaching: wrong_teaching, course_exist: course_exist})
                console.log('missing required information: new course proposal addition. Teachings');
                await opentoSchema.delete(course_id)
                await courseSchema.deleteProposal(course_id)
                return 
            } 
        }
    }
    let course_wrong_value = false
    if((wrong_context || wrong_ord_class || wrong_teaching) && new_course_id) {
        await courseSchema.add_to_be_modified(course_id)
        course_wrong_value = true
    }
    let proj_class_exists = await projectclassSchema.read(course_id, block_id)
    if(proj_class_exists && course_exist){
        res.status(409).json({status: "error", description: MSG.itemAlreadyExists, course_exist: course_exist, proj_class_exists:proj_class_exists})
        console.log("Duplicate entry for course proposal insertion")
        return
    }
    // The teachers in teacher_list exists?
    let teacher_exists
    let section = 'A'
    if(teacher_list!=undefined){
        for(let i=0;i<teacher_list.length;i++){
            teacher_exists = await teacherSchema.read_id(teacher_list[i])
            if(!teacher_exists){
                console.log(`Teacher with id ${teacher_list[i]} does not exists. Removing it from the list of associated teachers`)
                wrong_teacher = true
                teacher_list.splice(i,1) // Without throwing an error, we simply remove the teacher that does not exists 
                main_teachers.splice(i,1)
                i = i-1 // It's needed since splice does also a reindexing. Meaning we will skip the control of 1 index
            }
        }
    } else {
        teacher_list = [teacher_id]
        if(main_teachers == undefined){
            main_teachers = [1]
        } else {
            main_teachers.push(1)
        }
    }
    if(teacher_list.find(element => element == teacher_id)==undefined){
        teacher_list.push(teacher_id)
        main_teachers.push(1)
    }
    let teacher_present, new_teacher
    if(proj_class_exists){
        for(let i=0;i<teacher_list.length;i++){
            teacher_present = await teacherClassSchema.is_present(course_id, block_id, section, teacher_list[i]);
            if(!teacher_present){
                new_teacher = true
            }
        }
    }
    let proj_class_ins = await projectclassSchema.add(course_id, block_id, ita_class_name, eng_class_name, class_group, teacher_id);
    if(!proj_class_ins){
        if(!course_exist){ // If the course was not inside the database, delete all the information about it
            res.status(400).json({status: "error", description: MSG.missing_params, wrong_ord_class: wrong_ord_class, wrong_context: wrong_context, wrong_teaching: wrong_teaching, course_exist: course_exist})
            console.log('missing required information: new course proposal addition. Project class');
            await teachingCourseSchema.delete(course_id)
            await opentoSchema.delete(course_id)
            await courseSchema.deleteProposal(course_id)
            return
        } else {
            res.status(400).json({status: "error", description: MSG.missing_params, course_exist: course_exist})
            console.log('missing required information: new course proposal addition. Project class');
            return
        }
    }
    let teachers_ins = await teacherClassSchema.add_project_teach(course_id, block_id, section, teacher_list, main_teachers);
    if(!teachers_ins){
        if(!course_exist){
            res.status(400).json({status: "error", description: MSG.missing_params, wrong_ord_class: wrong_ord_class, wrong_context: wrong_context, wrong_teaching: wrong_teaching, wrong_teacher: wrong_teacher, course_exist: course_exist})
            console.log('missing required information: new course proposal addition. Project class');
            await projectclassSchema.delete(course_id, block_id)
            await teachingCourseSchema.delete(course_id)
            await opentoSchema.delete(course_id)
            await courseSchema.deleteProposal(course_id)
            return
        } else {
            if(!proj_class_exists){
                await projectclassSchema.delete(course_id, block_id)
                res.status(400).json({status: "error", description: MSG.missing_params, course_exist: course_exist})
                console.log('missing required information: new course proposal addition. Project teach insertion');
                return
            }
        }
    }
    if((wrong_teacher || course_wrong_value) && !proj_class_exists){
        await projectclassSchema.add_to_be_modified(course_id, block_id)
    }
    course_id = course_id.toString()
    res.status(201).json({
        status: "accepted",
        description: "Course proposal inserted", 
        course_id: course_id, 
        publication: publication, 
        course_exist: course_exist, 
        wrong_ord_class: wrong_ord_class, 
        wrong_context: wrong_context, 
        wrong_teaching: wrong_teaching, 
        wrong_teacher: wrong_teacher
    });
}

module.exports.approve_proposals = async (req, res) => {
    let admin_id;
    if(req.loggedUser.role==="admin"){
        admin_id = req.loggedUser._id
        let user_exist = await adminSchema.read_id(admin_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('course proposition approval: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('course proposition approval: unauthorized access');
        return;
    }
    let course_id = req.query.course_id;
    let block_id = req.query.block_id;
    let course_exist = await courseSchema.read(course_id, true);
    if(!course_exist){
        res.status(404).json({status: "error", description: MSG.notFound})
        console.log('resource not found: course approval course_id');
        return
    }
    let block_exist = await blockSchema.read(block_id)
    if(!block_exist){
        res.status(404).json({status: "error", description: MSG.notFound})
        console.log('resource not found: block course approval');
        return
    }
    let class_exist = await projectclassSchema.read(course_id, block_id)
    if(class_exist == null){
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing parameters: project class course approval');
        return
    }
    if(!class_exist){
        res.status(404).json({status: "error", description: MSG.notFound})
        console.log('resource not found: project class course approval');
        return
    }
    let approved = req.query.approved;
    approved = approved === "false" ? 0 : 1;
    let course_approval = await courseSchema.approve_proposal(course_id, block_id, admin_id, approved)
    if(!course_approval){
        res.status(400).json({status: "error", description: MSG.missing_params})
        console.log('missing required information: course approval');
        return
    }
    res.status(200).json({status: "accepted", description: "Resources updated successfully", confirmation_date: course_approval.confirmation_date})
}

/*courseSchema.list(1, undefined, 7)
    .then(msg => {
        //console.log(msg);
        for(var i=0; i<msg.length;i++){
            console.log("Course "+i);
            Object.keys(msg[i]).forEach(element => {
                console.log(element+": "+msg[i][element]);
            });
            console.log("==============");
        }
    });
*/
/*courseSchema.read(4)
    .then(msg => {
        //console.log(msg);
        if(msg){
            Object.keys(msg).forEach(element => {
                console.log(element+": "+msg[element]);
            });
        }
    });*/