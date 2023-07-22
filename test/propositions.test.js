const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

let wrongUserToken = jwt.sign({_id: 1, username: "Student1", role: "student"}, process.env.SUPER_SECRET, {expiresIn: 86400});
let invalidToken = jwt.sign({_id: 5}, "wrongsecret", {expiresIn: 86400});
let validTokenTeacher = jwt.sign({_id: 1, username: "Teacher1", role: "teacher"}, process.env.SUPER_SECRET, {expiresIn: 86400});
let validTokenAdmin = jwt.sign({_id: 1, username: "Admin1", role: "admin"}, process.env.SUPER_SECRET, {expiresIn: 86400});
let course_id;

describe('/api/v1/propositions', () => {
    describe('POST /api/v1/propositions', () => {
        let valid_proposal = {
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
    })

    describe('GET /api/v1/propositions', () => {
        test('GET /api/v1/propositions without token should respond with status 401', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .query({teacher_id: 1})
                .expect(401)
        });

        test('GET /api/v1/propositions with invalid token should respond with status 403', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', invalidToken)
                .expect(403)
        });

        test('GET /api/v1/propositions with valid token but of another teacher should respond with status 401', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', validTokenTeacher) 
                .query({teacher_id: 2})
                .expect(401)
        });

        test('GET /api/v1/propositions with wrong user token should respond with status 401', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', wrongUserToken)
                .query({teacher_id: 1})
                .expect(401)
        });

        test('GET /api/v1/propositions with valid user token but no teacher_id should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', validTokenTeacher)
                .expect(200)
        });

        test('GET /api/v1/propositions with valid user token (admin) but without teacher_id should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', validTokenAdmin)
                .expect(200)
        });

        test('GET /api/v1/propositions with valid user token (admin) but with teacher_id should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', validTokenAdmin)
                .query({teacher_id: 1})
                .expect(200)
        });
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
        });

        test('GET /api/v1/propositions/courses with valid user token but no teacher_id and all courses proposals of the teacher should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', validTokenTeacher)
                .query({not_confirmed: 'false', only_recent: 'false'})
                .expect(200)
        });

        test('GET /api/v1/propositions/courses with valid user token (admin) but without teacher_id should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', validTokenAdmin)
                .expect(200)
        });

        test('GET /api/v1/propositions/courses with valid user token (admin) but with teacher_id should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', validTokenAdmin)
                .query({teacher_id: 1, only_recent: 'false'})
                .expect(200)
        });

        test('GET /api/v1/propositions/courses with valid user token (admin) and all courses proposals should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', validTokenAdmin)
                .query({teacher_id: 1, only_recent: 'false', not_confirmed: 'false'})
                .expect(200)
        });
    })
})