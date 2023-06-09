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
    }
};