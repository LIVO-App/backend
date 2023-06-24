const pool = require('../utils/db.js');

module.exports = {
    async read_from_course(course_id){
        try {
            conn = await pool.getConnection();
            if(course_id===undefined){
                conn.release();
                return null;
            }
            sql = "SELECT acc.study_year_id, acc.study_address_id, sa.italian_title, sa.english_title, acc.presidium, acc.main_study_yea, lc.acronym FROM `accessible` AS acc JOIN study_address AS sa ON sa.id=acc.study_address_id JOIN learning_context AS lc ON acc.learning_context_id = lc.id WHERE acc.course_id = ?";
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