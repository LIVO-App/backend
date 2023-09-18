const pool = require('../utils/db.js');

module.exports = {
    async read_from_course(course_id){
        try {
            conn = await pool.getConnection();
            if(course_id===undefined){
                conn.release();
                return null;
            }
            sql = "SELECT ass.teaching_id, tc.italian_title, tc.english_title FROM teaching AS tc JOIN associated AS ass ON ass.teaching_id = tc.id WHERE ass.course_id = ?;";
            const rows = await conn.query(sql, [course_id]);
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
    async add(course_id, teachings){
        try{
            conn = await pool.getConnection()
            if(!course_id || teachings.length==0){
                conn.release();
                return false;
            }
            let sql = 'INSERT INTO associated (course_id, teaching_id) VALUES '
            let values = []
            let inserted_teachings = []
            for(let i=0;i<teachings.length;i++){
                let finded_teaching = false
                for(let j=0;j<inserted_teachings.length;j++){
                    if(inserted_teachings[j]==teachings[i]){
                        finded_teaching = true
                    }
                }
                if(!finded_teaching){
                    sql += ' (?,?)'
                    values.push(course_id, teachings[i])
                    if(i<teachings.length-1){
                        sql += ','
                    }
                }
            }
            if(sql[sql.length-1]==","){
                sql = sql.slice(0,-1) // Remove the comma if the last teachers inserted are the ones that are replicated
            }
            const rows = await conn.query(sql, values)
            conn.release()
            return rows;
        } catch (err) {
            console.log(err)
        } finally {
            conn.release()
        }
    },
    async delete(course_id){
        try{
            conn = await pool.getConnection();
            let sql = 'DELETE FROM associated WHERE course_id=?';
            const rows = await conn.query(sql, [course_id])
            conn.release()
            return rows
        } catch (err) {
            console.log(err)
        } finally {
            conn.release()
        }
    },
    async is_present(course_id, teaching_id){
        try{
            conn = await pool.getConnection()
            if(!course_id || !teaching_id){
                conn.release()
                return null
            }
            let sql = 'SELECT * FROM associated WHERE course_id = ? AND teaching_id = ?'
            let values = [course_id, teaching_id]
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
    }
};