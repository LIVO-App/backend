const pool = require('../utils/db.js');

module.exports = {
    async read_from_course(course_id){
        try {
            conn = await pool.getConnection();
            if(course_id===undefined){
                conn.end();
                return null;
           }
           sql = "SELECT acc.study_year_id, acc.study_address_id, sa.italian_title, sa.english_title, acc.presidium, acc.main_study_year FROM `accessible` AS acc JOIN study_address AS sa ON sa.id=acc.study_address_id WHERE acc.course_id = ?";
           const rows = await conn.query(sql, course_id);
           conn.end();
           return rows;
        } catch (err) {
            console.log(err);
        }
    }
};