const pool = require('../utils/db.js');

module.exports = {
    async read(id,school_year){
        try {
            conn = await pool.getConnection();
            let sql = "SELECT id, number, school_year, start, end FROM learning_block WHERE ";
            let rows;
            if (school_year != undefined) {
                sql += "school_year = ? AND number = ?";
                rows = await conn.query(sql, [school_year, id]);
            } else if (id != undefined) {
                sql += "id = ?";
                rows = await conn.query(sql, id);
            } else {
                throw Error("Missing Parameters");
            }
            conn.end();
            if(rows.length == 1){
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
        }
    },
    async list(school_year){
        try {
            conn = await pool.getConnection();
            let sql = "SELECT id, number, school_year, start, end FROM learning_block";
            let rows;
            if (school_year != undefined) {
                sql += " WHERE school_year = ?";
                rows = await conn.query(sql,school_year);
            } else {
                rows = await conn.query(sql);
            }
            conn.end();
            return rows;
        } catch (err) {
            console.log(err);
        }
    }
};