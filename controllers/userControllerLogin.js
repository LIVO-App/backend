'use strict';

const mariadb = require('mariadb');
const jwt = require('jsonwebtoken');
const crypto = require('../utils/cipher');
const userSchema = require('../models/userModel');
const studentSchema = require('../models/studentModel');
const teacherSchema = require('../models/teacherModel');
const adminSchema = require('../models/adminModel');
const refreshTokenSchema = require("../models/refreshTokenModel");

let MSG = {
    errorDuplicateUser: "The username inserted already exists.",
    errorUserNotFound: "Wrong username or password. Please, try again.",
    errorGoogle: "Cannot access with Google",
    errorAuth: "Authentication failed",
    missingParameter: "Missing required information",
}

process.env.TZ = 'Etc/Universal';
let expirationTime = 86400

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
        expiresIn: expirationTime //expires in 24 hours
    }
    return jwt.sign(payload, process.env.SUPER_SECRET, option);
}

function detectDeviceType(userAgent) {
  if (!userAgent) return "web";

  const ua = userAgent.toLowerCase();

  const isMobile = /android|iphone|ipad|ipod|mobile|tablet/i.test(ua);

  const isTablet = /ipad|tablet|playbook|silk/i.test(ua) && !/mobile/i.test(ua);

  if (isMobile && !isTablet) {
    return "mobile";
  }

  return "web";
}

