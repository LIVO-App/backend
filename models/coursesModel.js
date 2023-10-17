const pool = require('../utils/db.js');

module.exports = {
    async read(id, admin=false){
        try {
            conn = await pool.getConnection();
            if(!id){
                conn.release();
                return false;
            }
            sql = 'SELECT DISTINCT c.id, c.italian_title, c.english_title, c.creation_school_year, c.italian_description, c.english_description, c.up_hours, c.credits, c.italian_expected_learning_results, c.english_expected_learning_results, c.italian_criterions, c.english_criterions, c.italian_activities, c.english_activities, c.learning_area_id, la.italian_title  AS "learning_area_ita",la.english_title  AS "learning_area_eng",c.min_students, c.max_students, c.proposer_teacher_id, t.name AS "teacher_name", t.surname AS "teacher_surname", c.certifying_admin_id, ad.name AS "admin_name", ad.surname AS "admin_surname", c.admin_confirmation, c.assets FROM course AS c JOIN learning_area AS la ON c.learning_area_id = la.id JOIN teacher AS t ON t.id = c.proposer_teacher_id ';
            if(admin){
                sql += 'LEFT ';
            }
            sql += 'JOIN admin as ad ON ad.id = c.certifying_admin_id WHERE c.id = ?';
            const rows = await conn.query(sql, [id]);
            conn.release();
            if(rows.length == 1){
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.log("Something went wrong: read course");
        } finally {
            conn.release();
        }
    },
    async list(student_id, learn_area_id, session_id, context_id, alone=false){
        try {
            //console.log(learn_area_id);
            conn = await pool.getConnection();
            let sql = `SELECT c.id, CASE WHEN pc.italian_displayed_name IS NULL THEN c.italian_title ELSE pc.italian_displayed_name END AS 'italian_title', CASE WHEN pc.english_displayed_name IS NULL THEN c.english_title ELSE pc.english_displayed_name END AS 'english_title', c.credits, c.learning_area_id, pc.group`;
            let values = []
            if(student_id != undefined){
                sql += `, CASE WHEN c.id IN (SELECT c.id FROM course AS c INNER JOIN project_class AS pc ON c.id = pc.course_id INNER JOIN subscribed AS subs ON pc.course_id = subs.project_class_course_id AND pc.learning_session_id = subs.project_class_session WHERE `;
                if(learn_area_id != undefined && session_id != undefined && context_id != undefined){
                    sql += `learning_session_id = ? AND c.learning_area_id = ? AND subs.learning_context_id=? AND `;
                    values.push(session_id, learn_area_id, context_id)
                } else if (learn_area_id != undefined && context_id != undefined) {
                    sql += `c.learning_area_id = ? AND subs.learning_context_id=? AND `;
                    values.push(learn_area_id, context_id)
                } else if (session_id != undefined && context_id != undefined) {
                    sql += `learning_session_id = ? AND subs.learning_context_id=? AND `;
                    values.push(session_id, context_id)
                } else if (context_id != undefined){
                    sql += `subs.learning_context_id= ? AND `;
                    values.push(context_id)
                } else if (session_id != undefined){
                    sql += `learning_session_id = ? AND `
                    values.push(session_id)
                }
                sql += `subs.student_id = ?) AND (SELECT subs.pending FROM subscribed AS subs WHERE subs.project_class_course_id = c.id AND subs.student_id = ? AND subs.project_class_session = pc.learning_session_id `;
                values.push(student_id, student_id)
                if(context_id != undefined){
                    sql += ` AND subs.learning_context_id=?`;
                    values.push(context_id)
                }
                sql += `) IS NULL THEN \"true\" WHEN c.id IN (SELECT c.id FROM course AS c LEFT JOIN project_class AS pc ON c.id = pc.course_id LEFT JOIN subscribed AS subs ON pc.course_id = subs.project_class_course_id AND pc.learning_session_id = subs.project_class_session WHERE `;
                if(learn_area_id != undefined && session_id != undefined && context_id != undefined){
                    sql += `learning_session_id = ? AND c.learning_area_id = ? AND subs.learning_context_id=? AND `;
                    values.push(session_id, learn_area_id, context_id)
                } else if (learn_area_id != undefined && context_id != undefined) {
                    sql += `c.learning_area_id = ? AND subs.learning_context_id=? AND `;
                    values.push(learn_area_id, context_id)
                } else if (session_id != undefined && context_id != undefined) {
                    sql += `learning_session_id = ? AND subs.learning_context_id=? AND `;
                    values.push(session_id, context_id)
                } else if (context_id != undefined){
                    sql += `subs.learning_context_id=? AND `;
                    values.push(context_id)
                } else if (session_id != undefined){
                    sql += `learning_session_id = ? AND `
                    values.push(session_id)
                }
                sql += `subs.student_id = ?) AND (SELECT subs.pending FROM subscribed AS subs WHERE subs.project_class_course_id = c.id AND subs.student_id = ? AND subs.project_class_session = pc.learning_session_id `;
                values.push(student_id, student_id)
                if(context_id != undefined){
                    sql += ` AND subs.learning_context_id=?`
                    values.push(context_id)
                }
                sql += `) IS NOT NULL THEN (SELECT subs.pending FROM subscribed AS subs WHERE subs.project_class_course_id = c.id AND subs.student_id = ? AND subs.project_class_session = pc.learning_session_id`
                values.push(student_id)
                if(context_id != undefined){
                    sql += ` AND subs.learning_context_id=?`
                    values.push(context_id)
                }
                sql += `) ELSE \"false\" end AS subscribed`;
                if (session_id!=undefined) {
                    sql += `, (SELECT section FROM subscribed WHERE project_class_course_id = c.id AND student_id = ? AND project_class_session = ?`
                    values.push(student_id, session_id)
                    if(context_id!=undefined){
                        sql += ` AND learning_context_id=?`;
                        values.push(context_id)
                    }
                    sql +=`) AS section`;
                }
            }
            sql += ` FROM course AS c `
            if(alone){
                sql += `LEFT `
            }
            sql += `JOIN project_class AS pc ON c.id = pc.course_id JOIN learning_area AS la ON c.learning_area_id = la.id `;
            if(alone){
                sql += `LEFT `
            }
            sql += `JOIN learning_session AS ls ON ls.id = pc.learning_session_id `;
            if(learn_area_id != undefined && session_id != undefined){
                sql += `WHERE pc.learning_session_id = ? AND c.learning_area_id = ?`;
                values.push(session_id, learn_area_id)
                if(student_id != undefined) {
                    sql += ` AND c.id IN (SELECT ac.course_id FROM \`accessible\` AS ac WHERE ac.study_year_id IN (SELECT att.ordinary_class_study_year FROM attend AS att WHERE att.student_id = ? AND att.ordinary_class_school_year = ls.school_year) AND ac.study_address_id IN (SELECT att.ordinary_class_address FROM attend AS att WHERE att.student_id = ? AND att.ordinary_class_school_year = ls.school_year)`;
                    values.push(student_id, student_id)
                    if(context_id != undefined){
                        sql += ` AND ac.learning_context_id=?`
                        values.push(context_id)
                    }
                    sql += `) AND c.certifying_admin_id IS NOT NULL`;
                }
            } else if (learn_area_id != undefined) {
                sql += `WHERE c.learning_area_id = ?`;
                values.push(learn_area_id)
                if(student_id != undefined) {
                    sql += ` AND c.id IN (SELECT ac.course_id FROM \`accessible\` AS ac WHERE ac.study_year_id IN (SELECT att.ordinary_class_study_year FROM attend AS att WHERE att.student_id = ? AND att.ordinary_class_school_year = ls.school_year) AND ac.study_address_id IN (SELECT att.ordinary_class_address FROM attend AS att WHERE att.student_id = ? AND att.ordinary_class_school_year = ls.school_year)`;
                    values.push(student_id, student_id)
                    if(context_id != undefined){
                        sql += ` AND ac.learning_context_id=?`
                        values.push(context_id)
                    }
                    sql += `) AND c.certifying_admin_id IS NOT NULL`;
                }
            } else if (session_id != undefined) {
                sql += `WHERE pc.learning_session_id = ?`;
                values.push(session_id)
                if(student_id != undefined) {
                    sql += ` AND c.id IN (SELECT ac.course_id FROM \`accessible\` AS ac WHERE ac.study_year_id IN (SELECT att.ordinary_class_study_year FROM attend AS att WHERE att.student_id = ? AND att.ordinary_class_school_year = ls.school_year) AND ac.study_address_id IN (SELECT att.ordinary_class_address FROM attend AS att WHERE att.student_id = ? AND att.ordinary_class_school_year = ls.school_year)`;
                    values.push(student_id, student_id)
                    if(context_id != undefined){
                        sql += ` AND ac.learning_context_id= ?`
                        values.push(context_id)
                    }
                    sql += `) AND c.certifying_admin_id IS NOT NULL`;
                }
            } else if(student_id != undefined) {
                sql += ` WHERE c.id IN (SELECT ac.course_id FROM \`accessible\` AS ac WHERE ac.study_year_id IN (SELECT att.ordinary_class_study_year FROM attend AS att WHERE att.student_id = ? AND att.ordinary_class_school_year = ls.school_year) AND ac.study_address_id IN (SELECT att.ordinary_class_address FROM attend AS att WHERE att.student_id = ? AND att.ordinary_class_school_year = ls.school_year)`;
                values.push(student_id, student_id)
                if(context_id != undefined){
                    sql += ` AND ac.learning_context_id=?`
                    values.push(context_id)
                }
                sql += `) AND c.certifying_admin_id IS NOT NULL`;
            }
            sql += ` ORDER BY c.id`;
            //console.log(sql);
            const rows = await conn.query(sql, values);
            conn.release();
            if(rows.length!=0){
                return rows;
            } else {
                return false;
            } 
        } catch (err) {
            console.log("Something went wrong: list of courses");
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
            let values = []
            sql = `SELECT DISTINCT c.id AS course_id, CASE WHEN pc.italian_displayed_name IS NULL THEN c.italian_title ELSE pc.italian_displayed_name END AS 'italian_title', CASE WHEN pc.english_displayed_name IS NULL THEN c.english_title ELSE pc.english_displayed_name END AS 'english_title', i.section, c.credits, c.learning_area_id, i.learning_context_id, (SELECT g.grade FROM grade as g WHERE g.student_id = ? AND g.project_class_course_id = pc.course_id AND g.project_class_session = pc.learning_session_id AND g.final = 1) AS final_grade, CASE WHEN pc.learning_session_id IN (SELECT ls1.id FROM learning_session AS ls1 WHERE ls1.start>CURRENT_DATE()) THEN 1 ELSE 0 END AS future_course FROM student AS s JOIN subscribed as i ON s.id = i.student_id JOIN project_class AS pc ON i.project_class_course_id = pc.course_id AND i.project_class_session = pc.learning_session_id JOIN course AS c ON pc.course_id = c.id JOIN learning_session AS ls ON pc.learning_session_id = ls.id LEFT JOIN grade AS g ON pc.course_id = g.project_class_course_id AND pc.learning_session_id = g.project_class_session WHERE s.id = ? AND ls.school_year=? AND i.pending IS NULL`
            values.push(student_id, student_id, school_year)
            if(context_id!=undefined){
                sql += ` AND i.learning_context_id = `;
                values.push(context_id)
            }
            if(teacher_id!=undefined){
                sql += ` AND c.id IN (SELECT DISTINCT c.id FROM course AS c JOIN project_class AS pc ON c.id = pc.course_id JOIN subscribed AS subs ON pc.course_id = subs.project_class_course_id AND pc.learning_session_id = subs.project_class_session JOIN associated AS ass ON c.id = ass.course_id WHERE subs.student_id IN (SELECT s.id FROM student AS s JOIN attend AS att ON s.id = att.student_id WHERE att.ordinary_class_study_year IN (SELECT ot.ordinary_class_study_year FROM ordinary_teach AS ot WHERE ot.teacher_id = ?) AND att.ordinary_class_address IN (SELECT ot.ordinary_class_address FROM ordinary_teach AS ot WHERE ot.teacher_id = ?)) AND pc.learning_session_id IN (SELECT ls.id FROM learning_session AS ls WHERE ls.school_year = ?) AND ass.teaching_id IN (SELECT ot.teaching_id FROM ordinary_teach AS ot WHERE ot.teacher_id = ?) UNION SELECT c.id FROM course AS c JOIN project_teach AS pt ON c.id = pt.project_class_course_id JOIN associated AS ass ON ass.course_id = c.id WHERE pt.teacher_id = ? AND pt.project_class_session IN (SELECT ls.id FROM learning_session AS ls WHERE ls.school_year = ?))`;
                values.push(teacher_id, teacher_id, school_year, teacher_id, teacher_id, school_year)
            }
            const rows = await conn.query(sql, values);
            conn.release();
            return rows;
        } catch (err) {
            console.log("Something went wrong: get curriculum");
        } finally {
            conn.release();
        }
    },
    async read_learning_area(course_id){
        try{
            conn = await pool.getConnection();
            sql = `SELECT c.learning_area_id, c.credits FROM course as c WHERE c.id = ?`;
            const rows = await conn.query(sql, [course_id]);
            conn.release();
            if(rows.length == 1){
                return rows[0];
            } else {
                return false;
            }
            
        } catch (err) {
            console.log("Something went wrong: read course learning area");
        } finally {
            conn.release();
        }
    },
    async get_course_models(recent_models, school_year){
        try {
            conn = await pool.getConnection()
            let sql = `SELECT c.id, c.italian_title, c.english_title, c.creation_school_year, c.certifying_admin_id, c.admin_confirmation, c.to_be_modified, c.proposer_teacher_id, t.name AS 'teacher_name', t.surname AS 'teacher_surname' FROM course AS c JOIN admin AS a ON a.id = c.certifying_admin_id JOIN teacher AS t ON t.id = c.proposer_teacher_id WHERE c.admin_confirmation IS NOT NULL and c.certifying_admin_id IS NOT NULL`
            let values = []
            if(school_year!=undefined){
                sql += ` AND c.creation_school_year = ?`
                values.push(school_year)
            }
            sql += ` ORDER BY c.id ASC, c.creation_school_year DESC`
            const rows = await conn.query(sql, values)
            conn.release()
            if (typeof(recent_models) == "number"){
                return rows.slice(0,recent_models)
            } else {
                return rows 
            } 
        } catch (err) {
            console.log(err)
            console.log("Something went wrong: list of course models")
        } finally {
            conn.release()
        }
    },
    async get_models(teacher_id, not_confirmed = false, admin = true, school_year = undefined){
        try {
            conn = await pool.getConnection()
            let sql = `SELECT c.id , c.italian_title, c.english_title, c.creation_school_year, c.admin_confirmation AS 'course_confirmation_date', c.to_be_modified AS 'course_to_be_modified', c.certifying_admin_id, a.name AS 'admin_name', a.surname AS 'admin_surname'`
            let values = []
            if(admin){
                sql += `, c.proposer_teacher_id, t.name AS 'teacher_name', t.surname AS 'teacher_surname'`
            }
            sql += ` FROM course AS c LEFT JOIN project_class AS pc ON pc.course_id = c.id LEFT JOIN admin AS a ON a.id = c.certifying_admin_id`
            if(admin){
                sql += ` JOIN teacher AS t ON t.id = c.proposer_teacher_id `
            }
            sql += ` WHERE pc.learning_session_id IS NULL`
            if(teacher_id!=undefined && not_confirmed){
                sql += ` AND c.proposer_teacher_id = ? AND (c.admin_confirmation IS NULL AND c.certifying_admin_id IS NULL)`
                values.push(teacher_id)
                if(school_year!=undefined){
                    sql += ` AND c.creation_school_year = ?`
                    values.push(school_year)
                }
            } else if (teacher_id!=undefined){
                sql += ` AND c.proposer_teacher_id = ? `
                values.push(teacher_id)
                if(school_year!=undefined){
                    sql += ` AND c.creation_school_year = ?`
                    values.push(school_year)
                }
            } else if (not_confirmed){
                sql += ` AND (c.admin_confirmation IS NULL AND c.certifying_admin_id IS NULL)`
                if(school_year!=undefined){
                    sql += ` AND c.creation_school_year = ?`
                    values.push(school_year)
                }
            } else if (school_year!=undefined){
                sql += ` AND c.creation_school_year = ?`
                values.push(school_year)
            }
            sql += ` ORDER BY c.id ASC, c.creation_school_year DESC`
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log(err)
            console.log("Something went wrong: list of course models")
        } finally {
            conn.release()
        }
    }, 
    async get_class_models(teacher_id, not_confirmed = false, admin = true, session_id = undefined){
        try {
            conn = await pool.getConnection()
            let sql = `SELECT c.id , CASE WHEN pc.italian_displayed_name IS NULL THEN c.italian_title ELSE pc.italian_displayed_name END AS 'italian_title', CASE WHEN pc.english_displayed_name IS NULL THEN c.english_title ELSE pc.english_displayed_name END AS 'english_title', pc.admin_confirmation AS 'project_class_confirmation_date', pc.to_be_modified AS 'project_class_to_be_modified', pc.learning_session_id , pc.certifying_admin_id, a.name AS 'admin_name', a.surname AS 'admin_surname'`
            if(admin){
                sql += `, pc.proposer_teacher_id, t.name AS 'teacher_name', t.surname AS 'teacher_surname'`
            }
            sql +=  `FROM course AS c LEFT JOIN project_class AS pc ON pc.course_id = c.id LEFT JOIN admin AS a ON a.id = pc.certifying_admin_id `
            let values = []
            if(admin){
                sql += ` JOIN teacher AS t ON t.id = pc.proposer_teacher_id `
            }
            if(teacher_id!=undefined && not_confirmed){
                sql += ` WHERE pc.proposer_teacher_id = ? AND (pc.admin_confirmation IS NULL AND pc.certifying_admin_id IS NULL))`
                values.push(teacher_id)
                if(session_id!=undefined){
                    sql += ` AND pc.learning_session_id = ?`
                    values.push(session_id)
                }
            } else if (teacher_id!=undefined){
                sql += ` WHERE pc.proposer_teacher_id = ?`
                values.push(teacher_id)
                if(session_id!=undefined){
                    sql += ` AND pc.learning_session_id = ?`
                    values.push(session_id)
                }
            } else if (not_confirmed){
                sql += ` WHERE (pc.admin_confirmation IS NULL AND pc.certifying_admin_id IS NULL)`
                if(session_id!=undefined){
                    sql += ` AND pc.learning_session_id = ?`
                    values.push(session_id)
                }
            } else if (session_id!=undefined){
                sql += ` WHERE pc.learning_session_id = ?`
                values.push(session_id)
            }
            sql += ` ORDER BY pc.learning_session_id ASC, c.id ASC, c.creation_school_year DESC`
            //console.log(sql);
            const rows = await conn.query(sql, values)
            conn.release()
            return rows 
        } catch (err) {
            console.log(err)
            console.log("Something went wrong: list of course models")
        } finally {
            conn.release()
        }
    },
    async add_proposition(ita_title, eng_title, school_year, ita_descr, eng_descr, up_hours, credits, it_ex_learn, eng_ex_learn, ita_cri, eng_cri, ita_ac, eng_ac, area_id, min_students, max_students, teacher_id){
        try{
            conn = await pool.getConnection()
            if(!ita_title || !ita_descr || up_hours==undefined || credits==undefined || !it_ex_learn || !ita_cri || !ita_ac || !area_id || min_students==undefined || max_students==undefined || !teacher_id){
                conn.release()
                return false
            }
            let creation_school_year = school_year
            eng_title = eng_title == undefined ? null : eng_title
            eng_descr = eng_descr == undefined ? null : eng_descr
            eng_ex_learn = eng_ex_learn == undefined ? null : eng_ex_learn
            eng_cri = eng_cri == undefined ? null : eng_cri
            eng_ac = eng_ac == undefined ? null : eng_ac
            let sql = 'INSERT INTO course (italian_title, english_title, creation_school_year, italian_description, english_description, up_hours, credits, italian_expected_learning_results, english_expected_learning_results, italian_criterions, english_criterions, italian_activities, english_activities, learning_area_id, min_students, max_students, proposer_teacher_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
            let values = [ita_title, eng_title, creation_school_year, ita_descr, eng_descr, up_hours, credits, it_ex_learn, eng_ex_learn, ita_cri, eng_cri, ita_ac, eng_ac, area_id, min_students, max_students, teacher_id]
            const rows = await conn.query(sql, values)
            conn.release()
            return {
                rows: rows,
                date: creation_school_year
            };
        } catch (err) {
            console.log("Something went wrong: add proposition")
        } finally {
            conn.release()
        }
    },
    async deleteProposal(course_id){
        try{
            conn = await pool.getConnection();
            let sql = 'DELETE FROM course WHERE id=?';
            const rows = await conn.query(sql, [course_id])
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: delete course proposition")
        } finally {
            conn.release()
        }
    },
    async read_complete(ita_title, eng_title, up_hours, credits, area_id, min_students, max_students){
        try{
            conn = await pool.getConnection()
            if(!ita_title || up_hours==undefined || credits==undefined || !area_id || min_students==undefined || max_students==undefined){
                conn.release()
                return false
            }
            let sql = 'SELECT * FROM course WHERE italian_title = ? AND up_hours = ? AND credits = ? AND learning_area_id = ? AND min_students = ? AND max_students = ?'
            let values = [ita_title, up_hours, credits, area_id, min_students, max_students]
            if(eng_title!=undefined){
                sql += ' AND english_title = ? '
                values.push(eng_title)
            }
            const rows = await conn.query(sql, values)
            conn.release()
            if(rows.length == 1){
                return rows[0].id
            } else {
                return false
            }
        } catch (err) {
            console.log("Something went wrong: read course with different parameters")
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
            console.log("Something went wrong: add course to be modified")
        } finally {
            conn.release()
        }
    },
    async already_inserted_year(ita_title, eng_title, school_year){
        try {
            conn = await pool.getConnection()
            if(!ita_title|| !school_year){
                conn.release()
                return null
            }
            let sql = 'SELECT * FROM course AS c WHERE c.italian_title = ? AND c.creation_school_year = ?'
            let values = [ita_title, school_year]
            if(eng_title!=undefined){
                sql += ' AND c.english_title = ? '
                values.push(eng_title)
            }
            const rows = await conn.query(sql, values)
            conn.release()
            if(rows.length == 1){
                return true
            } else {
                return false
            }
        } catch (err) {
            console.log("Something went wrong: course already inserted")
        } finally {
            conn.release()
        }
    },
    async approve_proposal(course_id, session_id, admin_id, approved = true, proj_class = true){
        try {
            conn = await pool.getConnection()
            if(!course_id || !session_id || !admin_id){
                conn.release()
                return false
            }
            let sql = 'UPDATE course'
            if(proj_class){
                sql += ', project_class'
            }
            sql += ' SET '
            let values = []
            let confirmation_date = undefined
            if(approved) {
                confirmation_date = new Date()
                sql += 'course.certifying_admin_id = ?, course.admin_confirmation = ?, course.to_be_modified = NULL'
                values.push(admin_id, confirmation_date)
                if(proj_class){
                    sql += ', project_class.certifying_admin_id = ?, project_class.admin_confirmation = ?, project_class.to_be_modified = NULL '
                    values.push(admin_id, confirmation_date)
                }
            } else {
                sql += 'course.to_be_modified = true'
                if(proj_class){
                    sql += ', project_class.to_be_modified = true'
                }
            }
            sql += ' WHERE course.id = ?' 
            values.push(course_id)
            if(proj_class){
                sql += ' AND project_class.course_id = ? AND project_class.learning_session_id = ?'
                values.push(course_id, session_id)
            }
            const rows = await conn.query(sql, values)
            conn.release()
            return {
                rows: rows,
                confirmation_date: confirmation_date
            }
        } catch (err) {
            console.log("Something went wrong: approve course")
        } finally {
            conn.release()
        }
    },
    async update_course(course_id, english_title, italian_description, english_description, up_hours, credits, ita_ex_l_r, eng_ex_l_r, ita_cri, eng_cri, ita_ac, eng_ac, learning_area_id, min_students, max_students){
        // italian_activities=?, =? WHERE id = ?
        try {
            conn = await pool.getConnection()
            if(!course_id || (english_title == undefined && italian_description == undefined && english_description == undefined && up_hours == undefined && credits == undefined && ita_ex_l_r == undefined && eng_ex_l_r == undefined && ita_cri == undefined && eng_cri == undefined && ita_ac == undefined && eng_ac == undefined && learning_area_id == undefined && min_students == undefined && max_students == undefined)){
                conn.release()
                return false
            }
            let sql = 'UPDATE course SET'
            let values = []
            if(english_title!=undefined){
                sql += ' english_title = ?,'
                values.push(english_title)
            }
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
            if(credits!=undefined){
                sql += ' credits = ?,'
                values.push(credits)
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
                sql += ' english_activities = ?,'
                values.push(eng_ac)
            }
            if(learning_area_id!=undefined){
                sql += ' learning_area_id = ?,'
                values.push(learning_area_id)
            }
            if(min_students!=undefined){
                sql += ' min_students = ?,'
                values.push(min_students)
            }
            if(max_students!=undefined){
                sql += ' max_students = ?'
                values.push(max_students)
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
            console.log("Something went wrong: update course")
        } finally {
            conn.release()
        }

    },
    async add_assets(course_id){
        try{
            conn = await pool.getConnection()
            if(!course_id){
                conn.release()
                return false
            }
            let assets_link = '/assets/courses/course_'+course_id
            let sql = 'UPDATE course SET assets = ? WHERE id = ?'
            let values = [assets_link, course_id]
            const rows = await conn.query(sql, values)
            conn.release()
            return rows
        } catch (err) {
            console.log("Something went wrong: add assets to course")
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
        subs.section,
        CASE
            WHEN c.id IN (SELECT c.id
                        FROM   course AS c
                                LEFT JOIN project_class AS pc
                                        ON c.id = pc.course_id
                                LEFT JOIN subscribed AS subs
                                        ON pc.course_id =
                                            subs.project_class_course_id
                                            AND pc.learning_session_id =
                                                subs.project_class_session
                        WHERE  learning_session_id = 7
                                AND c.learning_area_id = "sm"
                                AND subs.student_id = 1)
                AND (SELECT subs.pending
                    FROM   subscribed AS subs
                    WHERE  subs.project_class_course_id = c.id
                            AND subs.student_id = 1
                            AND subs.project_class_session = pc.learning_session_id) IS
                    NULL
        THEN "true"
            WHEN c.id IN (SELECT c.id
                        FROM   course AS c
                                LEFT JOIN project_class AS pc
                                        ON c.id = pc.course_id
                                LEFT JOIN subscribed AS subs
                                        ON pc.course_id =
                                            subs.project_class_course_id
                                            AND pc.learning_session_id =
                                                subs.project_class_session
                        WHERE  learning_session_id = 7
                                AND c.learning_area_id = "sm"
                                AND subs.student_id = 1)
                AND (SELECT subs.pending
                    FROM   subscribed AS subs
                    WHERE  subs.project_class_course_id = c.id
                            AND subs.student_id = 1
                            AND subs.project_class_session = pc.learning_session_id) IS
                    NOT
                    NULL THEN (SELECT subs.pending
                                FROM   subscribed AS subs
                                WHERE  subs.project_class_course_id = c.id
                                        AND subs.student_id = 1
                                        AND
                                subs.project_class_session = pc.learning_session_id)
            ELSE "false"
        end               AS subscribed
    FROM   course AS c
        JOIN project_class AS pc
            ON c.id = pc.course_id
        JOIN learning_area AS la
            ON c.learning_area_id = la.id
        INNER JOIN personal_growth_area AS pga
                ON c.growth_area_id = pga.id
    WHERE  pc.learning_session_id = 7
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