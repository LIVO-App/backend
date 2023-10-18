'use strict';

const mariadb = require('mariadb');
const jwt = require('jsonwebtoken');
const crypto = require('../utils/cipher');
const userSchema = require('../models/userModel');
const studentSchema = require('../models/studentModel');
const teacherSchema = require('../models/teacherModel');
const adminSchema = require('../models/adminModel');

let MSG = {
    errorDuplicateUser: "The username inserted already exists.",
    errorUserNotFound: "Wrong username or password. Please, try again.",
    errorGoogle: "Cannot access with Google",
    errorAuth: "Authentication failed"
}

process.env.TZ = 'Etc/Universal';
let expirationTime = 3600

function addSeconds(date, seconds) {
    date.setSeconds(date.getSeconds() + seconds);
    return date;
  }

let generateToken = (user, role) => {
    let expirationDate = addSeconds(new Date(), expirationTime)
    let payload = {
        _id: user.id,
        username: user.username,
        role: role,
        first_access: user.first_access,
        expirationDate: expirationDate
    }
    let option = {
        expiresIn: expirationTime //expires in 1 hours
    }
    return jwt.sign(payload, process.env.SUPER_SECRET, option);
}

module.exports.student_login = async (req, res) => {
    //console.log(req);
    let username = req.body.username;
    //console.log(username);
    let psw = req.body.password;
    //console.log(psw);
    let user = await userSchema.areValidCredentials(username, psw,"student");
    //console.log(user);
    if(user === null){
        res.status(401).json({ success: false, message:'Authentication failed. User not found.'});
        return;
    }
    if(user){
        //console.log(user);
        var token = generateToken(user, "student");
        let expirationDate = addSeconds(new Date(), expirationTime)
        res.status(200).json({
            success: true,
            message: 'Authentication OK',
            user: "student",
            token: token,
            username: user.username,
            id: user.id,
            expirationDate: expirationDate
        });
    } else {
        res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
        return;
    }
}

module.exports.teacher_login = async (req, res) => {
    //console.log(req);
    let username = req.body.username;
    //console.log(username);
    let psw = req.body.password;
    //console.log(psw);
    let user = await userSchema.areValidCredentials(username, psw,"teacher");
    //console.log(user);
    if(user === null){
        res.status(401).json({ success: false, message:'Authentication failed. User not found.'});
        return;
    }
    if(user){
        //console.log(user);
        var token = generateToken(user, "teacher");
        let expirationDate = addSeconds(new Date(), expirationTime)
        res.status(200).json({
            success: true,
            message: 'Authentication OK',
            user: "teacher",
            token: token,
            username: user.username,
            id: user.id,
            expirationDate: expirationDate
        });
    } else {
        res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
        return;
    }
}

module.exports.admin_login = async (req, res) => {
    //console.log(req);
    let username = req.body.username;
    //console.log(username);
    let psw = req.body.password;
    //console.log(psw);
    let user = await userSchema.areValidCredentials(username, psw,"admin");
    //console.log(user);
    if(user === null){
        res.status(401).json({ success: false, message:'Authentication failed. User not found.'});
        return;
    }
    if(user){
        var token = generateToken(user, "admin");
        let expirationDate = addSeconds(new Date(), expirationTime)
        res.status(200).json({
            success: true,
            message: 'Authentication OK',
            user: "admin",
            token: token,
            username: user.username,
            id: user.id,
            expirationDate: expirationDate
        });
    } else {
        res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
        return;
    }
}

module.exports.googleFailed = (req, res) => {
    res.status(400).json({error: MSG.errorGoogle});
}

module.exports.google = async (req, res) => {
    let userGoogle = req.user._json;
    req.logout();
    let filterEmail = {
        email: userGoogle.email
    };
    var msg = await studentSchema.read_email(filterEmail.email);
    if (msg) {
        if (!msg.google){
            await studentSchema.google(msg.id);
        }
        let token = generateToken(msg,"student");
        return res.redirect("https://livopath.istitutodecarneri.it/google-redirect?token="+token);
    }
    msg = await teacherSchema.read_email(filterEmail.email);
    if (msg) {
        if (!msg.google){
            await teacherSchema.google(msg.id);
        }
        let token = generateToken(msg,"teacher");
        return res.redirect("https://livopath.istitutodecarneri.it/google-redirect?token="+token);
    }
    msg = await adminSchema.read_email(filterEmail.email);
    if (msg) {
        if (!msg.google) {
            await adminSchema.google(msg.id);
        }
        let token = generateToken(msg,"admin");
        return res.redirect("https://livopath.istitutodecarneri.it/google-redirect?token="+token);
    }
    return res.redirect("https://livopath.istitutodecarneri.it/google-redirect");
}

/*studentSchema.google(1).then((msg) => {
    console.log(msg);
});*/

/*userSchema.list()
    .then(msg => {
        //console.log(msg.length);
        //console.log(crypto.decipher(msg[0].cf.toString()));
        for(var i=0;i<msg.length;i++){
            console.log("User "+i);
            //console.log(typeof msg[i]);
            Object.keys(msg[i]).forEach(element => {
                //console.log(element);
                if (element=='cf'||element=='gender'||element=='birth_date'||element=='address'){
                    //console.log(element+" encrypted: "+msg[i][element].toString())
                    console.log(element+": "+crypto.decipher(msg[i][element].toString()));
                } else {
                    console.log(element+": "+msg[i][element]);
                }
            });
            console.log("=============");
        }
    });
*/

/*studentSchema.read("Student1")
    .then(msg => {
        console.log("=====================\nSingle user");
        if (msg){
            Object.keys(msg).forEach(element => {
                if (element=='cf'||element=='gender'||element=='birth_date'||element=='address'){
                    //console.log(element+" encrypted: "+msg[i][element].toString())
                    console.log(element+": "+crypto.decipher(msg[element].toString()));
                } else {
                    console.log(element+": "+msg[element]);
                }
            });
        } else {
            console.log("User not found");
        }
    });
*/

/*userSchema.areValidCredentials("Student1", "Password")
    .then(msg => {
        console.log("==================\nCredentials")
        if (msg){
            console.log("Utente autenticato");
        } else {
            console.log("Username o password errati!");
        }
    })*/
//console.log(msg);