const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
//const { response } = require('../app');

describe('/api/v1/learning_contexts', () => {
    describe('GET methods tests', () => {
        describe('GET /api/v1/learning_contexts', () => {
            //GET all the resources
            test('GET /api/v1/learning_contexts should respond with status 200', async () => {
                let response = request(app)
                    .get('/api/v1/learning_contexts')
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning session in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBeGreaterThanOrEqual(1);
                    });
                return response;
            });

            //GET all the resources
            test('GET /api/v1/learning_contexts with non valid parameters should respond with status 200 and 0 rows', async () => {
                let response = request(app)
                    .get('/api/v1/learning_contexts')
                    .query({student_id: 1, session_id: 0})
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning session in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBe(0);
                    });
                return response;
            });

            //GET all the resources
            test('GET /api/v1/learning_contexts with valid parameters should respond with status 200', async () => {
                let response = request(app)
                    .get('/api/v1/learning_contexts')
                    .query({student_id: 1, session_id: 7})
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning session in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBeGreaterThanOrEqual(1);
                    });
                return response;
            });
        })
    })

    describe('POST methods tests', () => {
        describe('POST /api/v1/learning_contexts/correspondence', () => {
            test('POST /api/v1/learning_contexts/correspondence with no parameters should return status 400', async () => {
                return request(app)
                    .post('/api/v1/learning_contexts/correspondence')
                    .expect(400);
            }) 

            test('POST /api/v1/learning_contexts/correspondence with only student_id should return status 400', async () => {
                return request(app)
                    .post('/api/v1/learning_contexts/correspondence')
                    .query({student_id: 1})
                    .expect(400);
            })

            test('POST /api/v1/learning_contexts/correspondence with empty courses should return status 400', async () => {
                let json = {courses: []}
                return request(app)
                    .post('/api/v1/learning_contexts/correspondence')
                    .query({student_id: 1, session_id: 7})
                    .send(json)
                    .expect(400);
            })

            test('POST /api/v1/learning_contexts/correspondence with wrong params should return status 200 but empty data', async () => {
                let json = {courses: [1,2,3,4,5,6]}
                return request(app)
                    .post('/api/v1/learning_contexts/correspondence')
                    .query({student_id: 5, session_id: 7})
                    .send(json)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(0) //Student has just arrived and is not subscribed to anything
                    });
            })

            test('POST /api/v1/learning_contexts/correspondence with valid params should return status 200', async () => {
                let json = {courses: [1,2,3,4,5,6]}
                return request(app)
                    .post('/api/v1/learning_contexts/correspondence')
                    .query({student_id: 1, session_id: 7})
                    .send(json)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(0) //Student has just arrived and is not subscribed to anything
                    });
            })
        })
    })
})