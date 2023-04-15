const pool = require('../utils/db.js');

module.exports = {
    async read_from_course(course_id){
        try {
            conn = await pool.getConnection();
            if(course_id===undefined){
                conn.end();
                return null;
           }
           sql = "SELECT ass.teaching_id, tc.italian_title, tc.english_title FROM teaching AS tc JOIN associated AS ass ON ass.teaching_id = tc.id WHERE ass.course_id = ?;";
           const rows = await conn.query(sql, course_id);
           conn.end();
           return rows;
        } catch (err) {
            console.log(err);
        }
    }
};