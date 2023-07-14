const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const adminModel = require('../models/adminModel');

let validToken = jwt.sign({_id: 1, username: "Student1", role: "student"}, process.env.SUPER_SECRET, {expiresIn: 86400});
let invalidToken = jwt.sign({_id: 5}, "wrongsecret", {expiresIn: 86400});
let wrongUserToken = jwt.sign({_id: 1, username: "Teacher1", role: "teacher"}, process.env.SUPER_SECRET, {expiresIn: 86400});
let wrongUserToken2 = jwt.sign({_id: 1, username: "Admin1", role: "admin"}, process.env.SUPER_SECRET, {expiresIn: 86400});

describe('/api/v1/courses', () => {
    describe('GET methods tests', () => {
        describe('GET /api/v1/courses', () => {
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
                        area_id: 'SM',
                        context_id: 'SPE'
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
                        area_id: 'SM'
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

            // GET all resources with only context_id
            test('GET /api/v1/courses with only context_id as param should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/courses')
                    .query({
                        context_id: 'SPE',
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
                        area_id: 'SM',
                        context_id: 'SPE'
                    })
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                    });
            }, 20000);
        })

        describe('GET /api/v1/courses/:course_id', () => {
            // GET specific resource with non valid ID
            test('GET /api/v1/courses/:course_id with non valid ID', async () => {
                return request(app)
                    .get('/api/v1/courses/nonValidID')
                    .expect(404)
            });

            // GET specific resource without admin information
            test('GET /api/v1/courses/:course_id with valid ID', async () => {
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
            test('GET /api/v1/courses/:course_id with valid ID', async () => {
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
        
        describe('GET /api/v1/courses/:course_id/opento', () => {
            // GET resources with non valid course ID (opento)
            test('GET /api/v1/courses/:course_id/opento with non valid ID', async () => {
                return request(app)
                    .get('/api/v1/courses/nonValidID/opento')
                    .expect(404)
            });

            // GET resources with valid course ID (opento)
            test('GET /api/v1/courses/:course_id/opento with valid ID', async () => {
                return request(app)
                    .get('/api/v1/courses/2/opento')
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                    });
            });
        })

        describe('GET /api/v1/courses/:course_id/teachings', () => {
            // GET resources with non valid course ID (teachings)
            test('GET /api/v1/courses/:id/teachings with non valid ID', async () => {
                return request(app)
                    .get('/api/v1/courses/nonValidID/teachings')
                    .expect(404)
            });

            // GET resources with valid course ID (teachings)
            test('GET /api/v1/courses/:course_id/teachings with non valid ID', async () => {
                return request(app)
                    .get('/api/v1/courses/2/teachings')
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                    });
            });
        })
    })
})

describe('/api/v2/courses', () => {
    describe('GET methods tests',() => {

        // GET resources without token
        test('GET /api/v2/courses without a token', async () => {
            return request(app)
                .get('/api/v2/courses')
                .query({
                    student_id: 1,
                    block_id: 7,
                    area_id: 'SM',
                    context_id: 'SPE'
                })
                .expect(401)
        }, 20000);

        // GET resources with invalid token
        test('GET /api/v2/courses with an invalid token', async () => {
            return request(app)
                .get('/api/v2/courses')
                .set('x-access-token', invalidToken)
                .query({
                    student_id: 1,
                    block_id: 7,
                    area_id: 'SM',
                    context_id: 'SPE'
                })
                .expect(403)
        }, 20000);

        // GET resources with the token of another user
        test('GET /api/v2/courses with a token of another user', async () => {
            return request(app)
                .get('/api/v2/courses')
                .set('x-access-token', wrongUserToken)
                .query({
                    student_id: 1,
                    block_id: 7,
                    area_id: 'SM',
                    context_id: 'SPE'
                })
                .expect(401)
        }, 20000);

        // GET resources of another user with valid token
        test('GET /api/v2/courses of another user with a valid token', async () => {
            return request(app)
                .get('/api/v2/courses')
                .set('x-access-token', validToken)
                .query({
                    student_id: 2,
                    block_id: 7,
                    area_id: 'SM',
                    context_id: 'SPE'
                })
                .expect(401)
        }, 20000);

        // GET all resources with no parameters and valid token
        test('GET /api/v2/courses should respond with status 200', async () => {
            return request(app)
                .get('/api/v2/courses')
                .set('x-access-token', validToken)
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                });
        });

        // GET all resources with non valid ID and valid token
        test('GET /api/v2/courses with non valid params in query should respond with status 404', async () => {
            return request(app)
                .get('/api/v2/courses')
                .set('x-access-token', validToken)
                .query({
                    student_id: '\"nonValidID\"',
                    block_id: 7,
                    area_id: 'SM',
                    context_id: 'SPE'
                })
                .expect(401);
        }, 20000);

        // GET all resources with only block_id and token
        test('GET /api/v2/courses with only block_id as param should respond with status 200', async () => {
            return request(app)
                .get('/api/v2/courses')
                .set('x-access-token', validToken)
                .query({
                    block_id: 7
                })
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                });
        }, 20000);

        // GET all resources with only learning_area_id and token
        test('GET /api/v2/courses with only learning_area_id as param should respond with status 200', async () => {
            return request(app)
                .get('/api/v2/courses')
                .set('x-access-token', validToken)
                .query({
                    area_id: 'SM'
                })
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                });
        }, 20000);

        // GET all resources with only student_id and token
        test('GET /api/v2/courses with only student_id as param should respond with status 200', async () => {
            return request(app)
                .get('/api/v2/courses')
                .set('x-access-token', validToken)
                .query({
                    student_id: 1,
                })
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                });
        }, 20000);

        // GET all resources with only context_id and token
        test('GET /api/v2/courses with only context_id as param should respond with status 200', async () => {
            return request(app)
                .get('/api/v2/courses')
                .set('x-access-token', validToken)
                .query({
                    context_id: 'SPE',
                })
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                });
        }, 20000);

        // GET all resources with valid parameters and token
        test('GET /api/v2/courses with valid parameters should respond with status 200', async () => {
            return request(app)
                .get('/api/v2/courses')
                .set('x-access-token', validToken)
                .query({
                    student_id: 1,
                    block_id: 7,
                    area_id: 'SM',
                    context_id: 'SPE'
                })
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                });
        }, 20000);
    })
})