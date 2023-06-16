const pool = require('../utils/db.js');

module.exports = {
    async list(course_id, block_id, section, teacher_id){
        try {
            conn = await pool.getConnection();
            if(!course_id || !block_id || !section){
                conn.release();
                return false;
            }
            let sql = 'SELECT ann.id, ann.italian_title, ann.english_title, ann.publishment FROM announcement AS ann WHERE ann.project_class_course_id = ? AND ann.project_class_block = ? AND ann.section = ?';
            let values = [course_id, block_id, section];
            if(teacher_id!=undefined){
                sql += ' AND ann.teacher_id = ?';
                values.push(teacher_id);
            }
            const rows = await conn.query(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    },
    async read(id){
        try {
            conn = await pool.getConnection();
            let sql = 'SELECT ann.id, ann.italian_title, ann.english_title, ann.publishment, ann.italian_message, ann.english_message FROM announcement AS ann WHERE ann.id=?';
            const rows = await conn.query(sql, id);
            conn.release();
            if(rows.length === 1){
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