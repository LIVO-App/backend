const ptstr = require('../utils/toString.js');
const pool = require('../utils/db.js');
const crypto = require('../utils/cipher.js')

module.exports = {
    async areValidCredentials(username, password, type) {
        try{
            conn = await pool.getConnection();
            switch (type) {
                case "student":
                    sql = "SELECT id, username, password FROM student WHERE username = ?";
                    break;
                case "teacher":
                    sql = "SELECT id, username, password FROM teacher WHERE username = ?";
                    break;
                case "admin":
                    sql = "SELECT id, username, password FROM admin WHERE username = ?";
                    break;
                default:
                    break;
            }     
            //console.log(sql, username);
            if(sql){
                const rows = await conn.query(sql, username);
                conn.release();
                if(rows.length == 0) {
                    return null;
                }
                if(rows.length == 1 && ptstr.printString(rows[0].password)=== ptstr.printString(crypto.encrypt_password(password))){
                    return rows[0];
                } else {
                    return false;
                }
            } else {
                conn.release();
                return null;
            }
            
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    }
};