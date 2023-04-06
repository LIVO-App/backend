'use strict';

const mariadb = require('mariadb');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/studentModel');
const crypto = require('../utils/cipher');

userSchema.list()
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

//console.log(msg);