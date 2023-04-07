'use strict';

const mariadb = require('mariadb');
const jwt = require('jsonwebtoken');
const studentSchema = require('../models/studentModel');
const crypto = require('../utils/cipher');

let MSG = {
    errorDuplicateUser: "The username inserted already exists.",
    errorUserNotFound: "Wrong username or password. Please, try again.",
    errorGoogle: "Cannot access with Google"
}

let generateToken = (user) => {
    return jwt.sign(
        {
            _id: user.id,
            username: user.username
        },
        process.env.SUPER_SECRET,
        {
            expiresIn: 86400 //expires in 24 hours
        }
    );
}

module.exports.login = (req, res) => {
    let username = req.body.username;
    let psw = req.body.password;
    let user = studentSchema.read(username);
    if(!user){
        res.status(404).json({ success: false, username: false, message:'Authentication failed. User not found.'});
        return;
    }
    if (studentSchema.areValidCredentials(username,psw)){
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


userSchema.read("Student1")
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


userSchema.areValidCredentials("Student1", "Password")
    .then(msg => {
        console.log("==================\nCredentials")
        if (msg){
            console.log("Utente autenticato");
        } else {
            console.log("Username o password errati!");
        }
    })*/
//console.log(msg);