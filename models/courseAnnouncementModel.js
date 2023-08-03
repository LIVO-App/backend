const pool = require('../utils/db.js');

module.exports = {
    async list(course_id, block_id, section, publisher_id, is_admin = false){
        try {
            conn = await pool.getConnection();
            if(!course_id || !block_id || !section){
                conn.release();
                return false;
            }
            let sql = 'SELECT ann.id, ann.italian_title, ann.english_title, ann.publishment FROM announcement AS ann WHERE ann.project_class_course_id = ? AND ann.project_class_block = ? AND ann.section = ?';
            let values = [course_id, block_id, section];
            if(publisher_id!=undefined){
                sql += ' AND ann.publisher_id = ?'
                if(is_admin){
                    sql += ' AND ann.is_admin = 1'
                } else {
                    sql += ' AND ann.is_admin = 0'
                }
                values.push(publisher_id);
            }
            sql += ' ORDER BY ann.publishment'
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
            if(!id){
                conn.release()
                return false
            }
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
    async add(publisher_id, is_admin = false, course_id, block_id, section, italian_title, english_title, italian_message, english_message){
        try{
            conn = await pool.getConnection();
            if(!publisher_id || !course_id || !block_id || !section || !italian_title || !english_title || !italian_message || !english_message){
                conn.release();
                return false;
            }
            if(section.length==0){
                conn.release();
                return null;
            }
            let publishment = new Date();
            let sql = 'INSERT INTO announcement (publisher_id, is_admin, project_class_course_id, project_class_block, section, publishment, italian_title, english_title, italian_message, english_message) VALUES ';
            let values = [];
            for(let i=0;i<section.length;i++){
                sql += ' (?,?,?,?,?,?,?,?,?,?)';
                values.push(publisher_id, is_admin,course_id, block_id, section[i], publishment, italian_title, english_title, italian_message, english_message)
                if(i<section.length-1){
                    sql += ',';
                }
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
    async remove(publisher_id, is_admin=false, course_id, block_id, section, italian_title, english_title, italian_message, english_message){
        try{
            conn = await pool.getConnection();
            let sql = 'DELETE FROM announcement WHERE publisher_id = ? AND is_admin=? AND project_class_course_id = ? AND project_class_block = ? AND section = ? AND italian_title = ? AND english_title = ? AND italian_message = ? AND english_message = ?'
            let values = [publisher_id, is_admin, course_id, block_id, section, italian_title, english_title, italian_message, english_message] 
            const rows = await pool.getConnection(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err)
        } finally {
            conn.release();
        }
    }
}