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
    /**
     * 
     * @param {String} block_id If not provided it will return all the learning areas
     * @param {Boolean} all_data If true, all data of learning_areas are provided, otherwise only the id will be
     */
    async read_from_blocks(block_id,all_data = false,credits = false) {
        try {
            conn = await pool.getConnection();
            sql = "SELECT la.id";
            if (all_data) {
                sql += ", la.italian_title, la.english_title, la.italian_description, la.english_description";
            }
            if (credits) {
                sql += ", l.credits";
            }
            sql += " FROM limited AS l INNER JOIN learning_area AS la ON l.learning_area_id = la.id WHERE learning_block_id= ? GROUP BY la.id";
            const rows = await conn.query(sql, block_id);
            conn.end();
            return rows;
        } catch (err) {
            console.log(err);
        }
    }
};