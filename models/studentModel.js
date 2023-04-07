const ptstr = require('../utils/toString.js');
const pool = require('../utils/db.js');
const crypto = require('../utils/cipher.js')

module.exports = {
    async read(username){
        try {
            conn = await pool.getConnection();
            sql = "SELECT cf, username, name, surname, gender, birth_date, address FROM student WHERE username = ?";
            const rows = await conn.query(sql, username);
            conn.end();
            if (rows.length == 1){
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
        }
    },
    async list() {
        try{
            conn = await pool.getConnection();
            sql = `SELECT cf, username, name, surname, gender, birth_date, address FROM student`;
            console.log(sql);
            const rows = await conn.query(sql);
            //console.log("rows");
            conn.end();
            //console.log("end");
            return rows;
        } catch (err) {
            console.log(err);
        }
    },
    async areValidCredentials(username, password) {
        try{
            conn = await pool.getConnection();
            sql = "SELECT password FROM student WHERE username = ?";
            const rows = await conn.query(sql, username);
            conn.end();

            if(rows.length == 1 && ptstr.printString(rows[0].password)=== ptstr.printString(crypto.encrypt_password(password))){
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
        }
    }
};