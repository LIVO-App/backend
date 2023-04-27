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
        }
    }
};

/*SELECT oc.study_year_id, oc.study_address_id, oc.school_year, oc.italian_displayed_name, oc.english_displayed_name, oc.annual_credits_study_year, oc.annual_credits_address, oc.annual_credits_definition_year FROM ordinary_class as oc JOIN attend as att ON att.ordinary_class_study_year=oc.study_year_id AND att.ordinary_class_address=oc.study_address_id AND att.ordinary_class_school_year=oc.school_year WHERE att.student_id=4; */