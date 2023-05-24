const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

describe('/api/v1/project_classes', () => {
    describe('GET methods tests', () => {
        describe('GET /api/v1/project_classes/:course/:block/components', () => {
            // GET all resources with no parameters
            test('GET /api/v1/project_classes/:course/:block/components without parameters should respond with status 400', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/7/components')
                    .expect(400);
            })

            test('GET /api/v1/project_classes/:course/:block/components with invalid course id and valid params should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes/0/7/components')
                    .query({section: "A"})
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBe(0);
                    });
            })

            test('GET /api/v1/project_classes/:course/:block/components with invalid block id and valid params should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/0/components')
                    .query({section: "A"})
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBe(0);
                    });
            })

            test('GET /api/v1/project_classes/:course/:block/components with only section parameters should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/7/components')
                    .query({section: "A"})
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                    });
            })

            test('GET /api/v1/project_classes/:course/:block/components with only section and teacher_id parameters should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/7/components')
                    .query({section: "A", teacher_id: 3})
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                    });
            })

            test('GET /api/v1/project_classes/:course/:block/components without teacher parameter but with assoc_class parameter should respond with status 400', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/7/components')
                    .query({section: "A", assoc_class: true})
                    .expect(400);
            })

            test('GET /api/v1/project_classes/:course/:block/components with all parameters should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/7/components')
                    .query({section: "A", teacher_id: 3, assoc_class: true})
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                    });
            })
        })
    })
})