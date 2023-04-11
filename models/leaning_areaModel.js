const pool = require('../utils/db.js');

module.exports = {
    async read(id){
        try {
            conn = await pool.getConnection();
            sql = "SELECT id, italian_title, english_title, italian_description, english_description FROM learning_area WHERE id = ?";
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
            sql = "SELECT id, italian_title, english_title, italian_description, english_description FROM learning_area";
            const rows = await conn.query(sql);
            conn.end();
            return rows;
        } catch (err) {
            console.log(err);
        }
    },
    async read_from_blocks(block_id) {
        try {
            conn = await pool.getConnection();
            sql = "SELECT learning_area_id FROM limited INNER JOIN learning_area WHERE learning_block_id= ? GROUP BY learning_area_id";
            const rows = await conn.query(sql, block_id);
            conn.end();
            return rows;
        } catch (err) {
            console.log(err);
        }
    }
};