const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
//const { response } = require('../app');

describe('/api/v1/constraints', () => {
    describe('GET methods tests', () => {
        describe('GET /api/v1/constraints', () => {
            let invalidToken = jwt.sign({_id: 5}, 'wrongSecret', {expiresIn: 86400});
            let validTokenAdmin = jwt.sign({_id: 1, username: "Admin1", role: "admin"}, process.env.SUPER_SECRET, {expiresIn: 86400});
            let wrongTokenAdmin = jwt.sign({_id: 0, username: "Admin0", role: "admin"}, process.env.SUPER_SECRET, {expiresIn: 86400});
            test('GET /api/v1/constraints without token should respond with status 401', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .expect(401)
            });

            test('GET /api/v1/constraints with invalid token should respond with status 403', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .set('x-access-token', invalidToken)
                    .expect(403)
            });

            test('GET /api/v1/constraints with wrong token should respond with status 401', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .set('x-access-token', wrongTokenAdmin)
                    .expect(401)
            });

            //GET all the resources
            test('GET /api/v1/constraints with valid token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .set('x-access-token', validTokenAdmin)
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning block in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBeGreaterThanOrEqual(1);
                    });
            });

            test('GET /api/v1/constraints?block_id with non existing block_id and valid token should respond with status 404', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .set('x-access-token', validTokenAdmin)
                    .query({block_id: 0})
                    .expect(404);
            });

            test('GET /api/v1/constraints?block_id with existing block_id and valid token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .set('x-access-token', validTokenAdmin)
                    .query({block_id: 7})
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning block in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBeGreaterThanOrEqual(0);
                    });
            });

            test('GET /api/v1/constraints?block_id with existing block_id and year_of and valid token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .set('x-access-token', validTokenAdmin)
                    .query({block_id: 7, year_of: "true"})
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning block in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBeGreaterThanOrEqual(0);
                    });
            });

            test('GET /api/v1/constraints?block_id&area_id with non existing area_id and valid token should respond with status 404', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .set('x-access-token', validTokenAdmin)
                    .query({block_id: 0, area_id: 'AA'})
                    .expect(404);
            });

            test('GET /api/v1/constraints?block_id&area_id with existing block_id and area_id and valid token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .set('x-access-token', validTokenAdmin)
                    .query({block_id: 7, area_id: 'SM'})
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning block in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBeGreaterThanOrEqual(0);
                    });
            });

            test('GET /api/v1/constraints?block_id&area_id&context_id with non existing context_id and valid token should respond with status 404', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .set('x-access-token', validTokenAdmin)
                    .query({block_id: 0, area_id: 'SM', context_id: 'AAA'})
                    .expect(404);
            });

            test('GET /api/v1/constraints?block_id&area_id&context_id with existing block_id and area_id and context_id and valid token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .set('x-access-token', validTokenAdmin)
                    .query({block_id: 7, area_id: 'SM', context_id: 'SPE'})
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning block in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBeGreaterThanOrEqual(0);
                    });
            });

            test('GET /api/v1/constraints?block_id&area_id&context_id&study_year&study_address with non existing ordinary_class and valid token should respond with status 404', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .set('x-access-token', validTokenAdmin)
                    .query({block_id: 0, area_id: 'SM', context_id: 'SPE', study_year: 6, study_address: 'BIO'})
                    .expect(404);
            });

            test('GET /api/v1/constraints?block_id&area_id&context_id&study_year&study_address with valid parameters and token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .set('x-access-token', validTokenAdmin)
                    .query({block_id: 7, area_id: 'SM', context_id: 'SPE', study_year: 1, study_address: 'BIO'})
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning block in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBeGreaterThanOrEqual(0);
                    });
            });
        })
    })
})