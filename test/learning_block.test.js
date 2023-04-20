const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
//const { response } = require('../app');

describe('/api/v1/learning_blocks', () => {
    describe('GET methods tests', () => {
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

        // GET specific resource with non valid ID
        test('GET /api/v1/learning_blocks/:id with non valid ID', async () => {
            return request(app)
                .get('/api/v1/learning_blocks/nonValidID')
                .expect(404);
        });
        
        // GET specific resource with non valid parameters
        test('GET /api/v1/learning_blocks/:id?school_year with non valid params', async () => {
            return request(app)
                .get('/api/v1/learning_blocks/7')
                .query({ school_year: 2022})
                .expect(404);
        })

        // GET specific resourse
        test('GET /api/v1/learning_blocks/:id with valid ID', async () => {
            return request(app)
                .get('/api/v1/learning_blocks/6')
                .expect(200)
                .then((response) => {
                    expect(response.body.data.number).toBe(5);
                    expect(response.body.data.school_year).toBe(2022);
                });
        });

        // GET specific resource with valid parameters
        test('GET /api/v1/learning_blocks/:id?school_year with valid params', async () => {
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