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
            if(credits){
                sql += `, oc.annual_credits_study_year, oc.annual_credits_address, oc.annual_credits_definition_year `
            }
            sql += ` FROM ordinary_class as oc `
            if(student_id != undefined && school_year != undefined){
                sql += `JOIN attend as att ON att.ordinary_class_study_year = oc.study_year_id AND att.ordinary_class_address = oc.study_address_id AND att.ordinary_class_school_year = oc.school_year WHERE att.student_id = ${student_id} AND oc.school_year = ${school_year}`;
            } else if(student_id != undefined) {
                sql += `JOIN attend as att ON att.ordinary_class_study_year = oc.study_year_id AND att.ordinary_class_address = oc.study_address_id AND att.ordinary_class_school_year = oc.school_year WHERE att.student_id = ${student_id}`;
            } else if(school_year != undefined) {
                sql += `WHERE oc.school_year = ${school_year}`;
            }
            if(descending){
                sql += ` ORDER BY oc.school_year DESC`
            }
            const rows = await conn.query(sql);
            conn.release();
            if(rows.length!=0){
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
    async teachers_classes(teacher_id, school_year){
        try {
            conn = await pool.getConnection();
            if(!teacher_id){
                conn.release();
                return false;
            }
            let sql = 'SELECT ot.ordinary_class_study_year, ot.ordinary_class_address, ot.ordinary_class_school_year, ot.section FROM ordinary_teach AS ot WHERE ot.teacher_id = ?';
            let values = [teacher_id];
            if (school_year != undefined){
                sql += ' AND ot.ordinary_class_school_year = ?';
                values.push(school_year);
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
    async components(study_year, address, school_year, section){
        try {
            conn = await pool.getConnection();
            if(!study_year || !address || !school_year || !section){
                conn.release();
                return false;
            }
            let sql = 'SELECT s.id, s.name, s.surname FROM attend AS att JOIN student AS s ON att.student_id = s.id WHERE att.ordinary_class_study_year = ? AND att.ordinary_class_address = ? AND att.ordinary_class_school_year = ? AND att.section = ?';
            let values = [study_year, address, school_year, section];
            const rows = await conn.query(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    },
    async read_from_student_and_block(student_id, block_id) {
        try {
            conn = await pool.getConnection();
            if(!student_id || !block_id){
                conn.release();
                return null;
            }
            let sql = 'SELECT att.ordinary_class_study_year, att.ordinary_class_address, att.section FROM attend AS att WHERE att.student_id = ? AND att.ordinary_class_school_year IN (SELECT lb.school_year FROM learning_block AS lb WHERE lb.id = ?)';
            let values = [student_id, block_id];
            const rows = await conn.query(sql, values);
            conn.release();
            if(rows.length == 1){
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
};

/*SELECT oc.study_year_id, oc.study_address_id, oc.school_year, oc.italian_displayed_name, oc.english_displayed_name, oc.annual_credits_study_year, oc.annual_credits_address, oc.annual_credits_definition_year FROM ordinary_class as oc JOIN attend as att ON att.ordinary_class_study_year=oc.study_year_id AND att.ordinary_class_address=oc.study_address_id AND att.ordinary_class_school_year=oc.school_year WHERE att.student_id=4; */