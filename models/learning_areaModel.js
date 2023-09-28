const pool = require('../utils/db.js');

module.exports = {
    async read(id){
        try {
            conn = await pool.getConnection();
            if(!id){
                conn.release()
                return false
            }
            sql = "SELECT id, italian_title, english_title, italian_description, english_description FROM learning_area WHERE id = ?";
            const rows = await conn.query(sql, [id]);
            conn.release();
            if(rows.length == 1){
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.log("Something went wrong: read learning area");
        } finally {
            conn.release();
        }
    },
    async list(){
        try {
            conn = await pool.getConnection();
            sql = "SELECT id, italian_title, english_title, italian_description, english_description FROM learning_area";
            const rows = await conn.query(sql);
            conn.release();
            return rows;
        } catch (err) {
            console.log("Something went wrong: list learning areas");
        } finally {
            conn.release()
        }
    },
    /**
     * 
     * @param {String} session_id If not provided it will return all the learning areas
     * @param {Boolean} all_data If true, all data of learning_areas are provided, otherwise only the id will be
     */
    async read_from_sessions(session_id,all_data = false,credits = false) {
        try {
            conn = await pool.getConnection();
            sql = "SELECT la.id";
            if (all_data) {
                sql += ", la.italian_title, la.english_title, la.italian_description, la.english_description";
            }
            if (credits) {
                sql += ", l.credits";
            }
            sql += " FROM limited AS l INNER JOIN learning_area AS la ON l.learning_area_id = la.id WHERE learning_session_id= ? GROUP BY la.id";
            const rows = await conn.query(sql, [session_id]);
            conn.release();
            return rows;
        } catch (err) {
            console.log("Something went wrong: read learning areas from session");
        } finally {
            conn.release();
        }
    },
    async list_personal_available_areas(session_id, all_data){
        try {
            conn = await pool.getConnection();
            sql = "SELECT la.id";
            if (all_data) {
                sql += ", la.italian_title, la.english_title, la.italian_description, la.english_description";
            }
            sql += " FROM learning_area AS la WHERE la.id IN (SELECT DISTINCT c.learning_area_id FROM course AS c JOIN `accessible` AS ac ON c.id = ac.course_id JOIN project_class AS pc ON c.id = pc.course_id LEFT JOIN limited AS l ON la.id = l.learning_area_id WHERE ac.learning_context_id = 'PER' AND pc.learning_session_id = ?) GROUP BY la.id;"
            let values = [session_id]
            const rows = await conn.query(sql, values);
            console.log(sql)
            conn.release();
            return rows;
        } catch (err) {
            console.log(err)
            console.log("Something went wrong: list learning areas");
        } finally {
            conn.release()
        }
    }
};