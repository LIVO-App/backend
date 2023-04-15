const pool = require('../utils/db.js');

module.exports = {
    async read_from_course(course_id){
        try {
            conn = await pool.getConnection();
            if(course_id===undefined){
                conn.end();
                return null;
           }
           sql = "SELECT h.learning_context_id, lc.italian_title, lc.english_title FROM have AS h JOIN learning_context AS lc ON h.learning_context_id=lc.id WHERE h.course_id = ?;";
           const rows = await conn.query(sql, course_id);
           conn.end();
           return rows;
        } catch (err) {
            console.log(err);
        }
    }
};