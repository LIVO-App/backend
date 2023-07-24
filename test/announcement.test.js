const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const announcementModel = require('../models/courseAnnouncementModel');

describe('/api/v1/announcements', () => {
    let validToken = jwt.sign({_id: 1, username: "Student1", role: "student"}, process.env.SUPER_SECRET, {expiresIn: 86400});
    let validToken2 = jwt.sign({_id: 1, username: "Teacher1", role: "teacher"}, process.env.SUPER_SECRET, {expiresIn: 86400});
    let validToken3 = jwt.sign({_id: 2, username: "Teacher2", role: "teacher"}, process.env.SUPER_SECRET, {expiresIn: 86400});
    let invalidToken = jwt.sign({_id: 5}, "wrongsecret", {expiresIn: 86400});

    describe('POST methods', () => {
        describe('POST /api/v1/announcements', () => {
            let validMessage;

            beforeAll(async () => {
                validMessage = {
                    course_id: 6,
                    block_id: 7,
                    sections: ["A"],
                    italian_title: "AAA",
                    english_title: "AAA",
                    italian_message: "Ciao",
                    english_message: "Hi"
                }
            })

            // missing token
            test('POST /api/v1/announcements with missing token should respond with status 401', async () => {
                return request(app)
                    .post('/api/v1/announcements')
                    .send({
                        course_id: validMessage.course_id,
                        block_id: validMessage.block_id,
                        sections: validMessage.sections,
                        italian_title: validMessage.italian_title,
                        english_title: validMessage.english_title,
                        italian_message: validMessage.italian_message,
                        english_message: validMessage.english_message
                    })
                    .expect(401);
            })

            // invalid token
            test('POST /api/v1/announcements with invalid token should respond with status 403', async () => {
                return request(app)
                    .post('/api/v1/announcements')
                    .set('x-access-token', invalidToken)
                    .send({
                        course_id: validMessage.course_id,
                        block_id: validMessage.block_id,
                        sections: validMessage.sections,
                        italian_title: validMessage.italian_title,
                        english_title: validMessage.english_title,
                        italian_message: validMessage.italian_message,
                        english_message: validMessage.english_message
                    })
                    .expect(403);
            })

            // wrong user token
            test('POST /api/v1/announcements with valid token but of a teacher that does not teach in that class should respond with status 400', async () => {
                return request(app)
                    .post('/api/v1/announcements')
                    .set('x-access-token', validToken3)
                    .query({course_id: validMessage.course_id,block_id: validMessage.block_id})
                    .send({
                        sections: validMessage.sections,
                        italian_title: validMessage.italian_title,
                        english_title: validMessage.english_title,
                        italian_message: validMessage.italian_message,
                        english_message: validMessage.english_message
                    })
                    .expect(400);
            })

            // valid token but wrong class
            test('POST /api/v1/announcements with valid token and wrong project class should respond with status 400', async () => {
                return request(app)
                    .post('/api/v1/announcements')
                    .set('x-access-token', validToken2)
                    .query({course_id: validMessage.course_id,block_id: 2})
                    .send({
                        sections: validMessage.sections,
                        italian_title: validMessage.italian_title,
                        english_title: validMessage.english_title,
                        italian_message: validMessage.italian_message,
                        english_message: validMessage.english_message
                    })
                    .expect(400);
            })

            // valid token but missing params
            test('POST /api/v1/announcements with valid token and missing parameters should respond with status 400', async () => {
                return request(app)
                    .post('/api/v1/announcements')
                    .set('x-access-token', validToken2)
                    .query({course_id: validMessage.course_id,block_id: validMessage.block_id})
                    .send({
                        sections: validMessage.sections,
                        english_title: validMessage.english_title,
                        italian_message: validMessage.italian_message
                    })
                    .expect(400);
            })

            // valid token and correct parameters
            test('POST /api/v1/announcements with valid token and parameters should respond with status 201', async () => {
                return request(app)
                    .post('/api/v1/announcements')
                    .set('x-access-token', validToken2)
                    .query({course_id: validMessage.course_id,block_id: validMessage.block_id})
                    .send({
                        sections: validMessage.sections,
                        italian_title: validMessage.italian_title,
                        english_title: validMessage.english_title,
                        italian_message: validMessage.italian_message,
                        english_message: validMessage.english_message
                    })
                    .expect(201);
            })

            afterAll(async () => {
                //Delete all the grades posted
                await announcementModel.remove(1, validMessage.course_id, validMessage.block_id, validMessage.sections[0], validMessage.italian_title, validMessage.english_title, validMessage.italian_message, validMessage.english_message).then(msg => {
                    console.log(msg);
                })
            })      
        })
    })

    describe('GET methods', () => {
        describe('GET /api/v1/announcements/:announcement_id', () => {
            test('GET /api/v1/announcements/:announcement_id without token should respond with status 401', async () => {
                return request(app)
                    .get('/api/v1/announcements/1')
                    .expect(401)
            })

            test('GET /api/v1/announcements/:announcement_id with invalid token should respond with status 403', async () => {
                return request(app)
                    .get('/api/v1/announcements/1')
                    .set('x-access-token', invalidToken)
                    .expect(403)
            })

            test('GET /api/v1/announcements/:announcement_id with valid token and valid announcement id should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/announcements/1')
                    .set('x-access-token', validToken)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.id).toBe(1);
                    });
            })

            test('GET /api/v1/announcements/:announcement_id with valid token of another user and valid announcement id should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/announcements/1')
                    .set('x-access-token', validToken2)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.id).toBe(1);
                    });
            })

            test('GET /api/v1/announcements/:announcement_id with valid token should but non existing announcement id respond with status 404', async () => {
                return request(app)
                    .get('/api/v1/announcements/0')
                    .set('x-access-token', validToken)
                    .expect(404);
            })
        })
    })
    
})