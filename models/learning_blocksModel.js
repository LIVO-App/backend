const pool = require('../utils/db.js');

module.exports = {
    /**
     * @param {String} id Is the real id of a block. If school_year is provided, it refers to the identification number of a block in that school year.
     * @param {String} school_year If not defined the method will search for a specific block with the id specified. If it is defined, the search will be done over the school year and consider id as the number of a block in that specific year
     */
    async read(id,school_year){
        try {
            conn = await pool.getConnection();
            if(!id){
                conn.release()
                return false
            }
            let sql = "SELECT id, number, school_year, start, end FROM learning_block WHERE ";
            let rows;
            if (school_year != undefined) {
                sql += "school_year = ? AND number = ?";
                rows = await conn.query(sql, [school_year, id]);
            } else {
                sql += "id = ?";
                rows = await conn.query(sql, id);
            }
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
    },
    async list(school_year, year_of, future_block = false){
        try {
            conn = await pool.getConnection();
            let sql = "SELECT id, number, school_year, start, end, num_groups FROM learning_block";
            let values = [];
            if (school_year != undefined) {
                sql += " WHERE school_year = ?";
                values.push(school_year)
                if(future_block){
                    sql += " AND start > NOW() AND DATEDIFF(start, NOW()) > 10"
                }
            } else if (year_of != undefined) {
                sql += " WHERE school_year IN (SELECT school_year FROM learning_block WHERE id = ?)";
                values.push(year_of)
                if(future_block){
                    sql += " AND start > NOW() AND DATEDIFF(start, NOW()) > 10"
                }
            } else if(future_block){
                sql += " WHERE start > NOW() AND DATEDIFF(start, NOW()) > 10"
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
    async list_from_list_of_courses(student_id, courses){
        try {
            conn = await pool.getConnection();
            if(courses==undefined || courses.length<1 || !student_id){
                conn.release();
                return null;
            }
            let sql = 'SELECT ins.project_class_course_id AS course, lb.id AS block FROM learning_block AS lb JOIN inscribed AS ins ON ins.project_class_block = lb.id WHERE ins.student_id = ?';
            let values = [student_id];
            for(let i=0; i<courses.length; i++){
                if(i==0){
                    sql += ' AND (';
                }
                sql += 'ins.project_class_course_id = ?';
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
            console.log(err)
        } finally {
            conn.release();
        }
    },
    async add(block_list){
        try {
            conn = await pool.getConnection()
            if(block_list==undefined || block_list.length == 0){
                conn.release()
                return false
            }
            let sql = 'INSERT INTO learning_block (number, school_year, start, end, num_groups) VALUES '
            let values = []
            let inserted_blocks = []
            for(let i = 0; i<block_list.length; i++){
                let finded_block = false
                let number = block_list[i].number
                let school_year = block_list[i].school_year
                let start_date = block_list[i].start_date
                let end_date = block_list[i].end_date
                let num_groups = block_list[i].num_groups
                for(let j=0;j<inserted_blocks.length;j=j+2){
                    if (number == inserted_blocks[j] && school_year == inserted_blocks[j+1]){
                        finded_block = true
                    }
                }
                if(!finded_block){
                    sql += ' (?,?,?,?,?)'
                    values.push(number, school_year, start_date, end_date, num_groups)
                    inserted_blocks.push(number, school_year)
                    if(i<block_list.length-1){
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
            console.log(err)
        } finally {
            conn.release()
        }
    },
    async delete(block_id){
        try {
            conn = await pool.getConnection()
            if(!block_id){
                conn.release()
                return null;
            }
            let sql = 'DELETE FROM learning_block WHERE id = ?'
            let values = [block_id]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log(err)
        } finally {
            conn.release()
        }
    },
    async update(block_id, block_info){
        try {
            conn = await pool.getConnection()
            if(block_id == undefined || block_info == undefined || Object.keys(block_info).length == 0){
                conn.release()
                return false
            }
            let sql = 'UPDATE learning_block SET'
            let values = []
            let start_date = block_info.start_date
            let end_date = block_info.end_date
            let num_groups = block_info.num_groups
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
                sql += ' num_groups = ?'
                values.push(num_groups)
            }
            if(sql[sql.length-1]==","){
                sql = sql.slice(0,-1);
            }
            sql += ' WHERE id = ?'
            values.push(block_id)
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