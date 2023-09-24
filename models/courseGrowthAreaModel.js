const pool = require('../utils/db.js');

module.exports = {
    async read_from_course(course_id){
        try {
            conn = await pool.getConnection();
            if(course_id===undefined){
                conn.release();
                return null;
            }
            sql = "SELECT ch.growth_area_id, pga.italian_title, pga.english_title, pga.italian_description, pga.english_description FROM characterize AS ch JOIN personal_growth_area AS pga ON ch.growth_area_id = pga.id WHERE ch.course_id = ?";
            const rows = await conn.query(sql, [course_id]);
            conn.release();
            if(rows.length!=0){
                return rows;
            } else {
                return false;
            } 
        } catch (err) {
            console.log("Something went wrong: read growth area associated to course");
        } finally {
            conn.release();
        }
    },
    async add(course_id, growth_areas){
        try{
            conn = await pool.getConnection()
            if(!course_id || growth_areas.length==0){
                conn.release();
                return false;
            }
            let sql = 'INSERT INTO characterize (course_id, growth_area_id) VALUES '
            let values = []
            let inserted_growth_area = []
            for(let i=0;i<growth_areas.length;i++){
                let finded_area = false
                for(let j=0;j<inserted_growth_area.length;j++){
                    if(inserted_growth_area[j]==growth_areas[i]){
                        finded_area = true
                    }
                }
                if(!finded_area){
                    sql += ' (?,?)'
                    values.push(course_id, growth_areas[i])
                    if(i<growth_areas.length-1){
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
            console.log("Something went wrong: add growth area to course")
        } finally {
            conn.release()
        }
    },
    async delete(course_id){
        try{
            conn = await pool.getConnection();
            let sql = 'DELETE FROM characterize WHERE course_id=?';
            const rows = await conn.query(sql, [course_id])
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: remove growth area from course")
        } finally {
            conn.release()
        }
    },
    async is_present(course_id, growth_area_id){
        try{
            conn = await pool.getConnection()
            if(!course_id || !growth_area_id){
                conn.release()
                return null
            }
            let sql = 'SELECT * FROM characterize WHERE course_id = ? AND growth_area_id = ?'
            let values = [course_id, growth_area_id]
            const rows = await conn.query(sql, values)
            if(rows.length==1){
                return true
            } else {
                return false
            }
        } catch (err) {
            console.log("Something went wrong: exists growth area connected")
        } finally {
            conn.release()
        }
    }
}