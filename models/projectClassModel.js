const pool = require('../utils/db.js');

module.exports = {
    async read(course_id, session_id){
        try{
            conn = await pool.getConnection();
            if(!course_id || !session_id){
                console.log("MISSING PARAMETERS");
                conn.release();
                return null;
            }
            let sql = 'SELECT pc.course_id, pc.learning_session_id, pc.italian_displayed_name, pc.english_displayed_name, pc.group, pc.num_section, t.id as "teacher_id", t.name as "teacher_name", t.surname as "teacher_surname", a.id as "admin_id", a.name AS "admin_name", a.surname AS "admin_surname", pc.admin_confirmation, pc.to_be_modified, pc.final_confirmation FROM project_class AS pc JOIN teacher AS t ON t.id = pc.proposer_teacher_id LEFT JOIN admin AS a ON a.id = pc.certifying_admin_id WHERE pc.course_id = ? AND pc.learning_session_id = ?';
            values = [course_id, session_id];
            const rows = await conn.query(sql, values);
            conn.release();
            if(rows.length == 1){
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.log("Something went wrong: read project class");
        } finally {
            conn.release();
        }
    },
    async list(session_id, year = false){
        try{
            conn = await pool.getConnection();
            if(year && session_id==undefined){
                conn.release()
                return false
            }
            let sql = 'SELECT pc.course_id, pc.learning_session_id, CASE WHEN pc.italian_displayed_name IS NULL THEN (SELECT c.italian_title FROM course AS c WHERE c.id = pc.course_id) ELSE pc.italian_displayed_name END AS \'italian_title\', CASE WHEN pc.english_displayed_name IS NULL THEN (SELECT c.english_title FROM course AS c WHERE c.id = pc.course_id) ELSE pc.english_displayed_name END AS \'english_title\', pc.group, t.id as "teacher_id", t.name as "teacher_name", t.surname as "teacher_surname", a.id as "admin_id", a.name AS "admin_name", a.surname AS "admin_surname", pc.admin_confirmation, pc.to_be_modified FROM project_class AS pc JOIN teacher AS t ON t.id = pc.proposer_teacher_id LEFT JOIN admin AS a ON a.id = pc.certifying_admin_id';
            let values = [];
            if(session_id!=undefined){
                if(year){
                    sql += ' WHERE pc.learning_session_id IN (SELECT ls.id FROM learning_session AS ls WHERE ls.school_year IN (SELECT ls1.school_year FROM learning_session AS ls1 WHERE ls1.id = ?))'
                } else {
                    sql += ' WHERE pc.learning_session_id = ?'
                }
                values.push(session_id)
            }
            sql += ' ORDER BY pc.course_id'
            const rows = await conn.query(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log("Something went wrong: list of project class");
        } finally {
            conn.release();
        }
    },
    async isStudentEnrolled(student_id, course_id, session_id) {
        try {
            conn = await pool.getConnection();
            if(!student_id || !course_id || !session_id){
                conn.release();
                return null;
            }
            sql = "SELECT * FROM subscribed WHERE student_id = ? AND project_class_course_id = ? AND project_class_session = ?";
            let values = [student_id, course_id, session_id];
            const rows = await conn.query(sql, values);
            conn.release();
            if(rows.length === 1){
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log("Something went wrong: student enrolled in project class");
        } finally {
            conn.release();
        }
    },
    async getStudentSectionandContext(student_id, course_id, session_id) {
        try {
            conn = await pool.getConnection();
            if(!student_id || !course_id || !session_id){
                conn.release();
                return null;
            }
            sql = "SELECT section, learning_context_id FROM subscribed WHERE student_id = ? AND project_class_course_id = ? AND project_class_session = ? AND pending IS NULL";
            let values = [student_id, course_id, session_id];
            const rows = await conn.query(sql, values);
            conn.release();
            if(rows.length === 1){
                return rows[0]
            } else {
                return false;
            }
        } catch (err) {
            console.log("Something went wrong: get project class info of students");
        } finally {
            conn.release();
        }
    },
    async classComponents(course_id, session_id, section, teacher_id, associated_class = false){
        try {
            conn = await pool.getConnection();
            if(!course_id || !session_id || !section){
                conn.release();
                return false;
            }
            sql = 'SELECT s.id, s.name, s.surname, subs.learning_context_id, att.ordinary_class_study_year, att.ordinary_class_address, att.section FROM student as s JOIN subscribed AS subs on subs.student_id = s.id JOIN attend AS att ON att.student_id = s.id WHERE subs.project_class_course_id = ? AND subs.project_class_session = ? AND subs.section = ? AND att.ordinary_class_school_year IN (SELECT ls.school_year FROM learning_session AS ls WHERE ls.id = ?)';
            let values = [course_id, session_id, section, session_id];
            if(associated_class){
                if(!teacher_id){
                    conn.release();
                    return false;
                }
                sql += ' AND s.id IN (SELECT att.student_id FROM attend AS att WHERE att.ordinary_class_study_year IN (SELECT ot.ordinary_class_study_year FROM ordinary_teach AS ot WHERE ot.teacher_id = ?) AND att.ordinary_class_address IN (SELECT ot.ordinary_class_address FROM ordinary_teach AS ot WHERE ot.teacher_id = ?) AND att.ordinary_class_school_year = (SELECT ls.school_year FROM learning_session AS ls WHERE ls.id = ?))'
                values.push(teacher_id, teacher_id, session_id);
            }
            const rows = await conn.query(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log("Something went wrong: get project class components");
        } finally {
            conn.release();
        }
    },
    async isTeacherClass(teacher_id, course_id, session_id){
        try {
            conn = await pool.getConnection();
            if(!teacher_id || !course_id || !session_id){
                conn.release();
                return null;
            }
            let sql = 'SELECT * FROM project_teach AS pt WHERE pt.teacher_id = ? AND pt.project_class_course_id = ? AND pt.project_class_session = ?';
            let values = [teacher_id, course_id, session_id];
            const rows = await conn.query(sql, values);
            conn.release();
            if(rows.length > 0){
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log("Something went wrong: teacher teaches in project class");
        } finally {
            conn.release();
        }
    },
    async read_section_from_course_and_session(course_id, session_id){
        try{
            conn = await pool.getConnection();
            if(!course_id || !session_id){
                conn.release();
                return null;
            }
            let sql = 'SELECT DISTINCT subs.section FROM subscribed AS subs WHERE subs.project_class_course_id = ? AND subs.project_class_session = ?';
            let values = [course_id, session_id];
            const rows = await conn.query(sql, values);
            conn.release();
            if(rows.length > 0){ 
                // >0 in case we have multiple sections in one single session of the same course
                return rows;
            } else {
                return false;
            }
        } catch (err) {
            console.log("Something went wrong: read project class");
        } finally {
            conn.release();
        }
    },
    async add(course_id, session_id, ita_name, eng_name, group, num_section, teacher_id){
        try{
            conn = await pool.getConnection()
            if(!course_id || ! session_id || !group || !num_section || !teacher_id){
                conn.release()
                return false;
            }
            ita_name = ita_name == undefined ? null : ita_name
            eng_name = eng_name == undefined ? null : eng_name
            let sql = 'INSERT INTO project_class (course_id, learning_session_id, italian_displayed_name, english_displayed_name, `group`, num_section, proposer_teacher_id) VALUES (?,?,?,?,?,?,?)'
            let values = [course_id, session_id, ita_name, eng_name, group, num_section, teacher_id]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: add project class")
        } finally {
            conn.release()
        }
    },
    async delete(course_id, session_id){
        try{
            conn = await pool.getConnection();
            let sql = 'DELETE FROM project_class WHERE course_id=? AND learning_session_id = ?';
            let values = [course_id, session_id]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: delete project class")
        } finally {
            conn.release()
        }
    },
    async add_to_be_modified(course_id, session_id){
        try {
            conn = await pool.getConnection()
            if(!course_id){
                conn.release()
                return null
            }
            let sql = 'UPDATE project_class SET to_be_modified = true WHERE course_id = ? AND learning_session_id = ?'
            let values = [course_id, session_id]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: to be modified project class")
        } finally {
            conn.release()
        }
    },
    async get_section_number(course_id, session_id){
        try{
            conn = await pool.getConnection()
            if(!session_id){
                conn.release()
                return false
            }
            let sql = 'SELECT num_section FROM project_class WHERE course_id = ? AND learning_session_id = ?'
            let values = [course_id, session_id]
            const rows = await conn.query(sql, values)
            conn.release()
            if(rows.length != 0){
                return rows[0]
            } else {
                return 0
            }
        } catch (err) {
            console.log("Something went wrong: get project class max section number")
        } finally {
            conn.release()
        }
    },
    async class_confirmed_exists(course_id, session_id){
        try {
            conn = await pool.getConnection()
            if(!course_id || !session_id){
                conn.release()
                return null
            }
            let sql = 'SELECT * FROM project_class AS pc WHERE pc.course_id = ? AND pc.learning_session_id = ? AND pc.admin_confirmation IS NOT NULL'
            let values = [course_id, session_id]
            const rows = await conn.query(sql, values)
            conn.release()
            if(rows.length>0){
                return true
            } else {
                return false
            }
        } catch (err) {
            console.log("Something went wrong: check confirmed project classed")
        } finally {
            conn.release()
        }
    },
    async get_sessions(course_id){
        try {
            conn = await pool.getConnection()
            if(!course_id){
                conn.release()
                return null
            }
            let sql = 'SELECT pc.learning_session_id FROM project_class AS pc WHERE pc.course_id = ?'
            let values = [course_id]
            const rows = await conn.query(sql, values)
            conn.release()
            if(rows.length>0){
                return rows
            } else {
                return false
            }
        } catch (err) {
            console.log("Something went wrong: get project class sessions from course")
        } finally {
            conn.release()
        }
    },
    async grades_present(course_id, session_id){
        try {
            conn = await pool.getConnection()
            if(!course_id || !session_id){
                conn.release()
                return null
            }
            let sql = 'SELECT pc.course_id, pc.learning_session_id FROM project_class AS pc JOIN grade AS g ON pc.course_id = g.project_class_course_id AND pc.learning_session_id = g.project_class_session WHERE pc.course_id = ? AND pc.learning_session_id = ?'
            let values = [course_id, session_id]
            const rows = await conn.query(sql, values)
            conn.release()
            if(rows.length>0){
                return true
            } else {
                return false
            }
        } catch (err) {
            console.log("Something went wrong: check project class grades")
        } finally {
            conn.release()
        }
    },
    async final_confirmation(course_id, session_id, confirmation = false){
        try {
            conn = await pool.getConnection()
            if(!course_id || !session_id){
                conn.release()
                return false
            }
            let confirmation_date;
            if(confirmation){
                confirmation_date = new Date()
            } else {
                confirmation_date = null
            }
            let sql = 'UPDATE project_class SET final_confirmation = ? WHERE course_id = ? AND learning_session_id = ?'
            let values = [confirmation_date, course_id, session_id]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: final confirmation project class")
        } finally {
            conn.release()
        }
    },
    async update(course_id, session_id, ita_name, eng_name, group, num_section){
        try {   
            conn = await pool.getConnection()
            if(!course_id || !session_id || (ita_name == undefined && eng_name == undefined && group == undefined && num_section == undefined)){
                conn.release()
                return false
            }
            let sql = 'UPDATE project_class SET'
            let values = []
            if(ita_name != undefined){
                sql += ' italian_displayed_name=?,'
                values.push(ita_name)
            }
            if(eng_name != undefined){
                sql += ' english_displayed_name=?,'
                values.push(eng_name)
            }
            if(group != undefined){
                sql += ' group=?,'
                values.push(group)
            }
            if(num_section != undefined){
                sql += ' num_section=?'
                values.push(num_section)
            }
            if(sql[sql.length-1]==","){
                sql = sql.slice(0,-1);
            }
            sql += ' WHERE course_id = ? AND learning_session_id = ?'
            values.push(course_id, session_id)
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: update project class")
        } finally {
            conn.release()
        }
    }
}