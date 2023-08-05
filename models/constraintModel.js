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
    },
    async get_constraints(block_id, year_of = false, context_id, area_id, study_year, study_address){
        try {
            conn = await pool.getConnection()
            let sql = 'SELECT l.id, l.learning_block_id, l.ordinary_class_study_year, l.ordinary_class_address, l.ordinary_class_school_year, l.learning_area_id, l.learning_context_id, l.credits FROM limited AS l'
            let values = []
            if(block_id!=undefined || context_id!=undefined || area_id!=undefined || study_year!=undefined || study_address!=undefined){
                sql += ' WHERE'
                if(block_id!=undefined){
                    sql += ' l.learning_block_id '
                    if(year_of){
                        sql += 'IN (SELECT lb.id FROM learning_block AS lb WHERE lb.school_year = (SELECT lb1.school_year FROM learning_block AS lb1 WHERE lb1.id = ?))'
                        values.push(block_id)
                    } else {
                        sql += '= ?'
                        values.push(block_id)
                    }
                }
                if(context_id!=undefined){
                    if(sql.slice(-5) == "WHERE"){
                        sql += ' l.learning_context_id '
                    } else {
                        sql += ' AND l.learning_context_id '
                    }
                    sql += ' = ?'
                    values.push(context_id)
                }
                if(area_id!=undefined){
                    if(context_id=="SPE"){
                        if(sql.slice(-5) == "WHERE"){
                            sql += ' l.learning_area_id '
                        } else {
                            sql += ' AND l.learning_area_id '
                        }
                        sql += ' = ?'
                        values.push(area_id)
                    }
                }
                if(study_address!=undefined && study_year != undefined){
                    if(sql.slice(-5) == "WHERE"){
                        sql += ' l.ordinary_class_study_year = ? AND l.ordinary_class_address = ? AND l.ordinary_class_school_year IN (SELECT lb.school_year FROM learning_block AS lb WHERE lb.id = ?) '
                    } else {
                        sql += ' AND l.ordinary_class_study_year = ? AND l.ordinary_class_address = ? AND l.ordinary_class_school_year IN (SELECT lb.school_year FROM learning_block AS lb WHERE lb.id = ?)'
                    }
                    values.push(study_year, study_address, block_id)
                } else {
                    conn.release()
                    return null
                }
            }
            const rows = await conn.query(sql, values)
            conn.release()
            if(rows.length > 0){
                return rows
            } else {
                return false
            }
        } catch (err) {
            console.log(err)
        } finally {
            conn.release()
        }
    }
}