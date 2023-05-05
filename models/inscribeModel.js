const pool = require('../utils/db.js');

module.exports = {
    async add(student_id, course_id, block_id, section, pending=false){
        try{
            conn = await pool.getConnection();
            if(!student_id || !course_id || !block_id || !section){
                console.log("MISSING PARAMETERS");
                conn.release();
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
            conn.release();
            //console.log("Inserted "+rows.insertedId+" rows.");
            return rows;
        } catch (err){
            console.log(err);
        } finally {
            conn.release();
        }
    },
    async remove(student_id, course_id, block_id){
        try{
            conn = await pool.getConnection();
            /*if(!student_id || !course_id || !block_id){
                console.log("MISSING PARAMETERS");
                conn.release();
                return false;
            }*/
            let sql = 'DELETE FROM inscribed WHERE student_id = ? AND project_class_course_id = ? AND project_class_block = ?';
            values = [student_id, course_id, block_id]
            const rows = await conn.query(sql, values);
            conn.release();
            //console.log("Deleted "+rows.affectedRows+" rows.");
            return rows;
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    },
    async isClassFull(course_id, block_id){
        try{
            conn = await pool.getConnection()
            if(!course_id || !block_id){
                conn.release();
                return null;
            }
            sql = 'SELECT CASE WHEN (SELECT COUNT(student_id) AS num_students FROM inscribed WHERE project_class_course_id=? AND project_class_block=?)>course.max_students THEN "true" ELSE "false" END AS full FROM course WHERE course.id = ?'        
            //console.log(sql);
            let values = [course_id, block_id, course_id]
            const rows = await conn.query(sql, values);
            conn.release();
            if(rows.length>0){
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.log()
        } finally {
            conn.release();
        }
    },
    async read(student_id, course_id, block_id, section){
        try{
            conn = await pool.getConnection();
            if(!student_id || !course_id || !block_id || !section){
                console.log("MISSING PARAMETERS");
                conn.release();
                return null;
            }
            sql = 'SELECT student_id, project_class_course_id, project_class_block, section, pending FROM inscribed WHERE student_id = ? AND project_class_course_id = ? AND project_class_block = ? AND section = ?';
            let values = [student_id, course_id, block_id, section];    
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
}