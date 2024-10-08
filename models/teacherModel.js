const ptstr = require('../utils/toString.js');
const pool = require('../utils/db.js');
const crypto = require('../utils/cipher.js');

async function read(condition,param){
    try {
        conn = await pool.getConnection();
        sql = "SELECT id, cf, username, name, surname, gender, birth_date, address, email, google, first_access FROM teacher WHERE " + condition;
        const rows = await conn.query(sql,[param]);
        conn.release();
        if (rows.length == 1){
            return rows[0];
        } else {
            return false;
        }
    } catch (err) {
        console.log("Something went wrong: read teacher");
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
            sql = `SELECT id, cf, username, name, surname, gender, birth_date, address, email FROM teacher ORDER BY surname`;
            //console.log(sql);
            const rows = await conn.query(sql);
            //console.log("rows");
            conn.release();
            //console.log("end");
            return rows;
        } catch (err) {
            console.log("Something went wrong: list teacher");
        } finally {
            conn.release();
        }
    },
    async google(teacher_id) {
        try{
            conn = await pool.getConnection();
            sql = 'UPDATE teacher SET google = 1 WHERE id = ?'
            const rows = await conn.query(sql, [teacher_id]);
            conn.release();
            return rows;
        } catch (err) {
            console.log("Something went wrong: update google teacher");
        } finally {
            conn.release();
        }
    },
    async isTeacherEmployed(teacher_id, school_year){
        try{
            conn = await pool.getConnection();
            sql = 'SELECT ot.ordinary_class_school_year AS year FROM ordinary_teach AS ot WHERE ot.teacher_id = ? ORDER BY ot.ordinary_class_school_year ASC';
            const rows = await conn.query(sql, [teacher_id]);
            conn.release();
            if (rows[0].year <= school_year) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log("Something went wrong: employed teacher");
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
            if(rows.length >= 1){
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log("Something went wrong: teaching teacher");
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
            const rows = await conn.query(sql, [teacher_id]);
            conn.release();
            return rows;
        } catch (err) {
            console.log("Something went wrong: active years teacher");
        } finally {
            conn.release();
        }
    },
    async isTeacherTeachingProject(teacher_id, course_id, session_id, section){
        try{
            conn = await pool.getConnection();
            if(!teacher_id || !course_id || !session_id || !section){
                conn.release();
                return null;
            }
            let sql = `SELECT * FROM project_teach AS pt WHERE pt.teacher_id = ? AND pt.project_class_course_id = ? AND pt.project_class_session = ? AND pt.section = ?`;
            let values = [teacher_id, course_id, session_id, section];
            const rows = await conn.query(sql, values);
            conn.release();
            if(rows.length==1){
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log("Something went wrong: teacher teaching in project class");
        } finally {
            conn.release();
        }
    },
    async update(teacher_id, infos){
        try {
            conn = await pool.getConnection()
            if(teacher_id == undefined || infos == undefined || Object.keys(infos).length == 0){
                conn.release()
                return false
            }
            let sql = 'UPDATE teacher SET'
            let values = []
            let name = infos.name
            let surname = infos.surname
            let gender = infos.gender
            let birth_date = infos.birth_date
            let address = infos.address
            if(name == "" && surname == "" && gender == "" && birth_date == "" && address == ""){
                conn.release()
                return false
            }
            if(name!=undefined && name!=""){
                sql += ' name = ?,'
                values.push(name)
            }
            if(surname!=undefined && surname!=""){
                sql += ' surname = ?,'
                values.push(surname)
            }
            if(gender!=undefined && gender!=""){
                sql += ' gender = ?,'
                values.push(crypto.cipher(gender.toString()).toString())
            }
            if(birth_date!=undefined && birth_date!=""){
                sql += ' birth_date = ?,'
                values.push(crypto.cipher(birth_date.toString()).toString())
            }
            if(address!=undefined && address!=""){
                sql += ' address = ?'
                values.push(crypto.cipher(address.toString()).toString())
            }
            if(sql[sql.length-1]==","){
                sql = sql.slice(0,-1);
            }
            sql += ' WHERE id = ?'
            values.push(teacher_id)
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: update teacher")
        } finally {
            conn.release()
        }
    },
    async change_psw(teacher_id, psw){
        try {
            conn = await pool.getConnection()
            if(teacher_id == undefined || psw == undefined){
                conn.release()
                return null
            }
            let new_psw = crypto.encrypt_password(psw).toString()
            let sql = 'SELECT password FROM teacher WHERE id = ?'
            let rows = await conn.query(sql, [teacher_id])
            if(rows.length==1){
                if(rows[0].password.toString() === new_psw){
                    conn.release()
                    return false
                }
            } else {
                conn.release()
                return null
            }
            sql = 'UPDATE teacher SET password = ? WHERE id = ?'
            let values = [new_psw, teacher_id]
            rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: update teacher password")
        } finally {
            conn.release()
        }
    },
    async add_teacher(cf, username, email, psw, name, surname, gender, birth_date, address, google = false){
        try {
            conn = await pool.getConnection()
            if(!username || !email || !psw || !name || !surname){
                conn.release()
                return false
            }
            let sql = 'INSERT INTO teacher (cf, username, email, `password`, name, surname, gender, birth_date, address, google, first_access) VALUES (?,?,?,?,?,?,?,?,?,?, 1)'
            let cicf = cf != undefined ? crypto.cipher(cf).toString() : null
            let cipsw = crypto.encrypt_password(psw)
            let cigen = gender!=undefined ? crypto.cipher(gender).toString() : null
            let cibirth = birth_date!=undefined ? crypto.cipher(birth_date).toString() : null
            let ciaddr = address!=undefined ? crypto.cipher(address).toString() : null
            let values = [cicf, username, email, cipsw.toString(), name, surname, cigen, cibirth, ciaddr, google]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: add teacher")
        } finally {
            conn.release()
        }
    },
    async get_tutor_classes(teacher_id, school_year){
        try{
            conn = await pool.getConnection();
            if(teacher_id == undefined){
                conn.release();
                return null;
            }
            let sql = `SELECT DISTINCT ot.ordinary_class_study_year, ot.ordinary_class_address, ot.ordinary_class_school_year, ot.section FROM ordinary_teach AS ot WHERE ot.teacher_id = ? AND ot.tutor = 1`;
            let values = [teacher_id];
            if(school_year!=undefined){
                sql += ` AND ot.ordinary_class_school_year = ?`
                values.push(school_year)
            }
            const rows = await conn.query(sql, values);
            conn.release();
            if(rows.length>=1){
                return rows;
            } else {
                return false;
            }
        } catch (err) {
            console.log("Something went wrong: ordinary classes teacher tutor");
        } finally {
            conn.release();
        }
    },
    async getTutorYears(teacher_id) {
        try{
            conn = await pool.getConnection();
            if(teacher_id == undefined){
                conn.release();
                return null;
            }
            let sql = `SELECT DISTINCT ot.ordinary_class_school_year FROM ordinary_teach AS ot WHERE ot.teacher_id = ? AND ot.tutor = 1`;
            const rows = await conn.query(sql, [teacher_id]);
            conn.release();
            if(rows.length>=1){
                return rows;
            } else {
                return false;
            }
        } catch (err) {
            console.log("Something went wrong: ordinary classes teacher tutor");
        } finally {
            conn.release();
        }
    },
    async isTeacherTutor(teacher_id, study_year, address, school_year, section){
        try{
            conn = await pool.getConnection();
            if(!teacher_id || !study_year || !address || !school_year || !section) {
                conn.release();
                return null;
            }
            let sql = 'SELECT * FROM ordinary_teach AS ot WHERE ot.teacher_id = ? AND ot.ordinary_class_study_year = ? AND ot.ordinary_class_address = ? AND ot.ordinary_class_school_year = ? AND ot.section = ? AND ot.tutor = 1';            
            values = [teacher_id, study_year, address, school_year, section];
            const rows = await conn.query(sql, values);
            conn.release();
            if(rows.length>=1){
                return rows;
            } else {
                return false;
            }
        } catch (err) {
            console.log("Something went wrong: ordinary classes teacher tutor");
        } finally {
            conn.release();
        }
    }
};