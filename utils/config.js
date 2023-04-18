'use strict';

const app = require('../app');
var pool = require('./db.js');

module.exports.initApp = async (port) =>  {
    try {
        let conn = await pool.getConnection();
        conn.end();
        app.listen(port, function() {
            console.log('Server listening on port ', port);
        });
    } catch (err) {
        console.error("ERROR: db connection error");
        console.error(err)
    }
}