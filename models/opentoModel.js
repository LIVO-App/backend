const pool = require('../utils/db.js');

module.exports = {
    async read_from_course(course_id){
        try {
            conn = await pool.getConnection();
            if(course_id===undefined){
                conn.release();
                return null;
            }
            sql = "SELECT acc.study_year_id, acc.study_address_id, sa.italian_title, sa.english_title, acc.presidium, acc.main_study_year, acc.learning_context_id FROM `accessible` AS acc JOIN study_address AS sa ON sa.id=acc.study_address_id WHERE acc.course_id = ?";
            const rows = await conn.query(sql, course_id);
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
    async add(course_id, access_object){
        try {
            let conn = await pool.getConnection()
            // If access_object has no keys it means it does not have any context selected
            if(Object.keys(access_object).length==0 || !course_id){
                conn.release();
                return false
            }
            // If each element of access_object has a size of 0 it means it has no classes, meaning that a context was selected, but no classes was assigned to it
            let study_year, study_address, presidium, main_study_year;
            let sql = 'INSERT INTO `accessible` (course_id, study_year_id, study_address_id, presidium, main_study_year, learning_context_id) VALUES ';
            let values = []
            for(const [key, value] of Object.entries(access_object)){
                // key is the learning context for which we want to add the course
                // Value is instead a collection of data related to the classes. It's an array of classes, each element of the array contain the informations we need    
                if(value.length==0){
                    conn.release()
                    return false
                }
                for(let i=0;i<value.length;i++){
                    if(Object.keys(value[i]).length==0){
                        conn.release()
                        return false
                    }
                    if(value[i].study_year!=undefined || value[i].study_address!=undefined || value[i].presidium!=undefined || value[i].main_study_year!=undefined){
                        conn.release()
                        return false
                    }
                    context_id = key
                    study_year = value[i].study_year;
                    study_address = value[i].study_address;
                    presidium = value[i].presidium;
                    main_study_year = value[i].main_study_year;
                    sql += ' (?,?,?,?,?,?)'
                    values.push(course_id, study_year, study_address, presidium, main_study_year, context_id)
                    if(i<value.length-1){
                        sql += ',';
                    }
                }
                if(key!=Object.keys(access_object)[Object.keys(access_object).length-1]){
                    sql += ',';
                }
            }
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