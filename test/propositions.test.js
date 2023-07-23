const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const courseSchema = require('../models/coursesModel');
const projectclassSchema = require('../models/projectClassModel');
const teachingCourseSchema = require('../models/courseteachingModel');
const teacherClassSchema = require('../models/classesTeacherModel');
const opentoSchema = require('../models/opentoModel');

let wrongUserToken = jwt.sign({_id: 1, username: "Student1", role: "student"}, process.env.SUPER_SECRET, {expiresIn: 86400});
let invalidToken = jwt.sign({_id: 5}, "wrongsecret", {expiresIn: 86400});
let validTokenTeacher = jwt.sign({_id: 1, username: "Teacher1", role: "teacher"}, process.env.SUPER_SECRET, {expiresIn: 86400});
let validTokenAdmin = jwt.sign({_id: 1, username: "Admin1", role: "admin"}, process.env.SUPER_SECRET, {expiresIn: 86400});
let course_id = [];
var valid_proposal;

describe('/api/v1/propositions', () => {
    describe('POST /api/v1/propositions', () => {
        let invalid_proposal = {}
        let invalid_proposal_course = {
            area_id: "SM",
            growth_id: 1,
            block_id: 7,
            access_object: {
                SPE: [{study_year: 1, study_address: "BIO", presidium: 0, main_study_year: 1}, {study_year: 2, study_address: "BIO", presidium: 1, main_study_year: 0}],
                PER: [{study_year: 3, study_address: "BIO", presidium: 0, main_study_year: 1}, {study_year: 4, study_address: "ATS", presidium: 1, main_study_year: 0}]
            },
            teaching_list: ["AT", "CAS"]
        }
        let invalid_proposal_p_class = {
            ita_title: "Prova",
            eng_title: "Prova",
            ita_descr: "aaaaa",
            eng_descr: "aaaaa",
            up_hours: 12,
            credits: 4,
            ita_exp_l: "asdf",
            eng_exp_l: "asdf",
            ita_cri: "asd",
            eng_cri: "asd",
            ita_act: "asw",
            eng_act: "asw",
            area_id: "SM",
            growth_id: 1,
            min_students: 15,
            max_students: 25,
            access_object: {
                    SPE: [{study_year: 1, study_address: "BIO", presidium: 0, main_study_year: 1}, {study_year: 2, study_address: "BIO", presidium: 1, main_study_year: 0}],
                    PER: [{study_year: 3, study_address: "BIO", presidium: 0, main_study_year: 1}, {study_year: 4, study_address: "ATS", presidium: 1, main_study_year: 0}]
            },
            teaching_list: ["AT", "CAS"],
            block_id: 7
        }
        let invalid_proposal_context = {
            ita_title: "Prova",
            eng_title: "Prova",
            ita_descr: "aaaaa",
            eng_descr: "aaaaa",
            up_hours: 12,
            credits: 4,
            ita_exp_l: "asdf",
            eng_exp_l: "asdf",
            ita_cri: "asd",
            eng_cri: "asd",
            ita_act: "asw",
            eng_act: "asw",
            area_id: "SM",
            growth_id: 1,
            min_students: 15,
            max_students: 25,
            access_object: {
                    AAA: [{study_year: 1, study_address: "BIO", presidium: 0, main_study_year: 1}, {study_year: 2, study_address: "BIO", presidium: 1, main_study_year: 0}]
            },
            teaching_list: ["AT", "CAS"],
            block_id: 7,
            class_group: 1,
            teacher_list: [2,3],
            main_teachers: [0,1]
        }
        let invalid_proposal_classes = {
            ita_title: "Prova",
            eng_title: "Prova",
            ita_descr: "aaaaa",
            eng_descr: "aaaaa",
            up_hours: 12,
            credits: 4,
            ita_exp_l: "asdf",
            eng_exp_l: "asdf",
            ita_cri: "asd",
            eng_cri: "asd",
            ita_act: "asw",
            eng_act: "asw",
            area_id: "SM",
            growth_id: 1,
            min_students: 15,
            max_students: 25,
            access_object: {
                SPE: [{study_year: 1, study_address: "ECO", presidium: 0, main_study_year: 1}, {study_year: 2, study_address: "ECO", presidium: 1, main_study_year: 0}]
            },
            teaching_list: ["AT", "CAS"],
            block_id: 7,
            class_group: 1,
            teacher_list: [2,3],
            main_teachers: [0,1]
        }
        let invalid_proposal_teachings = {
            ita_title: "Prova",
            eng_title: "Prova",
            ita_descr: "aaaaa",
            eng_descr: "aaaaa",
            up_hours: 12,
            credits: 4,
            ita_exp_l: "asdf",
            eng_exp_l: "asdf",
            ita_cri: "asd",
            eng_cri: "asd",
            ita_act: "asw",
            eng_act: "asw",
            area_id: "SM",
            growth_id: 1,
            min_students: 15,
            max_students: 25,
            access_object: {
                SPE: [{study_year: 1, study_address: "BIO", presidium: 0, main_study_year: 1}, {study_year: 2, study_address: "BIO", presidium: 1, main_study_year: 0}],
                PER: [{study_year: 3, study_address: "BIO", presidium: 0, main_study_year: 1}, {study_year: 4, study_address: "ATS", presidium: 1, main_study_year: 0}]
            },
            teaching_list: [],
            block_id: 7,
            class_group: 1,
            teacher_list: [2,3],
            main_teachers: [0,1]
        }
        let invalid_proposal_teachers = {
            ita_title: "Prova",
            eng_title: "Prova",
            ita_descr: "aaaaa",
            eng_descr: "aaaaa",
            up_hours: 12,
            credits: 4,
            ita_exp_l: "asdf",
            eng_exp_l: "asdf",
            ita_cri: "asd",
            eng_cri: "asd",
            ita_act: "asw",
            eng_act: "asw",
            area_id: "SM",
            growth_id: 1,
            min_students: 15,
            max_students: 25,
            access_object: {
                    SPE: [{study_year: 1, study_address: "BIO", presidium: 0, main_study_year: 1}, {study_year: 2, study_address: "BIO", presidium: 1, main_study_year: 0}],
                    PER: [{study_year: 3, study_address: "BIO", presidium: 0, main_study_year: 1}, {study_year: 4, study_address: "ATS", presidium: 1, main_study_year: 0}]
            },
            teaching_list: ["AT", "CAS"],
            block_id: 7,
            class_group: 1,
            teacher_list: [],
            main_teachers: [0,1]
        }
        valid_proposal = {
            ita_title: "Prova",
            eng_title: "Prova",
            ita_descr: "aaaaa",
            eng_descr: "aaaaa",
            up_hours: 12,
            credits: 4,
            ita_exp_l: "asdf",
            eng_exp_l: "asdf",
            ita_cri: "asd",
            eng_cri: "asd",
            ita_act: "asw",
            eng_act: "asw",
            area_id: "SM",
            growth_id: 1,
            min_students: 15,
            max_students: 25,
            access_object: {
                    SPE: [{study_year: 1, study_address: "BIO", presidium: 0, main_study_year: 1}, {study_year: 2, study_address: "BIO", presidium: 1, main_study_year: 0}],
                    PER: [{study_year: 3, study_address: "BIO", presidium: 0, main_study_year: 1}, {study_year: 4, study_address: "ATS", presidium: 1, main_study_year: 0}]
            },
            teaching_list: ["AT", "CAS"],
            block_id: 7,
            class_group: 1,
            teacher_list: [2,3],
            main_teachers: [0,1]
        }

        test('POST /api/v1/propositions without token should respond with status 401', async () => {
            return request(app)
                .post('/api/v1/propositions')
                .expect(401)
        })

        test('POST /api/v1/propositions with invalid token should respond with status 403', async () => {
            return request(app)
                .post('/api/v1/propositions')
                .set('x-access-token', invalidToken)
                .expect(403)
        })

        test('POST /api/v1/propositions with wrong user token should respond with status 403', async () => {
            return request(app)
                .post('/api/v1/propositions')
                .set('x-access-token', wrongUserToken)
                .expect(401)
        })

        test('POST /api/v1/propositions with valid token but non valid references (learning_area_id, growth_area_id, learning_block_id) should respond with status 404', async () => {
            return request(app)
                .post('/api/v1/propositions')
                .send(invalid_proposal)
                .set('x-access-token', validTokenTeacher)
                .expect(404)
        })

        test('POST /api/v1/propositions with valid token, valid references (learning_area_id, growth_area_id, learning_block_id) but missing course informations should respond with status 400', async () => {
            return request(app)
                .post('/api/v1/propositions')
                .send(invalid_proposal_course)
                .set('x-access-token', validTokenTeacher)
                .expect(400)
        }, 20000)

        test('POST /api/v1/propositions with valid token, invalid contexts informations should respond with status 400', async () => {
            return request(app)
                .post('/api/v1/propositions')
                .send(invalid_proposal_context)
                .set('x-access-token', validTokenTeacher)
                .expect(400)
        }, 20000)

        test('POST /api/v1/propositions with valid token, invalid ordinary classes informations should respond with status 400', async () => {
            return request(app)
                .post('/api/v1/propositions')
                .send(invalid_proposal_classes)
                .set('x-access-token', validTokenTeacher)
                .expect(400)
        }, 20000)

        test('POST /api/v1/propositions with valid token, invalid teachings informations should respond with status 400', async () => {
            return request(app)
                .post('/api/v1/propositions')
                .send(invalid_proposal_teachings)
                .set('x-access-token', validTokenTeacher)
                .expect(400)
        }, 20000)

        test('POST /api/v1/propositions with valid token, valid references (learning_area_id, growth_area_id, learning_block_id) but missing project class informations should respond with status 400', async () => {
            return request(app)
                .post('/api/v1/propositions')
                .send(invalid_proposal_p_class)
                .set('x-access-token', validTokenTeacher)
                .expect(400)
        }, 20000)

        test('POST /api/v1/propositions with valid token, valid references (learning_area_id, growth_area_id, learning_block_id) but wrong teachers informations should respond with status 400', async () => {
            return request(app)
                .post('/api/v1/propositions')
                .send(invalid_proposal_teachers)
                .set('x-access-token', validTokenTeacher)
                .expect(400)
        }, 20000)

        test('POST /api/v1/propositions with valid token, valid references (learning_area_id, growth_area_id, learning_block_id) and valid informations should respond with status 201', async () => {
            return request(app)
                .post('/api/v1/propositions')
                .send(valid_proposal)
                .set('x-access-token', validTokenTeacher)
                .expect(201)
                .then((response) => {
                    course_id.push(response.body.course_id)
                });
        }, 20000)

        test('POST /api/v1/propositions with valid token, but duplicate insertion should respond with status 409', async () => {
            return request(app)
                .post('/api/v1/propositions')
                .send(valid_proposal)
                .set('x-access-token', validTokenTeacher)
                .expect(409)
        }, 20000)
    })

    describe('GET /api/v1/propositions/', () => {
        test('GET /api/v1/propositions without token should respond with status 401', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .query({teacher_id: 1, only_recent: 'false'})
                .expect(401)
        });

        test('GET /api/v1/propositions with invalid token should respond with status 403', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', invalidToken)
                .expect(403)
        });

        test('GET /api/v1/propositions/courses with valid token but of another teacher should respond with status 401', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', validTokenTeacher) 
                .query({teacher_id: 2, only_recent: 'false'})
                .expect(401)
        });

        test('GET /api/v1/propositions/courses with wrong user token should respond with status 401', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', wrongUserToken)
                .query({teacher_id: 1, only_recent: 'false'})
                .expect(401)
        });

        test('GET /api/v1/propositions/courses with valid user token but no teacher_id should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', validTokenTeacher)
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(0);
                });
        });

        test('GET /api/v1/propositions/courses with valid user token but no teacher_id and all courses proposals of the teacher should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', validTokenTeacher)
                .query({not_confirmed: 'false', only_recent: 'false'})
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                });
        });

        test('GET /api/v1/propositions/courses with valid user token (admin) but without teacher_id should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', validTokenAdmin)
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(0);
                });
        });

        test('GET /api/v1/propositions/courses with valid user token (admin) but with teacher_id should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', validTokenAdmin)
                .query({teacher_id: 1, only_recent: 'false'})
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                });
        });

        test('GET /api/v1/propositions/courses with valid user token (admin) and all courses proposals should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', validTokenAdmin)
                .query({teacher_id: 1, only_recent: 'false', not_confirmed: 'false'})
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(0);
                });
        });
    })

    afterAll(async ()=> {
        for(let i=0;i<course_id.length;i++){
            let delete_teachers = await teacherClassSchema.delete(course_id[i],valid_proposal.block_id)
            let delete_project_class = await projectclassSchema.delete(course_id[i], valid_proposal.block_id)
            let delete_teachings = await teachingCourseSchema.delete(course_id[i])
            let delete_assoc_classes = await opentoSchema.delete(course_id[i])
            let delete_course = await courseSchema.deleteProposal(course_id[i])
        }
    })
})