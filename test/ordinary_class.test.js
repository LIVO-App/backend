const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

describe('/api/v1/ordinary_classes', () => {
    describe('GET methods tests', () => {
        describe('GET /api/v1/ordinary_classes', () => {
            // GET all resources with no parameters (no credits)
            test('GET /api/v1/ordinary_classes should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes')
                    .expect(200)
                    .then((response) => {
                        let data = response.body.data[0]
                        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                    });
            });

            // GET all resources with information about credits
            test('GET /api/v1/ordinary_classes (with credits information) should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes')
                    .query({credits: true})
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                    });
            });

            // GET all resources with only student_id param (no credits)
            test('GET /api/v1/ordinary_classes?student_id without credits information should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes')
                    .query({student_id: 4})
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                    });
            });

            // GET all resources with only student_id param (with credits)
            test('GET /api/v1/ordinary_classes?student_id with credits info should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes')
                    .query({student_id: 4, credits: true})
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                    });
            });

            // GET all resources with only school_year param (no credits)
            test('GET /api/v1/ordinary_classes?school_year without credits information should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes')
                    .query({school_year: 2022})
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                    });
            });

            // GET all resources with only school_year param (with credits)
            test('GET /api/v1/ordinary_classes?school_year with credits info should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes')
                    .query({school_year: 2022, credits: true})
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                    });
            });

            // GET all resources with non valid param (no credits)
            test('GET /api/v1/ordinary_classes?student_id with non valid id should respond 404', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes')
                    .query({student_id: 0})
                    .expect(404);
            });

            // GET all resources with non valid param (with credits)
            test('GET /api/v1/ordinary_classes?student_id with non valid id and with credits information should respond 404', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes')
                    .query({student_id: 0, credits: true})
                    .expect(404)
            });

            // GET all resources with non valid param (no credits)
            test('GET /api/v1/ordinary_classes?school_year with non valid id should respond 404', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes')
                    .query({school_year: 0})
                    .expect(404);
            });

            // GET all resources with non valid param (with credits)
            test('GET /api/v1/ordinary_classes?school_year with non valid id and with credits information should respond 404', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes')
                    .query({school_year: 0, credits: true})
                    .expect(404)
            });
            // GET all resources with non valid param (no credits)
            test('GET /api/v1/ordinary_classes with non valid id should respond 404', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes')
                    .query({student_id: 0, school_year: 0})
                    .expect(404);
            });

            // GET all resources with non valid param (with credits)
            test('GET /api/v1/ordinary_classes with non valid id and with credits information should respond 404', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes')
                    .query({student_id: 0, school_year: 0, credits: true})
                    .expect(404)
            });

            // GET all resources with valid param (no credits)
            test('GET /api/v1/ordinary_classes?school_year with credits info should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes')
                    .query({student_id: 4, school_year: 2022})
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                    });
            });

            // GET all resources with valid param (with credits)
            test('GET /api/v1/ordinary_classes?school_year with credits info should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes')
                    .query({student_id: 4, school_year: 2022, credits: true})
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                    });
            });
        })

        describe('GET /api/v1/ordinary_classes/:study_year/:address/components', () => {
            let validToken = jwt.sign({_id: 1, username: "Teacher1", role: "teacher"}, process.env.SUPER_SECRET, {expiresIn: 86400});
            let validTokenWrongClass = jwt.sign({_id: 3, username: "Teacher3", role: "teacher"}, process.env.SUPER_SECRET, {expiresIn: 86400});
            let wrongUserToken = jwt.sign({_id: 1, username: "Student1", role: "student"}, process.env.SUPER_SECRET, {expiresIn: 86400});
            let invalidToken = jwt.sign({_id: 5}, 'wrongSecret', {expiresIn: 86400});
            //missing token
            test('GET /api/v1/ordinary_classes/:study_year/:address/components with missing token should respond with status 401', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes/5/BIO/components')
                    .query({school_year: 2022, section: "A"})
                    .expect(401);
            })

            //invalid token
            test('GET /api/v1/ordinary_classes/:study_year/:address/components with invalid token should respond with status 403', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes/5/BIO/components')
                    .set('x-access-token', invalidToken)
                    .query({school_year: 2022, section: "A"})
                    .expect(403);
            })

            //wrong user token
            test('GET /api/v1/ordinary_classes/:study_year/:address/components with wrong user type token should respond with status 401', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes/5/BIO/components')
                    .set('x-access-token', wrongUserToken)
                    .query({school_year: 2022, section: "A"})
                    .expect(401);
            })

            //valid token but teacher doesn't teach in that class
            test('GET /api/v1/ordinary_classes/:study_year/:address/components with valid token of a teacher that doesn\'t teach in that class should respond with status 401', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes/5/BIO/components')
                    .set('x-access-token', validTokenWrongClass)
                    .query({school_year: 2022, section: "A"})
                    .expect(401);
            })

            //valid token but missing parameters (no query)
            test('GET /api/v1/ordinary_classes/:study_year/:address/components with valid token but no parameters should respond with status 400', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes/5/BIO/components')
                    .set('x-access-token', validToken)
                    .expect(400);
            })

            //valid token but only school year
            test('GET /api/v1/ordinary_classes/:study_year/:address/components with valid token but only school_year parameter should respond with status 400', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes/5/BIO/components')
                    .set('x-access-token', validToken)
                    .query({school_year: 2022})
                    .expect(400);
            })

            // valid token but only section
            test('GET /api/v1/ordinary_classes/:study_year/:address/components with valid token but only section parameter should respond with status 400', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes/5/BIO/components')
                    .set('x-access-token', validToken)
                    .query({section: "A"})
                    .expect(400);
            })

            // valid token but wrong school year
            test('GET /api/v1/ordinary_classes/:study_year/:address/components with valid token but wrong parameters should respond with status 401', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes/5/BIO/components')
                    .set('x-access-token', validToken)
                    .query({school_year: 2000, section: "A"})
                    .expect(401);
            })

            //valid token and valid parameters
            test('GET /api/v1/ordinary_classes/:study_year/:address/components with valid token but wrong parameters should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes/5/BIO/components')
                    .set('x-access-token', validToken)
                    .query({school_year: 2022, section: "A"})
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                    });
            })

        })

        describe('GET /api/v1/ordinary_classes/:student/:block', () => {
            test('GET /api/v1/ordinary_classes/:student/:block with wrong student id should respond with status 404', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes/0/7')
                    .expect(404);
            })

            test('GET /api/v1/ordinary_classes/:student/:block with wrong block id should respond with status 404', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes/4/0')
                    .expect(404);
            })

            test('GET /api/v1/ordinary_classes/:student/:block with valid parameters but wrong combination of student-block (student was not in the school at that time) should respond with status 404', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes/1/1')
                    .expect(404);
            })

            test('GET /api/v1/ordinary_classes/:student/:block with valid parameters should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/ordinary_classes/4/7')
                    .expect(200);
            })
        })
    })
})