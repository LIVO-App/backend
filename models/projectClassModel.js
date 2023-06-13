const pool = require('../utils/db.js');

module.exports = {
    async read(course_id, block_id){
        try{
            conn = await pool.getConnection();
            if(!course_id || !block_id){
                console.log("MISSING PARAMETERS");
                conn.release();
                return null;
            }
            let sql = 'SELECT * FROM project_class WHERE course_id = ? AND learning_block_id = ?';
            values = [course_id, block_id];
            const rows = await conn.query(sql, values);
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
    },
    async isStudentEnrolled(student_id, course_id, block_id) {
        try {
            conn = await pool.getConnection();
            if(!student_id || !course_id || !block_id){
                conn.release();
                return null;
            }
            sql = "SELECT * FROM inscribed WHERE student_id = ? AND project_class_course_id = ? AND project_class_block = ?";
            let values = [student_id, course_id, block_id];
            const rows = await conn.query(sql, values);
            conn.release();
            if(rows.length === 1){
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
    async classComponents(course_id, block_id, section, teacher_id, associated_class = false){
        try {
            conn = await pool.getConnection();
            if(!course_id || !block_id || !section){
                conn.release();
                return false;
            }
            sql = 'SELECT s.id, s.name, s.surname, att.ordinary_class_study_year, att.ordinary_class_address, att.section FROM student as s JOIN inscribed AS ins on ins.student_id = s.id JOIN attend AS att ON att.student_id = s.id WHERE ins.project_class_course_id = ? AND ins.project_class_block = ? AND ins.section = ? AND att.ordinary_class_school_year IN (SELECT lb.school_year FROM learning_block AS lb WHERE lb.id = ?)';
            let values = [course_id, block_id, section, block_id];
            if(associated_class){
                if(!teacher_id){
                    conn.release();
                    return false;
                }
                sql += ' AND s.id IN (SELECT att.student_id FROM attend AS att WHERE att.ordinary_class_study_year IN (SELECT ot.ordinary_class_study_year FROM ordinary_teach AS ot WHERE ot.teacher_id = ?) AND att.ordinary_class_address IN (SELECT ot.ordinary_class_address FROM ordinary_teach AS ot WHERE ot.teacher_id = ?) AND att.ordinary_class_school_year = (SELECT lb.school_year FROM learning_block AS lb WHERE lb.id = ?))'
                values.push(teacher_id, teacher_id, block_id);
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
    async isTeacherClass(teacher_id, course_id, block_id){
        try {
            conn = await pool.getConnection();
            if(!teacher_id || !course_id || !block_id){
                conn.release();
                return null;
            }
            let sql = 'SELECT * FROM project_teach AS pt WHERE pt.teacher_id = ? AND pt.project_class_course_id = ? AND pt.project_class_block = ?';
            let values = [teacher_id, course_id, block_id];
            const rows = await conn.query(sql, values);
            conn.release();
            if(rows.length > 0){
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
    async read_section_from_course_and_block(course_id, block_id){
        try{
            conn = await pool.getConnection();
            if(!course_id || !block_id){
                conn.release();
                return null;
            }
            let sql = 'SELECT DISTINCT ins.section FROM inscribed AS ins WHERE ins.project_class_course_id = ? AND ins.project_class_block = ?';
            let values = [course_id, block_id];
            const rows = await conn.query(sql, values);
            conn.release();
            if(rows.length > 0){ 
                // >0 in case we have multiple sections in one single block of the same course
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
}