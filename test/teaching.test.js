const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
//const { response } = require('../app');

describe('/api/v1/teachings', () => {
    describe('GET methods tests', () => {
        describe('GET /api/v1/teachings', () => {
            //GET all the resources
            test('GET /api/v1/teachings should respond with status 200', async () => {
                let response = request(app)
                    .get('/api/v1/teachings')
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 teaching in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBeGreaterThanOrEqual(1);
                    });
                return response;
            });
        })

        describe('GET /api/v1/teachings/:teaching_id', () => {
            test('GET /api/v1/teachings with wrong teaching_id should respond with status 404', async () => {
                return request(app)
                    .get('/api/v1/teachings/NonValidId')
                    .expect(404)
            })

            test('GET /api/v1/teachings with valid teaching_id should respond with status 200', async () => {
                return request(app)
                    .get('/api/v1/teachings/AT')
                    .expect(200)
            })
        })
    })
})