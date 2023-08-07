const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const constraintModel = require('../models/constraintModel');
//const { response } = require('../app');

describe('/api/v1/constraints', () => {
    let invalidToken = jwt.sign({_id: 5}, 'wrongSecret', {expiresIn: 86400});
    let validTokenAdmin = jwt.sign({_id: 1, username: "Admin1", role: "admin"}, process.env.SUPER_SECRET, {expiresIn: 86400});
    let wrongTokenAdmin = jwt.sign({_id: 0, username: "Admin0", role: "admin"}, process.env.SUPER_SECRET, {expiresIn: 86400});
    let ids_to_delete = []
    describe('POST methods tests', () => {
        describe('POST /api/v1/constraints', () => {
            let invalid_const = {constraints_object: {}}
            let only_wrong_blocks = {
                constraints_object: {
                    0: [{context_id: "SPE",area_id: "SGET",credits: 4, classes: [{study_year: 1, study_address: "BIO"},{study_year: 2, study_address: "BIO"}]}],
                }
            }
            let only_wrong_constraint = {
                constraints_object: {
                    7: [{context_id: "BBB", area_id: "SGET", credits: 4, classes: [{study_year: 1, study_address: "BIO"}, {study_year: 2, study_address: "BIO"}]}, {context_id: "SPE", area_id: "AAA", credits: 4, classes: [{study_year: 1, study_address: 'BIO'}]}, {context_id: "PER", credits: 4, classes: [{study_year: 0, study_address: "ODO"}]}],
                    6: [{context_id: "AAA", area_id: "SGET", credits: 4, classes: [{study_year: 1, study_address: "BIO"}, {study_year: 2, study_address: "BIO"}]}]
                }
            }
            let valid_const = {
                constraints_object: {
                    7: [{context_id: "SPE", area_id: "SGET", credits: 4, classes: [{study_year: 1, study_address: "BIO"}, {study_year: 2, study_address: "BIO"}]}, {context_id: "SPE", area_id: "TEC", credits: 4, classes: [{study_year: 1, study_address: 'BIO'}]}, {context_id: "PER", credits: 4, classes: [{study_year: 4, study_address: "ODO"}]}],
                    6: [{context_id: "SPE", area_id: "SGET", credits: 4, classes: [{study_year: 1, study_address: "BIO"}, {study_year: 2, study_address: "BIO"}]}]
                }
            }
            
            test('POST /api/v1/constraints without token should respond with status 401', async () => {
                return request(app)
                    .post('/api/v1/constraints')
                    .expect(401)
            })

            test('POST /api/v1/constraints with invalid token should respond with status 403', async () => {
                return request(app)
                    .post('/api/v1/constraints')
                    .set('x-access-token', invalidToken)
                    .expect(403)
            })

            test('POST /api/v1/constraints with non existing user token should respond with status 401', async () => {
                return request(app)
                    .post('/api/v1/constraints')
                    .set('x-access-token', wrongTokenAdmin)
                    .expect(401)
            })

            test('POST /api/v1/constraints with valid token but empty data should respond with status 400', async () => {
                return request(app)
                    .post('/api/v1/constraints')
                    .send(invalid_const)
                    .set('x-access-token', validTokenAdmin)
                    .expect(400)
            })

            test('POST /api/v1/constraints with valid token but wrong block in the object should respond with status 400', async () => {
                return request(app)
                    .post('/api/v1/constraints')
                    .send(only_wrong_blocks)
                    .set('x-access-token', validTokenAdmin)
                    .expect(400)
                    .then((response) =>{
                        expect(response.body.wrong_block).toBe(true)
                    })
            })

            test('POST /api/v1/constraints with valid token but wrong elements in the constraints in the object should respond with status 400', async () => {
                return request(app)
                    .post('/api/v1/constraints')
                    .send(only_wrong_constraint)
                    .set('x-access-token', validTokenAdmin)
                    .expect(400)
                    .then((response) =>{
                        expect(response.body.wrong_context).toBe(true)
                        expect(response.body.wrong_area).toBe(true)
                        expect(response.body.wrong_class).toBe(true)
                    })
            })

            test('POST /api/v1/constraints with valid token and valid elements in the object should respond with status 201', async () => {
                return request(app)
                    .post('/api/v1/constraints')
                    .send(valid_const)
                    .set('x-access-token', validTokenAdmin)
                    .expect(201)
                    .then((response) =>{
                        let id = parseInt(response.body.starting_id)
                        for(let i=0;i<parseInt(response.body.num_constraints_inserted);i++){
                            ids_to_delete.push(id+i)
                        }
                    })
            })

            test('POST /api/v1/constraints with valid token and object but all duplicated constraints should respond with status 409', async () => {
                return request(app)
                    .post('/api/v1/constraints')
                    .send(valid_const)
                    .set('x-access-token', validTokenAdmin)
                    .expect(409)
                    .then((response) =>{
                        expect(response.body.constraint_present).toBe(true)
                    })
            })

            afterAll(async ()=> {
                for(let i=0;i<ids_to_delete.length;i++){
                    await constraintModel.delete_constraint(ids_to_delete[i])
                }
            })
        })
    })

    describe('GET methods tests', () => {
        describe('GET /api/v1/constraints', () => {
            
            test('GET /api/v1/constraints without token should respond with status 401', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .expect(401)
            });

            test('GET /api/v1/constraints with invalid token should respond with status 403', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .set('x-access-token', invalidToken)
                    .expect(403)
            });

            test('GET /api/v1/constraints with wrong token should respond with status 401', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .set('x-access-token', wrongTokenAdmin)
                    .expect(401)
            });

            //GET all the resources
            test('GET /api/v1/constraints with valid token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .set('x-access-token', validTokenAdmin)
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning block in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBeGreaterThanOrEqual(1);
                    });
            });

            test('GET /api/v1/constraints?block_id with non existing block_id and valid token should respond with status 404', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .set('x-access-token', validTokenAdmin)
                    .query({block_id: 0})
                    .expect(404);
            });

            test('GET /api/v1/constraints?block_id with existing block_id and valid token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .set('x-access-token', validTokenAdmin)
                    .query({block_id: 7})
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning block in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBeGreaterThanOrEqual(0);
                    });
            });

            test('GET /api/v1/constraints?block_id with existing block_id and year_of and valid token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .set('x-access-token', validTokenAdmin)
                    .query({block_id: 7, year_of: "true"})
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning block in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBeGreaterThanOrEqual(0);
                    });
            });

            test('GET /api/v1/constraints?block_id&area_id with non existing area_id and valid token should respond with status 404', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .set('x-access-token', validTokenAdmin)
                    .query({block_id: 0, area_id: 'AA'})
                    .expect(404);
            });

            test('GET /api/v1/constraints?block_id&area_id with existing block_id and area_id and valid token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .set('x-access-token', validTokenAdmin)
                    .query({block_id: 7, area_id: 'SM'})
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning block in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBeGreaterThanOrEqual(0);
                    });
            });

            test('GET /api/v1/constraints?block_id&area_id&context_id with non existing context_id and valid token should respond with status 404', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .set('x-access-token', validTokenAdmin)
                    .query({block_id: 0, area_id: 'SM', context_id: 'AAA'})
                    .expect(404);
            });

            test('GET /api/v1/constraints?block_id&area_id&context_id with existing block_id and area_id and context_id and valid token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .set('x-access-token', validTokenAdmin)
                    .query({block_id: 7, area_id: 'SM', context_id: 'SPE'})
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning block in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBeGreaterThanOrEqual(0);
                    });
            });

            test('GET /api/v1/constraints?block_id&area_id&context_id&study_year&study_address with non existing ordinary_class and valid token should respond with status 404', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .set('x-access-token', validTokenAdmin)
                    .query({block_id: 0, area_id: 'SM', context_id: 'SPE', study_year: 6, study_address: 'BIO'})
                    .expect(404);
            });

            test('GET /api/v1/constraints?block_id&area_id&context_id&study_year&study_address with valid parameters and token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/constraints')
                    .set('x-access-token', validTokenAdmin)
                    .query({block_id: 7, area_id: 'SM', context_id: 'SPE', study_year: 1, study_address: 'BIO'})
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning block in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBeGreaterThanOrEqual(0);
                    });
            });
        })
    })
})