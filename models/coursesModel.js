const pool = require('../utils/db.js');

module.exports = {
    async read(id, admin=false){
        try {
            conn = await pool.getConnection();
            if(!id){
                conn.release();
                return false;
            }
            sql = 'SELECT DISTINCT c.id, c.italian_title, c.english_title, c.creation_school_year, c.italian_description, c.english_description, c.up_hours, c.credits, c.italian_expected_learning_results, c.english_expected_learning_results, c.italian_criterions, c.english_criterions, c.italian_activities, c.english_activities, la.italian_title  AS "learning_area_ita",la.english_title  AS "learning_area_eng",pga.italian_title AS "growth_area_ita",pga.english_title AS "growth_area_eng",c.min_students, c.max_students, c.proposer_teacher_id, t.name AS "teacher_name", t.surname AS "teacher_surname", c.certifying_admin_id, ad.name AS "admin_name", ad.surname AS "admin_surname", c.admin_confirmation FROM course AS c JOIN learning_area AS la ON c.learning_area_id = la.id JOIN personal_growth_area AS pga ON c.growth_area_id = pga.id JOIN teacher AS t ON t.id = c.proposer_teacher_id ';
            if(admin){
                sql += 'LEFT ';
            }
            sql += 'JOIN admin as ad ON ad.id = c.certifying_admin_id WHERE c.id = ?';
            const rows = await conn.query(sql, id);
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
    async list(student_id, learn_area_id, block_id, context_id, alone=false){
        try {
            //console.log(learn_area_id);
            conn = await pool.getConnection();
            let sql = `SELECT c.id, CASE WHEN pc.italian_displayed_name IS NULL THEN c.italian_title ELSE pc.italian_displayed_name END AS 'italian_title', CASE WHEN pc.english_displayed_name IS NULL THEN c.english_title ELSE pc.english_displayed_name END AS 'english_title', c.credits, c.learning_area_id, pc.group`;
            if(student_id != undefined){
                sql += `, CASE WHEN c.id IN (SELECT c.id FROM course AS c INNER JOIN project_class AS pc ON c.id = pc.course_id INNER JOIN inscribed AS ins ON pc.course_id = ins.project_class_course_id AND pc.learning_block_id = ins.project_class_block WHERE `;
                if(learn_area_id != undefined && block_id != undefined && context_id != undefined){
                    sql += `learning_block_id = ${block_id} AND c.learning_area_id = \'${learn_area_id}\' AND ins.learning_context_id=\'${context_id}\' AND `;
                } else if (learn_area_id != undefined && context_id != undefined) {
                    sql += `c.learning_area_id = \'${learn_area_id}\' AND ins.learning_context_id=\'${context_id}\' AND `;
                } else if (block_id != undefined && context_id != undefined) {
                    sql += `learning_block_id = ${block_id} AND ins.learning_context_id=\'${context_id}\' AND `;
                } else if (context_id != undefined){
                    sql += `ins.learning_context_id=\'${context_id}\' AND `;
                } else if (block_id != undefined){
                    sql += `learning_block_id = ${block_id} AND `
                }
                sql += `ins.student_id = ${student_id}) AND (SELECT ins.pending FROM inscribed AS ins WHERE  ins.project_class_course_id = c.id AND ins.student_id = ${student_id} AND ins.project_class_block = pc.learning_block_id `;
                if(context_id != undefined){
                    sql += ` AND ins.learning_context_id=\'${context_id}\'`;
                }
                sql += `) IS NULL THEN \"true\" WHEN c.id IN (SELECT c.id FROM course AS c LEFT JOIN project_class AS pc ON c.id = pc.course_id LEFT JOIN inscribed AS ins ON pc.course_id = ins.project_class_course_id AND pc.learning_block_id = ins.project_class_block WHERE `;
                if(learn_area_id != undefined && block_id != undefined && context_id != undefined){
                    sql += `learning_block_id = ${block_id} AND c.learning_area_id = \'${learn_area_id}\' AND ins.learning_context_id=\'${context_id}\' AND `;
                } else if (learn_area_id != undefined && context_id != undefined) {
                    sql += `c.learning_area_id = \'${learn_area_id}\' AND ins.learning_context_id=\'${context_id}\' AND `;
                } else if (block_id != undefined && context_id != undefined) {
                    sql += `learning_block_id = ${block_id} AND ins.learning_context_id=\'${context_id}\' AND `;
                } else if (context_id != undefined){
                    sql += `ins.learning_context_id=\'${context_id}\' AND `;
                } else if (block_id != undefined){
                    sql += `learning_block_id = ${block_id} AND `
                }
                sql += `ins.student_id = ${student_id}) AND (SELECT ins.pending FROM inscribed AS ins WHERE ins.project_class_course_id = c.id AND ins.student_id = ${student_id} AND ins.project_class_block = pc.learning_block_id `;
                if(context_id != undefined){
                    sql += ` AND ins.learning_context_id=\'${context_id}\'`
                }
                sql += `) IS NOT NULL THEN (SELECT ins.pending FROM inscribed AS ins WHERE ins.project_class_course_id = c.id AND ins.student_id = ${student_id} AND ins.project_class_block = pc.learning_block_id`
                if(context_id != undefined){
                    sql += ` AND ins.learning_context_id=\'${context_id}\'`
                }
                sql += `) ELSE \"false\" end AS inscribed`;
                if (block_id!=undefined) {
                    sql += `, (SELECT section FROM inscribed WHERE project_class_course_id = c.id AND student_id = ${student_id} AND project_class_block = ${block_id}`
                    if(context_id!=undefined){
                        sql += ` AND learning_context_id=\'${context_id}\'`;
                    }
                    sql +=`) AS section`;
                }
            }
            sql += ` FROM course AS c `
            if(alone){
                sql += `LEFT `
            }
            sql += `JOIN project_class AS pc ON c.id = pc.course_id JOIN learning_area AS la ON c.learning_area_id = la.id JOIN personal_growth_area AS pga ON c.growth_area_id = pga.id `;
            if(alone){
                sql += `LEFT `
            }
            sql += `JOIN learning_block AS lb ON lb.id = pc.learning_block_id `;
            if(learn_area_id != undefined && block_id != undefined){
                sql += `WHERE pc.learning_block_id = ${block_id} AND c.learning_area_id = \'${learn_area_id}\'`;
                if(student_id != undefined) {
                    sql += ` AND c.id IN (SELECT ac.course_id FROM \`accessible\` AS ac WHERE ac.study_year_id IN (SELECT att.ordinary_class_study_year FROM attend AS att WHERE att.student_id = ${student_id} AND att.ordinary_class_school_year = lb.school_year) AND ac.study_address_id IN (SELECT att.ordinary_class_address FROM attend AS att WHERE att.student_id = ${student_id} AND att.ordinary_class_school_year = lb.school_year)`;
                    if(context_id != undefined){
                        sql += ` AND ac.learning_context_id=\'${context_id}\'`
                    }
                    sql += `) AND c.certifying_admin_id IS NOT NULL`;
                }
            } else if (learn_area_id != undefined) {
                sql += `WHERE c.learning_area_id = \'${learn_area_id}\'`;
                if(student_id != undefined) {
                    sql += ` AND c.id IN (SELECT ac.course_id FROM \`accessible\` AS ac WHERE ac.study_year_id IN (SELECT att.ordinary_class_study_year FROM attend AS att WHERE att.student_id = ${student_id} AND att.ordinary_class_school_year = lb.school_year) AND ac.study_address_id IN (SELECT att.ordinary_class_address FROM attend AS att WHERE att.student_id = ${student_id} AND att.ordinary_class_school_year = lb.school_year)`;
                    if(context_id != undefined){
                        sql += ` AND ac.learning_context_id=\'${context_id}\'`
                    }
                    sql += `) AND c.certifying_admin_id IS NOT NULL`;
                }
            } else if (block_id != undefined) {
                sql += `WHERE pc.learning_block_id = ${block_id}`;
                if(student_id != undefined) {
                    sql += ` AND c.id IN (SELECT ac.course_id FROM \`accessible\` AS ac WHERE ac.study_year_id IN (SELECT att.ordinary_class_study_year FROM attend AS att WHERE att.student_id = ${student_id} AND att.ordinary_class_school_year = lb.school_year) AND ac.study_address_id IN (SELECT att.ordinary_class_address FROM attend AS att WHERE att.student_id = ${student_id} AND att.ordinary_class_school_year = lb.school_year)`;
                    if(context_id != undefined){
                        sql += ` AND ac.learning_context_id=\'${context_id}\'`
                    }
                    sql += `) AND c.certifying_admin_id IS NOT NULL`;
                }
            } else if(student_id != undefined) {
                sql += ` WHERE c.id IN (SELECT ac.course_id FROM \`accessible\` AS ac WHERE ac.study_year_id IN (SELECT att.ordinary_class_study_year FROM attend AS att WHERE att.student_id = ${student_id} AND att.ordinary_class_school_year = lb.school_year) AND ac.study_address_id IN (SELECT att.ordinary_class_address FROM attend AS att WHERE att.student_id = ${student_id} AND att.ordinary_class_school_year = lb.school_year)`;
                if(context_id != undefined){
                    sql += ` AND ac.learning_context_id=\'${context_id}\'`
                }
                sql += `) AND c.certifying_admin_id IS NOT NULL`;
            }
            sql += ` ORDER BY c.id`;
            //console.log(sql);
            const rows = await conn.query(sql);
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
    async curriculum(student_id, school_year, context_id, teacher_id){
        try {
            conn = await pool.getConnection();
            if(!student_id || !school_year){
                conn.release();
                return false;
            }
            sql = `SELECT DISTINCT c.id AS course_id, CASE WHEN pc.italian_displayed_name IS NULL THEN c.italian_title ELSE pc.italian_displayed_name END AS 'italian_title', CASE WHEN pc.english_displayed_name IS NULL THEN c.english_title ELSE pc.english_displayed_name END AS 'english_title', i.section, c.credits, c.learning_area_id, i.learning_context_id, (SELECT g.grade FROM grade as g WHERE g.student_id = ${student_id} AND g.project_class_course_id = pc.course_id AND g.project_class_block = pc.learning_block_id AND g.final = 1) AS final_grade, CASE WHEN pc.learning_block_id IN (SELECT lb1.id FROM learning_block AS lb1 WHERE lb1.start>CURRENT_DATE()) THEN 1 ELSE 0 END AS future_course FROM student AS s JOIN inscribed as i ON s.id = i.student_id JOIN project_class AS pc ON i.project_class_course_id = pc.course_id AND i.project_class_block = pc.learning_block_id JOIN course AS c ON pc.course_id = c.id JOIN learning_block AS lb ON pc.learning_block_id = lb.id LEFT JOIN grade AS g ON pc.course_id = g.project_class_course_id AND pc.learning_block_id = g.project_class_block WHERE s.id = ${student_id} AND lb.school_year=${school_year} AND i.pending IS NULL`
            if(context_id!=undefined){
                sql += ` AND i.learning_context_id = \'${context_id}\'`;
            }
            if(teacher_id!=undefined){
                sql += ` AND c.id IN (SELECT DISTINCT c.id FROM course AS c JOIN project_class AS pc ON c.id = pc.course_id JOIN inscribed AS ins ON pc.course_id = ins.project_class_course_id AND pc.learning_block_id = ins.project_class_block JOIN associated AS ass ON c.id = ass.course_id WHERE ins.student_id IN (SELECT s.id FROM student AS s JOIN attend AS att ON s.id = att.student_id WHERE att.ordinary_class_study_year IN (SELECT ot.ordinary_class_study_year FROM ordinary_teach AS ot WHERE ot.teacher_id = ${teacher_id}) AND att.ordinary_class_address IN (SELECT ot.ordinary_class_address FROM ordinary_teach AS ot WHERE ot.teacher_id = ${teacher_id})) AND pc.learning_block_id IN (SELECT lb.id FROM learning_block AS lb WHERE lb.school_year = ${school_year}) AND ass.teaching_id IN (SELECT ot.teaching_id FROM ordinary_teach AS ot WHERE ot.teacher_id = ${teacher_id}) UNION SELECT c.id FROM course AS c JOIN project_teach AS pt ON c.id = pt.project_class_course_id JOIN associated AS ass ON ass.course_id = c.id WHERE pt.teacher_id = ${teacher_id} AND pt.project_class_block IN (SELECT lb.id FROM learning_block AS lb WHERE lb.school_year = ${school_year}))`;
            }
            const rows = await conn.query(sql);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
        } finally {
            conn.release();
        }
    },
    async read_learning_area(course_id){
        try{
            conn = await pool.getConnection();
            sql = `SELECT c.learning_area_id, c.credits FROM course as c WHERE c.id = ?`;
            const rows = await conn.query(sql, course_id);
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
    async get_models(teacher_id, recent_models, not_confirmed = false){
        try {
            conn = await pool.getConnection()
            let sql = `SELECT c.id`
            if(recent_models){
                sql += `, c.italian_title, c.english_title`
            } else {
                sql += `, CASE WHEN pc.italian_displayed_name IS NULL THEN c.italian_title ELSE pc.italian_displayed_name END AS 'italian_title', CASE WHEN pc.english_displayed_name IS NULL THEN c.english_title ELSE pc.english_displayed_name END AS 'english_title', pc.admin_confirmation AS 'project_class_confirmation_date', pc.to_be_modified AS 'project_class_to_be_modified'`
            }
            sql += `, c.creation_school_year, c.admin_confirmation AS 'course_confirmation_date', c.to_be_modified AS 'course_to_be_modified' FROM course AS c`
            if(!recent_models){
                sql += ` LEFT JOIN project_class AS pc ON pc.course_id = c.id`
            }
            if(recent_models){ // I want to have the last 3 models available
                sql += ` WHERE c.admin_confirmation IS NOT NULL and c.certifying_admin_id IS NOT NULL`
            } else { // I want to check the propositions of the courses. not_confirmed tells if the user wants to see only the ones not confirmed yet.
                if(teacher_id!=undefined && not_confirmed){
                    sql += ` WHERE c.proposer_teacher_id = ${teacher_id} AND ((c.admin_confirmation IS NULL AND c.certifying_admin_id IS NOT NULL) OR (pc.admin_confirmation IS NULL and pc.certifying_admin_id IS NULL))`
                } else if (teacher_id!=undefined){
                    sql += ` WHERE c.proposer_teacher_id = ${teacher_id}`
                } else if (not_confirmed){
                    sql += ` WHERE (c.admin_confirmation IS NULL AND c.certifying_admin_id IS NULL) OR (pc.admin_confirmation IS NULL and pc.certifying_admin_id IS NULL)`
                }
            }
            sql += ` ORDER BY c.creation_school_year DESC`
            //console.log(sql);
            const rows = await conn.query(sql)
            conn.release()
            if (recent_models>0){
                return rows.slice(0,3)
            } else {
                return rows 
            } 
        } catch (err) {
            console.log(err)
        } finally {
            conn.release()
        }
    },
    async add_proposition(ita_title, eng_title, school_year, ita_descr, eng_descr, up_hours, credits, it_ex_learn, eng_ex_learn, ita_cri, eng_cri, ita_ac, eng_ac, area_id, growth_id, min_students, max_students, teacher_id){
        try{
            conn = await pool.getConnection()
            if(!ita_title || !eng_title || !ita_descr || !eng_descr || up_hours==undefined || credits==undefined || !it_ex_learn || !eng_ex_learn || !ita_cri || !eng_cri || !ita_ac || !eng_ac || !area_id || !growth_id || min_students==undefined || max_students==undefined || !teacher_id){
                conn.release()
                return false
            }
            let creation_school_year = school_year
            let sql = 'INSERT INTO course (italian_title, english_title, creation_school_year, italian_description, english_description, up_hours, credits, italian_expected_learning_results, english_expected_learning_results, italian_criterions, english_criterions, italian_activities, english_activities, learning_area_id, growth_area_id, min_students, max_students, proposer_teacher_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
            let values = [ita_title, eng_title, creation_school_year, ita_descr, eng_descr, up_hours, credits, it_ex_learn, eng_ex_learn, ita_cri, eng_cri, ita_ac, eng_ac, area_id, growth_id, min_students, max_students, teacher_id]
            const rows = await conn.query(sql, values)
            conn.release()
            return {
                rows: rows,
                date: creation_school_year
            };
        } catch (err) {
            console.log(err)
        } finally {
            conn.release()
        }
    },
    async deleteProposal(course_id){
        try{
            conn = await pool.getConnection();
            let sql = 'DELETE FROM course WHERE id=?';
            const rows = await conn.query(sql, course_id)
            conn.release()
            return rows
        } catch (err) {
            console.log(err)
        } finally {
            conn.release()
        }
    },
    async read_complete(ita_title, eng_title, up_hours, credits, area_id, growth_id, min_students, max_students){
        try{
            conn = await pool.getConnection()
            if(!ita_title || !eng_title || up_hours==undefined || credits==undefined || !area_id || !growth_id || min_students==undefined || max_students==undefined){
                conn.release()
                return false
            }
            let sql = 'SELECT * FROM course WHERE italian_title = ? AND english_title = ? AND up_hours = ? AND credits = ? AND learning_area_id = ? AND growth_area_id = ? AND min_students = ? AND max_students = ?'
            let values = [ita_title, eng_title, up_hours, credits, area_id, growth_id, min_students, max_students, teacher_id]
            const rows = await conn.query(sql, values)
            conn.release()
            if(rows.length == 1){
                return rows[0].id
            } else {
                return false
            }
        } catch (err) {
            console.log(err)
        } finally {
            conn.release()
        }
    },
    async add_to_be_modified(course_id){
        try {
            conn = await pool.getConnection()
            if(!course_id){
                conn.release()
                return null
            }
            let sql = 'UPDATE course SET to_be_modified = true WHERE id = ?'
            let values = [course_id]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log(err)
        } finally {
            conn.release()
        }
    },
    async already_inserted_year(ita_title, eng_title, school_year){
        try {
            conn = await pool.getConnection()
            if(!ita_title || !eng_title || !school_year){
                conn.release()
                return null
            }
            let sql = 'SELECT * FROM course AS c WHERE c.italian_title = ? AND c.english_title = ? AND c.creation_school_year = ?'
            let values = [ita_title, eng_title, school_year]
            const rows = await conn.query(sql, values)
            conn.release()
            if(rows.length == 1){
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
    async approve_proposal(course_id, block_id, admin_id, approved = true){
        try {
            conn = await pool.getConnection()
            if(!course_id || !block_id || !admin_id){
                conn.release()
                return false
            }
            let sql = 'UPDATE course, project_class SET '
            let values = []
            let confirmation_date = undefined
            if(approved) {
                confirmation_date = new Date()
                sql += 'course.certifying_admin_id = ?, course.admin_confirmation = ?, course.to_be_modified = NULL, project_class.certifying_admin_id = ?, project_class.admin_confirmation = ?, project_class.to_be_modified = NULL '
                values.push(admin_id, confirmation_date, admin_id, confirmation_date)
            } else {
                sql += 'course.to_be_modified = true, project_class.to_be_modified = true, project_class.certifying_admin_id = NULL, project_class.admin_confirmation = NULL '
            }
            sql += 'WHERE course.id = ? AND project_class.course_id = ? AND project_class.learning_block_id = ?'
            values.push(course_id, course_id, block_id)
            const rows = await conn.query(sql, values)
            conn.release()
            return {
                rows: rows,
                confirmation_date: confirmation_date
            }
        } catch (err) {
            console.log(err)
        } finally {
            conn.release()
        }
    },
    async update_course(course_id, italian_description, english_description, up_hours, ita_ex_l_r, eng_ex_l_r, ita_cri, eng_cri, ita_ac, eng_ac){
        // italian_activities=?, =? WHERE id = ?
        try {
            conn = await pool.getConnection()
            if(!course_id || (italian_description == undefined && english_description == undefined && up_hours == undefined && ita_ex_l_r == undefined && eng_ex_l_r == undefined && ita_cri == undefined && eng_cri == undefined && ita_ac == undefined && eng_ac == undefined)){
                conn.release()
                return false
            }
            let sql = 'UPDATE course SET'
            let values = []
            if(italian_description!=undefined){
                sql += ' italian_description = ?,'
                values.push(italian_description)
            }
            if(english_description!=undefined){
                sql += ' english_description = ?,'
                values.push(english_description)
            }
            if(up_hours!=undefined){
                sql += ' up_hours = ?,'
                values.push(up_hours)
            }
            if(ita_ex_l_r!=undefined){
                sql += ' up_hours = ?,'
                values.push(italian_expected_learning_results)
            }
            if(eng_ex_l_r!=undefined){
                sql += ' english_expected_learning_results = ?,'
                values.push(eng_ex_l_r)
            }
            if(ita_cri!=undefined){
                sql += ' italian_criterions = ?,'
                values.push(ita_cri)
            }
            if(eng_cri!=undefined){
                sql += ' english_criterions = ?,'
                values.push(eng_cri)
            }
            if(ita_ac!=undefined){
                sql += ' italian_activities = ?,'
                values.push(ita_ac)
            }
            if(eng_ac!=undefined){
                sql += ' english_activities = ?'
                values.push(eng_ac)
            }
            if(sql[sql.length-1]==","){
                sql = sql.slice(0,-1);
            }
            sql += ' WHERE id = ?'
            values.push(course_id)
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


    /*SELECT c.id,
        c.italian_title,
        c.english_title,
        c.creation_school_year,
        c.italian_description,
        c.english_description,
        c.up_hours,
        c.credits,
        c.italian_expected_learning_results,
        c.english_expected_learning_results,
        c.italian_criterions,
        c.english_criterions,
        c.italian_activities,
        c.english_activities,
        la.italian_title  AS "learning_area_ita",
        la.english_title  AS "learning_area_eng",
        pga.italian_title AS "growth_area_ita",
        pga.english_title AS "growth_area_eng",
        c.min_students,
        c.max_students,
        c.proposer_teacher_id,
        c.certifying_admin_id,
        c.admin_confirmation,
        pc.italian_displayed_name,
        pc.english_displayed_name,
        ins.section,
        CASE
            WHEN c.id IN (SELECT c.id
                        FROM   course AS c
                                LEFT JOIN project_class AS pc
                                        ON c.id = pc.course_id
                                LEFT JOIN inscribed AS ins
                                        ON pc.course_id =
                                            ins.project_class_course_id
                                            AND pc.learning_block_id =
                                                ins.project_class_block
                        WHERE  learning_block_id = 7
                                AND c.learning_area_id = "sm"
                                AND ins.student_id = 1)
                AND (SELECT ins.pending
                    FROM   inscribed AS ins
                    WHERE  ins.project_class_course_id = c.id
                            AND ins.student_id = 1
                            AND ins.project_class_block = pc.learning_block_id) IS
                    NULL
        THEN "true"
            WHEN c.id IN (SELECT c.id
                        FROM   course AS c
                                LEFT JOIN project_class AS pc
                                        ON c.id = pc.course_id
                                LEFT JOIN inscribed AS ins
                                        ON pc.course_id =
                                            ins.project_class_course_id
                                            AND pc.learning_block_id =
                                                ins.project_class_block
                        WHERE  learning_block_id = 7
                                AND c.learning_area_id = "sm"
                                AND ins.student_id = 1)
                AND (SELECT ins.pending
                    FROM   inscribed AS ins
                    WHERE  ins.project_class_course_id = c.id
                            AND ins.student_id = 1
                            AND ins.project_class_block = pc.learning_block_id) IS
                    NOT
                    NULL THEN (SELECT ins.pending
                                FROM   inscribed AS ins
                                WHERE  ins.project_class_course_id = c.id
                                        AND ins.student_id = 1
                                        AND
                                ins.project_class_block = pc.learning_block_id)
            ELSE "false"
        end               AS inscribed
    FROM   course AS c
        JOIN project_class AS pc
            ON c.id = pc.course_id
        JOIN learning_area AS la
            ON c.learning_area_id = la.id
        INNER JOIN personal_growth_area AS pga
                ON c.growth_area_id = pga.id
    WHERE  pc.learning_block_id = 7
        AND c.learning_area_id = "sm"
        AND c.id IN (SELECT ac.course_id
                    FROM   `accessible` AS ac
                    WHERE  ac.study_year_id IN (SELECT att.ordinary_class_study_year
                                                FROM   attend AS att
                                                WHERE  att.student_id = 1
                                                    AND
                                            ( att.ordinary_class_school_year
                                                = Year(
                                                CURRENT_DATE)
                                                OR att.ordinary_class_school_year
                                                    =
                                                    Year(
                                                    CURRENT_DATE) - 1 ))
                        AND ac.study_address_id IN
                            (SELECT att.ordinary_class_address
                                FROM   attend AS att
                                WHERE  att.student_id = 1
                                    AND
                            ( att.ordinary_class_school_year
                                = Year(
                                CURRENT_DATE)
                                OR att.ordinary_class_school_year
                                    =
                                    Year(
                                    CURRENT_DATE) - 1 )));  */

/* Single course information QUERY
SELECT DISTINCT c.id,
       c.italian_title,
       c.english_title,
       c.creation_school_year,
       c.italian_description,
       c.english_description,
       c.up_hours,
       c.credits,
       c.italian_expected_learning_results,
       c.english_expected_learning_results,
       c.italian_criterions,
       c.english_criterions,
       c.italian_activities,
       c.english_activities,
       la.italian_title  AS "learning_area_ita",
       la.english_title  AS "learning_area_eng",
       pga.italian_title AS "growth_area_ita",
       pga.english_title AS "growth_area_eng",
       c.min_students,
       c.max_students,
       c.proposer_teacher_id,
       t.name AS "teacher_name",
       t.surname AS "teacher_surname",
       ad.name AS "admin_name",
       ad.surname AS "admin_surname",
       c.admin_confirmation
FROM   course AS c
       JOIN learning_area AS la
         ON c.learning_area_id = la.id
       JOIN personal_growth_area AS pga
         ON c.growth_area_id = pga.id
       JOIN have AS h
       	 ON h.course_id = c.id
       JOIN teacher AS t
       	 ON t.id = c.proposer_teacher_id
       JOIN admin as ad
         ON ad.id = c.certifying_admin_id
WHERE c.id = 4;

*/