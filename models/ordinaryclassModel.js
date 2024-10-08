const pool = require('../utils/db.js');

module.exports = {
    /*async read(){
        try {
            conn = await pool.getConnection();
            sql = '';
            const rows = await conn.query(sql, id);
            conn.end();
            if(rows.length == 1){
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
        }
    },*/
    async list(student_id,school_year,credits=false, descending=false){
        try {
            conn = await pool.getConnection();
            let sql = `SELECT oc.study_year_id, oc.study_address_id, oc.school_year, oc.italian_displayed_name, oc.english_displayed_name`;
            /*if(credits){
                sql += `, oc.annual_credits_study_year, oc.annual_credits_address, oc.annual_credits_definition_year `
            }*/
            sql += ` FROM ordinary_class as oc `
            let values = []
            if(student_id != undefined && school_year != undefined){
                sql += `JOIN attend as att ON att.ordinary_class_study_year = oc.study_year_id AND att.ordinary_class_address = oc.study_address_id AND att.ordinary_class_school_year = oc.school_year WHERE att.student_id = ? AND oc.school_year = ?`;
                values.push(student_id, school_year)
            } else if(student_id != undefined) {
                sql += `JOIN attend as att ON att.ordinary_class_study_year = oc.study_year_id AND att.ordinary_class_address = oc.study_address_id AND att.ordinary_class_school_year = oc.school_year WHERE att.student_id = ?`;
                values.push(student_id)
            } else if(school_year != undefined) {
                sql += `WHERE oc.school_year = ?`;
                values.push(school_year)
            }
            if(descending){
                sql += ` ORDER BY oc.school_year DESC`
            }
            const rows = await conn.query(sql, values);
            conn.release();
            if(rows.length!=0){
                return rows;
            } else {
                return false;
            } 
        } catch (err) {
            console.log("Something went wrong: list ordinary classes");
        } finally {
            conn.release();
        }
    },
    async teachers_classes(teacher_id, school_year, teaching){
        try {
            conn = await pool.getConnection();
            if(!teacher_id){
                conn.release();
                return false;
            }
            let sql = 'SELECT ';
            if (teaching !== "true") {
                sql += 'DISTINCT ';
            }
            sql += 'ot.ordinary_class_study_year, ot.ordinary_class_address, ot.ordinary_class_school_year, ot.section';
            if (teaching === "true") {
                sql += ', ot.teaching_id';
            }
            sql += ' FROM ordinary_teach AS ot WHERE ot.teacher_id = ?';
            let values = [teacher_id];
            if (school_year != undefined){
                sql += ' AND ot.ordinary_class_school_year = ?';
                values.push(school_year);
            }
            const rows = await conn.query(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log("Something went wrong: read teacher ordinary classes");
        } finally {
            conn.release();
        }
    },
    async students_classes(student_id, school_year){
        try {
            conn = await pool.getConnection();
            if(!student_id){
                conn.release();
                return false;
            }
            let sql = 'SELECT att.ordinary_class_study_year, att.ordinary_class_address, att.ordinary_class_school_year, att.section FROM attend AS att WHERE att.student_id = ?';
            let values = [student_id];
            if (school_year != undefined){
                sql += ' AND att.ordinary_class_school_year = ?';
                values.push(school_year);
            }
            const rows = await conn.query(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log("Something went wrong: read student ordinary classes");
        } finally {
            conn.release();
        }
    },
    async components(study_year, address, school_year, section, admin_user = false){
        try {
            conn = await pool.getConnection();
            if(!study_year || !address || !school_year || !section){
                conn.release();
                return false;
            }
            // Growth area id is fixed to 4 since we need only the credits for orientation courses, which have growth_area_id = 4
            let sql = 'SELECT s.id, s.name, s.surname'
            if(admin_user){
                sql += ', (SELECT IFNULL(SUM(c.credits),0) FROM subscribed AS subs JOIN project_class AS pc ON pc.course_id = subs.project_class_course_id AND pc.learning_session_id = subs.project_class_session JOIN course AS c ON c.id = pc.course_id JOIN characterize AS ch ON ch.course_id = c.id WHERE ch.growth_area_id = 4 AND subs.student_id = att.student_id) AS orientation_credits, (SELECT IFNULL(SUM(c.credits),0) FROM subscribed AS subs JOIN project_class AS pc ON pc.course_id = subs.project_class_course_id AND pc.learning_session_id = subs.project_class_session JOIN course AS c ON c.id = pc.course_id JOIN characterize AS ch ON ch.course_id = c.id WHERE ch.growth_area_id = 5 AND subs.student_id = att.student_id) AS clil_credits';
            }
            sql += ' FROM attend AS att JOIN student AS s ON att.student_id = s.id WHERE att.ordinary_class_study_year = ? AND att.ordinary_class_address = ? AND att.ordinary_class_school_year = ? AND att.section = ? ORDER BY s.surname'
            let values = [study_year, address, school_year, section];            
            const rows = await conn.query(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log("Something went wrong: list of ordinary class components");
        } finally {
            conn.release();
        }
    },
    async not_in_order_students(study_year, study_address, session_id, section, constraints_list, is_tutor = false){
        try {
            conn = await pool.getConnection();
            if((!study_year || !study_address || !session_id || !section) && constraints_list!=undefined && constraints_list.length!=0){
                conn.release();
                return false;
            }
            let sql = 'SELECT s.id, s.name, s.surname, att.ordinary_class_study_year, att.ordinary_class_address FROM student AS s JOIN attend AS att ON s.id = att.student_id WHERE att.ordinary_class_school_year IN (SELECT ls.school_year FROM learning_session AS ls WHERE ls.id = ?) AND att.ordinary_class_study_year = ? AND att.ordinary_class_address = ? AND att.section = ? AND s.id IN (SELECT fc.student_id FROM ('
            let values = [session_id, study_year, study_address, section]
            for(let i = 0; i<constraints_list.length; i++){
                let area_id = constraints_list[i].learning_area_id
                let context_id = constraints_list[i].learning_context_id
                if (context_id == "PER" && is_tutor){
                    continue
                }
                sql += 'SELECT att.student_id, IFNULL((SELECT lm.credits FROM limited AS lm WHERE lm.learning_session_id = ? AND lm.ordinary_class_study_year = att.ordinary_class_study_year AND lm.ordinary_class_address = att.ordinary_class_address AND lm.ordinary_class_school_year = att.ordinary_class_school_year AND'
                values.push(session_id)
                if(context_id=="PER"){
                    sql += ' lm.learning_context_id = ? AND lm.learning_area_id IS NULL'
                    values.push(context_id)
                } else {
                    sql += ' lm.learning_context_id = ? AND lm.learning_area_id = ?'
                    values.push(context_id, area_id)
                } 
                sql += '),0) - (SELECT IFNULL(SUM(c.credits),0) FROM subscribed AS subs JOIN project_class AS pc ON subs.project_class_course_id = pc.course_id AND subs.project_class_session = pc.learning_session_id JOIN course AS c ON pc.course_id = c.id WHERE subs.student_id = att.student_id AND '
                if(context_id == "PER"){
                    sql += ' subs.learning_context_id = ? '
                    values.push(context_id)
                } else {
                    sql += ' subs.learning_context_id = ? AND c.learning_area_id = ? '
                    values.push(context_id, area_id)
                } 
                sql += ' AND pc.learning_session_id = ? AND subs.pending IS NULL) AS remaining_credits FROM attend AS att HAVING remaining_credits > 0'
                values.push(session_id)
                if(i<constraints_list.length-1){
                    sql += ' UNION '
                }
            }
            sql += ') AS fc GROUP BY student_id HAVING COUNT(student_id) > 0)'
            const rows = await conn.query(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log("Something went wrong: list of students of ordinary class not in order");
        } finally {
            conn.release();
        }
    },
    async read_from_student_and_session(student_id, session_id) {
        try {
            conn = await pool.getConnection();
            if(!student_id || !session_id){
                conn.release();
                return null;
            }
            let sql = 'SELECT att.ordinary_class_study_year, att.ordinary_class_address, att.section FROM attend AS att WHERE att.student_id = ? AND att.ordinary_class_school_year IN (SELECT ls.school_year FROM learning_session AS ls WHERE ls.id = ?)';
            let values = [student_id, session_id];
            const rows = await conn.query(sql, values);
            conn.release();
            if(rows.length == 1){
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.log("Something went wrong: read ordinary class from student and session");
        } finally {
            conn.release();
        }
    },
    async read(study_year, study_address, session_id){
        try {
            conn = await pool.getConnection()
            if(!study_year || !study_address || !session_id){
                conn.release();
                return null;
            }
            let sql = 'SELECT * FROM ordinary_class AS oc WHERE oc.study_year_id = ? AND oc.study_address_id = ? AND oc.school_year IN (SELECT ls.school_year FROM learning_session AS ls WHERE ls.id = ?)';
            let values = [study_year, study_address, session_id]
            const rows = await conn.query(sql, values)
            conn.release()
            if(rows.length==1){
                return rows[0]
            } else {
                return false
            }
        } catch (err) {
            console.log("Something went wrong: read ordinary class")
        } finally {
            conn.release()
        }
    },
    async read_with_year(study_year, study_address, school_year){
        try {
            conn = await pool.getConnection()
            if(!study_year || !study_address || !school_year){
                conn.release();
                return null;
            }
            let sql = 'SELECT * FROM ordinary_class AS oc WHERE oc.study_year_id = ? AND oc.study_address_id = ? AND oc.school_year = ?';
            let values = [study_year, study_address, school_year]
            const rows = await conn.query(sql, values)
            conn.release()
            if(rows.length==1){
                return rows[0]
            } else {
                return false
            }
        } catch (err) {
            console.log("Something went wrong: read ordinary class from school year")
        } finally {
            conn.release()
        }
    },
    async check_study_year(study_year){
        try{
            conn = await pool.getConnection()
            if(!study_year){
                conn.release()
                return false
            }
            let sql = 'SELECT id FROM study_year WHERE id = ?'
            let values = [study_year]
            const rows = await conn.query(sql,values)
            conn.release()
            if(rows.length==1){
                return true
            } else {
                return false
            }
        } catch (err) {
            console.log("Something went wrong: check study year")
        } finally {
            conn.release()
        }
    },
    async check_study_address(study_address){
        try{
            conn = await pool.getConnection()
            if(!study_address){
                conn.release()
                return false
            }
            let sql = 'SELECT id, italian_title, english_title, italian_description, english_description, max_classes FROM study_address WHERE id = ?'
            let values = [study_address]
            const rows = await conn.query(sql,values)
            conn.release()
            if(rows.length==1){
                return true
            } else {
                return false
            }
        } catch (err) {
            console.log("Something went wrong: check study address")
        } finally {
            conn.release()
        }
    },
    async get_study_address(){
        try{
            conn = await pool.getConnection()
            let sql = 'SELECT id, italian_title, english_title, italian_description, english_description, max_classes FROM study_address'
            const rows = await conn.query(sql)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: get study address")
        } finally {
            conn.release()
        }
    },
    async add_ordinary_class(study_year, study_address, school_year, italian_displayed_name, english_displayed_name){
        try {
            conn = await pool.getConnection()
            if(!study_year || !study_address || !school_year){
                conn.release()
                return false
            }
            let sql = 'INSERT INTO ordinary_class (study_year_id, study_address_id, school_year, italian_displayed_name, english_displayed_name) VALUES (?,?,?,?,?)'
            italian_displayed_name = italian_displayed_name!=undefined ? italian_displayed_name : null
            english_displayed_name = english_displayed_name!=undefined ? english_displayed_name : null
            let values = [study_year, study_address, school_year, italian_displayed_name, english_displayed_name]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: add ordinary class")
        } finally {
            conn.release()
        }
    },
    async add_student_to_class(student_id, study_year, study_address, school_year, section = "A"){
        try {
            conn = await pool.getConnection()
            if(!student_id || !study_year || !study_address || !school_year){
                conn.release()
                return false
            }
            let sql = 'INSERT INTO attend (student_id, ordinary_class_study_year, ordinary_class_address, ordinary_class_school_year, section) VALUES (?,?,?,?,?)'
            let values = [student_id, study_year, study_address, school_year, section]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: add student to ordinary class")
        } finally {
            conn.release()
        }
    },
    async add_teacher_to_class(teacher_id, study_year, study_address, school_year, section = "A", teaching_id, coordinator=false){
        try {
            conn = await pool.getConnection()
            if(!teacher_id || !study_year || !study_address || !school_year || !teaching_id){
                conn.release()
                return false
            }
            let sql = 'INSERT INTO ordinary_teach (ordinary_class_study_year, ordinary_class_address, ordinary_class_school_year, section, teaching_id, teacher_id, coordinator) VALUES (?,?,?,?,?,?,?)'
            let values = [study_year, study_address, school_year, section, teaching_id, teacher_id, coordinator]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: add teachers to ordinary class")
        } finally {
            conn.release()
        }
    }
};

/*SELECT oc.study_year_id, oc.study_address_id, oc.school_year, oc.italian_displayed_name, oc.english_displayed_name, oc.annual_credits_study_year, oc.annual_credits_address, oc.annual_credits_definition_year FROM ordinary_class as oc JOIN attend as att ON att.ordinary_class_study_year=oc.study_year_id AND att.ordinary_class_address=oc.study_address_id AND att.ordinary_class_school_year=oc.school_year WHERE att.student_id=4; */