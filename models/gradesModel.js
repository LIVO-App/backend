const pool = require('../utils/db.js');

module.exports = {
    async list(student_id, course_id, session_id){
        try {
            conn = await pool.getConnection();
            if(!course_id || !student_id){
                conn.release();
                return false;
            }
            sql = "SELECT id, italian_description, english_description, publication, grade, final FROM grade WHERE student_id = ? AND project_class_course_id = ? AND project_class_session = ?";
            let values = [student_id, course_id, session_id];
            const rows = await conn.query(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log("Something went wrong: list grades");
        } finally {
            conn.release();
        }
    },
    async read(grade_id){
        try {
            conn = await pool.getConnection()
            if(!grade_id){
                conn.release();
                return false;
            }
            let sql = 'SELECT * FROM grade WHERE id = ?'
            let values = [grade_id]
            const rows = await conn.query(sql, values)
            conn.release()
            if(rows.length===1){
                return rows[0]
            } else {
                return false
            }
        } catch (err) {
            console.log("Something went wrong: read grade")
        } finally {
            conn.release()
        }
    },
    async read_from_date(student_id, course_id, session_id, teacher_id, publication_date){
        try {
            conn = await pool.getConnection()
            if(student_id == undefined || course_id == undefined || session_id == undefined || teacher_id == undefined){
                conn.release();
                return false;
            }
            let sql = 'SELECT * FROM grade WHERE student_id = ? AND project_class_course_id = ? AND project_class_session = ? AND teacher_id = ? AND publication = ?'
            let values = [student_id, course_id, session_id, teacher_id, new Date(publication_date)]
            const rows = await conn.query(sql, values)
            conn.release()
            if(rows.length===1){
                return rows[0]
            } else {
                return false
            }
        } catch (err) {
            console.log("Something went wrong: read grade")
        } finally {
            conn.release()
        }
    },
    async add(student_id, teacher_id, course_id, session_id, ita_descr, eng_descr, grade, publication_date = undefined, final = false){
        try {
            conn = await pool.getConnection();
            if(student_id == undefined || teacher_id == undefined || course_id == undefined || session_id == undefined || !ita_descr || !eng_descr || grade == undefined){
                conn.release();
                return false;
            }
            let publication = publication_date != undefined ? new Date(publication_date) : new Date();
            let final_val = final === true ? true : false;
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
            console.log("Something went wrong: insert grade");
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
            console.log("Something went wrong: get final grade");
        } finally {
            conn.release();
        }
    },
    async remove_from_descr(student_id, course_id, session_id, ita_descr){
        try {
            conn = await pool.getConnection();
            let sql = 'DELETE FROM grade WHERE student_id = ? AND project_class_course_id = ? AND project_class_session = ? AND italian_description = ?';
            let values = [student_id, course_id, session_id, ita_descr];
            //console.log(sql);
            const rows = await conn.query(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log("Something went wrong: remove grades");
        } finally {
            conn.release();
        }
    },
    async update(grade_id, ita_descr, eng_descr, grade_value, publication_date){
        try {
            conn = await pool.getConnection()
            if(ita_descr == undefined && eng_descr==undefined && grade_value == undefined && publication_date == undefined){
                conn.release()
                return false
            }
            let sql = 'UPDATE grade SET'
            let values = []
            if(ita_descr!=undefined && ita_descr!=""){
                sql += ' italian_description = ?,'
                values.push(ita_descr)
            }
            if(eng_descr!=undefined && eng_descr!=""){
                sql += ' english_description = ?,'
                values.push(eng_descr)
            }
            if(grade_value!=undefined && grade_value!=""){
                sql += ' grade = ?,'
                values.push(grade_value)
            }
            if(publication_date!=undefined && publication_date!=""){
                sql += ' publication = ?'
                values.push(publication_date)
            }
            if(sql[sql.length-1]==","){
                sql = sql.slice(0,-1);
            }
            sql += ' WHERE id = ?'
            values.push(grade_id)
            const rows = await conn.query(sql, values)
            conn.release()
            return rows;
        } catch (err) {
            console.log("Something went wrong: grade update")
        } finally {
            conn.release()
        }
    },
    async remove(grade_id){
        try {
            conn = await pool.getConnection()
            let sql = 'DELETE FROM grade WHERE id = ?'
            let values = [grade_id]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows;
        } catch (err) {
            console.log("Something went wrong: remove grades with id")
        } finally {
            conn.release()
        }
    }
};