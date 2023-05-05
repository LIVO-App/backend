const ptstr = require('../utils/toString.js');
const pool = require('../utils/db.js');
const crypto = require('../utils/cipher.js');

async function read(condition,param){
    try {
        conn = await pool.getConnection();
        sql = "SELECT id, cf, username, name, surname, gender, birth_date, address, email, google FROM teacher WHERE " + condition;
        const rows = await conn.query(sql,param);
        conn.release();
        if (rows.length == 1){
            return rows[0];
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    } finally {
        conn.release();
    }
}

module.exports = {
    read_username(username) {
        return read("username = ?",username);
    },
    read_email(email) {
        return read("email = ?",email);
    },
    async list() {
        try{
            conn = await pool.getConnection();
            sql = `SELECT cf, username, name, surname, gender, birth_date, address FROM teacher`;
            console.log(sql);
            const rows = await conn.query(sql);
            //console.log("rows");
            conn.release();
            //console.log("end");
            return rows;
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    },
    async google(teacher_id) {
        try{
            conn = await pool.getConnection();
            sql = 'UPDATE teacher SET google = 1 WHERE id = ?'
            const rows = await conn.query(sql, teacher_id);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    }
};