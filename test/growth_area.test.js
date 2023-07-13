const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
//const { response } = require('../app');

describe('/api/v1/growth_areas', () => {
    describe('GET methods tests', () => {
        describe('GET /api/v1/growth_areas', () => {
            //GET all the resources
            test('GET /api/v1/growth_areas should respond with status 200', async () => {
                let response = request(app)
                    .get('/api/v1/growth_areas')
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning block in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBeGreaterThanOrEqual(1);
                    });
                return response;
            });
        })
    })
})