const pool = require('../utils/db.js');

module.exports = {
    async list(){
        try {
            conn = await pool.getConnection();
            sql = "SELECT id, acronym, italian_title, english_title, italian_description, english_description FROM learning_context";
            const rows = await conn.query(sql);
            conn.release();
            if(rows.length>0){
                return rows;
            } else {
                return false;
            } 
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    },
    async list_from_list_of_courses(student_id, block_id, courses){
        try {
            conn = await pool.getConnection();
            if(courses==undefined || courses.length<1 || !student_id || !block_id){
                conn.release();
                return null;
            }
            let sql = 'SELECT ac.course_id AS course, lc.acronym AS context FROM `accessible` AS ac JOIN learning_context AS lc ON ac.learning_context_id = lc.id WHERE ac.study_year_id in (SELECT att.ordinary_class_study_year FROM attend as att WHERE att.student_id = ? AND att.ordinary_class_school_year IN (SELECT lb.school_year FROM learning_block AS lb WHERE lb.id = ?)) AND ac.study_address_id in (SELECT att.ordinary_class_address FROM attend as att WHERE att.student_id = ? AND att.ordinary_class_school_year IN (SELECT lb.school_year FROM learning_block AS lb WHERE lb.id = ?))';
            let values = [student_id, block_id, student_id, block_id];
            for(let i=0; i<courses.length; i++){
                if(i==0){
                    sql += ' AND (';
                }
                sql += 'ac.course_id = ?';
                values.push(courses[i]);
                if(i<courses.length-1){
                    sql += ' OR ';
                }
            }
            sql += ')';
            const rows = await conn.query(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err)
        } finally {
            conn.release();
        }
    }
};