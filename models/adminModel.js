const ptstr = require('../utils/toString.js');
const pool = require('../utils/db.js');
const crypto = require('../utils/cipher.js');

async function read(condition,param){
    try {
        conn = await pool.getConnection();
        sql = "SELECT id, cf, username, name, surname, gender, birth_date, address, email, google, first_access FROM admin WHERE " + condition;
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
        if(!username){
            return false
        }
        return read("username = ?",username);
    },
    read_email(email) {
        if(!email){
            return false
        }
        return read("email = ?",email);
    },
    read_id(id) {
        if(!id){
            return false
        }
        return read("id = ?", id);
    },
    async list() {
        try{
            conn = await pool.getConnection();
            sql = `SELECT cf, username, name, surname, gender, birth_date, address FROM admin`;
            //console.log(sql);
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
    async google(admin_id) {
        try{
            conn = await pool.getConnection();
            sql = 'UPDATE admin SET google = 1 WHERE id = ?'
            const rows = await conn.query(sql, admin_id);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    },
    async update(admin_id, infos){
        try {
            conn = await pool.getConnection()
            if(admin_id == undefined || infos == undefined || Object.keys(infos).length == 0){
                conn.release()
                return false
            }
            let sql = 'UPDATE admin SET'
            let values = []
            let name = infos.name
            let surname = infos.surname
            let gender = infos.gender
            let birth_date = infos.birth_date
            let address = infos.address
            if(name == "" && surname == "" && gender == "" && birth_date == "" && address == ""){
                conn.release()
                return false
            }
            if(name!=undefined && name!=""){
                sql += ' name = ?,'
                values.push(name)
            }
            if(surname!=undefined && surname!=""){
                sql += ' surname = ?,'
                values.push(surname)
            }
            if(gender!=undefined && gender!=""){
                sql += ' gender = ?,'
                values.push(crypto.cipher(gender.toString()).toString())
            }
            if(birth_date!=undefined && birth_date!=""){
                sql += ' birth_date = ?,'
                values.push(crypto.cipher(birth_date.toString()).toString())
            }
            if(address!=undefined && address!=""){
                sql += ' address = ?'
                values.push(crypto.cipher(address.toString()).toString())
            }
            if(sql[sql.length-1]==","){
                sql = sql.slice(0,-1);
            }
            sql += ' WHERE id = ?'
            values.push(admin_id)
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log(err)
        } finally {
            conn.release()
        }
    },
    async change_psw(admin_id, psw){
        try {
            conn = await pool.getConnection()
            if(admin_id == undefined || psw == undefined){
                conn.release()
                return null
            }
            let new_psw = crypto.encrypt_password(psw).toString()
            let sql = 'SELECT password FROM admin WHERE id = ?'
            let rows = await conn.query(sql, admin_id)
            if(rows.length==1){
                if(rows[0].password.toString() === new_psw){
                    conn.release()
                    return false
                }
            } else {
                conn.release()
                return null
            }
            sql = 'UPDATE admin SET password = ? WHERE id = ?'
            let values = [new_psw, admin_id]
            rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log(err)
        } finally {
            conn.release()
        }
    },
    async add_admin(cf, username, email, psw, name, surname, gender, birth_date, address, google = false){
        try {
            conn = await pool.getConnection()
            console.log(username)
            console.log(email)
            console.log(name)
            console.log(surname)
            console.log(psw)
            if(!username || !email || !psw || !name || !surname){
                conn.release()
                return false
            }
            let sql = 'INSERT INTO admin (cf, username, email, `password`, name, surname, gender, birth_date, address, google, first_access) VALUES (?,?,?,?,?,?,?,?,?,?, 1)'
            let cicf = cf != undefined ? crypto.cipher(cf).toString() : null
            let cipsw = crypto.encrypt_password(psw)
            let cigen = gender!=undefined ? crypto.cipher(gender).toString() : null
            let cibirth = birth_date!=undefined ? crypto.cipher(birth_date).toString() : null
            let ciaddr = address!=undefined ? crypto.cipher(address).toString() : null
            let values = [cicf, username, email, cipsw.toString(), name, surname, cigen, cibirth, ciaddr, google]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log(err)
        } finally {
            conn.release()
        }
    }
};