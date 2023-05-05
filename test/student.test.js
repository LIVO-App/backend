const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

describe('/api/v1/students', () => {
    let projectClass;
    let wrongProjectClass;

    beforeAll(async () => {
        projectClass = {
            course: 3,
            block: 7,
            section: 'A'
        }
        wrongProjectClass = {
            course: 0,
            block: 0,
            section: 'A'
        }
    })

    describe('POST methods', () => {
        // api/v1/students/:id/inscribe
        // Add student to a class with non valid ID
        test('POST /api/v1/students/:id/inscribe with non valid ID should respond 404', async () => {
            return request(app)
                .post('/api/v1/students/NonValidID/inscribe')
                .query({course_id: projectClass.course, block_id: projectClass.block, section: projectClass.section})
                .expect(400);
        })

        // Add student to a class with missing params
        test('POST /api/v1/students/:id/inscribe with missing params should respond 404', async () => {
            return request(app)
                .post('/api/v1/students/3/inscribe')
                .expect(404);
        })

        // Add student to a class with non existing class
        test('POST /api/v1/students/:id/inscribe with non existing class should respond 404', async () => {
            return request(app)
                .post('/api/v1/students/3/inscribe')
                .query({course_id: wrongProjectClass.course, block_id: wrongProjectClass.block, section: wrongProjectClass.section})
                .expect(404);
        })

        // Add student to a class
        test('POST /api/v1/students/:id/inscribe with valid ID should respond 200', async () => {
            return request(app)
                .post('/api/v1/students/3/inscribe')
                .query({course_id: projectClass.course, block_id: projectClass.block, section: projectClass.section})
                .expect(201);
        })

        // Add student to a class where he is currently enrolled in
        test('POST /api/v1/students/:id/inscribe with already enrolled student should respond 409', async () => {
            return request(app)
                .post('/api/v1/students/3/inscribe')
                .query({course_id: projectClass.course, block_id: projectClass.block, section: projectClass.section})
                .expect(409);
        })
    })

    describe('GET methods', () => {
        // Get curriculum with non valid ID
        test('GET /api/v1/students/:id/curriculum with non valid ID should respond with status 404', async () => {
            return request(app)
                .get('/api/v1/students/NonValidID/curriculum')
                .query({school_year: 2022})
                .expect(404);
        })

        // Get curriculum without school_year param

        // Get curriculum with school_year non valid (one in which the student does not exist)

        // Get curriculum with valid parameters
    })

    describe('DELETE methods', () => {
        // api/v1/students/:id/inscribe
        // Delete subscription with non valid student ID
        test('DELETE /api/v1/students/:id/unscribe with non valid ID should respond with status 200', async () => {
            return request(app)
                .delete('/api/v1/students/NonValidID/unscribe')
                .query({course_id: projectClass.course, block_id: projectClass.block})
                .expect(200)
                .then((response) => {
                    expect(response.body.description).toBe("Deleted 0 rows");
                });
        })

        // Delete subscription with missing parameters
        test('DELETE /api/v1/students/:id/unscribe with missing parameters should respond with status 400', async () => {
            return request(app)
                .delete('/api/v1/students/3/unscribe')
                .expect(400);
        })

        // Delete subscription with non existing class parameters
        test('DELETE /api/v1/students/:id/unscribe should respond with status 200', async () => {
            return request(app)
                .delete('/api/v1/students/3/unscribe')
                .query({course_id: wrongProjectClass.course, block_id: wrongProjectClass.block})
                .expect(404);
        })

        // Delete student from a class (the one added at the start of the test)
        test('DELETE /api/v1/students/:id/unscribe should respond with status 200', async () => {
            return request(app)
                .delete('/api/v1/students/3/unscribe')
                .query({course_id: projectClass.course, block_id: projectClass.block})
                .expect(200);
        })
    })
})