'use strict';

const bucket_utils = require('../utils/bucket_utils');
const adminModel = require('../models/adminModel');
const teacherSchema = require('../models/teacherModel');
const studentSchema = require('../models/studentModel');
const coursesModel = require('../models/coursesModel');

let MSG = {
    notFound: "Resource not found",
    missingParameter: "Missing required information",
    notAuthorized: "Not authorized request",
    noValidFiles: "The files the user provided were not valid. Please try again.",
    somethingWrong: "Something went wrong during the connection with the bucket."
}

process.env.TZ = 'Etc/Universal';

module.exports.upload_files = async (req, res) => {
    let obj_type = req.params.obj_type
    let obj_id = req.params.obj_id
    if(obj_type == "admin"){
        if(req.loggedUser.role == "admin"){
            let admin_exist = await adminModel.read_id(obj_id);
            if(!admin_exist){
                res.status(404).json({status: "error", description: MSG.notFound});
                console.log('upload image admin: admin does not exists ('+new Date()+')');
                return;
            }
            if(req.loggedUser._id != obj_id){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('upload image admin: unauthorized access ('+new Date()+')');
                return;
            }
        } else {
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('upload image admin: unauthorized access ('+new Date()+')');
            return;
        }
    } else if(obj_type == 'teacher'){
        if(req.loggedUser.role == "teacher"){
            let teacher_esist = teacherSchema.read_id(obj_id);
            if(!teacher_esist){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('upload image teacher: unauthorized access ('+new Date()+')');
                return;
            }
            if(req.loggedUser._id != obj_id){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('upload image teacher: unauthorized access ('+new Date()+')');
                return;
            }
        }else {
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('upload image teache: unauthorized access ('+new Date()+')');
            return;
        }
    } else if (obj_type == 'student'){
        if(req.loggedUser.role == "student"){
            let student_esist = studentSchema.read_id(obj_id);
            if(!student_esist){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('upload image student: unauthorized access ('+new Date()+')');
                return;
            }
            if(req.loggedUser._id != obj_id){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('upload image student: unauthorized access ('+new Date()+')');
                return;
            }
        }else {
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('get_teacher: unauthorized access ('+new Date()+')');
            return;
        }
    } else if (obj_type == 'course'){
        if(req.loggedUser.role == "teacher"){
            let teacher_esist = teacherSchema.read_id(obj_id);
            if(!teacher_esist){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('upload image course: unauthorized access ('+new Date()+')');
                return;
            }
            let course_exists = await coursesModel.read(obj_id, true)
            if(!course_exists){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('upload image course: unauthorized access ('+new Date()+')');
                return;
            }
            if(req.loggedUser._id != course_exists.proposer_teacher_id){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('upload image course: unauthorized access ('+new Date()+')');
                return;
            }
        }else {
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('upload image course: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('upload image course: unauthorized access ('+new Date()+')');
        return;
    }
    let files_already_present = await bucket_utils.get_file_list(obj_type, obj_id)
    if(!files_already_present){
        res.status(400).json({status: "error", description: MSG.somethingWrong});
        console.log('upload image course: something went wrong ('+new Date()+')');
        return;
    }
    //console.log(files_already_present.length)
    if(files_already_present.length == 4){
        res.status(400).json({status: "error", description: MSG.maxFileUploaded});
        console.log('upload image course: maximum number of file uploaded ('+new Date()+')');
        return;
    }

    let files = req.files;
    let sliced_files, non_valid_files = undefined;
    if(files.length > 4){
        files = files.slice(0,(4-files_already_present.length))
        sliced_files = true
    }
    let uploaded_viable_files = []
    for (let file in files){
        if (files[file].mimetype != 'image/jpeg' && files[file].mimetype != 'image/png'){
            non_valid_files = true
            continue
        }
        uploaded_viable_files.push(files[file])
    }
    //console.log(uploaded_viable_files)
    if(uploaded_viable_files.length == 0){
        res.status(400).json({status: "error", description: MSG.noValidFiles});
        console.log('upload image: no valid file available for upload ('+new Date()+')');
        return;
    }
    let not_uploaded_file = []
    for(let file in uploaded_viable_files){
        let file_name = files[file].originalname
        let file_content = files[file].buffer
        let upload_image = await bucket_utils.upload_file(obj_type, obj_id, file_name, file_content)
        if (!upload_image){
            not_uploaded_file.push(file)
        }
    }
    if(not_uploaded_file.length>0){
        for(let file in files){
            if (file in not_uploaded_file){
                continue
            }
            let remove = await bucket_utils.delete_single_file(obj_type, obj_id, files[file].originalname)
        }
        res.status(400).json({status: "error", description: MSG.somethingWrong});
        console.log('upload images: something went wrong ('+new Date()+')');
        return;
    }
    res.status(201).json({
        status: "accepted",
        description: "Upload successful",
        sliced_files: sliced_files,
        non_valid_files: non_valid_files
    })
}

module.exports.retrieve_files = async (req, res) => {
    let obj_type = req.params.obj_type
    let obj_id = req.params.obj_id
    if(obj_type == "admin"){
        if(req.loggedUser.role == "admin"){
            let admin_exist = await adminModel.read_id(obj_id);
            if(!admin_exist){
                res.status(404).json({status: "error", description: MSG.notFound});
                console.log('retrieve image admin: admin does not exists ('+new Date()+')');
                return;
            }
            if(req.loggedUser._id != obj_id){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('retrieve image admin: unauthorized access ('+new Date()+')');
                return;
            }
        } else {
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('retrieve image admin: unauthorized access ('+new Date()+')');
            return;
        }
    } else if(obj_type == 'teacher'){
        if(req.loggedUser.role == "teacher"){
            let teacher_esist = teacherSchema.read_id(obj_id);
            if(!teacher_esist){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('retrieve image teacher: unauthorized access ('+new Date()+')');
                return;
            }
            if(req.loggedUser._id != obj_id){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('retrieve image teacher: unauthorized access ('+new Date()+')');
                return;
            }
        }else {
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('retrieve image teache: unauthorized access ('+new Date()+')');
            return;
        }
    } else if (obj_type == 'student'){
        if(req.loggedUser.role == "student"){
            let student_esist = studentSchema.read_id(obj_id);
            if(!student_esist){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('retrieve image student: unauthorized access ('+new Date()+')');
                return;
            }
            if(req.loggedUser._id != obj_id){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('retrieve image student: unauthorized access ('+new Date()+')');
                return;
            }
        } else {
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('retrieve image student: unauthorized access ('+new Date()+')');
            return;
        }
    } else if (obj_type == 'course'){
        let course_exists = await coursesModel.read(obj_id, true)
        if(!course_exists){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('retrieve image course: unauthorized access ('+new Date()+')');
            return;
        }
        if (req.loggedUser.role == "student") {
            let student_esist = studentSchema.read_id(req.loggedUser._id);
            if(!student_esist){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('retrieve image student: unauthorized access ('+new Date()+')');
                return;
            }
        } else if(req.loggedUser.role == "teacher"){
            let teacher_esist = teacherSchema.read_id(obj_id);
            if(!teacher_esist){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('retrieve image course: unauthorized access ('+new Date()+')');
                return;
            }
            if(req.loggedUser._id != course_exists.proposer_teacher_id){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('retrieve image course: unauthorized access ('+new Date()+')');
                return;
            }
        } else if(req.loggedUser.role == 'admin'){
            let admin_exist = await adminModel.read_id(req.loggedUser._id);
            if(!admin_exist){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('retrieve image course: unauthorized access ('+new Date()+')');
                return;
            }
        } else {
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('retrieve image course: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('retrieve image: unauthorized access ('+new Date()+')');
        return;
    }
    let files = await bucket_utils.get_file_list(obj_type, obj_id)
    if(!files){
        res.status(400).json({status: "error", description: MSG.somethingWrong});
        console.log('retrieve images: something went wrong ('+new Date()+')');
        return;
    }
    let url_list = []
    let url_err = undefined;
    for(let file in files){
        let url = await bucket_utils.get_signed_URL(files[file].name)
        if(!url){
            url_err = true
            continue
        }
        let filename = files[file].name.split('/')
        url_list.push({name: filename.pop(), url: url})
    }
    if(url_err == true){
        res.status(400).json({status: "error", description: MSG.somethingWrong});
        console.log('retrieve url images: something went wrong, no file in bucket ('+new Date()+')');
        return;
    }
    let data_urls = url_list.map((url) => {
        return {
            name: url.name,
            url: url.url
        }
    })
    let response = {
        path: "/api/v1/images",
        single: true,
        query: {
            obj_id: obj_id,
            obj_type: obj_type
        },
        date: new Date(),
        data: data_urls
    };
    res.status(200).json(response)
}

module.exports.delete_files = async (req, res) => {
    let obj_type = req.params.obj_type
    let obj_id = req.params.obj_id
    if(obj_type == "admin"){
        if(req.loggedUser.role == "admin"){
            let admin_exist = await adminModel.read_id(obj_id);
            if(!admin_exist){
                res.status(404).json({status: "error", description: MSG.notFound});
                console.log('delete image admin: admin does not exists ('+new Date()+')');
                return;
            }
            if(req.loggedUser._id != obj_id){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('delete image admin: unauthorized access ('+new Date()+')');
                return;
            }
        } else {
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('delete image admin: unauthorized access ('+new Date()+')');
            return;
        }
    } else if(obj_type == 'teacher'){
        if(req.loggedUser.role == "teacher"){
            let teacher_esist = teacherSchema.read_id(obj_id);
            if(!teacher_esist){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('delete image teacher: unauthorized access ('+new Date()+')');
                return;
            }
            if(req.loggedUser._id != obj_id){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('delete image teacher: unauthorized access ('+new Date()+')');
                return;
            }
        }else {
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('delete image teache: unauthorized access ('+new Date()+')');
            return;
        }
    } else if (obj_type == 'student'){
        if(req.loggedUser.role == "student"){
            let student_esist = studentSchema.read_id(obj_id);
            if(!student_esist){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('delete image student: unauthorized access ('+new Date()+')');
                return;
            }
            if(req.loggedUser._id != obj_id){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('delete image student: unauthorized access ('+new Date()+')');
                return;
            }
        }else {
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('delete image student: unauthorized access ('+new Date()+')');
            return;
        }
    } else if (obj_type == 'course'){
        let course_exists = await coursesModel.read(obj_id, true)
        if(!course_exists){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('delete image course: unauthorized access ('+new Date()+')');
            return;
        }
        if(req.loggedUser.role == "teacher"){
            let teacher_esist = teacherSchema.read_id(obj_id);
            if(!teacher_esist){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('delete image course: unauthorized access ('+new Date()+')');
                return;
            }
            if(req.loggedUser._id != course_exists.proposer_teacher_id){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('delete image course: unauthorized access ('+new Date()+')');
                return;
            }
        } else if(req.loggedUser.role == 'admin'){
            let admin_exist = await adminModel.read_id(req.loggedUser._id);
            if(!admin_exist){
                res.status(401).json({status: "error", description: MSG.notAuthorized});
                console.log('delete image course: unauthorized access ('+new Date()+')');
                return;
            }
        } else {
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('delete image course: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('delete image course: unauthorized access ('+new Date()+')');
        return;
    }
    let file_name = req.query.name;
    let retrieve_files = await bucket_utils.get_file_list(obj_type, obj_id);
    let gen_num;
    if (file_name == undefined){
        for(let file in retrieve_files){
            let name = retrieve_files[file].name.split('/')
            gen_num = retrieve_files[file].metadata.generation
            let delete_file = await bucket_utils.delete_single_file(obj_type, obj_id, name.pop(), gen_num)
            if (!delete_file){
                res.status(400).json({status: "error", description: MSG.somethingWrong});
                console.log('delete images: something went wrong ('+new Date()+')');
                return;
            }
        }
        res.status(200).json({status: "deleted", description: "Images deleted successfully"});
        return
    }
    for(let file in retrieve_files){
        let name = retrieve_files[file].name.split('/')
        if(name.pop()==file_name){
            gen_num = retrieve_files[file].metadata.generation
        }
    }
    let delete_image = await bucket_utils.delete_single_file(obj_type, obj_id, file_name, gen_num)
    if(!delete_image){
        res.status(400).json({status: "error", description: MSG.somethingWrong});
        console.log('delete image: something went wrong ('+new Date()+')');
        return;
    }
    res.status(200).json({status: "deleted", description: "Image deleted successfully"});
}