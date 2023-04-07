'use strict';

const mariadb = require('mariadb');
const jwt = require('jsonwebtoken');
const studentSchema = require('../models/studentModel');
const crypto = require('../utils/cipher');
const userSchema = require('../models/userModel');

let MSG = {
    errorDuplicateUser: "The username inserted already exists.",
    errorUserNotFound: "Wrong username or password. Please, try again.",
    errorGoogle: "Cannot access with Google"
}

let generateToken = (user) => {
    let payload = {
        _id: user.id,
        username: user.username
    }
    let option = {
        expiresIn: 86400 //expires in 24 hours
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
        res.status(404).json({ success: false, username: false, message:'Authentication failed. User not found.'});
        return;
    }
    if(user){
        var token = generateToken(user);
        res.status(200).json({
            success: true,
            message: 'Authentication OK',
            user: "student",
            token: token,
            username: user.username,
            id: user.id
        });
    } else {
        res.status(404).json({ success: false, username: true, password: false, message: 'Authentication failed. Wrong password.' });
        return;
    }
}

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