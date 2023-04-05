'use strict';

//const config = require('./config');
const app = require('./app');
var pool = require('./db.js');
//require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

pool.getConnection()
    .then(msg => {
        console.log(msg);
    })
    .catch(err => {
        throw(new Error(err));
    });
//config.initDB()
    /*.then(msg => {
        console.log(msg);

        const server = app.listen(PORT, () => {
            console.log("Server started");
        });

        //server.on('upgrade', wss.handleUpgrade);
    })
    .catch(err => {
        throw(new Error(err));
    })*/;