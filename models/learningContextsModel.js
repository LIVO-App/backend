const pool = require('../utils/db.js');

module.exports = {
    async list(student_id, session_id){
        try {
            conn = await pool.getConnection();
            sql = "SELECT DISTINCT lc.id, lc.italian_title, lc.english_title, lc.italian_description, lc.english_description";
            if (student_id!=undefined && session_id!=undefined){
                sql += ", CASE WHEN l.learning_area_id IS NULL THEN l.credits ELSE NULL END AS credits"
            }
            sql += " FROM learning_context AS lc"
            if (student_id!=undefined && session_id!=undefined){
                sql += ' JOIN limited AS l ON lc.id = l.learning_context_id WHERE l.learning_session_id=? AND l.ordinary_class_study_year IN (SELECT att.ordinary_class_study_year FROM attend AS att WHERE att.student_id=?) AND l.ordinary_class_address IN (SELECT att.ordinary_class_address FROM attend AS att WHERE att.student_id = ?) AND l.ordinary_class_school_year IN (SELECT ls.school_year FROM learning_session AS ls WHERE ls.id = ?) ORDER BY lc.id'
                values = [session_id, student_id, student_id, session_id]
            }
            const rows = (student_id!=undefined && session_id!=undefined) ? await conn.query(sql, values) : await conn.query(sql);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    },
    async list_from_list_of_courses(student_id, session_id, courses){
        try {
            conn = await pool.getConnection();
            if(courses==undefined || courses.length<1 || !student_id || !session_id){
                conn.release();
                return null;
            }
            let sql = 'SELECT ac.course_id AS course, ac.learning_context_id AS context FROM `accessible` AS ac WHERE ac.study_year_id in (SELECT att.ordinary_class_study_year FROM attend as att WHERE att.student_id = ? AND att.ordinary_class_school_year IN (SELECT ls.school_year FROM learning_session AS ls WHERE ls.id = ?)) AND ac.study_address_id in (SELECT att.ordinary_class_address FROM attend as att WHERE att.student_id = ? AND att.ordinary_class_school_year IN (SELECT ls.school_year FROM learning_session AS ls WHERE ls.id = ?))';
            let values = [student_id, session_id, student_id, session_id];
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
            sql += ') ORDER BY ac.course_id';
            const rows = await conn.query(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err)
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
            sql = "SELECT id, italian_title, english_title, italian_description, english_description FROM learning_context WHERE id = ?";
            const rows = await conn.query(sql, id);
            conn.release();
            if(rows.length == 1){
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
};