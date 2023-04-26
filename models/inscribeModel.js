const pool = require('../utils/db.js');

module.exports = {
    async add(student_id, course_id, block_id, section, pending=false){
        try{
            conn = await pool.getConnection();
            if(!student_id || !course_id || !block_id || !section){
                console.log("MISSING PARAMETERS");
                conn.end();
                return false;
            }
            let pen_val;
            if(pending){
                pen_val = new Date();
            } else {
                pen_val =  null;
            }
            let sql = `INSERT INTO inscribed (student_id, project_class_course_id, project_class_block, section, pending) VALUES (?,?,?,?,?)`;
            
            values = [student_id, course_id, block_id, section, pen_val]
            const rows = await conn.query(sql, values);
            conn.end();
            console.log("Inserted "+rows.affectedRows+" rows.");

        } catch (err){
            console.log(err);
        }
    },
    async remove(student_id, course_id, block_id){
        try{
            conn = await pool.getConnection();
            if(!student_id || !course_id || !block_id){
                console.log("MISSING PARAMETERS");
                conn.end();
                return false;
            }
            let sql = 'DELETE FROM inscribed WHERE student_id = ? AND project_class_course_id = ? AND project_class_block = ?';
            values = [student_id, course_id, block_id]
            const rows = await conn.query(sql, values);
            conn.end();
            console.log("Deleted "+rows.affectedRows+" rows.");
        } catch (err) {
            console.log(err);
        }
    }
}