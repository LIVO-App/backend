const pool = require('../utils/db.js');

module.exports = {
    async list(){
        try {
            conn = await pool.getConnection();
            sql = "SELECT id, acronym, italian_title, english_title, italian_description, english_description FROM learning_context";
            const rows = await conn.query(sql);
            conn.release();
            if(rows.length>0){
                return rows;
            } else {
                return false;
            } 
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    }
};