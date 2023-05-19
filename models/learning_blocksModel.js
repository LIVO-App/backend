const pool = require('../utils/db.js');

module.exports = {
    /**
     * @param {String} id Is the real id of a block. If school_year is provided, it refers to the identification number of a block in that school year.
     * @param {String} school_year If not defined the method will search for a specific block with the id specified. If it is defined, the search will be done over the school year and consider id as the number of a block in that specific year
     */
    async read(id,school_year){
        try {
            conn = await pool.getConnection();
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
    async list(school_year, year_of){
        try {
            conn = await pool.getConnection();
            let sql = "SELECT id, number, school_year, start, end FROM learning_block";
            let rows;
            if (school_year != undefined) {
                sql += " WHERE school_year = ?";
                rows = await conn.query(sql,school_year);
            } else if (year_of != undefined) {
                sql += " WHERE school_year IN (SELECT school_year FROM learning_block WHERE id = ?)";
                rows = await conn.query(sql,year_of);
            } else{
                rows = await conn.query(sql);
            }
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    }
};