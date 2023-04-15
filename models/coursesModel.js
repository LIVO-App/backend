const pool = require('../utils/db.js');

module.exports = {
    async read(id){
        try {
            conn = await pool.getConnection();
            sql = 'SELECT DISTINCT c.id, c.italian_title, c.english_title, c.creation_date, c.italian_description, c.english_description, c.up_hours, c.credits, c.italian_expected_learning_results, c.english_expected_learning_results, c.italian_criterions, c.english_criterions, c.italian_activities, c.english_activities, la.italian_title  AS "learning_area_ita",la.english_title  AS "learning_area_eng",pga.italian_title AS "growth_area_ita",pga.english_title AS "growth_area_eng",c.min_students, c.max_students, c.proposer_teacher_id, t.name AS "teacher_name", t.surname AS "teacher_surname", c.certifying_admin_id, ad.name AS "admin_name", ad.surname AS "admin_surname", c.admin_confirmation FROM course AS c JOIN learning_area AS la ON c.learning_area_id = la.id JOIN personal_growth_area AS pga ON c.growth_area_id = pga.id JOIN have AS h ON h.course_id = c.id JOIN teacher AS t ON t.id = c.proposer_teacher_id JOIN admin as ad ON ad.id = c.certifying_admin_id WHERE c.id = ?;';
            const rows = await conn.query(sql, id);
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
    async list(student_id, learn_area_id, block_id){
        try {
            conn = await pool.getConnection();
            let sql = `SELECT c.id, c.italian_title, c.english_title, c.credits, pc.italian_displayed_name, pc.english_displayed_name`;
            if(student_id != undefined){
                sql += `, CASE WHEN c.id IN (SELECT c.id FROM   course AS c INNER JOIN project_class AS pc ON c.id = pc.course_id INNER JOIN inscribed AS ins ON pc.course_id = ins.project_class_course_id AND pc.learning_block_id = ins.project_class_block WHERE `;
                if(learn_area_id!=undefined && block_id!=undefined){
                    sql += `learning_block_id = ${block_id} AND c.learning_area_id = ${learn_area_id} AND `;
                } else if (learn_area_id!=undefined) {
                    sql += `c.learning_area_id = ${learn_area_id} AND `;
                } else if (block_id != undefined) {
                    sql += `learning_block_id = ${block_id} AND `;
                }
                sql += `ins.student_id = ${student_id}) AND (SELECT ins.pending FROM   inscribed AS ins WHERE  ins.project_class_course_id = c.id AND ins.student_id = ${student_id} AND ins.project_class_block = pc.learning_block_id) IS NULL THEN \"true\" WHEN c.id IN (SELECT c.id FROM course AS c LEFT JOIN project_class AS pc ON c.id = pc.course_id LEFT JOIN inscribed AS ins ON pc.course_id = ins.project_class_course_id AND pc.learning_block_id = ins.project_class_block WHERE `;
                if(learn_area_id!= undefined && block_id != undefined){
                    sql += `learning_block_id = ${block_id} AND c.learning_area_id = ${learn_area_id} AND `;
                } else if (learn_area_id!=undefined) {
                    sql += `c.learning_area_id = ${learn_area_id} AND `;
                } else if (block_id != undefined) {
                    sql += `learning_block_id = ${block_id} AND `;
                } 
                sql += `ins.student_id = ${student_id}) AND (SELECT ins.pending FROM   inscribed AS ins WHERE  ins.project_class_course_id = c.id AND ins.student_id = ${student_id} AND ins.project_class_block = pc.learning_block_id) IS NOT NULL THEN (SELECT ins.pending FROM inscribed AS ins WHERE  ins.project_class_course_id = c.id AND ins.student_id = ${student_id} AND ins.project_class_block = pc.learning_block_id) ELSE \"false\" end AS inscribed`;
            }
            sql += ` FROM course AS c JOIN project_class AS pc ON c.id = pc.course_id JOIN learning_area AS la ON c.learning_area_id = la.id JOIN personal_growth_area AS pga ON c.growth_area_id = pga.id JOIN learning_block AS lb ON lb.id = pc.learning_block_id `;
            if(learn_area_id != undefined && block_id != undefined){
                sql += `WHERE pc.learning_block_id = ${block_id} AND c.learning_area_id = ${learn_area_id}`;
            } else if (learn_area_id != undefined) {
                sql += `WHERE c.learning_area_id = ${learn_area_id}`;
            } else if (block_id != undefined) {
                sql += `WHERE pc.learning_block_id = ${block_id}`;
            }
            if(student_id != undefined) {
                sql += `AND c.id IN (SELECT ac.course_id FROM \`accessible\` AS ac WHERE ac.study_year_id IN (SELECT att.ordinary_class_study_year FROM attend AS att WHERE att.student_id = ${student_id} AND att.ordinary_class_school_year = lb.school_year) AND ac.study_address_id IN (SELECT att.ordinary_class_address FROM attend AS att WHERE att.student_id = ${student_id} AND att.ordinary_class_school_year = lb.school_year))`;
            }
            const rows = await conn.query(sql);
            conn.end();
            return rows;
        } catch (err) {
            console.log(err);
        }
    }
};


/*SELECT c.id,
       c.italian_title,
       c.english_title,
       c.creation_date,
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
       c.creation_date,
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