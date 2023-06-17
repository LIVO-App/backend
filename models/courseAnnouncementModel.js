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
    },
    async add(teacher_id, course_id, block_id, section, italian_title, english_title, italian_message, english_message){
        try{
            conn = await pool.getConnection();
            if(!teacher_id || !course_id || !block_id || !section || !italian_title || !english_title || !italian_message || !english_message){
                conn.release();
                return false;
            }
            if(section.length==0){
                conn.release();
                return null;
            }
            let publishment = new Date();
            let sql = 'INSERT INTO announcement (teacher_id, project_class_course_id, project_class_block, section, publishment, italian_title, english_title, italian_message, english_message) VALUES ';
            let values = [];
            for(let i=0;i<section.length;i++){
                sql += ' (?,?,?,?,?,?,?,?,?)';
                values.push(teacher_id, course_id, block_id, section[i], publishment, italian_title, english_title, italian_message, english_message)
                if(i<section.length-1){
                    sql += ',';
                }
            }
            const rows = await conn.query(sql, values);
            return rows;
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    },
    async remove(id){
        try{
            conn = await pool.getConnection();
            let sql = 'DELETE FROM announcement WHERE id = ?';
            const rows = await pool.getConnection(sql, id);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err)
        } finally {
            conn.release();
        }
    }
}