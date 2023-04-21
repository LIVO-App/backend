const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

describe('/api/v1/courses', () => {
    describe('GET methods tests', () => {
        // GET all resources with no parameters
        test('GET /api/v1/courses should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/courses')
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                });
        });

        // GET all resources with non valid ID
        test('GET /api/v1/courses with non valid params in query should respond with status 404', async () => {
            return request(app)
                .get('/api/v1/courses')
                .query({
                    student_id: '\"nonValidID\"',
                    block_id: 7,
                    area_id: '\"SM\"'
                })
                .expect(404);
        }, 20000);

        // GET all resources with only block_id
        test('GET /api/v1/courses with only block_id as param should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/courses')
                .query({
                    block_id: 7
                })
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                });
        }, 20000);

        // GET all resources with only learning_area_id
        test('GET /api/v1/courses with only learning_area_id as param should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/courses')
                .query({
                    area_id: '\"SM\"'
                })
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                });
        }, 20000);

        // GET all resources with only student_id
        test('GET /api/v1/courses with only student_id as param should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/courses')
                .query({
                    student_id: 1,
                })
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                });
        }, 20000);

        // GET all resources with valid parameters
        test('GET /api/v1/courses with valid parameters should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/courses')
                .query({
                    student_id: 1,
                    block_id: 7,
                    area_id: '\"SM\"'
                })
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                });
        }, 20000);

        // GET specific resource with non valid ID
        test('GET /api/v1/courses/:id with non valid ID', async () => {
            return request(app)
                .get('/api/v1/courses/nonValidID')
                .expect(404)
        });

        // GET specific resource without admin information
        test('GET /api/v1/courses/:id with valid ID', async () => {
            return request(app)
                .get('/api/v1/courses/4')
                .expect(200)
                .then((response) => {
                    let receivedDate = new Date(response.body.data.creation_date);
                    let date = new Date("2022-08-25");
                    expect(receivedDate.toISOString).toBe(date.toISOString);
                });
        });

        // GET specific resource with admin information
        test('GET /api/v1/courses/:id with valid ID', async () => {
            return request(app)
                .get('/api/v1/courses/4')
                .query({admin_info: true})
                .expect(200)
                .then((response) => {
                    let receivedDate = new Date(response.body.data.creation_date);
                    let date = new Date("2022-08-25");
                    expect(receivedDate.toISOString).toBe(date.toISOString);
                });
        });
    })
})