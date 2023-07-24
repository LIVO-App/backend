const ptstr = require('../utils/toString.js');
const pool = require('../utils/db.js');
const crypto = require('../utils/cipher.js');

async function read(condition,param){
    try {
        conn = await pool.getConnection();
        sql = "SELECT id, cf, username, name, surname, gender, birth_date, address, email, google FROM student WHERE " + condition;
        const rows = await conn.query(sql,param);
        conn.release();
        if (rows.length == 1){
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

module.exports = {
    read_username(username) {
        if(!username){
            return false;
        }
        return read("username = ?",username);
    },
    read_email(email) {
        if(!email){
            return false;
        }
        return read("email = ?",email);
    },
    read_id(student_id){
        if(!student_id){
            return false;
        }
        return read("id = ?",student_id);
    },
    async list() {
        try{
            conn = await pool.getConnection();
            sql = `SELECT cf, username, name, surname, gender, birth_date, address, email FROM student`;
            //console.log(sql);
            const rows = await conn.query(sql);
            //console.log("rows");
            conn.release();
            //console.log("end");
            return rows;
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    },
    async google(student_id) {
        try{
            conn = await pool.getConnection();
            sql = 'UPDATE student SET google = 1 WHERE id = ?'
            const rows = await conn.query(sql, student_id);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    },
    async retrieve_credits(student_id, block_id, area_id, context_id){
        try {
            conn = await pool.getConnection();
            if(!student_id || !block_id || !area_id || !context_id){
                conn.release();
                return false;
            }
            sql = `SELECT (SELECT IFNULL(SUM(c.credits),0) FROM inscribed AS ins JOIN project_class AS pc ON ins.project_class_course_id = pc.course_id AND ins.project_class_block = pc.learning_block_id JOIN course AS c ON pc.course_id = c.id WHERE ins.student_id = ${student_id}`
            if(context_id=='PER'){
                sql += ` AND ins.learning_context_id=\'${context_id}\'`;
            } else {
                sql += ` AND c.learning_area_id=\'${area_id}\' AND ins.learning_context_id=\'${context_id}\'`;
            }
            sql += ` AND pc.learning_block_id = ${block_id} AND ins.pending IS NULL) AS credits, IFNULL((SELECT lm.credits FROM limited AS lm WHERE lm.learning_block_id = ${block_id} AND lm.ordinary_class_study_year = att.ordinary_class_study_year AND lm.ordinary_class_address = att.ordinary_class_address AND lm.ordinary_class_school_year = att.ordinary_class_school_year `
            if(context_id=='PER'){
                sql += ` AND lm.learning_area_id IS NULL AND lm.learning_context_id=\'${context_id}\'`;
            } else {
                sql += ` AND lm.learning_area_id = \'${area_id}\' AND lm.learning_context_id=\'${context_id}\'`;
            }
            sql += ` ),0) AS max_credits FROM attend AS att WHERE att.student_id = ${student_id};`
            const rows = await conn.query(sql);
            conn.release();
            return rows[0];
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }

    },
    async retrieve_project_classes(student_id, block_id){
        try {
            conn = await pool.getConnection();
            if(!student_id || !block_id){
                conn.release();
                return false;
            }
            let sql = 'SELECT pc.course_id, CASE WHEN pc.italian_displayed_name IS NULL THEN c.italian_title ELSE pc.italian_displayed_name END AS "italian_title", CASE WHEN pc.english_displayed_name IS NULL THEN c.english_title ELSE pc.english_displayed_name END AS "english_title", ins.section FROM course AS c JOIN project_class AS pc ON c.id = pc.course_id JOIN inscribed AS ins ON ins.project_class_course_id = pc.course_id AND ins.project_class_block = pc.learning_block_id WHERE ins.student_id = ? AND ins.project_class_block = ?';
            let values = [student_id, block_id];
            const rows = await conn.query(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    },
    async retrieve_section_from_project_class(student_id, course_id, block_id){
        try {
            conn = await pool.getConnection()
            if (!course_id || !block_id){
                conn.release()
                return null
            }
            let sql = 'SELECT ins.section FROM inscribed AS ins WHERE ins.student_id = ? AND ins.project_class_course_id = ? AND ins.project_class_block = ?'
            let values = [student_id, course_id, block_id]
            const rows = await conn.query(sql, values)
            conn.release();
            if (rows.length == 1){
                return rows[0]
            } else {
                return false
            }

        } catch (err) {
            console.log(err)
        } finally {
            conn.release()
        }
    }
};