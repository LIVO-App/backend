const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

let validToken = jwt.sign({_id: 1, username: "Teacher1", role: "teacher"}, process.env.SUPER_SECRET, {expiresIn: 86400});
let validTokenAnnouncement = jwt.sign({_id: 2, username: "Teacher2", role: "teacher"}, process.env.SUPER_SECRET, {expiresIn: 86400});
let validTokenAdmin = jwt.sign({_id: 1, username: "Admin1", role: "admin"}, process.env.SUPER_SECRET, {expiresIn: 86400});
let wrongTokenAdmin = jwt.sign({_id: 0, username: "Admin0", role: "admin"}, process.env.SUPER_SECRET, {expiresIn: 86400});
let wrongUserToken = jwt.sign({_id: 1, username: "Student1", role: "student"}, process.env.SUPER_SECRET, {expiresIn: 86400});
let invalidToken = jwt.sign({_id: 5}, 'wrongSecret', {expiresIn: 86400});

describe('/api/v1/project_classes', () => {
    describe('POST methods tests', () => {
        // We use propositions since, if we use a course_id, we add only the project class
        describe('POST /api/v1/propositions', () => {
            let valid_proposal = {
                course_id: 2,
                italian_title: "Green Power🌳🌵🪷: come le piante dominano il mondo",
                english_title: "Green Power🌳🌵🪷: how plants rule the world",
                italian_descr: "aaaaa",
                english_descr: "aaaaa",
                up_hours: 0,
                credits: 4,
                italian_exp_l: "asdf",
                english_exp_l: "asdf",
                italian_cri: "asd",
                english_cri: "asd",
                italian_act: "asw",
                english_act: "asw",
                area_id: "SM",
                growth_id: 2,
                min_students: 10,
                max_students: 15,
                block_id: 7,
                class_group: 1,
                num_section: 1,
                teacher_list: [{teacher_id: 2, main: 0, sections:["A"]}, {teacher_id: 3, main: 0, sections:["A"]}, {teacher_id: 3, main: 0, sections:["A"]}]
            }

            // Only test for valid insertion since its the same controls we have in propositions.test.js
            test('POST /api/v1/propositions with valid token, valid references (learning_area_id, growth_area_id, learning_block_id) and valid informations for project class should respond with status 201', async () => {
                return request(app)
                    .post('/api/v1/propositions')
                    .send(valid_proposal)
                    .set('x-access-token', validToken)
                    .expect(201)
            }, 20000)
        })
    })

    describe('GET methods tests', () => {
        
        describe('GET /api/v1/project_classes/', () => {
            test('GET /api/v1/project_classes without token should respond with status 401', async () => {
                return request(app)
                    .get('/api/v1/project_classes/')
                    .expect(401);
            })

            test('GET /api/v1/project_classes with invalid token should respond with status 403', async () => {
                return request(app)
                    .get('/api/v1/project_classes')
                    .set('x-access-token', invalidToken)
                    .expect(403);
            })

            test('GET /api/v1/project_classes with valid token but wrong user type should respond with status 401', async () => {
                return request(app)
                    .get('/api/v1/project_classes')
                    .set('x-access-token', validToken)
                    .expect(401);
            })

            test('GET /api/v1/project_classes with valid token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes')
                    .set('x-access-token', validTokenAdmin)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(0);
                    });
            })

            test('GET /api/v1/project_classes with valid token and block_id should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes')
                    .query({block_id:7})
                    .set('x-access-token', validTokenAdmin)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(0);
                    });
            })

            test('GET /api/v1/project_classes with valid token and year parameter should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes')
                    .query({block_id:7, year: true})
                    .set('x-access-token', validTokenAdmin)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(0);
                    });
            })

            test('GET /api/v1/project_classes with valid token and year parameter but no block_id should respond with status 404', async () => {
                return request(app)
                    .get('/api/v1/project_classes')
                    .query({year: true})
                    .set('x-access-token', validTokenAdmin)
                    .expect(400);
            })
        })

        describe('GET /api/v1/project_classes/:course/:block', () => {
            test('GET /api/v1/project_classes/:course/:block without token should respond with status 401', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/7')
                    .expect(401);
            })

            test('GET /api/v1/project_classes/:course/:block with invalid token should respond with status 403', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/7')
                    .set('x-access-token', invalidToken)
                    .expect(403);
            })

            test('GET /api/v1/project_classes/:course/:block with valid token but wrong user type should respond with status 401', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/7')
                    .set('x-access-token', wrongTokenAdmin)
                    .expect(401);
            })

            test('GET /api/v1/project_classes/:course/:block with valid token and wrong values should respond with status 404', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/1')
                    .set('x-access-token', validTokenAdmin)
                    .expect(404);
            })

            test('GET /api/v1/project_classes/:course/:block with valid token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/7')
                    .set('x-access-token', validTokenAdmin)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.course_id).toBe(5)
                        expect(response.body.data.learning_block).toBe(7)
                    });
            })
        })

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
                    .query({section: 'A', publisher_id: 2})
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
                    .get('/api/v1/project_classes/6/7/announcements')
                    .query({section: 'A'})
                    .set('x-access-token', validToken)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(0);
                    });
            })

            test('GET /api/v1/project_classes/:course/:block/announcements with valid student token but missing teacher id should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/7/announcements')
                    .query({section: 'A'})
                    .set('x-access-token', wrongUserToken) //In this case it's a valid one, it's just to not have redundant variables
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(0);
                    });
            })

            test('GET /api/v1/project_classes/:course/:block/announcements with valid token and parameters should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/7/announcements')
                    .query({section: 'A', publisher_id: 2})
                    .set('x-access-token', validTokenAnnouncement)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(0);
                    });
            })
        })

        describe('GET /api/v1/project_classes/:course/:block/teachers', () => {
            test('GET /api/v1/project_classes/:course/:block/teachers without token should respond with status 401', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/6/teachers')
                    .expect(401);
            })

            test('GET /api/v1/project_classes/:course/:block/teachers with invalid token should respond with status 403', async () => {
                return request(app)
                    .get('/api/v1/project_classes/5/6/teachers')
                    .set('x-access-token', invalidToken)
                    .expect(403);
            })

            test('GET /api/v1/project_classes/:course/:block/teachers with valid token but wrong class should respond with status 404', async () => {
                return request(app)
                    .get('/api/v1/project_classes/1/6/teachers')
                    .set('x-access-token', validToken)
                    .expect(404);
            })

            test('GET /api/v1/project_classes/:course/:block/teachers with valid token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/project_classes/6/7/teachers')
                    .set('x-access-token', validToken)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(0);
                    });
            })
        })
    })

    describe('DELETE methods tests', () => {
        describe('DELETE /api/v1/project_classes/:course/:block', () => {
            test('DELETE /api/v1/project_classes/:course/:block without token should respond with statut 401', async () => {
                return request(app)
                    .delete('/api/v1/project_classes/2/7')
                    .expect(401)
            })
            
            test('DELETE /api/v1/project_classes/:course/:block with invalid token should respond with statut 403', async () => {
                return request(app)
                    .delete('/api/v1/project_classes/2/7')
                    .set('x-access-token', invalidToken)
                    .expect(403)
            })

            test('DELETE /api/v1/project_classes/:course/:block with non existing admin token should respond with statut 401', async () => {
                return request(app)
                    .delete('/api/v1/project_classes/2/7')
                    .set('x-access-token', wrongTokenAdmin)
                    .expect(401)
            })

            test('DELETE /api/v1/project_classes/:course/:block with valid token but non existing course should respond with statut 404', async () => {
                return request(app)
                    .delete('/api/v1/project_classes/0/7')
                    .set('x-access-token', validTokenAdmin)
                    .expect(404)
            })

            test('DELETE /api/v1/project_classes/:course/:block with valid token but non existing block should respond with statut 404', async () => {
                return request(app)
                    .delete('/api/v1/project_classes/2/0')
                    .set('x-access-token', validTokenAdmin)
                    .expect(404)
            })

            test('DELETE /api/v1/project_classes/:course/:block with valid token but past block should respond with statut 400', async () => {
                return request(app)
                    .delete('/api/v1/project_classes/2/6')
                    .set('x-access-token', validTokenAdmin)
                    .expect(400)
            })

            test('DELETE /api/v1/project_classes/:course/:block with valid token but grades have already been added to it should respond with statut 400', async () => {
                return request(app)
                    .delete('/api/v1/project_classes/4/6')
                    .set('x-access-token', validTokenAdmin)
                    .expect(400)
            })

            test('DELETE /api/v1/project_classes/:course/:block with valid token and parameters should respond with statut 200', async () => {
                return request(app)
                    .delete('/api/v1/project_classes/2/7')
                    .set('x-access-token', validTokenAdmin)
                    .expect(200)
            })
        })
    })
})