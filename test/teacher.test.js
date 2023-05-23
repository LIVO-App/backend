const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

describe('/api/v1/teachers', () => {
    describe('GET methods', () => {
        // GET my project classes with missing parameters
        test('GET /api/v1/teachers/:id/my_project_classes with missing parameters should respond with status 400', async () => {
            return request(app)
                .get('/api/v1/teachers/2/my_project_classes')
                .expect(400);
        })
        
        // GET my project classes with wrong parameters
        test('GET /api/v1/teachers/:id/my_project_classes with wrong parameters should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/teachers/2/my_project_classes')
                .query({block_id: 0})
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBe(0);
                });
        })

        // GET my project classes with non valid teacher id
        test('GET /api/v1/teachers/:id/my_project_classes with non valid id should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/teachers/0/my_project_classes')
                .query({block_id: 7})
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBe(0);
                });
        })

        // GET my project classes with valid parameters
        test('GET /api/v1/teachers/:id/my_project_classes with valid parameters should respond with status 200', async () => {
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
        test('GET /api/v1/teachers/:id/associated_project_classes with wrong parameters should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/teachers/2/associated_project_classes')
                .query({block_id: 0})
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBe(0);
                });
        })

        // GET associated project classes with non valid teacher id
        test('GET /api/v1/teachers/:id/associated_project_classes with non valid id should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/teachers/0/associated_project_classes')
                .query({block_id: 7})
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBe(0);
                });
        })

        // GET associated project classes with valid parameters
        test('GET /api/v1/teachers/:id/associated_project_classes with valid parameters should respond with status 200', async () => {
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

describe('/api/v2/teachers', () => {
    let validToken = jwt.sign({_id: 2, username: "Teacher2", role: "teacher"}, process.env.SUPER_SECRET, {expiresIn: 86400});
    let invalidToken = jwt.sign({_id: 5}, "wrongsecret", {expiresIn: 86400});
    let wrongUserToken = jwt.sign({_id: 1, username: "Student1", role: "student"}, process.env.SUPER_SECRET, {expiresIn: 86400});

    describe('GET methods', () => {
        // GET my project classes with missing parameters with valid token
        test('GET /api/v2/teachers/:id/my_project_classes with missing parameters with valid token should respond with status 404', async () => {
            return request(app)
                .get('/api/v2/teachers/2/my_project_classes')
                .set('x-access-token', validToken)
                .expect(400);
        })
        
        // GET my project classes with wrong parameters
        test('GET /api/v2/teachers/:id/my_project_classes with wrong parameters and valid token should respond with status 200', async () => {
            return request(app)
                .get('/api/v2/teachers/2/my_project_classes')
                .set('x-access-token', validToken)
                .query({block_id: 0})
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBe(0);
                });
        })

        // GET my project classes with non valid teacher id
        test('GET /api/v2/teachers/:id/my_project_classes with non valid teacher id parameters and valid token should respond with status 401', async () => {
            return request(app)
                .get('/api/v2/teachers/0/my_project_classes')
                .set('x-access-token', validToken)
                .query({block_id: 7})
                .expect(401);
        })

        // GET my project classes with valid parameters but no token
        test('GET /api/v2/teachers/:id/my_project_classes with valid parameters and no token should respond with status 401', async () => {
            return request(app)
                .get('/api/v2/teachers/2/my_project_classes')
                .query({block_id: 7})
                .expect(401);
        })

        // GET my project classes with valid parameters but invalid token
        test('GET /api/v2/teachers/:id/my_project_classes with valid parameters and invalid token should respond with status 403', async () => {
            return request(app)
                .get('/api/v2/teachers/2/my_project_classes')
                .set('x-access-token', invalidToken)
                .query({block_id: 7})
                .expect(403);
        })

        // GET my project classes with valid parameters but wrong user token
        test('GET /api/v2/teachers/:id/my_project_classes with valid parameters and wrong user token should respond with status 401', async () => {
            return request(app)
                .get('/api/v2/teachers/2/my_project_classes')
                .set('x-access-token', wrongUserToken)
                .query({block_id: 7})
                .expect(401);
        })

        // GET my project classes with valid parameters and valid token
        test('GET /api/v2/teachers/:id/my_project_classes with valid parameters and valid token of another teacher should respond with status 401', async () => {
            return request(app)
                .get('/api/v2/teachers/1/my_project_classes')
                .set('x-access-token', validToken)
                .query({block_id: 7})
                .expect(401);
        })

        // GET my project classes with valid parameters
        test('GET /api/v2/teachers/:id/my_project_classes with valid parameters and valid token should respond with status 200', async () => {
            return request(app)
                .get('/api/v2/teachers/2/my_project_classes')
                .set('x-access-token', validToken)
                .query({block_id: 7})
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(0);
                });
        })

        // GET associated project classes with missing parameters and valid token
        test('GET /api/v2/teachers/:id/associated_project_classes with missing parameters and valid token should respond with status 400', async () => {
            return request(app)
                .get('/api/v2/teachers/2/associated_project_classes')
                .set('x-access-token', validToken)
                .expect(400);
        })

        // GET associated project classes with wrong parameters and valid token
        test('GET /api/v2/teachers/:id/associated_project_classes with wrong parameters and valid token should respond with status 200', async () => {
            return request(app)
                .get('/api/v2/teachers/2/associated_project_classes')
                .set('x-access-token', validToken)
                .query({block_id: 0})
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBe(0);
                });
        })

        // GET associated project classes with non valid teacher id and valid token
        test('GET /api/v2/teachers/:id/associated_project_classes with non valid id and valid token should respond with status 401', async () => {
            return request(app)
                .get('/api/v2/teachers/0/associated_project_classes')
                .set('x-access-token', validToken)
                .query({block_id: 7})
                .expect(401);
        })

        // GET associated project classes with valid parameters but no token
        test('GET /api/v2/teachers/:id/associated_project_classes with valid parameters and no token should respond with status 401', async () => {
            return request(app)
                .get('/api/v2/teachers/2/associated_project_classes')
                .query({block_id: 7})
                .expect(401);
        })

        // GET associated project classes with valid parameters and invalid token
        test('GET /api/v2/teachers/:id/associated_project_classes with valid parameters and invalid token should respond with status 403', async () => {
            return request(app)
                .get('/api/v2/teachers/2/associated_project_classes')
                .set('x-access-token', invalidToken)
                .query({block_id: 7})
                .expect(403);
        })

        // GET associated project classes with valid parameters and wrong user token
        test('GET /api/v2/teachers/:id/associated_project_classes with valid parameters and wrong user token should respond with status 401', async () => {
            return request(app)
                .get('/api/v2/teachers/2/associated_project_classes')
                .set('x-access-token', wrongUserToken)
                .query({block_id: 7})
                .expect(401);
        })

        // GET associated project classes with valid parameters and valid token but classes of another user
        test('GET /api/v2/teachers/:id/associated_project_classes with valid parameters and valid token with different id should respond with status 401', async () => {
            return request(app)
                .get('/api/v2/teachers/1/associated_project_classes')
                .set('x-access-token', validToken)
                .query({block_id: 7})
                .expect(401);
        })

        // GET associated project classes with valid parameters and valid token
        test('GET /api/v2/teachers/:id/associated_project_classes with valid parameters and valid token should respond with status 200', async () => {
            return request(app)
                .get('/api/v2/teachers/2/associated_project_classes')
                .set('x-access-token', validToken)
                .query({block_id: 7})
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(0);
                });
        })
    })
})