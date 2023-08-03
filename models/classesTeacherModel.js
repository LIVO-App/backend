const pool = require('../utils/db.js');

module.exports = {
    /**
     * Returns only the project classes where the teacher teaches
     * Extra info regarding if the teaching is one of its own or not
     */
    async read_project_classes_teach(teacher_id, block_id, course_id){
        //SELECT c.id, c.italian_title, c.english_title, pt.section, ass.teaching_id, CASE WHEN ass.teaching_id IN (SELECT ot.teaching_id FROM ordinary_teach AS ot WHERE ot.teacher_id=2) THEN 1 ELSE 0 END AS my_teaching FROM course AS c JOIN project_teach AS pt ON c.id = pt.project_class_course_id JOIN associated AS ass ON ass.course_id = c.id WHERE pt.teacher_id = 2 AND pt.project_class_block = 7;
        try {
            conn = await pool.getConnection();
            if(!teacher_id || !block_id){
                conn.release();
                return false;
            }
            let sql = "SELECT c.id, CASE WHEN pc.italian_displayed_name IS NULL THEN c.italian_title ELSE pc.italian_displayed_name END AS 'italian_title', CASE WHEN pc.english_displayed_name IS NULL THEN c.english_title ELSE pc.english_displayed_name END AS 'english_title', pt.section, ass.teaching_id, CASE WHEN ass.teaching_id IN (SELECT ot.teaching_id FROM ordinary_teach AS ot WHERE ot.teacher_id=?) THEN 1 ELSE 0 END AS my_teaching FROM course AS c JOIN project_teach AS pt ON c.id = pt.project_class_course_id JOIN associated AS ass ON ass.course_id = c.id JOIN project_class AS pc ON pt.project_class_course_id = pc.course_id AND pt.project_class_block = pc.learning_block_id WHERE pt.teacher_id = ? AND pt.project_class_block = ?";
            let values = [teacher_id, teacher_id, block_id];
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
    /**
     * Returns project classes that are associated to the teacher through his teaching
     * His teachings are related to what he teaches in the ordinary classes he teachs
     */
    async read_project_classes_associated(teacher_id, block_id, course_id){
        //SELECT DISTINCT c.id, c.italian_title, c.english_title, ass.teaching_id, COUNT(ins.student_id) AS num_student FROM course AS c JOIN project_class AS pc ON c.id = pc.course_id JOIN inscribed AS ins ON pc.course_id = ins.project_class_course_id AND pc.learning_block_id = ins.project_class_block JOIN associated AS ass ON c.id = ass.course_id WHERE ins.student_id IN (SELECT s.id FROM student AS s JOIN attend AS att ON s.id = att.student_id WHERE att.ordinary_class_study_year IN (SELECT ot.ordinary_class_study_year FROM ordinary_teach AS ot WHERE ot.teacher_id = 3) AND att.ordinary_class_address IN (SELECT ot.ordinary_class_address FROM ordinary_teach AS ot WHERE ot.teacher_id = 3)) AND pc.learning_block_id = 7 AND ass.teaching_id IN (SELECT ot.teaching_id FROM ordinary_teach AS ot WHERE ot.teacher_id = 3);
        try {
            conn = await pool.getConnection();
            if(!teacher_id || !block_id){
                conn.release();
                return false;
            }
            let sql = "SELECT DISTINCT c.id, CASE WHEN pc.italian_displayed_name IS NULL THEN c.italian_title ELSE pc.italian_displayed_name END AS 'italian_title', CASE WHEN pc.english_displayed_name IS NULL THEN c.english_title ELSE pc.english_displayed_name END AS 'english_title', ins.section, ass.teaching_id FROM course AS c JOIN project_class AS pc ON c.id = pc.course_id JOIN inscribed AS ins ON pc.course_id = ins.project_class_course_id AND pc.learning_block_id = ins.project_class_block JOIN associated AS ass ON c.id = ass.course_id WHERE ins.student_id IN (SELECT s.id FROM student AS s JOIN attend AS att ON s.id = att.student_id WHERE att.ordinary_class_study_year IN (SELECT ot.ordinary_class_study_year FROM ordinary_teach AS ot WHERE ot.teacher_id = ?) AND att.ordinary_class_address IN (SELECT ot.ordinary_class_address FROM ordinary_teach AS ot WHERE ot.teacher_id = ?)) AND pc.learning_block_id = ? AND ass.teaching_id IN (SELECT ot.teaching_id FROM ordinary_teach AS ot WHERE ot.teacher_id = ?)";
            let values = [teacher_id, teacher_id, block_id, teacher_id];
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
    async add_project_teach(course_id, block_id, teacher_list){
        try {
            conn = await pool.getConnection();
            if(!course_id || !block_id || teacher_list.length == 0){
                conn.release()
                return false
            }
            let sql = 'INSERT INTO project_teach (teacher_id, project_class_course_id, project_class_block, section, main) VALUES ';
            let values = []
            let teacher_insert = []
            for(let i=0;i<teacher_list.length;i++){
                let finded_teacher;
                let teacher_id = teacher_list[i]["teacher_id"]
                let main_teacher = teacher_list[i]["main"]
                let sections = teacher_list[i]["sections"]
                for(let j=0;j<teacher_list.length;j++){
                    if(teacher_insert[j]==teacher_id){
                        finded_teacher = true
                    }
                }
                if(!finded_teacher){
                    for(let j=0;j<sections.length;j++){
                        sql += ' (?,?,?,?,?)';
                        values.push(teacher_id, course_id, block_id, sections[j], main_teacher)
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
            console.log(err)
        } finally {
            conn.release()
        }
    },
    async is_present(course_id, block_id, section = "A", teacher_id, main){
        try{
            conn = await pool.getConnection()
            if(!course_id || !block_id || !teacher_id || !section){
                conn.release()
                return null
            }
            let sql = 'SELECT * FROM project_teach WHERE project_class_course_id = ? AND project_class_block = ? AND section = ? AND teacher_id = ? AND main = ?'
            let values = [course_id, block_id, section, teacher_id, main]
            const rows = await conn.query(sql, values)
            if(rows.length==1){
                return true
            } else {
                return false
            }
        } catch (err) {
            console.log(err)
        } finally {
            conn.release()
        }
    },
    async delete(course_id, block_id){
        try{
            conn = await pool.getConnection();
            let sql = 'DELETE FROM project_teach WHERE project_class_course_id=? AND project_class_block=?';
            let values = [course_id, block_id]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log(err)
        } finally {
            conn.release()
        }
    }
};