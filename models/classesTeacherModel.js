const pool = require('../utils/db.js');

module.exports = {
    /**
     * Returns only the project classes where the teacher teaches
     * Extra info regarding if the teaching is one of its own or not
     */
    async read_project_classes_teach(teacher_id, session_id, course_id){
        //SELECT c.id, c.italian_title, c.english_title, pt.section, ass.teaching_id, CASE WHEN ass.teaching_id IN (SELECT ot.teaching_id FROM ordinary_teach AS ot WHERE ot.teacher_id=2) THEN 1 ELSE 0 END AS my_teaching FROM course AS c JOIN project_teach AS pt ON c.id = pt.project_class_course_id JOIN associated AS ass ON ass.course_id = c.id WHERE pt.teacher_id = 2 AND pt.project_class_session = 7;
        try {
            conn = await pool.getConnection();
            if(!teacher_id || !session_id){
                conn.release();
                return false;
            }
            let sql = "SELECT c.id, CASE WHEN pc.italian_displayed_name IS NULL THEN c.italian_title ELSE pc.italian_displayed_name END AS 'italian_title', CASE WHEN pc.english_displayed_name IS NULL THEN c.english_title ELSE pc.english_displayed_name END AS 'english_title', pt.section, ass.teaching_id, CASE WHEN ass.teaching_id IN (SELECT ot.teaching_id FROM ordinary_teach AS ot WHERE ot.teacher_id=?) THEN 1 ELSE 0 END AS my_teaching FROM course AS c JOIN project_teach AS pt ON c.id = pt.project_class_course_id JOIN associated AS ass ON ass.course_id = c.id JOIN project_class AS pc ON pt.project_class_course_id = pc.course_id AND pt.project_class_session = pc.learning_session_id WHERE pt.teacher_id = ? AND pt.project_class_session = ? AND pc.admin_confirmation IS NOT NULL AND pc.certifying_admin_id IS NOT NULL";
            let values = [teacher_id, teacher_id, session_id];
            if(course_id!=undefined){
                sql += " AND c.id = ?";
                values.push(course_id);
            }
            const rows = await conn.query(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log("Something went wrong: read teacher project classes");
        } finally {
            conn.release();
        }
    },
    /**
     * Returns project classes that are associated to the teacher through his teaching
     * His teachings are related to what he teaches in the ordinary classes he teachs
     */
    async read_project_classes_associated(teacher_id, session_id, course_id){
        //SELECT DISTINCT c.id, c.italian_title, c.english_title, ass.teaching_id, COUNT(ins.student_id) AS num_student FROM course AS c JOIN project_class AS pc ON c.id = pc.course_id JOIN subscribed AS ins ON pc.course_id = ins.project_class_course_id AND pc.learning_session_id = ins.project_class_session JOIN associated AS ass ON c.id = ass.course_id WHERE ins.student_id IN (SELECT s.id FROM student AS s JOIN attend AS att ON s.id = att.student_id WHERE att.ordinary_class_study_year IN (SELECT ot.ordinary_class_study_year FROM ordinary_teach AS ot WHERE ot.teacher_id = 3) AND att.ordinary_class_address IN (SELECT ot.ordinary_class_address FROM ordinary_teach AS ot WHERE ot.teacher_id = 3)) AND pc.learning_session_id = 7 AND ass.teaching_id IN (SELECT ot.teaching_id FROM ordinary_teach AS ot WHERE ot.teacher_id = 3);
        try {
            conn = await pool.getConnection();
            if(!teacher_id || !session_id){
                conn.release();
                return false;
            }
            let sql = "SELECT DISTINCT c.id, CASE WHEN pc.italian_displayed_name IS NULL THEN c.italian_title ELSE pc.italian_displayed_name END AS 'italian_title', CASE WHEN pc.english_displayed_name IS NULL THEN c.english_title ELSE pc.english_displayed_name END AS 'english_title', ins.section, ass.teaching_id FROM course AS c JOIN project_class AS pc ON c.id = pc.course_id JOIN subscribed AS ins ON pc.course_id = ins.project_class_course_id AND pc.learning_session_id = ins.project_class_session JOIN associated AS ass ON c.id = ass.course_id WHERE ins.student_id IN (SELECT s.id FROM student AS s JOIN attend AS att ON s.id = att.student_id WHERE att.ordinary_class_study_year IN (SELECT ot.ordinary_class_study_year FROM ordinary_teach AS ot WHERE ot.teacher_id = ?) AND att.ordinary_class_address IN (SELECT ot.ordinary_class_address FROM ordinary_teach AS ot WHERE ot.teacher_id = ?)) AND pc.learning_session_id = ? AND ass.teaching_id IN (SELECT ot.teaching_id FROM ordinary_teach AS ot WHERE ot.teacher_id = ?) AND pc.admin_confirmation IS NOT NULL AND pc.certifying_admin_id IS NOT NULL";
            let values = [teacher_id, teacher_id, session_id, teacher_id];
            if(course_id!=undefined){
                sql += " AND c.id = ?";
                values.push(course_id);
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
    async add_project_teach(course_id, session_id, teacher_list){
        try {
            conn = await pool.getConnection();
            if(!course_id || !session_id || teacher_list.length == 0){
                conn.release()
                return false
            }
            let sql = 'INSERT INTO project_teach (teacher_id, project_class_course_id, project_class_session, section, main) VALUES ';
            let values = []
            let teacher_insert = []
            for(let i=0;i<teacher_list.length;i++){
                let finded_teacher;
                let teacher_id = teacher_list[i]["teacher_id"]
                let main_teacher = teacher_list[i]["main"]
                let sections = teacher_list[i]["sections"]
                for(let j=0;j<teacher_insert.length;j++){
                    if(teacher_insert[j]==teacher_id){
                        finded_teacher = true
                    }
                }
                if(!finded_teacher){
                    for(let j=0;j<sections.length;j++){
                        sql += ' (?,?,?,?,?)';
                        values.push(teacher_id, course_id, session_id, sections[j], main_teacher)
                        if(j<sections.length-1){
                            sql+=','
                        }
                    }
                    teacher_insert.push(teacher_id)
                    if(i<teacher_list.length-1){
                        sql += ',';
                    }
                }
                
            }
            if(sql[sql.length-1]==","){
                sql = sql.slice(0,-1) // Remove the comma if the last teachers inserted are the ones that are replicated
            }
            const rows = await conn.query(sql, values)
            conn.release();
            return rows
        } catch (err) {
            console.log("Something went wrong: add teacher project classes")
        } finally {
            conn.release()
        }
    },
    async is_present(course_id, session_id, section = "A", teacher_id, main){
        try{
            conn = await pool.getConnection()
            if(!course_id || !session_id || !teacher_id || !section){
                conn.release()
                return null
            }
            let sql = 'SELECT * FROM project_teach WHERE project_class_course_id = ? AND project_class_session = ? AND section = ? AND teacher_id = ? AND main = ?'
            let values = [course_id, session_id, section, teacher_id, main]
            const rows = await conn.query(sql, values)
            if(rows.length==1){
                return true
            } else {
                return false
            }
        } catch (err) {
            console.log("Something went wrong: exist teacher project classes")
        } finally {
            conn.release()
        }
    },
    async delete(course_id, session_id){
        try{
            conn = await pool.getConnection();
            let sql = 'DELETE FROM project_teach WHERE project_class_course_id=? AND project_class_session=?';
            let values = [course_id, session_id]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: delete teacher project classes")
        } finally {
            conn.release()
        }
    },
    async update(course_id, session_id, teacher_id, main_teacher, section){
        try {
            conn = await pool.getConnection()
            if(!course_id || !session_id || teacher_id==undefined || main_teacher==undefined || section == undefined){
                conn.release()
                return false
            }
            let sql = 'UPDATE project_teach SET main = ? WHERE teacher_id = ? AND project_class_course_id = ? AND project_class_session = ? AND section = ?'
            let values = [main_teacher, teacher_id, course_id, session_id, section]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: update teacher project classes")
        } finally {
            conn.release()
        }
    },
    async add_single_project_teach(course_id, session_id, teacher_id, sections, main){
        try {
            conn = await pool.getConnection();
            if(!course_id || !session_id || !teacher_id || main == undefined || sections.length == 0){
                conn.release()
                return false
            }
            let sql = 'INSERT INTO project_teach (teacher_id, project_class_course_id, project_class_session, section, main) VALUES ';
            let values = []
            let class_ins = []
            for(let i=0;i<sections.length;i++){
                let finded_class = false
                for(let j=0;j<class_ins.length;j=j+3){
                    if(class_ins[j]==course_id && class_ins[j+1] == session_id && class_ins[j+2] == sections[i]){
                        finded_class = true
                    }
                }
                if(!finded_class){
                    sql += ' (?,?,?,?,?)';
                    values.push(teacher_id, course_id, session_id, sections[i].toUpperCase(), main)    
                    class_ins.push(course_id, session_id, sections[i])
                }
                if(i<sections.length-1){
                    sql+=','
                }
            }
            if(sql[sql.length-1]==","){
                sql = sql.slice(0,-1) // Remove the comma if the last teachers inserted are the ones that are replicated
            }
            const rows = await conn.query(sql, values)
            conn.release();
            return rows
        } catch (err) {
            console.log("Something went wrong: add single teacher project classes")
        } finally {
            conn.release()
        }
    },
    async delete_single(course_id, session_id, teacher_id, sections){
        try{
            conn = await pool.getConnection();
            if(!course_id || !session_id || !teacher_id || sections.length==0){
                conn.release()
                return false
            }
            let sql = 'DELETE FROM project_teach WHERE project_class_course_id=? AND project_class_session=? AND teacher_id = ? AND (';
            let values = [course_id, session_id, teacher_id]
            for(let i=0;i<sections.length;i++){
                sql += 'section = ? '
                values.push(sections[i])
                if(i<sections.length-1){
                    sql += 'OR '
                } else {
                    sql += ')'
                }
            }
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: delete single teacher project classes")
        } finally {
            conn.release()
        }
    }
};