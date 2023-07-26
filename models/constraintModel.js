const pool = require('../utils/db.js');

module.exports = {
    async get_annual_constraints(student_id, school_year){
        try {
            conn = await pool.getConnection();
            if(!student_id || !school_year){
                conn.release()
                return false
            }
            sql = "SELECT cst.learning_area_id, cst.learning_context_id FROM constraints AS cst JOIN attend AS att ON att.ordinary_class_study_year = cst.annual_credits_study_year AND att.ordinary_class_address = cst.annual_credits_address AND att.ordinary_class_school_year = cst.annual_credits_definition_year WHERE att.student_id = ? AND att.ordinary_class_school_year = ?;";
            let values = [student_id, school_year]
            const rows = await conn.query(sql,values);
            conn.release();
            if (rows.length>1){
                return rows;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    }
}