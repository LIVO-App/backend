const pool = require('../utils/db.js');

module.exports = {
    /**
     * @param {String} id Is the real id of a session. If school_year is provided, it refers to the identification number of a session in that school year.
     * @param {String} school_year If not defined the method will search for a specific session with the id specified. If it is defined, the search will be done over the school year and consider id as the number of a session in that specific year
     */
    async read(id,school_year){
        try {
            conn = await pool.getConnection();
            if(!id){
                conn.release()
                return false
            }
            let sql = "SELECT id, number, school_year, start, end, num_groups, open_day FROM learning_session WHERE ";
            let rows;
            if (school_year != undefined) {
                sql += "school_year = ? AND number = ?";
                rows = await conn.query(sql, [school_year, id]);
            } else {
                sql += "id = ?";
                rows = await conn.query(sql, [id]);
            }
            conn.release();
            if(rows.length == 1){
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.log("Something went wrong: read learning session");
        } finally {
            conn.release();
        }
    },
    async list(school_year, year_of, future_session = false){
        try {
            conn = await pool.getConnection();
            let sql = "SELECT id, number, school_year, start, end, num_groups, open_day FROM learning_session";
            let values = [];
            if (school_year != undefined) {
                sql += " WHERE school_year = ?";
                values.push(school_year)
                if(future_session){
                    sql += " AND start > NOW() AND DATEDIFF(start, NOW()) > 10"
                }
            } else if (year_of != undefined) {
                sql += " WHERE school_year IN (SELECT school_year FROM learning_session WHERE id = ?)";
                values.push(year_of)
                if(future_session){
                    sql += " AND start > NOW() AND DATEDIFF(start, NOW()) > 10"
                }
            } else if(future_session){
                sql += " WHERE start > NOW() AND DATEDIFF(start, NOW()) > 10"
            }
            const rows = await conn.query(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log("Something went wrong: list learning session");
        } finally {
            conn.release();
        }
    },
    async list_from_list_of_courses(student_id, courses){
        try {
            conn = await pool.getConnection();
            if(courses==undefined || courses.length<1 || !student_id){
                conn.release();
                return null;
            }
            let sql = 'SELECT subs.project_class_course_id AS course, ls.id AS session FROM learning_session AS ls JOIN subscribed AS subs ON subs.project_class_session = ls.id WHERE subs.student_id = ?';
            let values = [student_id];
            for(let i=0; i<courses.length; i++){
                if(i==0){
                    sql += ' AND (';
                }
                sql += 'subs.project_class_course_id = ?';
                values.push(courses[i]);
                if(i<courses.length-1){
                    sql += ' OR ';
                }
            }
            sql += ')';
            const rows = await conn.query(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log("Something went wrong: list learning session")
        } finally {
            conn.release();
        }
    },
    async add(session_list){
        try {
            conn = await pool.getConnection()
            if(session_list==undefined || session_list.length == 0){
                conn.release()
                return false
            }
            let sql = 'INSERT INTO learning_session (number, school_year, start, end, num_groups, open_day) VALUES '
            let values = []
            let inserted_sessions = []
            for(let i = 0; i<session_list.length; i++){
                let finded_session = false
                let number = session_list[i].number
                let school_year = session_list[i].school_year
                let start_date = session_list[i].start_date
                let end_date = session_list[i].end_date
                let num_groups = session_list[i].num_groups
                let open_day = session_list[i].open_day
                for(let j=0;j<inserted_sessions.length;j=j+2){
                    if (number == inserted_sessions[j] && school_year == inserted_sessions[j+1]){
                        finded_session = true
                    }
                }
                if(!finded_session){
                    sql += ' (?,?,?,?,?,?)'
                    values.push(number, school_year, start_date, end_date, num_groups, open_day)
                    inserted_sessions.push(number, school_year)
                    if(i<session_list.length-1){
                        sql += ','
                    }
                }
            }
            if(sql[sql.length-1]==','){
                sql = sql.slice(0,-1);
            }
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: insert learning session")
        } finally {
            conn.release()
        }
    },
    async delete(session_id){
        try {
            conn = await pool.getConnection()
            if(!session_id){
                conn.release()
                return null;
            }
            let sql = 'DELETE FROM learning_session WHERE id = ?'
            let values = [session_id]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: delete learning session")
        } finally {
            conn.release()
        }
    },
    async update(session_id, session_info){
        try {
            conn = await pool.getConnection()
            if(session_id == undefined || session_info == undefined || Object.keys(session_info).length == 0){
                conn.release()
                return false
            }
            let sql = 'UPDATE learning_session SET'
            let values = []
            let start_date = session_info.start_date
            let end_date = session_info.end_date
            let num_groups = session_info.num_groups
            let open_day = session_info.open_day
            if(start_date == "" && end_date == "" && num_groups == ""){
                conn.release()
                return false
            }
            if(start_date!=undefined && start_date!=""){
                sql += ' start = ?,'
                values.push(start_date)
            }
            if(end_date!=undefined && end_date!=""){
                sql += ' end = ?,'
                values.push(end_date)
            }
            if(num_groups!=undefined && num_groups!=""){
                sql += ' num_groups = ?,'
                values.push(num_groups)
            }
            if(open_day!=undefined){
                sql += ' open_day = ?'
                values.push(open_day)
            }
            if(sql[sql.length-1]==","){
                sql = sql.slice(0,-1);
            }
            sql += ' WHERE id = ?'
            values.push(session_id)
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: update learning session")
        } finally {
            conn.release()
        }
    },
    async list_of_years(){
        try {
            conn = await pool.getConnection()
            let sql = 'SELECT DISTINCT ls.school_year FROM learning_session AS ls'
            const rows = await conn.query(sql)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: list years from learning session")
        } finally {
            conn.release()
        }
    }
};