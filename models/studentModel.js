pool = require('../utils/db.js');
module.exports = {
    async list() {
        try{
            conn = await pool.getConnection();
            sql = `SELECT cf, username, name, surname, gender, birth_date, address FROM student`;
            console.log(sql);
            const rows = await conn.query(sql);
            //console.log("rows");
            conn.end();
            //console.log("end");
            return rows;
        } catch (err) {
            console.log(err);
        }
    }
};