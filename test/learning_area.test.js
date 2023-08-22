const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
//const { response } = require('../app');

describe('/api/v1/learning_areas', () => {
    describe('GET methods tests', () => {
        describe('GET /api/v1/learning_areas', () => {
            //GET all the resources
            test('GET /api/v1/learning_areas should respond with status 200', async () => {
                let response = request(app)
                    .get('/api/v1/learning_areas')
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning session in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBeGreaterThanOrEqual(1);
                    });
                return response;
            });
        })

        describe('GET /api/v1/learning_areas/:area_id', () => {
            // GET specific resource with non valid ID
            test('GET /api/v1/learning_areas/:area_id with non valid ID', async () => {
                return request(app)
                    .get('/api/v1/learning_areas/nonValidID')
                    .expect(404);
            })
            
            // GET specific resource with valid ID
            test('GET /api/v1/learning_areas/:area_id with valid ID', async () => {
                return request(app)
                    .get('/api/v1/learning_areas/SM')
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.id).toBe("SM");
                    });
            })
        })

        describe('GET /api/v1/learning_areas?session_id', () => {
            // GET all the resources from a learning session (all_data=false)
            test('GET /api/v1/learning_areas?session_id without all the data', async () => {
                return request(app)
                    .get('/api/v1/learning_areas')
                    .query({session_id: 7})
                    .expect(200)
                    .then((response) => {
                        let data = Object.keys(response.body.data[0]);
                        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                        expect(data.length).toBe(1);
                    })
            })

            // GET all the resources from a learning session (all_data)
            test('GET /api/v1/learning_areas?session_id with all the data', async () => {
                return request(app)
                    .get('/api/v1/learning_areas')
                    .query({session_id: 7, all_data: true})
                    .expect(200)
                    .then((response) => {
                        let data = Object.keys(response.body.data[0]);
                        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                        expect(data.length).toBe(5);
                    })
            })
        })
    })
    
})