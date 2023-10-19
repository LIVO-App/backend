const pool = require('../utils/db.js');

module.exports = {
    async add(student_id, course_id, session_id, section, context_id, pending=false){
        let actualSection;
        try{
            conn = await pool.getConnection();
            if(!student_id || !course_id || !session_id || !context_id){
                console.log("MISSING PARAMETERS");
                conn.release();
                return false;
            }
            let pen_val;
            if(pending){
                actualSection = "";
                pen_val = new Date();
            } else {
                actualSection = section;
                pen_val =  null;
            }
            let sql = `INSERT INTO subscribed (student_id, project_class_course_id, project_class_session, section, learning_context_id, pending) VALUES (?,?,?,?,?,?)`;
            
            values = [student_id, course_id, session_id, actualSection, context_id, pen_val]
            const rows = await conn.query(sql, values);
            conn.release();
            //console.log("Inserted "+rows.insertedId+" rows.");
            return {
                rows: rows,
                pending: pen_val
            };
        } catch (err){
            console.log("Something went wrong: student subscription");
        } finally {
            conn.release();
        }
    },
    async remove(student_id, course_id, session_id, context_id){
        try{
            conn = await pool.getConnection();
            /*if(!student_id || !course_id || !session_id){
                console.log("MISSING PARAMETERS");
                conn.release();
                return false;
            }*/
            let sql = 'DELETE FROM subscribed WHERE student_id = ? AND project_class_course_id = ? AND project_class_session = ? AND learning_context_id = ?';
            values = [student_id, course_id, session_id, context_id]
            const rows = await conn.query(sql, values);
            conn.release();
            //console.log("Deleted "+rows.affectedRows+" rows.");
            return rows;
        } catch (err) {
            console.log("Something went wrong: student unsubscription");
        } finally {
            conn.release();
        }
    },
    async isClassFull(course_id, session_id){
        try{
            conn = await pool.getConnection()
            if(!course_id || !session_id){
                conn.release();
                return null;
            }
            sql = 'SELECT CASE WHEN (SELECT COUNT(student_id) AS num_students FROM subscribed WHERE project_class_course_id=? AND project_class_session=?)>=course.max_students THEN "true" ELSE "false" END AS full FROM course WHERE course.id = ?'        
            //console.log(sql);
            let values = [course_id, session_id, course_id]
            const rows = await conn.query(sql, values);
            conn.release();
            if(rows.length>0){
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.log("Something went wrong: class is full")
        } finally {
            conn.release();
        }
    },
    async getAvailableSection(course_id, session_id){
        let max_students,rows;
        try{
            conn = await pool.getConnection()
            if(!course_id || !session_id){
                conn.release();
                return null;
            }
            sql = 'SELECT max_students FROM course WHERE course.id = ?';
            const values = [course_id];
            rows = await conn.query(sql, values);
            if(rows.length == 1){
                max_students = rows[0].max_students;
            } else {
                conn.release();
                return null;
            }
            sql = 'SELECT section,COUNT(*) AS students FROM subscribed WHERE project_class_course_id = ? AND project_class_session = ? GROUP BY section ORDER BY section;'
            values.push(session_id);
            rows = await conn.query(sql, values);
            for (const section of rows) {
                if (Number(section.students) < max_students) {
                    return section.section;
                }
            }
            num_section_already_on = rows.length;
            sql = 'SELECT num_section FROM project_class WHERE course_id = ? AND learning_session_id = ?'
            rows = await conn.query(sql, values)
            conn.release();
            if(rows[0].num_section > num_section_already_on){
                // If we have that a class can have at most 3 sections (num_section) and has currently active 2 sections (num_section_already_on)
                // that are both full (otherwise we have had return before), we return the section with character 65 + num_section_already_on
                // = 65 + 2 => 67 => 'C'
                return String.fromCharCode(65+num_section_already_on)
            }
            return "";
        } catch (err) {
            console.log("Something went wrong: get available sections")
        } finally {
            conn.release();
        }
    },
    async read(student_id, course_id, session_id, context_id, section){
        let values, rows;
        try{
            conn = await pool.getConnection();
            if(!student_id || !course_id || !session_id){
                console.log("MISSING PARAMETERS");
                conn.release();
                return null;
            }
            sql = 'SELECT student_id, project_class_course_id, project_class_session, learning_context_id, section, pending FROM subscribed WHERE student_id = ? AND project_class_course_id = ? AND learning_session = ? ';
            values = [student_id, course_id, session_id];
            if (context_id != undefined){
                sql += ' AND learning_context_id = ?'
                values.push(context_id)
            }
            if (section != undefined) {
                sql += ' AND section = ?';
                values.push(section.toUpperCase());
            }
            rows = await conn.query(sql, values);
            conn.release();
            if(rows.length == 1){
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.log("Something went wrong: read student subscription");
        } finally {
            conn.release();
        }
    },
    async not_same_group(course_id, session_id, student_id, area_id, context_id){
        try {
            conn = await pool.getConnection()
            let sql = 'SELECT * FROM project_class AS pc WHERE pc.course_id = ? AND pc.learning_session_id = ? AND pc.group IN (SELECT pc1.group FROM subscribed AS subs JOIN project_class AS pc1 ON pc1.course_id = subs.project_class_course_id AND pc1.learning_session_id = subs.project_class_session JOIN course AS c ON c.id = pc1.course_id WHERE subs.student_id = ? AND c.learning_area_id = ? AND subs.project_class_session=? AND subs.pending IS NULL AND subs.learning_context_id = ?)'
            let values = [course_id, session_id, student_id, area_id, session_id, context_id]
            const rows = await conn.query(sql, values);
            conn.release()
            if(rows.length == 0){
                return true
            } else {
                return false
            }
        } catch (err) {
            console.log("Something went wrong: not same group student subscription")
        } finally {
            conn.release()
        }
    },
    async remove_pending(student_id, course_id, session_id, section){
        try {
            conn = await pool.getConnection()
            let sql = 'UPDATE subscribed SET pending = NULL AND section = ? WHERE student_id = ? AND project_class_course_id = ? AND project_class_session = ?'
            let values = [section, student_id, course_id, session_id, section]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: remove pending from student")
        } finally {
            conn.release()
        }
    },
    async get_pending_students(course_id, session_id){
        try {
            conn = await pool.getConnection()
            if(!course_id || !session_id){
                conn.release()
                return false
            }
            let sql = 'SELECT student_id, learning_context_id FROM subscribed WHERE project_class_course_id = ? AND project_class_session = ? AND pending IS NOT NULL ORDER BY pending'
            let values = [course_id, session_id]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: pending students")
        } finally {
            conn.release()
        }
    }
}