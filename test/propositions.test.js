const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const courseSchema = require('../models/coursesModel');
const projectclassSchema = require('../models/projectClassModel');
const teachingCourseSchema = require('../models/courseteachingModel');
const teacherClassSchema = require('../models/classesTeacherModel');
const opentoSchema = require('../models/opentoModel');

let wrongUserToken = jwt.sign({_id: 1, username: "Student1", role: "student"}, process.env.SUPER_SECRET, {expiresIn: 86400});
let invalidToken = jwt.sign({_id: 5}, "wrongsecret", {expiresIn: 86400});
let validTokenTeacher = jwt.sign({_id: 1, username: "Teacher1", role: "teacher"}, process.env.SUPER_SECRET, {expiresIn: 86400});
let validTokenAdmin = jwt.sign({_id: 1, username: "Admin1", role: "admin"}, process.env.SUPER_SECRET, {expiresIn: 86400});
let invalidTokenAdmin = jwt.sign({_id: 0, username: "Admin0", role: "admin"}, process.env.SUPER_SECRET, {expiresIn: 86400});
let course_id_1, course_id_2;
let session_id_1, session_id_2;
var valid_proposal, valid_proposal2;

describe('/api/v1/propositions', () => {
    describe('POST /api/v1/propositions', () => {
        let invalid_proposal = {}
        let invalid_proposal_course = {
            area_id: "SM",
            growth_id: 1,
            session_id: 7,
            access_object: {
                SPE: [{study_year: 1, study_address: "BIO", presidium: 0, main_study_year: 1}, {study_year: 2, study_address: "BIO", presidium: 1, main_study_year: 0}],
                PER: [{study_year: 3, study_address: "BIO", presidium: 0, main_study_year: 1}, {study_year: 4, study_address: "ATS", presidium: 1, main_study_year: 0}]
            },
            teaching_list: ["AT", "CAS"]
        }
        let invalid_proposal_p_class = {
            italian_title: "ProvaInvalidProjectClass",
            english_title: "ProvaInvalidProjectClass",
            italian_descr: "aaaaa",
            english_descr: "aaaaa",
            up_hours: 12,
            credits: 4,
            italian_exp_l: "asdf",
            english_exp_l: "asdf",
            italian_cri: "asd",
            english_cri: "asd",
            italian_act: "asw",
            english_act: "asw",
            area_id: "SM",
            growth_ids: [1,4],
            min_students: 15,
            max_students: 25,
            access_object: {
                SPE: [{study_year: 1, study_address: "BIO", presidium: 0, main_study_year: 1}, {study_year: 2, study_address: "BIO", presidium: 1, main_study_year: 0}],
                PER: [{study_year: 3, study_address: "BIO", presidium: 0, main_study_year: 1}, {study_year: 4, study_address: "ATS", presidium: 1, main_study_year: 0}]
            },
            teaching_list: ["AT", "CAS"],
            session_id: 7
        }
        let invalid_proposal_context = {
            italian_title: "ProvaInvalidContext",
            english_title: "ProvaInvalidContext",
            italian_descr: "aaaaa",
            english_descr: "aaaaa",
            up_hours: 12,
            credits: 4,
            italian_exp_l: "asdf",
            english_exp_l: "asdf",
            italian_cri: "asd",
            english_cri: "asd",
            italian_act: "asw",
            english_act: "asw",
            area_id: "SM",
            growth_ids: [1,4],
            min_students: 15,
            max_students: 25,
            access_object: {
                AAA: [{study_year: 1, study_address: "BIO", presidium: 0, main_study_year: 1}, {study_year: 2, study_address: "BIO", presidium: 1, main_study_year: 0}]
            },
            teaching_list: ["AT", "CAS"],
            session_id: 7,
            class_group: 1,
            teacher_list: [{teacher_id: 2, main: 0, sections:["A"]}, {teacher_id: 3, main: 0, sections:["A"]}, {teacher_id: 3, main: 0, sections:["A"]}]
        }
        let invalid_proposal_classes = {
            italian_title: "ProvaInvalidaClassi",
            english_title: "ProvaInvalidClass",
            italian_descr: "aaaaa",
            english_descr: "aaaaa",
            up_hours: 12,
            credits: 4,
            italian_exp_l: "asdf",
            english_exp_l: "asdf",
            italian_cri: "asd",
            english_cri: "asd",
            italian_act: "asw",
            english_act: "asw",
            area_id: "SM",
            growth_ids: [1,4],
            min_students: 15,
            max_students: 25,
            access_object: {
                SPE: [{study_year: 1, study_address: "ECO", presidium: 0, main_study_year: 1}, {study_year: 2, study_address: "ECO", presidium: 1, main_study_year: 0}]
            },
            teaching_list: ["AT", "CAS"],
            session_id: 7,
            class_group: 1,
            teacher_list: [{teacher_id: 2, main: 0, sections:["A"]}, {teacher_id: 3, main: 0, sections:["A"]}, {teacher_id: 3, main: 0, sections:["A"]}]
        }
        let invalid_proposal_teachings = {
            italian_title: "ProvaInvalidaTeachings",
            english_title: "ProvaInvalidTeachings",
            italian_descr: "aaaaa",
            english_descr: "aaaaa",
            up_hours: 12,
            credits: 4,
            italian_exp_l: "asdf",
            english_exp_l: "asdf",
            italian_cri: "asd",
            english_cri: "asd",
            italian_act: "asw",
            english_act: "asw",
            area_id: "SM",
            growth_ids: [1,4],
            min_students: 15,
            max_students: 25,
            access_object: {
                SPE: [{study_year: 1, study_address: "BIO", presidium: 0, main_study_year: 1}, {study_year: 2, study_address: "BIO", presidium: 1, main_study_year: 0}],
                PER: [{study_year: 3, study_address: "BIO", presidium: 0, main_study_year: 1}, {study_year: 4, study_address: "ATS", presidium: 1, main_study_year: 0}]
            },
            teaching_list: [],
            session_id: 7,
            class_group: 1,
            teacher_list: [{teacher_id: 2, main: 0, sections:["A"]}, {teacher_id: 3, main: 0, sections:["A"]}, {teacher_id: 3, main: 0, sections:["A"]}]
        }
        valid_proposal = {
            italian_title: "ProvaValida",
            english_title: "ProvaValid",
            italian_descr: "aaaaa",
            english_descr: "aaaaa",
            up_hours: 12,
            credits: 4,
            italian_exp_l: "asdf",
            english_exp_l: "asdf",
            italian_cri: "asd",
            english_cri: "asd",
            italian_act: "asw",
            english_act: "asw",
            area_id: "SM",
            growth_ids: [1,4],
            min_students: 15,
            max_students: 25,
            access_object: {
                SPE: [{study_year: 1, study_address: "BIO", presidium: 0, main_study_year: 1}, {study_year: 2, study_address: "BIO", presidium: 1, main_study_year: 0}],
                PER: [{study_year: 3, study_address: "BIO", presidium: 0, main_study_year: 1}, {study_year: 4, study_address: "ATS", presidium: 1, main_study_year: 0}]
            },
            teaching_list: ["AT", "CAS"],
            session_id: 7,
            class_group: 1,
            num_section: 2,
            teacher_list: [{teacher_id: 2, main: 0, sections:["A"]}, {teacher_id: 3, main: 0, sections:["A"]}, {teacher_id: 3, main: 0, sections:["A"]}]
        }
        valid_proposal2 = {
            italian_title: "Tests",
            english_title: "Tests",
            italian_descr: "aaaaa",
            english_descr: "aaaaa",
            up_hours: 12,
            credits: 4,
            italian_exp_l: "asdf",
            english_exp_l: "asdf",
            italian_cri: "asd",
            english_cri: "asd",
            italian_act: "asw",
            english_act: "asw",
            area_id: "SM",
            growth_ids: [1,4],
            min_students: 15,
            max_students: 25,
            access_object: {
                SPE: [{study_year: 1, study_address: "BIO", presidium: 0, main_study_year: 1}, {study_year: 2, study_address: "BIO", presidium: 1, main_study_year: 0}],
                PER: [{study_year: 3, study_address: "BIO", presidium: 0, main_study_year: 1}, {study_year: 4, study_address: "ATS", presidium: 1, main_study_year: 0}]
            },
            teaching_list: ["AT", "CAS"],
            session_id: 7,
            class_group: 1,
            num_section: 2,
            teacher_list: [{teacher_id: 2, main: 0, sections:["A"]}, {teacher_id: 3, main: 0, sections:["A"]}, {teacher_id: 3, main: 0, sections:["A"]}]
        }
        test('POST /api/v1/propositions without token should respond with status 401', async () => {
            return request(app)
                .post('/api/v1/propositions')
                .expect(401)
        })

        test('POST /api/v1/propositions with invalid token should respond with status 403', async () => {
            return request(app)
                .post('/api/v1/propositions')
                .set('x-access-token', invalidToken)
                .expect(403)
        })

        test('POST /api/v1/propositions with wrong user token should respond with status 403', async () => {
            return request(app)
                .post('/api/v1/propositions')
                .set('x-access-token', wrongUserToken)
                .expect(401)
        })

        test('POST /api/v1/propositions with valid token but non valid references (learning_area_id, growth_area_id, learning_session_id) should respond with status 404', async () => {
            return request(app)
                .post('/api/v1/propositions')
                .send(invalid_proposal)
                .set('x-access-token', validTokenTeacher)
                .expect(404)
        })

        test('POST /api/v1/propositions with valid token, valid references (learning_area_id, growth_area_id, learning_session_id) but missing course informations should respond with status 400', async () => {
            return request(app)
                .post('/api/v1/propositions')
                .send(invalid_proposal_course)
                .set('x-access-token', validTokenTeacher)
                .expect(400)
        }, 20000)

        test('POST /api/v1/propositions with valid token, invalid contexts informations should respond with status 400', async () => {
            return request(app)
                .post('/api/v1/propositions')
                .send(invalid_proposal_context)
                .set('x-access-token', validTokenTeacher)
                .expect(400)
        }, 20000)

        test('POST /api/v1/propositions with valid token, invalid ordinary classes informations should respond with status 400', async () => {
            return request(app)
                .post('/api/v1/propositions')
                .send(invalid_proposal_classes)
                .set('x-access-token', validTokenTeacher)
                .expect(400)
        }, 20000)

        test('POST /api/v1/propositions with valid token, invalid teachings informations should respond with status 400', async () => {
            return request(app)
                .post('/api/v1/propositions')
                .send(invalid_proposal_teachings)
                .set('x-access-token', validTokenTeacher)
                .expect(400)
        }, 20000)

        test('POST /api/v1/propositions with valid token, valid references (learning_area_id, growth_area_id, learning_session_id) but missing project class informations should respond with status 400', async () => {
            return request(app)
                .post('/api/v1/propositions')
                .send(invalid_proposal_p_class)
                .set('x-access-token', validTokenTeacher)
                .expect(400)
        }, 20000)

        test('POST /api/v1/propositions with valid token, valid references (learning_area_id, growth_area_id, learning_session_id) and valid informations should respond with status 201', async () => {
            return request(app)
                .post('/api/v1/propositions')
                .send(valid_proposal)
                .set('x-access-token', validTokenTeacher)
                .expect(201)
                .then((response) => {
                    course_id_1 = response.body.course_id
                    session_id_1 = valid_proposal.session_id
                    /*course_id.push(response.body.course_id)
                    session_id.push(valid_proposal.session_id)*/
                });
            }, 20000)            

        test('POST /api/v1/propositions with valid token, valid references (learning_area_id, growth_area_id, learning_session_id) and valid informations should respond with status 201', async () => {
            return request(app)
                .post('/api/v1/propositions')
                .send(valid_proposal2)
                .set('x-access-token', validTokenTeacher)
                .expect(201)
                .then((response) => {
                    course_id_2 = response.body.course_id
                    session_id_2 = valid_proposal2.session_id
                    /*course_id.push(response.body.course_id)
                    session_id.push(valid_proposal2.session_id)*/
                });
        }, 20000)
    })

    describe('PUT /api/v1/propositions', () => {
        describe('PUT /api/v1/propositions/approval', () => {
            test('PUT /api/v1/propositions/approval without token should respond with status 401', async () => {
                return request(app)
                    .put('/api/v1/propositions/approval')
                    .expect(401)
            })
    
            test('PUT /api/v1/propositions/approval with invalid token should respond with status 403', async () => {
                return request(app)
                    .put('/api/v1/propositions/approval')
                    .set('x-access-token', invalidToken)
                    .expect(403)
            })
    
            test('PUT /api/v1/propositions/approval with wrong user token should respond with status 403', async () => {
                return request(app)
                    .put('/api/v1/propositions/approval')
                    .set('x-access-token', wrongUserToken)
                    .expect(401)
            })
    
            test('PUT /api/v1/propositions/approval with non existing admin token should respond with status 401', async () => {
                return request(app)
                    .put('/api/v1/propositions/approval')
                    .set('x-access-token', invalidTokenAdmin)
                    .expect(401)
            })
    
            test('PUT /api/v1/propositions/approval with valid token but no parameters should respond with status 404', async () => {
                return request(app)
                    .put('/api/v1/propositions/approval')
                    .set('x-access-token', validTokenAdmin)
                    .expect(404)
            })
    
            test('PUT /api/v1/propositions/approval with valid token but non existing course should respond with status 404', async () => {
                return request(app)
                    .put('/api/v1/propositions/approval')
                    .query({course_id: 0, session_id: 7})
                    .set('x-access-token', validTokenAdmin)
                    .expect(404)
            })
    
            test('PUT /api/v1/propositions/approval with valid token but non existing session should respond with status 404', async () => {
                return request(app)
                    .put('/api/v1/propositions/approval')
                    .query({course_id: 1, session_id: 0})
                    .set('x-access-token', validTokenAdmin)
                    .expect(404)
            })
    
            test('PUT /api/v1/propositions/approval with valid token but non existing project class should respond with status 404', async () => {
                return request(app)
                    .put('/api/v1/propositions/approval')
                    .query({course_id: 1, session_id: 7})
                    .set('x-access-token', validTokenAdmin)
                    .expect(404)
            })
    
            test('PUT /api/v1/propositions/approval with valid token but valid information should respond with status 204', () => {
                return request(app)
                    .put('/api/v1/propositions/approval')
                    .query({course_id: course_id_2, session_id: session_id_2})
                    .set('x-access-token', validTokenAdmin)
                    .expect(200)
            })
    
            test('PUT /api/v1/propositions/approval with valid token but valid information and not confirmed should respond with status 204', () => {
                return request(app)
                    .put('/api/v1/propositions/approval')
                    .query({course_id: course_id_2, session_id: session_id_2, approved: "false"})
                    .set('x-access-token', validTokenAdmin)
                    .expect(200)
            })
        })

        describe('PUT /api/v1/courses/:course_id', () => {
            let non_valid_change = {
                italian_title: "Prova2",
                english_title: "Prova",
                credits: 4,
                up_hours: 10,
                area_id: "SM",
                growth_id: 1,
                min_students: 10,
                max_students: 25,
                access_object: {
                    SPE: [{study_year: 1, study_address: "BIO", presidium: 1, main_study_year: 0}, {study_year: 2, study_address: "BIO", presidium: 1, main_study_year: 0}]
                },
                session_id: 7,
                class_group: 1,
                num_section: 2,
                teacher_list: [{teacher_id: 2, main: 0, sections:["A"]}, {teacher_id: 3, main: 1, sections:["A"]}]
        }
            let valid_change = {
                    up_hours: 10,
                    access_object: {
                        SPE: [{study_year: 1, study_address: "BIO", presidium: 1, main_study_year: 0}, {study_year: 2, study_address: "BIO", presidium: 1, main_study_year: 0}]
                    },
                    session_id: 7,
                    class_group: 1,
                    num_section: 2,
                    teacher_list: [{teacher_id: 2, main: 0, sections:["A"]}, {teacher_id: 3, main: 1, sections:["A"]}]
            }
            // No token
            test('PUT /api/v1/courses/:course_id without token should respond with status 401', async () => {
                return request(app)
                    .put('/api/v1/courses/'+course_id_1)
                    .send(valid_change)
                    .expect(401)
            })

            // Invalid token
            test('PUT /api/v1/courses/:course_id with invalid token should respond with status 403', async () => {
                return request(app)
                    .put('/api/v1/courses/'+course_id_1)
                    .set('x-access-token', invalidToken)
                    .send(valid_change)
                    .expect(403)
            })

            // Wrong admin token
            test('PUT /api/v1/courses/:course_id with wrong admin token should respond with status 401', async () => {
                return request(app)
                    .put('/api/v1/courses/'+course_id_1)
                    .set('x-access-token', invalidTokenAdmin)
                    .send(valid_change)
                    .expect(401)
            })

            // Non existing course
            test('PUT /api/v1/courses/:course_id with valid token but non existing course should respond with status 404', async () => {
                return request(app)
                    .put('/api/v1/courses/0')
                    .set('x-access-token', validTokenAdmin)
                    .send(valid_change)
                    .expect(404)
            }, 20000)

            // Non existing session
            test('PUT /api/v1/courses/:course_id with valid token but non existing course should respond with status 404', async () => {
                return request(app)
                    .put('/api/v1/courses/0')
                    .set('x-access-token', validTokenAdmin)
                    .send({session_id: 0})
                    .expect(404)
            }, 20000)

            // Past session
            test('PUT /api/v1/courses/:course_id with valid token but non existing course should respond with status 400', async () => {
                return request(app)
                    .put('/api/v1/courses/'+course_id_1)
                    .set('x-access-token', validTokenAdmin)
                    .send({session_id: 1})
                    .expect(400)
            }, 20000)

            // No info to be changed
            test('PUT /api/v1/courses/:course_id with valid token but no actual changes should respond with status 400', async () => {
                return request(app)
                    .put('/api/v1/courses/'+course_id_1)
                    .set('x-access-token', validTokenAdmin)
                    .send({session_id: 7})
                    .expect(400)
            }, 20000)

            // But changes of some important information
            test('PUT /api/v1/courses/:course_id with valid token but changes on relevant information should respond with status 400', async () => {
                return request(app)
                    .put('/api/v1/courses/'+course_id_1)
                    .set('x-access-token', validTokenAdmin)
                    .send(non_valid_change)
                    .expect(400)
            }, 20000)

            // Some info per each element
            test('PUT /api/v1/courses/:course_id with valid token and changes should respond with status 200', async () => {
                return request(app)
                    .put('/api/v1/courses/'+course_id_1)
                    .set('x-access-token', validTokenAdmin)
                    .send(valid_change)
                    .expect(200)
            }, 20000)
        })
    })

    describe('GET /api/v1/propositions/', () => {
        test('GET /api/v1/propositions without token should respond with status 401', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .query({teacher_id: 1, recent_models: 'false'})
                .expect(401)
        });

        test('GET /api/v1/propositions with invalid token should respond with status 403', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', invalidToken)
                .expect(403)
        });

        test('GET /api/v1/propositions/ with valid token but of another teacher should respond with status 401', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', validTokenTeacher) 
                .query({teacher_id: 2, recent_models: 5})
                .expect(401)
        });

        test('GET /api/v1/propositions/ with wrong user token should respond with status 401', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', wrongUserToken)
                .query({teacher_id: 1, recent_models: 5})
                .expect(401)
        });

        test('GET /api/v1/propositions/ with valid user token but no teacher_id should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', validTokenTeacher)
                .query({recent_models: 5})
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                });
        });

        test('GET /api/v1/propositions/ with valid user token but no teacher_id and all courses proposals of the teacher should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', validTokenTeacher)
                .query({not_confirmed: 'false', recent_models: 0})
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                });
        });

        test('GET /api/v1/propositions/ with valid user token (admin) but without teacher_id should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', validTokenAdmin)
                .query({recent_models: 5})
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                });
        });

        test('GET /api/v1/propositions/ with valid user token (admin) but with teacher_id should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', validTokenAdmin)
                .query({teacher_id: 1, recent_models: 0})
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                });
        });

        test('GET /api/v1/propositions/ with valid user token (admin) and all courses proposals should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/propositions')
                .set('x-access-token', validTokenAdmin)
                .query({teacher_id: 1, recent_models: 0, not_confirmed: 'false'})
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                });
        });
    })

    // Tests for delete of courses is put here since the POST method for courses is in the path /propositions
    describe('DELETE /api/v1/courses/:course_id', () => {
        test('DELETE /api/v1/courses/:course_id without token should respond with status 401', async () => {
            return request(app)
                .delete("/api/v1/courses/"+course_id_1)
                .expect(401)
        })

        test('DELETE /api/v1/courses/:course_id with invalid token should respond with status 403', async () => {
            return request(app)
                .delete("/api/v1/courses/"+course_id_1)
                .set('x-access-token', invalidToken)
                .expect(403)
        })

        test('DELETE /api/v1/courses/:course_id with non existing admin token should respond with status 401', async () => {
            return request(app)
                .delete("/api/v1/courses/"+course_id_1)
                .set('x-access-token', invalidTokenAdmin)
                .expect(401)
        })

        test('DELETE /api/v1/courses/:course_id with valid token but non existing course should respond with status 404', async () => {
            return request(app)
                .delete("/api/v1/courses/0")
                .set('x-access-token', validTokenAdmin)
                .expect(404)
        })

        test('DELETE /api/v1/courses/:course_id with valid token but of a course that was already confirmed should respond with status 400', async () => {
            return request(app)
                .delete("/api/v1/courses/4")
                .set('x-access-token', validTokenAdmin)
                .expect(400)
        })

        test('DELETE /api/v1/courses/:course_id with valid token and valid conditions should respond with status 200', async () => {
            return request(app)
                .delete("/api/v1/courses/"+course_id_1)
                .set('x-access-token', validTokenAdmin)
                .expect(200)
        })

        // Done only to clear the database from the data of the added by the post
        /*test('DELETE /api/v1/courses/:course_id with valid token and valid conditions should respond with status 200', async () => {
            return request(app)
                .delete("/api/v1/courses/"+course_id_2)
                .set('x-access-token', validTokenAdmin)
                .expect(200)
        })*/
    })

    /*afterAll(async ()=> {
        for(let i=0;i<course_id.length;i++){
            await teacherClassSchema.delete(course_id[i],valid_proposal.session_id)
            await projectclassSchema.delete(course_id[i], valid_proposal.session_id)
            await teachingCourseSchema.delete(course_id[i])
            await opentoSchema.delete(course_id[i])
            await courseSchema.deleteProposal(course_id[i])
        }
    })*/
})