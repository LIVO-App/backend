const pool = require('../utils/db.js');

module.exports = {
    async get_annual_constraints(student_id, school_year){
        try {
            conn = await pool.getConnection();
            if(!student_id || !school_year){
                conn.release()
                return false
            }
            sql = "SELECT DISTINCT l.learning_area_id, l.learning_context_id FROM limited AS l JOIN attend AS att ON att.ordinary_class_study_year = l.ordinary_class_study_year AND att.ordinary_class_address = l.ordinary_class_address AND att.ordinary_class_school_year = l.ordinary_class_school_year WHERE att.student_id = ? AND att.ordinary_class_school_year = ?;";
            let values = [student_id, school_year]
            const rows = await conn.query(sql,values);
            conn.release();
            if (rows.length>1){
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
    async get_constraints(block_id, year_of = false, context_id, area_id, study_year, study_address){
        try {
            conn = await pool.getConnection()
            let sql = 'SELECT l.id, l.learning_block_id, l.ordinary_class_study_year, l.ordinary_class_address, l.ordinary_class_school_year, l.learning_area_id, l.learning_context_id, l.credits FROM limited AS l'
            let values = []
            if(block_id!=undefined || context_id!=undefined || area_id!=undefined || study_year!=undefined || study_address!=undefined){
                sql += ' WHERE'
                if(block_id!=undefined){
                    sql += ' l.learning_block_id '
                    if(year_of){
                        sql += 'IN (SELECT lb.id FROM learning_block AS lb WHERE lb.school_year = (SELECT lb1.school_year FROM learning_block AS lb1 WHERE lb1.id = ?))'
                        values.push(block_id)
                    } else {
                        sql += '= ?'
                        values.push(block_id)
                    }
                }
                if(context_id!=undefined){
                    if(sql.slice(-5) == "WHERE"){
                        sql += ' l.learning_context_id '
                    } else {
                        sql += ' AND l.learning_context_id '
                    }
                    sql += ' = ?'
                    values.push(context_id)
                }
                if(area_id!=undefined){
                    if(context_id=="SPE"){
                        if(sql.slice(-5) == "WHERE"){
                            sql += ' l.learning_area_id '
                        } else {
                            sql += ' AND l.learning_area_id '
                        }
                        sql += ' = ?'
                        values.push(area_id)
                    }
                }
                if(study_address!=undefined && study_year != undefined){
                    if(sql.slice(-5) == "WHERE"){
                        sql += ' l.ordinary_class_study_year = ? AND l.ordinary_class_address = ? AND l.ordinary_class_school_year IN (SELECT lb.school_year FROM learning_block AS lb WHERE lb.id = ?) '
                    } else {
                        sql += ' AND l.ordinary_class_study_year = ? AND l.ordinary_class_address = ? AND l.ordinary_class_school_year IN (SELECT lb.school_year FROM learning_block AS lb WHERE lb.id = ?)'
                    }
                    values.push(study_year, study_address, block_id)
                } else {
                    if(study_address==undefined ^ study_year == undefined){
                        conn.release()
                        return false
                    }
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
    },
    async add_block_constraints(constraints_object){
        try {
            conn = await pool.getConnection();
            if(Object.keys(constraints_object).length==0 || constraints_object == undefined){
                conn.release()
                return false
            }
            let sql = 'INSERT INTO limited (learning_block_id, ordinary_class_study_year, ordinary_class_address, ordinary_class_school_year, learning_area_id, learning_context_id, credits) VALUES ';
            let values = []
            let rows;
            let context_id, area_id, credits;
            for (let block_id in constraints_object){
                if(constraints_object[block_id].length==0){
                    conn.release()
                    return false
                }
                constraints_per_block = []
                for(let index=0; index<constraints_object[block_id].length; index++){
                    if(Object.keys(constraints_object[block_id][index]).length==0){
                        conn.release()
                        return false
                    }
                    if(constraints_object[block_id][index].context_id == undefined || constraints_object[block_id][index].credits == undefined){
                        conn.release()
                        return false
                    }
                    context_id = constraints_object[block_id][index].context_id
                    area_id = constraints_object[block_id][index].area_id == undefined ? null : constraints_object[block_id][index].area_id
                    credits = constraints_object[block_id][index].credits
                    let sql1 = 'SELECT school_year FROM learning_block WHERE id = ?'
                    rows = await conn.query(sql1, block_id)
                    school_year = rows[0].school_year;
                    classes = constraints_object[block_id][index].classes;
                    let finded_year, finded_address, finded_context, finded_area = false;
                    for(let j=0; j<classes.length;j++){
                        study_year = classes[j].study_year
                        study_address = classes[j].study_address
                        for(let k=0; k<constraints_per_block;k+4){
                            if(constraints_per_block[k]==context_id){
                                finded_context = true
                            }
                            if(constraints_per_block[k+1]==study_year){
                                finded_year = true
                            }
                            if(constraints_per_block[k+2]==study_address){
                                finded_address = true
                            }
                            if(constraints_per_block[k+3]==area_id){
                                finded_area
                            }
                            if(!finded_year || !finded_address || !finded_context || !finded_area){
                                finded_year = false
                                finded_address = false
                                finded_context = false
                                finded_area = false
                            }
                        }
                        if(!finded_year && !finded_address && !finded_context && !finded_area){
                            sql += ' (?,?,?,?,?,?,?)'
                            values.push(block_id, study_year, study_address, school_year, area_id, context_id, credits)
                            constraints_per_block.push(context_id, study_year, study_address, area_id)
                            if(j<classes.length-1){
                                sql += ',';
                            }
                        }
                    }
                    if(index<constraints_object[block_id].length-1){
                        sql += ',';
                    }
                }
                if(block_id!=Object.keys(constraints_object)[Object.keys(constraints_object).length-1]){
                    sql += ',';
                }
            }
            if(sql[sql.length-1]==','){
                sql = sql.slice(0,-1);
            }
            rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log(err)
        } finally {
            conn.release()
        }
    },
    async is_present(context_id, study_year, study_address, area_id, block_id){
        try {
            conn = await pool.getConnection()
            let sql1 = 'SELECT school_year FROM learning_block WHERE id = ?'
            let rows = await conn.query(sql1, block_id)
            let school_year = rows[0].school_year
            let sql = 'SELECT * FROM limited AS l WHERE l.learning_context_id = ? AND l.ordinary_class_study_year = ? AND l.ordinary_class_address = ? AND l.learning_block_id = ? AND l.ordinary_class_school_year = ?'
            let values = [context_id, study_year, study_address, block_id, school_year]
            if(area_id!=undefined || area_id!=null){
                sql += ' AND l.learning_area_id = ?'
                values.push(area_id)
            }
            rows = await conn.query(sql, values)
            conn.release()
            if(rows.length>0){
                return true
            } else {
                return false
            }
        } catch (err) {
            console.log(err)
        } finally {
            conn.release()
        }
    },
    async get_constraint_sum(school_year) {
        try {
            conn = await pool.getConnection()
            let sql = 'SELECT l.ordinary_class_study_year, l.ordinary_class_address, l.ordinary_class_school_year, l.learning_area_id, l.learning_context_id, SUM(credits) AS total_credits FROM limited AS l WHERE l.ordinary_class_school_year = ? GROUP BY l.ordinary_class_study_year, l.ordinary_class_address, l.ordinary_class_school_year, l.learning_area_id, l.learning_context_id'
            let values = [school_year]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log(err);
        } finally {
            conn.release()
        }
    }/*,
    async is_annual_constraint_present(context_id, study_year, study_address, area_id, school_year){
        try{
            conn = await pool.getConnection()
            let sql = 'SELECT co.id FROM constraints AS co WHERE co.annual_credits_study_year = ? AND co.annual_credits_address = ? AND co.annual_credits_definition_year = ? AND co.learning_context_id = ?'
            let values = [study_year, study_address, school_year, context_id]
            if(area_id!=undefined || area_id != null){
                sql += ' AND co.learning_area_id = ?'
                values.push(area_id)
            }
            const rows = await conn.query(sql, values)
            if(rows.length>0){
                return {result: true, id: rows[0].id}
            } else {
                return {result: false}
            }
        } catch (err) {
            console.log(err);
        } finally {
            conn.release()
        }
    },
    async update_annual_constraint(constr_id, num_credits){
        try {
            conn = await pool.getConnection()
            let sql = 'UPDATE constraints SET credits = ? WHERE id = ?'
            let values = [num_credits, constr_id]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows;
        } catch (err){
            console.log(err)
        } finally {
            conn.release()
        }
    },
    async insert_annual_constraint(study_year, study_address, school_year, area_id, context_id, num_credits){
        try {
            conn = await pool.getConnection()
            area_id = area_id == "undefined" ? null : area_id 
            let sql = 'INSERT INTO constraints (annual_credits_study_year, annual_credits_address, annual_credits_definition_year, learning_area_id, learning_context_id, credits) VALUES (?,?,?,?,?,?)'
            let values = [study_year, study_address, school_year, area_id, context_id, num_credits]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows;
        } catch (err){
            console.log(err)
        } finally {
            conn.release()
        }
    },
    async annual_credits_model_exists(study_year, study_address, school_year){
        try {
            conn = await pool.getConnection()
            let sql = 'SELECT * FROM annual_credits WHERE study_year_id = ? AND study_address_id = ? AND definition_year = ?'
            let values = [study_year, study_address, school_year]
            const rows = await conn.query(sql, values)
            conn.release()
            if(rows.length>0){
                return true
            } else {
                return false
            }
        } catch (err){
            console.log(err)
        } finally {
            conn.release()
        }
    },
    async annual_credits_definition(study_year, study_address, school_year){
        try {
            conn = await pool.getConnection()
            let sql = 'INSERT INTO annual_credits (study_year_id, study_address_id, definition_year) VALUES (?,?,?)'
            let values = [study_year, study_address, school_year]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows;
        } catch (err){
            console.log(err)
        } finally {
            conn.release()
        }
    }*/
}