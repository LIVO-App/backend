'use strict';

const adminModel = require('../models/adminModel');
const sanitizer = require('../utils/sanitizer');
const fs = require('fs')
const readline = require('readline');

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    missingParameter: "Missing required information",
    notAuthorized: "Not authorized request",
    teacherNotEmployed: "The teacher was not employed in that school_year"
}

process.env.TZ = 'Etc/Universal';

module.exports.update_info = async (req, res) => {
    let admin_id = req.params.admin_id
    if(req.loggedUser.role == "admin"){
        let admin_exist = await adminModel.read_id(admin_id);
        if(!admin_exist){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('update admin information: student does not exists ('+new Date()+')');
            return;
        }
        if(req.loggedUser._id != admin_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('update admin information: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('update admin information: unauthorized access ('+new Date()+')');
        return;
    }
    let information = req.body.admin_info
    information.name = sanitizer.encode_input(information.name)
    information.surname = sanitizer.encode_input(information.surname)
    information.gender = sanitizer.encode_input(information.gender)
    information.address = sanitizer.encode_input(information.address)
    let update_info = await adminModel.update(admin_id, information)
    if(!update_info){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log('update admin information: no parameters to change ('+new Date()+')')
        return
    }
    res.status(200).json({status: "updated", description: "Information updated successfully"})
}

module.exports.update_password = async (req, res) => {
    let admin_id = req.params.admin_id
    if(req.loggedUser.role == "student"){
        let admin_exist = await adminModel.read_id(admin_id);
        if(!admin_exist){
            res.status(404).json({status: "error", description: MSG.notFound});
            console.log('update admin psw: student does not exists ('+new Date()+')');
            return;
        }
        if(req.loggedUser._id != admin_id){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('update admin psw: unauthorized access ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('update admin psw: unauthorized access ('+new Date()+')');
        return;
    }
    let psw = req.body.psw
    let update_psw = await adminModel.change_psw(admin_id, psw)
    if(update_psw==null){
        res.status(400).json({status: "error", description: MSG.missingParameter});
        console.log('update admin psw: no parameters to change ('+new Date()+')')
        return
    }
    if(!update_psw){
        res.status(400).json({status: "error", description: "The password is the same. Please change it."});
        console.log('update admin psw: same password ('+new Date()+')')
        return
    }
    res.status(200).json({status: "updated", description: "Password updated successfully"})
}

module.exports.add_admins = async (req, res) => {
    let user_id = req.loggedUser._id;
    if(req.loggedUser.role == "admin"){
        let admin_exist = await adminModel.read_id(user_id)
        if(!admin_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('add admins: not authorized ('+new Date()+')');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('add admins: not authorized ('+new Date()+')');
        return;
    }
    let existing_admin, wrong_admin, admin_added;
    let admin_inserted = []
    let admin_list = req.body.admin_list;
    for(let admin in admin_list){
        let admin_cf = admin_list[admin].cf
        let admin_name = admin_list[admin].name
        let admin_name_arr = admin_name.split(" ")
        let admin_surname = admin_list[admin].surname
        let admin_surname_arr = admin_surname.split(" ")
        let admin_gender = admin_list[admin].gender
        let admin_birth_date = admin_list[admin].birth_date
        let admin_address = admin_list[admin].address
        let admin_email = admin_list[admin].email
        let username = admin_name_arr[0].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()+"."+admin_surname_arr[0].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        for(let i=0;i<admin_surname_arr.length;i++){
            username += admin_surname_arr[i].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        }
        let user_exist = await adminModel.read_email(admin_email)
        if(user_exist){
            existing_admin = true
            console.log("User not valid")
            continue
        }
        let admin_psw = Math.random().toString(36).slice(-8)
        let assets_link_name = username.split(".")[1]
        let assets_link = "/assets/users/admins/"+assets_link_name
        admin_cf = sanitizer.encode_input(admin_cf)
        admin_name = sanitizer.encode_input(admin_name)
        admin_surname = sanitizer.encode_input(admin_surname)
        admin_gender = sanitizer.encode_input(admin_gender)
        admin_address = sanitizer.encode_input(admin_address)
        let admin_insert = await adminModel.add_admin(admin_cf, username, admin_email, admin_psw, admin_name, admin_surname, admin_gender, admin_birth_date, admin_address, assets_link)
        if(!admin_insert){
            wrong_admin = true
            console.log("User not added")
            continue
        } else {
            admin_added = true
            admin_inserted.push(username, admin_psw)
        }
    }
    if(!admin_added){
        if(existing_admin){
            res.status(409).json({status: "error", description: "All the users were already present in the database", wrong_admin: wrong_admin})
            console.log('Admin insertion: users already present ('+new Date()+')')
            return
        } else {
            res.status(400).json({status: "error", description: "All the users tried to insert were wrong. Please, check them", wrong_admin: wrong_admin})
            console.log('Admin insertion: missing parameters ('+new Date()+')')
            return
        }
    }
    if(!fs.existsSync('admin.txt')){
        fs.writeFileAsync('admin.txt', "", function(err){
            if(err) console.log(err)
            console.log("Created");
        })
    }
    let file_content = fs.readFileSync('admin.txt', 'utf8')
    let lines = file_content.split("\n")
    for (let line in lines){
        let line_arr = lines[line].split(", ")
        let user_username = line_arr[0].split(": ")[1]
        let admin_exist = await adminModel.read_username(user_username)
        if(admin_exist.first_access){
            if(admin_inserted.find(element => element==user_username) == undefined){
                admin_inserted.push(user_username, line_arr[1].split(": ")[1])
            }
            
        }
    }
    fs.writeFile('admin.txt', '', function(){console.log('done')})
    let admin_txt = ""
    for(let i = 0; i<admin_inserted.length;i=i+2){
        admin_txt += "username: " + admin_inserted[i] + ", password: " + admin_inserted[i+1] + "\n"
    }
    fs.appendFile("admin.txt", admin_txt, function(err){
        if(err) console.log(err)
        console.log("File created successfully")
    });
    res.status(201).json({status: "accepted", description: "New admin users added", existing_admin: existing_admin, wrong_admin: wrong_admin})
}