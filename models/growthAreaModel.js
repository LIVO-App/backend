const pool = require('../utils/db.js');

module.exports = {
    async read(id){
        try {
            conn = await pool.getConnection();
            if(!id){
                conn.release()
                return false
            }
            sql = "SELECT id, italian_title, english_title, italian_description, english_description FROM personal_growth_area WHERE id = ?";
            const rows = await conn.query(sql, [id]);
            conn.release();
            if(rows.length == 1){
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.log("Something went wrong: read growth area");
        } finally {
            conn.release();
        }
    },
    async list(){
        try {
            conn = await pool.getConnection();
            sql = "SELECT id, italian_title, english_title, italian_description, english_description FROM personal_growth_area";
            const rows = await conn.query(sql);
            conn.release();
            return rows;
        } catch (err) {
            console.log("Something went wrong: list growth area");
        }
    }
}