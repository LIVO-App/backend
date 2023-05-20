const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

describe('/api/v1/students', () => {
    describe('GET methods', () => {
        // GET my project classes with missing parameters
        test('GET /api/v1/teachers/:id/my_project_classes with missing parameters should respond with status 404', async () => {
            return request(app)
                .get('/api/v1/teachers/2/my_project_classes')
                .expect(400);
        })
        
        // GET my project classes with wrong parameters
        test('GET /api/v1/teachers/:id/my_project_classes with wrong parameters should respond with status 404', async () => {
            return request(app)
                .get('/api/v1/teachers/2/my_project_classes')
                .query({block_id: 0})
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBe(0);
                });
        })

        // GET my project classes with non valid teacher id
        test('GET /api/v1/teachers/:id/my_project_classes with wrong parameters should respond with status 404', async () => {
            return request(app)
                .get('/api/v1/teachers/0/my_project_classes')
                .query({block_id: 7})
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBe(0);
                });
        })

        // GET my project classes with valid parameters
        test('GET /api/v1/teachers/:id/my_project_classes with wrong parameters should respond with status 404', async () => {
            return request(app)
                .get('/api/v1/teachers/2/my_project_classes')
                .query({block_id: 7})
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(0);
                });
        })

        // GET associated project classes with missing parameters
        test('GET /api/v1/teachers/:id/associated_project_classes with missing parameters should respond with status 404', async () => {
            return request(app)
                .get('/api/v1/teachers/2/associated_project_classes')
                .expect(400);
        })

        // GET associated project classes with wrong parameters
        test('GET /api/v1/teachers/:id/associated_project_classes with wrong parameters should respond with status 404', async () => {
            return request(app)
                .get('/api/v1/teachers/2/associated_project_classes')
                .query({block_id: 0})
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBe(0);
                });
        })

        // GET associated project classes with non valid teacher id
        test('GET /api/v1/teachers/:id/associated_project_classes with wrong parameters should respond with status 404', async () => {
            return request(app)
                .get('/api/v1/teachers/0/associated_project_classes')
                .query({block_id: 7})
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBe(0);
                });
        })

        // GET associated project classes with valid parameters
        test('GET /api/v1/teachers/:id/associated_project_classes with wrong parameters should respond with status 404', async () => {
            return request(app)
                .get('/api/v1/teachers/2/associated_project_classes')
                .query({block_id: 7})
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(0);
                });
        })
    })
})