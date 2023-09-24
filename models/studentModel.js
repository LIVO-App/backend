const ptstr = require('../utils/toString.js');
const pool = require('../utils/db.js');
const crypto = require('../utils/cipher.js');

async function read(condition,param){
    try {
        conn = await pool.getConnection();
        sql = "SELECT s.id, s.cf, s.username, s.name, s.surname, s.gender, s.birth_date, s.address, s.email, s.google, s.first_access, att.ordinary_class_study_year, att.ordinary_class_address, att.section FROM student AS s JOIN attend AS att ON s.id = att.student_id WHERE " + condition + " ORDER BY att.ordinary_class_school_year DESC";
        const rows = await conn.query(sql,[param]);
        conn.release();
        if (rows.length>=1){
            return rows[0];
        } else {
            return false;
        }
    } catch (err) {
        console.log("Something went wrong: read student");
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
            console.log("Something went wrong: list student");
        } finally {
            conn.release();
        }
    },
    async google(student_id) {
        try{
            conn = await pool.getConnection();
            sql = 'UPDATE student SET google = 1 WHERE id = ?'
            const rows = await conn.query(sql, [student_id]);
            conn.release();
            return rows;
        } catch (err) {
            console.log("Something went wrong: google update student");
        } finally {
            conn.release();
        }
    },
    async retrieve_credits(student_id, session_id, area_id, context_id){
        try {
            conn = await pool.getConnection();
            if(!student_id || !session_id || !area_id || !context_id){
                conn.release();
                return false;
            }
            let values = []
            sql = `SELECT (SELECT IFNULL(SUM(c.credits),0) FROM subscribed AS subs JOIN project_class AS pc ON subs.project_class_course_id = pc.course_id AND subs.project_class_session = pc.learning_session_id JOIN course AS c ON pc.course_id = c.id WHERE subs.student_id = ?`
            values.push(student_id)
            if(context_id=='PER'){
                sql += ` AND subs.learning_context_id=?`;
                values.push(context_id)
            } else {
                sql += ` AND c.learning_area_id=? AND subs.learning_context_id=?`;
                values.push(area_id, context_id)
            }
            sql += ` AND pc.learning_session_id = ? AND subs.pending IS NULL) AS credits, IFNULL((SELECT lm.credits FROM limited AS lm WHERE lm.learning_session_id = ? AND lm.ordinary_class_study_year = att.ordinary_class_study_year AND lm.ordinary_class_address = att.ordinary_class_address AND lm.ordinary_class_school_year = att.ordinary_class_school_year `
            values.push(session_id, session_id)
            if(context_id=='PER'){
                sql += ` AND lm.learning_area_id IS NULL AND lm.learning_context_id=?`;
                values.push(context_id)
            } else {
                sql += ` AND lm.learning_area_id = ? AND lm.learning_context_id=?`;
                values.push(area_id, context_id)
            }
            sql += ` ),0) AS max_credits FROM attend AS att WHERE att.student_id = ?;`
            values.push(student_id)
            const rows = await conn.query(sql, values);
            conn.release();
            return rows[0];
        } catch (err) {
            console.log("Something went wrong: student credits");
        } finally {
            conn.release();
        }

    },
    async retrieve_project_classes(student_id, session_id){
        try {
            conn = await pool.getConnection();
            if(!student_id || !session_id){
                conn.release();
                return false;
            }
            let sql = 'SELECT pc.course_id, CASE WHEN pc.italian_displayed_name IS NULL THEN c.italian_title ELSE pc.italian_displayed_name END AS "italian_title", CASE WHEN pc.english_displayed_name IS NULL THEN c.english_title ELSE pc.english_displayed_name END AS "english_title", subs.section FROM course AS c JOIN project_class AS pc ON c.id = pc.course_id JOIN subscribed AS subs ON subs.project_class_course_id = pc.course_id AND subs.project_class_session = pc.learning_session_id WHERE subs.student_id = ? AND subs.project_class_session = ?';
            let values = [student_id, session_id];
            const rows = await conn.query(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log("Something went wrong: student project classes");
        } finally {
            conn.release();
        }
    },
    async retrieve_section_from_project_class(student_id, course_id, session_id){
        try {
            conn = await pool.getConnection()
            if (!course_id || !session_id){
                conn.release()
                return null
            }
            let sql = 'SELECT subs.section FROM subscribed AS subs WHERE subs.student_id = ? AND subs.project_class_course_id = ? AND subs.project_class_session = ?'
            let values = [student_id, course_id, session_id]
            const rows = await conn.query(sql, values)
            conn.release();
            if (rows.length == 1){
                return rows[0]
            } else {
                return false
            }

        } catch (err) {
            console.log("Something went wrong: student section of project class")
        } finally {
            conn.release()
        }
    },
    async retrieve_annual_credits(student_id, school_year, area_id, context_id){
        try {
            conn = await pool.getConnection();
            if(!student_id || !school_year){
                conn.release();
                return false;
            }
            if(area_id.length==0 || context_id.length==0){
                conn.release();
                return false;
            }
            let sql = ``;
            let values = [];
            for(let i=0;i<area_id.length;i++){
                sql += `SELECT (SELECT IFNULL(SUM(c.credits),0) FROM subscribed AS subs JOIN project_class AS pc ON subs.project_class_course_id = pc.course_id AND subs.project_class_session = pc.learning_session_id JOIN course AS c ON pc.course_id = c.id WHERE subs.student_id = ? AND pc.learning_session_id IN (SELECT ls.id FROM learning_session AS ls WHERE ls.school_year=?)`
                values.push(student_id, school_year)
                if(context_id[i]=='PER'){
                    sql += ` AND subs.learning_context_id = ?`;
                    values.push(context_id[i])
                } else {
                    sql += ` AND c.learning_area_id = ? AND subs.learning_context_id = ?`;
                    values.push(area_id[i], context_id[i])
                }
                sql += ` AND subs.pending IS NULL) AS credits, IFNULL((SELECT SUM(l.credits) AS total_credits FROM limited AS l WHERE l.ordinary_class_school_year = ? AND l.ordinary_class_study_year = att.ordinary_class_study_year AND l.ordinary_class_address = att.ordinary_class_address `
                values.push(school_year)
                if(context_id[i]=='PER'){
                    sql += ` AND l.learning_area_id IS NULL AND l.learning_context_id = ?`;
                    values.push(context_id[i])
                } else {
                    sql += ` AND l.learning_area_id = ? AND l.learning_context_id = ?`;
                    values.push(area_id[i], context_id[i])
                }
                sql += ` ),0) AS max_credits FROM attend AS att WHERE att.student_id = ?`
                values.push(student_id)
                if(i<area_id.length-1){
                    sql += " UNION "
                }
            }
            const rows = await conn.query(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log("Something went wrong: student annual credits");
        } finally {
            conn.release();
        }

    },
    async update(student_id, infos){
        try {
            conn = await pool.getConnection()
            if(student_id == undefined || infos == undefined || Object.keys(infos).length == 0){
                conn.release()
                return false
            }
            let sql = 'UPDATE student SET'
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
            values.push(student_id)
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: update student")
        } finally {
            conn.release()
        }
    },
    async change_psw(student_id, psw){
        try {
            conn = await pool.getConnection()
            if(student_id == undefined || psw == undefined){
                conn.release()
                return null
            }
            let new_psw = crypto.encrypt_password(psw).toString()
            let sql = 'SELECT password FROM student WHERE id = ?'
            let rows = await conn.query(sql, [student_id])
            if(rows.length==1){
                if(rows[0].password.toString() === new_psw){
                    conn.release()
                    return false
                }
            } else {
                conn.release()
                return null
            }
            sql = 'UPDATE student SET password = ? WHERE id = ?'
            let values = [new_psw, student_id]
            rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: update student password")
        } finally {
            conn.release()
        }
    },
    async add_student(cf, username, email, psw, name, surname, gender, birth_date, address, google = false){
        try {
            conn = await pool.getConnection()
            if(!username || !email || !psw || !name || !surname){
                conn.release()
                return false
            }
            let sql = 'INSERT INTO student (cf, username, email, `password`, name, surname, gender, birth_date, address, google, first_access) VALUES (?,?,?,?,?,?,?,?,?,?, 1)'
            let cicf = cf!=undefined ? crypto.cipher(cf).toString() : null
            let cipsw = crypto.encrypt_password(psw)
            let cigen = gender!=undefined ? crypto.cipher(gender).toString() : null
            let cibirth = birth_date!=undefined ? crypto.cipher(birth_date).toString() : null
            let ciaddr = address!=undefined ? crypto.cipher(address).toString() : null
            let values = [cicf, username, email, cipsw.toString(), name, surname, cigen, cibirth, ciaddr, google]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: add student")
        } finally {
            conn.release()
        }
    }
};