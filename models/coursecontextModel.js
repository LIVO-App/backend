const pool = require('../utils/db.js');

module.exports = {
    async read_from_course(course_id){
        try {
            conn = await pool.getConnection();
            if(course_id===undefined){
                conn.release();
                return null;
            }
            sql = "SELECT h.learning_context_id, lc.italian_title, lc.english_title FROM have AS h JOIN learning_context AS lc ON h.learning_context_id=lc.id WHERE h.course_id = ?;";
            const rows = await conn.query(sql, course_id);
            conn.release();
            if(rows.length!=0){
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