const pool = require('../utils/db.js');

module.exports = {
    async list(){
        try {
            conn = await pool.getConnection();
            let sql = 'SELECT ann.id, ann.italian_title, ann.english_title, ann.publishment FROM general_announcement AS ann ORDER BY ann.publishment DESC'
            const rows = await conn.query(sql);
            conn.release();
            return rows;
        } catch (err) {
            console.log("Something went wrong: list of general announcement");
        } finally {
            conn.release();
        }
    },
    async read(id){
        try {
            conn = await pool.getConnection();
            if(!id){
                conn.release()
                return false
            }
            let sql = 'SELECT ann.id, ann.italian_title, ann.english_title, ann.publishment, ann.italian_message, ann.english_message FROM general_announcement AS ann '
            sql += 'WHERE ann.id=?';
            const rows = await conn.query(sql, [id]);
            conn.release();
            if(rows.length === 1){
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.log("Something went wrong: read general_announcement");
        } finally {
            conn.release();
        }
    },
    async add(admin_id, italian_title, english_title, italian_message, english_message, publish_date){
        try{
            conn = await pool.getConnection();
            if(admin_id == undefined || !italian_title || !english_title || !italian_message || !english_message){
                conn.release();
                return false;
            }
            let publishment = publish_date == undefined ? new Date() : publish_date;
            let sql = 'INSERT INTO general_announcement (admin_id, publishment, italian_title, english_title, italian_message, english_message) VALUES (?,?,?,?,?,?)';
            let values = [admin_id, publishment, italian_title, english_title, italian_message, english_message];
            const rows = await conn.query(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log("Something went wrong: add general_announcement");
        } finally {
            conn.release();
        }
    },
    async remove(id){
        try{
            conn = await pool.getConnection();
            let sql = 'DELETE FROM general_announcement WHERE id = ?'
            let values = [id]
            const rows = await conn.query(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log("Something went wrong: remove general_announcement")
        } finally {
            conn.release();
        }
    }
}