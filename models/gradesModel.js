const pool = require('../utils/db.js');

module.exports = {
    async list(student_id, course_id, block_id){
        try {
            conn = await pool.getConnection();
            if(!course_id || !student_id || !block_id){
                conn.release();
                return false;
            }
            sql = "SELECT italian_description, english_description, publication, grade, final FROM grade WHERE student_id = ? AND project_class_course_id = ? AND project_class_block = ?";
            let values = [student_id, course_id, block_id];
            const rows = await conn.query(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
        }
    }
};