const pool = require('../utils/db.js');

module.exports = {
    async read(id){
        try {
            conn = await pool.getConnection();
            if(!id){
                conn.release()
                return false
            }
            sql = 'SELECT id, italian_title, english_title, italian_description, english_description FROM teaching WHERE id = ?'
            const rows = await conn.query(sql, id);
            conn.release();
            if(rows.length == 1){
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    },
    async list(){
        try {
            conn = await pool.getConnection();
            sql = 'SELECT id, italian_title, english_title, italian_description, english_description FROM teaching'
            const rows = await conn.query(sql);
            conn.release();
            return rows
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    },
    async add_admin(cf, username, email, psw, name, surname, gender, birth_date, address, google = false){
        try {
            conn = await pool.getConnection()
            if(!cf || !username || !email || !psw || !name || !surname){
                conn.release()
                return false
            }
            let sql = 'INSERT INTO admin (cf, username, email, `password`, name, surname, gender, birth_date, address, google) VALUES (?,?,?,?,?,?,?,?,?,?)'
            let cicf = crypto.cipher(cf)
            let cipsw = crypto.encrypt_password(psw)
            let cigen = gender!=undefined ? crypto.cipher(gender) : null
            let cibirth = birth_date!=undefined ? crypto.cipher(birth_date) : null
            let ciaddr = address!=undefined ? crypto.cipher(address) : null
            let values = [cicf.toString(), username, email, cipsw, name, surname, cigen.toString(), cibirth.toString(), ciaddr.toString(), google]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log(err)
        } finally {
            conn.release()
        }
    }
}