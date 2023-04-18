'use strict';

const config = require('./utils/config');
const app = require('./app');
var pool = require('./utils/db.js');
//require('dotenv').config();

const port = process.env.PORT || 5000;


app.get("/", (req, res) => {
    res.send('Hello World!')
})

config.initApp(port)
/*app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})*/




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