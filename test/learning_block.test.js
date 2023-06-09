const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
//const { response } = require('../app');

describe('/api/v1/learning_blocks', () => {
    describe('GET methods tests', () => {
        describe('GET /api/v1/learning_blocks', () => {
            //GET all the resources
            test('GET /api/v1/learning_blocks should respond with status 200', async () => {
                let response = request(app)
                    .get('/api/v1/learning_blocks')
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning block in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBeGreaterThanOrEqual(1);
                    });
                return response;
            });

            // GET all resources of a school year that does not exist
            test('GET /api/v1/learning_blocks?school_year with non existing school year should respond with status 200 but with empty data', async () => {
                let response = request(app)
                    .get('/api/v1/learning_blocks')
                    .query({school_year: 2000})
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning block in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBe(0);
                    });
                return response;
            });

            // GET all resources in a school year specified
            test('GET /api/v1/learning_blocks?school_year with existing school year should respond with status 200', async () => {
                let response = request(app)
                    .get('/api/v1/learning_blocks')
                    .query({school_year: 2022})
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning block in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBeGreaterThanOrEqual(1);
                    });
                return response;
            });

            // GET all resources linked to a specific block with non valid ID
            test('GET /api/v1/learning_blocks?year_of with non valid valid block id should respond with status 200 but empty data', async () => {
                let response = request(app)
                    .get('/api/v1/learning_blocks')
                    .query({year_of: 8})
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning block in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBe(0);
                    });
                return response;
            });

            // GET all resources linked to a specific block with valid ID
            test('GET /api/v1/learning_blocks?year_of with valid block id should respond with status 200 ', async () => {
                let response = request(app)
                    .get('/api/v1/learning_blocks')
                    .query({year_of: 5})
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning block in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBeGreaterThanOrEqual(1);
                    });
                return response;
            });
        })

        describe('GET /api/v1/learning_blocks/:block_id', () => {
            // GET specific resource with non valid ID
            test('GET /api/v1/learning_blocks/:block_id with non valid ID', async () => {
                return request(app)
                    .get('/api/v1/learning_blocks/nonValidID')
                    .expect(404);
            });
            
            // GET specific resource with non valid parameters
            test('GET /api/v1/learning_blocks/:block_id?school_year with non valid params', async () => {
                return request(app)
                    .get('/api/v1/learning_blocks/7')
                    .query({ school_year: 2022})
                    .expect(404);
            })

            // GET specific resourse
            test('GET /api/v1/learning_blocks/:block_id with valid ID', async () => {
                return request(app)
                    .get('/api/v1/learning_blocks/6')
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.number).toBe(5);
                        expect(response.body.data.school_year).toBe(2022);
                    });
            });

            // GET specific resource with valid parameters
            test('GET /api/v1/learning_blocks/:block_id?school_year with valid params', async () => {
                return request(app)
                    .get('/api/v1/learning_blocks/6')
                    .query({ school_year: 2022 })
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.number).toBe(6);
                        expect(response.body.data.school_year).toBe(2022);
                    });
            });
        })
    })

    describe('POST methods tests', () => {
        describe('POST /api/v1/learning_blocks/correspondence', () => {
            test('POST /api/v1/learning_blocks/correspondence with no parameters should return status 400', async () => {
                return request(app)
                    .post('/api/v1/learning_blocks/correspondence')
                    .expect(400);
            }) 

            test('POST /api/v1/learning_blocks/correspondence with only student_id should return status 400', async () => {
                return request(app)
                    .post('/api/v1/learning_blocks/correspondence')
                    .query({student_id: 1})
                    .expect(400);
            })

            test('POST /api/v1/learning_blocks/correspondence with empty courses should return status 400', async () => {
                let json = {courses: []}
                return request(app)
                    .post('/api/v1/learning_blocks/correspondence')
                    .query({student_id: 1})
                    .send(json)
                    .expect(400);
            })

            test('POST /api/v1/learning_blocks/correspondence with wrong params should return status 200 but empty data', async () => {
                let json = {courses: [1,2,3,4,5,6]}
                return request(app)
                    .post('/api/v1/learning_blocks/correspondence')
                    .query({student_id: 5})
                    .send(json)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(0) //Student has just arrived and is not inscribed to anything
                    });
            })

            test('POST /api/v1/learning_blocks/correspondence with valid params should return status 200', async () => {
                let json = {courses: [1,2,3,4,5,6]}
                return request(app)
                    .post('/api/v1/learning_blocks/correspondence')
                    .query({student_id: 1})
                    .send(json)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(0) //Student has just arrived and is not inscribed to anything
                    });
            })
        })
    })
})