module.exports.student_login = async (req, res) => {
    //console.log(req);
    let username = req.body.username;
    //console.log(username);
    let psw = req.body.password;
    //console.log(psw);
    let user = await userSchema.areValidCredentials(username, psw,"student");
    //console.log(user);
    
    let deviceUuid = req.body.device_uuid || "web-default";

    const userAgent = req.headers["user-agent"] || "";
    let deviceType = detectDeviceType(userAgent);
    
    if(user === null){
        res.status(401).json({ success: false, message:'Authentication failed. User not found.'});
        return;
    }
    if(user){
        //console.log(user);
        var token = generateToken(user, "student");
        let expirationDate = addSeconds(new Date(), expirationTime)
        let refresh_token = await refreshTokenSchema.create(
            user.id,
            "student",
            deviceUuid,
            deviceType
        );
        res.status(200).json({
            success: true,
            message: 'Authentication OK',
            user: "student",
            token: token,
            refresh_token: refresh_token,
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

    let deviceUuid = req.body.device_uuid || "web-default";

    const userAgent = req.headers["user-agent"] || "";
    let deviceType = detectDeviceType(userAgent);

    if(user === null){
        res.status(401).json({ success: false, message:'Authentication failed. User not found.'});
        return;
    }
    if(user){
        //console.log(user);
        var token = generateToken(user, "teacher");
        let expirationDate = addSeconds(new Date(), expirationTime)

        let refresh_token = await refreshTokenSchema.create(
            user.id,
            "teacher",
            deviceUuid,
            deviceType
        );
        res.status(200).json({
            success: true,
            message: 'Authentication OK',
            user: "teacher",
            token: token,
            refresh_token: refresh_token,
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

    let deviceUuid = req.body.device_uuid || "web-default";

    const userAgent = req.headers["user-agent"] || "";
    let deviceType = detectDeviceType(userAgent);

    if(user === null){
        res.status(401).json({ success: false, message:'Authentication failed. User not found.'});
        return;
    }
    if(user){
        var token = generateToken(user, "admin");
        let expirationDate = addSeconds(new Date(), expirationTime)

        let refresh_token = await refreshTokenSchema.create(
            user.id,
            "admin",
            deviceUuid,
            deviceType
        );
        
        res.status(200).json({
            success: true,
            message: 'Authentication OK',
            user: "admin",
            token: token,
            refresh_token: refresh_token,
            username: user.username,
            id: user.id,
            expirationDate: expirationDate
        });
    } else {
        res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
        return;
    }
}

module.exports.refresh = async (req, res) => {
  const refresh_token = req.body.refresh_token;

  if (!refresh_token) {
    return res.status(400).json({
      success: false,
      message: MSG.missingParameter,
    });
  }

  try {
    // Verifica il refresh token
    const tokenData = await refreshTokenSchema.findByToken(refresh_token);

    if (!tokenData) {
      return res.status(404).json({
        success: false,
        message: MSG.errorAuth,
      });
    }

    // Recupera i dati dell'utente in base al tipo
    let user;
    switch (tokenData.user_type) {
      case "student":
        user = await studentSchema.read_id(tokenData.user_id);
        break;
      case "teacher":
        user = await teacherSchema.read_id(tokenData.user_id);
        break;
      case "admin":
        user = await adminSchema.read_id(tokenData.user_id);
        break;
      default:
        return res.status(401).json({
          success: false,
          message: MSG.errorAuth,
        });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: MSG.errorUserNotFound,
      });
    }

    // Genera un nuovo access token
    const newToken = generateToken(user, tokenData.user_type);
    let expirationDate = addSeconds(new Date(), expirationTime);

    // Genera un nuovo refresh token mantenendo device_uuid e device_type
    const newRefreshToken = await refreshTokenSchema.create(
      user.id,
      tokenData.user_type,
      tokenData.device_uuid,
      tokenData.device_type
    );

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      user: tokenData.user_type,
      token: newToken,
      refresh_token: newRefreshToken,
      username: user.username,
      id: user.id,
      expirationDate: expirationDate,
    });
  } catch (err) {
    console.error("Error refreshing token:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.googleFailed = (req, res) => {
    res.status(400).json({error: MSG.errorGoogle});
}

module.exports.google = async (req, res) => {
    let userGoogle = req.user._json;
    let deviceUuid = req.query.device_uuid || Math.random().toString(36).substring(7, 15);
    req.logout();
    let filterEmail = {
        email: userGoogle.email
    };
    const userAgent = req.headers["user-agent"] || "";
    let deviceType = detectDeviceType(userAgent);
    var msg = await studentSchema.read_email(filterEmail.email);
    if (msg) {
        if (!msg.google){
            await studentSchema.google(msg.id);
        }
        let token = generateToken(msg,"student");
        let refresh_token = await refreshTokenSchema.create(
            msg.id,
            "student",
            deviceUuid,
            deviceType
        );
        return res.redirect("http://localhost:8100/google-redirect?token="+token+"&refresh_token=" +
        refresh_token);
    }
    msg = await teacherSchema.read_email(filterEmail.email);
    if (msg) {
        if (!msg.google){
            await teacherSchema.google(msg.id);
        }
        let token = generateToken(msg,"teacher");
        let refresh_token = await refreshTokenSchema.create(
            msg.id,
            "teacher",
            deviceUuid,
            deviceType
        );
        return res.redirect("http://localhost:8100/google-redirect?token="+token+"&refresh_token=" +
        refresh_token);
    }
    msg = await adminSchema.read_email(filterEmail.email);
    if (msg) {
        if (!msg.google) {
            await adminSchema.google(msg.id);
        }
        let token = generateToken(msg,"admin");
        let refresh_token = await refreshTokenSchema.create(
            msg.id,
            "admin",
            deviceUuid,
            deviceType
        );
        return res.redirect("http://localhost:8100/google-redirect?token="+token+"&refresh_token=" +
        refresh_token);
    }
    return res.redirect("http://localhost:8100/google-redirect");
}

module.exports.logout = async (req, res) => {
    const refresh_token = req.body.refresh_token;

    if (!refresh_token) {
        return res.status(400).json({
            success: false, 
            message: MSG.missingParameter 
        });
    }

    try {
        // Verifica che il refresh token esista e appartenga all'utente loggato
        const tokenData = await refreshTokenSchema.findByToken(refresh_token);
        
        if (!tokenData) {
            return res.status(404).json({ 
                success: false, 
                message: 'Refresh token not found or already expired' 
            });
        }

        // Verifica che il token appartenga all'utente che sta facendo logout
        if (tokenData.user_id !== req.loggedUser._id || tokenData.user_type !== req.loggedUser.role) {
            return res.status(403).json({ 
                success: false,
                message: 'You can only logout your own sessions' 
            });
        }

        // Elimina il refresh token
        await refreshTokenSchema.deleteByToken(refresh_token);
        
        res.status(200).json({ 
            success: true, 
            message: 'Logged out successfully from this device' 
        });
    } catch (err) {
        console.error('Error during logout:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
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