const pool = require('../utils/db.js');

module.exports = {
    async list(student_id, course_id, session_id){
        try {
            conn = await pool.getConnection();
            if(!course_id || !student_id){
                conn.release();
                return false;
            }
            sql = "SELECT italian_description, english_description, publication, grade, final FROM grade WHERE student_id = ? AND project_class_course_id = ? AND project_class_session = ?";
            let values = [student_id, course_id, session_id];
            const rows = await conn.query(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    },
    async add(student_id, teacher_id, course_id, session_id, ita_descr, eng_descr, grade, final = false){
        try {
            conn = await pool.getConnection();
            if(!student_id || !teacher_id || !course_id || !session_id || !ita_descr || !eng_descr || !grade){
                conn.release();
                return false;
            }
            let publication = new Date();
            let final_val = final === "true" ? true : false;
            let sql = 'INSERT INTO grade (student_id, teacher_id, project_class_course_id, project_class_session, italian_description, english_description, publication, grade, final) VALUES (?,?,?,?,?,?,?,?,?)';
            let values = [student_id, teacher_id, course_id, session_id, ita_descr, eng_descr, publication, grade, final_val];
            const rows = await conn.query(sql, values);
            conn.release();
            return {
                rows: rows,
                grade: {
                    publication: publication,
                    grade: parseFloat(grade),
                    final: final_val,
                    italian_description: ita_descr,
                    english_description: eng_descr
                }
            };
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    },
    async final_grade(student_id, course_id, session_id){
        try {
            conn = await pool.getConnection();
            if(!student_id || !course_id || !session_id){
                conn.release();
                return null;
            }
            let sql = 'SELECT * FROM grade AS g WHERE g.student_id = ? AND g.project_class_course_id = ? AND g.project_class_session = ? AND g.final = 1';
            let values = [student_id, course_id, session_id];
            const rows = await conn.query(sql, values);
            conn.release();
            if(rows.length == 1){
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    },
    async remove(student_id, course_id, session_id, ita_descr){
        try {
            conn = await pool.getConnection();
            let sql = 'DELETE FROM grade WHERE student_id = ? AND project_class_course_id = ? AND project_class_session = ? AND italian_description = ?';
            let values = [student_id, course_id, session_id, ita_descr];
            //console.log(sql);
            const rows = await conn.query(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    }
};