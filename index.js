'use strict';

//const config = require('./config');
const app = require('./app');
var pool = require('./utils/db.js');
//require('dotenv').config();

const port = process.env.PORT || 5000;


app.get("/", (req, res) => {
    res.send('Hello World!')
})

/*app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})*/

pool.getConnection()
    .then((msg) => {
        console.log(msg);

        app.listen(port, function() {
            console.log('Server listening on port ', port);
        });
    })
    .catch((err) => {
        console.error("ERROR: db connection error");
        console.error(err)
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