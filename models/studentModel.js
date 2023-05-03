const ptstr = require('../utils/toString.js');
const pool = require('../utils/db.js');
const crypto = require('../utils/cipher.js');

async function read(condition,param){
    try {
        conn = await pool.getConnection();
        sql = "SELECT id, cf, username, name, surname, gender, birth_date, address, email, google FROM student WHERE " + condition;
        const rows = await conn.query(sql,param);
        conn.release();
        if (rows.length == 1){
            return rows[0];
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    read_username(username) {
        return read("username = ?",username);
    },
    read_email(email) {
        return read("email = ?",email);
    },
    read_id(student_id){
        return read("id = ?",student_id);
    },
    async list() {
        try{
            conn = await pool.getConnection();
            sql = `SELECT cf, username, name, surname, gender, birth_date, address, email FROM student`;
            //console.log(sql);
            const rows = await conn.query(sql);
            //console.log("rows");
            conn.release();
            //console.log("end");
            return rows;
        } catch (err) {
            console.log(err);
        }
    },
    async google(student_id) {
        try{
            conn = await pool.getConnection();
            sql = 'UPDATE student SET google = 1 WHERE id = ?'
            const rows = await conn.query(sql, student_id);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
        }
    }
};