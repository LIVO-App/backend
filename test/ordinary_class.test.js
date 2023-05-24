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

            /*TODO: add test for wrong combination of params giving a POST method */

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
    })
})