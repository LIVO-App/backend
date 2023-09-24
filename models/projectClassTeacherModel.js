const pool = require('../utils/db.js');

module.exports = {
    async read_from_project_class(course_id, session_id){
        try {
            conn = await pool.getConnection();
            if(course_id===undefined || session_id===undefined){
                conn.release();
                return null;
            }
            let sql = "SELECT t.id, t.name, t.surname, pt.section, pt.main FROM project_teach AS pt JOIN teacher AS t ON pt.teacher_id = t.id WHERE pt.project_class_course_id = ? AND pt.project_class_session = ? ";
            let values = [course_id, session_id]
            const rows = await conn.query(sql, values);
            conn.release();
            if(rows.length!=0){
                return rows;
            } else {
                return false;
            } 
        } catch (err) {
            console.log("Something went wrong: teacher of project class");
        } finally {
            conn.release();
        }
    }
}