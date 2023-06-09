const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

describe('/api/v1/project_classes', () => {
    describe('GET methods tests', () => {
        let validToken = jwt.sign({_id: 1, username: "Teacher1", role: "teacher"}, process.env.SUPER_SECRET, {expiresIn: 86400});
        let wrongUserToken = jwt.sign({_id: 1, username: "Student1", role: "student"}, process.env.SUPER_SECRET, {expiresIn: 86400});
        let invalidToken = jwt.sign({_id: 5}, 'wrongSecret', {expiresIn: 86400});
        describe('GET /api/v1/project_classes/:course/:block/components', () => {
            // missing token
            test('GET /api/v1/project_classes/:course/:block/components with all parameters and missing token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/7/components')
                    .query({section: "A", teacher_id: 1, assoc_class: true})
                    .expect(401);
            })

            // invalid token
            test('GET /api/v1/project_classes/:course/:block/components with all parameters and invalid token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/7/components')
                    .query({section: "A", teacher_id: 1, assoc_class: true})
                    .set('x-access-token', invalidToken)
                    .expect(403);
            })

            // wrong user token
            test('GET /api/v1/project_classes/:course/:block/components with all parameters and wrong user token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/7/components')
                    .query({section: "A", teacher_id: 1, assoc_class: true})
                    .set('x-access-token', wrongUserToken)
                    .expect(401);
            })

            // valid token but wrong user id
            test('GET /api/v1/project_classes/:course/:block/components with all parameters and valid token but of the wrong teacher should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/7/components')
                    .query({section: "A", teacher_id: 3, assoc_class: true})
                    .set('x-access-token', validToken)
                    .expect(401);
            })

            // GET all resources with no parameters and valid token
            test('GET /api/v1/project_classes/:course/:block/components without parameters and valid token should respond with status 400', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/7/components')
                    .set('x-access-token', validToken)
                    .expect(400);
            })

            test('GET /api/v1/project_classes/:course/:block/components with invalid course id and valid params and valid token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes/0/7/components')
                    .set('x-access-token', validToken)
                    .query({section: "A"})
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBe(0);
                    });
            })

            test('GET /api/v1/project_classes/:course/:block/components with invalid block id and valid params and valid token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/0/components')
                    .set('x-access-token', validToken)
                    .query({section: "A"})
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBe(0);
                    });
            })

            test('GET /api/v1/project_classes/:course/:block/components with only section parameters and valid token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/7/components')
                    .set('x-access-token', validToken)
                    .query({section: "A"})
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                    });
            })

            test('GET /api/v1/project_classes/:course/:block/components with only section and teacher_id parameters and valid token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/7/components')
                    .set('x-access-token', validToken)
                    .query({section: "A", teacher_id: 1})
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                    });
            })

            test('GET /api/v1/project_classes/:course/:block/components without teacher parameter but with assoc_class parameter and valid token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/7/components')
                    .set('x-access-token', validToken)
                    .query({section: "A", assoc_class: true})
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(1)
                    });
            })

            test('GET /api/v1/project_classes/:course/:block/components with all parameters and valid token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/7/components')
                    .query({section: "A", teacher_id: 1, assoc_class: true})
                    .set('x-access-token', validToken)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                    });
            })
        })
        
        describe('GET /api/v1/project_classes/:course/:block/sections', () => {
            let validAdminToken = jwt.sign({_id: 1, username: "Admin1", role: "admin"}, process.env.SUPER_SECRET, {expiresIn: 86400});

            test('GET /api/v1/project_classes/:course/:block/sections without token should respond with status 401', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/7/sections')
                    .expect(401);
            })

            test('GET /api/v1/project_classes/:course/:block/sections with invalid token should respond with status 401', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/7/sections')
                    .set('x-access-token', invalidToken)
                    .expect(403);
            })

            test('GET /api/v1/project_classes/:course/:block/sections with wrong user token should respond with status 401', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/7/sections')
                    .set('x-access-token', wrongUserToken)
                    .expect(401);
            })

            test('GET /api/v1/project_classes/:course/:block/sections with wrong course id and valid token should respond with status 404', async () => {
                return request(app)
                    .get('/api/v1/project_classes/0/7/sections')
                    .set('x-access-token', validAdminToken)
                    .expect(404);
            })

            test('GET /api/v1/project_classes/:course/:block/sections with wrong block id and valid token should respond with status 404', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/0/sections')
                    .set('x-access-token', validAdminToken)
                    .expect(404);
            })

            test('GET /api/v1/project_classes/:course/:block/sections with valid parameters but the class does not exist in that learning block and valid token should respond with status 404', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/1/sections')
                    .set('x-access-token', validAdminToken)
                    .expect(404);
            })

            test('GET /api/v1/project_classes/:course/:block/sections with valid parameters and token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/7/sections')
                    .set('x-access-token', validAdminToken)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                    });
            })


        })

        describe('GET /api/v1/project_classes/:course/:block/announcements', () => {
            test('GET /api/v1/project_classes/:course/:block/announcements without token should respond with status 401', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/6/announcements')
                    .query({section: 'A'})
                    .expect(401);
            })

            test('GET /api/v1/project_classes/:course/:block/announcements with invalid token should respond with status 403', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/6/announcements')
                    .set('x-access-token', invalidToken)
                    .expect(403);
            })

            test('GET /api/v1/project_classes/:course/:block/announcements with valid token but wrong user id should respond with status 401', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/6/announcements')
                    .query({section: 'A', teacher_id: 2})
                    .set('x-access-token', validToken)
                    .expect(401);
            })

            test('GET /api/v1/project_classes/:course/:block/announcements with valid token but missing parameters should respond with status 400', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/6/announcements')
                    .set('x-access-token', validToken)
                    .expect(400);
            })

            test('GET /api/v1/project_classes/:course/:block/announcements with valid token but missing teacher id should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/6/announcements')
                    .query({section: 'A'})
                    .set('x-access-token', validToken)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(0);
                    });
            })

            test('GET /api/v1/project_classes/:course/:block/announcements with valid student token but missing teacher id should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/6/announcements')
                    .query({section: 'A'})
                    .set('x-access-token', wrongUserToken) //In this case it's a valid one, it's just to not have redundant variables
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(0);
                    });
            })

            test('GET /api/v1/project_classes/:course/:block/announcements with valid token and parameters should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/6/announcements')
                    .query({section: 'A', teacher_id: 2})
                    .set('x-access-token', wrongUserToken)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(0);
                    });
            })
        })
    })
})