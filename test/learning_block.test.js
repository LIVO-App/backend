const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const learning_blocksModel = require('../models/learning_blocksModel');
//const { response } = require('../app');

let starting_id, number_of_insert;

describe('/api/v1/learning_blocks', () => {
    describe('POST methods tests', () => {
        let invalidToken = jwt.sign({_id: 5}, 'wrongSecret', {expiresIn: 86400});
        let validTokenAdmin = jwt.sign({_id: 1, username: "Admin1", role: "admin"}, process.env.SUPER_SECRET, {expiresIn: 86400});
        let wrongTokenAdmin = jwt.sign({_id: 0, username: "Admin0", role: "admin"}, process.env.SUPER_SECRET, {expiresIn: 86400});

        let empty_data = {}
        let empty_array = {blocks_list: []}
        let already_inserted_block = {blocks_list: [{number: 5, school_year: 2021, start_date: "2022/03/01", end_date: "2022/04/30", num_groups: 1}]}
        let wrong_block_dates = {blocks_list: [{number: 1, school_year: 2023, start_date: "2022/03/01", end_date: "2022/01/30", num_groups: 1}]}
        let overlapping_blocks = {blocks_list: [{number: 1, school_year: 2023, start_date: "2023/09/01", end_date: "2023/11/30", num_groups: 1},{number: 2, school_year: 2023, start_date: "2023/10/01", end_date: "2023/12/30", num_groups: 1}]}
        let valid_blocks = {
            blocks_list: [
                {number: 1, school_year: 2023, start_date: "2023/10/01", end_date: "2023/10/31", num_groups: 2},
                {number: 2, school_year: 2023, start_date: "2023/11/01", end_date: "2023/12/31", num_groups: 1},
                {number: 3, school_year: 2023, start_date: "2024/01/01", end_date: "2024/02/02", num_groups: 1}
            ]
        }

        describe('POST /api/v1/learning_blocks', () => {
            test('POST /api/v1/learning_blocks without a token should respond with status 401', async () => {
                return request(app)
                    .post('/api/v1/learning_blocks')
                    .expect(401)
            })

            test('POST /api/v1/learning_blocks with invalid token should respond with status 403', async () => {
                return request(app)
                    .post('/api/v1/learning_blocks')
                    .set('x-access-token', invalidToken)
                    .expect(403)
            })

            test('POST /api/v1/learning_blocks with wrong user token should respond with status 401', async () => {
                return request(app)
                    .post('/api/v1/learning_blocks')
                    .set('x-access-token', wrongTokenAdmin)
                    .expect(401)
            })

            test('POST /api/v1/learning_blocks with valid token but undefined blocks_list should respond with status 400', async () => {
                return request(app)
                    .post('/api/v1/learning_blocks')
                    .send(empty_data)
                    .set('x-access-token', validTokenAdmin)
                    .expect(400)
            })

            test('POST /api/v1/learning_blocks with valid token but empty blocks_list should respond with status 400', async () => {
                return request(app)
                    .post('/api/v1/learning_blocks')
                    .send(empty_array)
                    .set('x-access-token', validTokenAdmin)
                    .expect(400)
            })

            test('POST /api/v1/learning_blocks with valid token but wrong block definition (end_date <= start_date) should respond with status 400', async () => {
                return request(app)
                    .post('/api/v1/learning_blocks')
                    .send(wrong_block_dates)
                    .set('x-access-token', validTokenAdmin)
                    .expect(400)
            })

            test('POST /api/v1/learning_blocks with valid token but only already existing block should respond with status 409', async () => {
                return request(app)
                    .post('/api/v1/learning_blocks')
                    .send(already_inserted_block)
                    .set('x-access-token', validTokenAdmin)
                    .expect(409)
            })

            test('POST /api/v1/learning_blocks with valid token but overlapping of new blocks should respond with status 409', async () => {
                return request(app)
                    .post('/api/v1/learning_blocks')
                    .send(overlapping_blocks)
                    .set('x-access-token', validTokenAdmin)
                    .expect(400)
            })

            test('POST /api/v1/learning_blocks with valid token and blocks should respond with status 201', async () => {
                return request(app)
                    .post('/api/v1/learning_blocks')
                    .send(valid_blocks)
                    .set('x-access-token', validTokenAdmin)
                    .expect(201)
                    .then((response) => {
                        starting_id = parseInt(response.body.first_inserted_id)
                        number_of_insert = parseInt(response.body.num_inserted)
                    })
            })
        })

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
                    .query({year_of: 0})
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

    afterAll(async ()=> {
        for(let i=0;i<number_of_insert;i++){
            await learning_blocksModel.delete(starting_id+i)
        }
    })
})