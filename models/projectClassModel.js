const pool = require('../utils/db.js');

module.exports = {
    async read(course_id, block_id){
        try{
            conn = await pool.getConnection();
            if(!course_id || !block_id){
                console.log("MISSING PARAMETERS");
                conn.release();
                return null;
            }
            let sql = 'SELECT * FROM project_class WHERE course_id = ? AND learning_block_id = ?';
            values = [course_id, block_id];
            const rows = await conn.query(sql, values);
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
    }
}