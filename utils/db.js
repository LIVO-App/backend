const mariadb = require("mariadb");

/*async function asyncFunction(){
    const conn = await mariadb.createConnection(
        {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            trace: true
        }

    )
}

asyncFunction();*/


/*console.log({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});*/
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    trace: true,
    acquireTimeout: 100000,
});

/*async function main(){
    let conn;
    try {
        conn = await pool.getConnection();
        console.log('Connected ! connetion id is '+conn.threadId);
        conn.release();
    } catch (err) {
        console.log('Not connected due to error: '+err);
    }
}

main();
*/

module.exports = {
    getConnection() {
        return new Promise(function (res, rej) {
            //console.log("establishing connection");
            pool.getConnection()
            .then(function(conn){
                //console.log("Established");
                res(conn);
            })
            .catch(function(error){
                //console.log("Cannot establish connection");
                rej(error);
            });
        });
    }
};