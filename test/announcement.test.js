const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

describe('/api/v1/announcements', () => {
    let validToken = jwt.sign({_id: 1, username: "Student1", role: "student"}, process.env.SUPER_SECRET, {expiresIn: 86400});
    let validToken2 = jwt.sign({_id: 1, username: "Teacher1", role: "teacher"}, process.env.SUPER_SECRET, {expiresIn: 86400});
    let invalidToken = jwt.sign({_id: 5}, "wrongsecret", {expiresIn: 86400});

    describe('GET methods', () => {
        describe('GET /api/v1/announcements/:announcement_id', () => {
            test('GET /api/v1/announcements/:announcement_id without token should respond with status 401', () => {
                return request(app)
                    .get('/api/v1/announcements/1')
                    .expect(401)
            })

            test('GET /api/v1/announcements/:announcement_id with invalid token should respond with status 403', () => {
                return request(app)
                    .get('/api/v1/announcements/1')
                    .set('x-access-token', invalidToken)
                    .expect(403)
            })

            test('GET /api/v1/announcements/:announcement_id with valid token and valid announcement id should respond with status 200', () => {
                return request(app)
                    .get('/api/v1/announcements/1')
                    .set('x-access-token', validToken)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.id).toBe(1);
                    });
            })

            test('GET /api/v1/announcements/:announcement_id with valid token of another user and valid announcement id should respond with status 200', () => {
                return request(app)
                    .get('/api/v1/announcements/1')
                    .set('x-access-token', validToken2)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.id).toBe(1);
                    });
            })

            test('GET /api/v1/announcements/:announcement_id with valid token should but non existing announcement id respond with status 404', () => {
                return request(app)
                    .get('/api/v1/announcements/0')
                    .set('x-access-token', validToken)
                    .expect(404);
            })
        })
    })
    
})