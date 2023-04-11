const pool = require('../utils/db.js');

module.exports = {
    async read(id){
        try {
            conn = await pool.getConnection();
            sql = "SELECT id, number, school_year, start, end FROM learning_block WHERE id = ?";
            const rows = await conn.query(sql, id);
            conn.end();
            if(rows.length == 1){
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
        }
    },
    async list(){
        try {
            conn = await pool.getConnection();
            sql = "SELECT id, number, school_year, start, end FROM learning_block";
            const rows = await conn.query(sql);
            conn.end();
            return rows;
        } catch (err) {
            console.log(err);
        }
    }
};