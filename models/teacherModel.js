const ptstr = require('../utils/toString.js');
const pool = require('../utils/db.js');
const crypto = require('../utils/cipher.js');

async function read(condition,param){
    try {
        conn = await pool.getConnection();
        sql = "SELECT id, cf, username, name, surname, gender, birth_date, address, email, google FROM teacher WHERE " + condition;
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
            return false
        }
        return read("username = ?",username);
    },
    read_email(email) {
        if(!email){
            return false
        }
        return read("email = ?",email);
    },
    read_id(id) {
        if(!id){
            return false
        }
        return read("id = ?", id);
    },
    async list() {
        try{
            conn = await pool.getConnection();
            sql = `SELECT cf, username, name, surname, gender, birth_date, address, email FROM teacher`;
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
    async google(teacher_id) {
        try{
            conn = await pool.getConnection();
            sql = 'UPDATE teacher SET google = 1 WHERE id = ?'
            const rows = await conn.query(sql, teacher_id);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    },
    async isTeacherEmployed(teacher_id, school_year){
        try{
            conn = await pool.getConnection();
            sql = 'SELECT ot.ordinary_class_school_year AS year FROM ordinary_teach AS ot WHERE ot.teacher_id = 3 ORDER BY ot.ordinary_class_school_year ASC';
            const rows = await conn.query(sql, teacher_id);
            conn.release();
            if (rows[0].year <= school_year) {
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
    async isTeacherTeaching(teacher_id, study_year, address, school_year, section){
        try {
            conn = await pool.getConnection();
            if(!teacher_id || !study_year || !address || !school_year || !section) {
                conn.release();
                return null;
            }
            sql = 'SELECT * FROM ordinary_teach AS ot WHERE ot.teacher_id = ? AND ot.ordinary_class_study_year = ? AND ot.ordinary_class_address = ? AND ot.ordinary_class_school_year = ? AND ot.section = ?';
            values = [teacher_id, study_year, address, school_year, section];
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
    async getActiveYears(teacher_id, full_class = false){
        try{
            conn = await pool.getConnection();
            if(!teacher_id){
                conn.release();
                return false;
            }
            sql = 'SELECT '
            if (!full_class){
                sql+='DISTINCT'
            } else {
                sql += ' ot.ordinary_class_study_year, ot.ordinary_class_address,'
            }
            sql += ' ot.ordinary_class_school_year FROM ordinary_teach AS ot WHERE ot.teacher_id=?'
            const rows = await conn.query(sql, teacher_id);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    },
    async isTeacherTeachingProject(teacher_id, course_id, block_id, section){
        try{
            conn = await pool.getConnection();
            if(!teacher_id || !course_id || !block_id || !section){
                conn.release();
                return null;
            }
            let sql = `SELECT * FROM project_teach AS pt WHERE pt.teacher_id = ? AND pt.project_class_course_id = ? AND pt.project_class_block = ? AND pt.section = ?`;
            let values = [teacher_id, course_id, block_id, section];
            const rows = await conn.query(sql, values);
            conn.release();
            if(rows.length==1){
                return true;
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