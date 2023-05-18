const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

describe('/api/v1/students', () => {
    let projectClass;
    let wrongProjectClass;
    let projectClassForMaxCredits;

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
        projectClassForMaxCredits = {
            course: 6,
            block: 7,
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

        // Add a student to a class where he has all the credits for that area
        test('POST /api/v1/students/:id/inscribe with valid ID but have max number of credits for that area should respond 200', async () => {
            return request(app)
                .post('/api/v1/students/3/inscribe')
                .query({course_id: projectClassForMaxCredits.course, block_id: projectClassForMaxCredits.block, section: projectClassForMaxCredits.section})
                .expect(400);
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
                .get('/api/v1/students/0/curriculum')
                .query({school_year: 2022})
                .expect(404);
        })

        // Get curriculum without school_year param
        test('GET /api/v1/students/:id/curriculum without school_year parameter should respond with status 404', async () => {
            return request(app)
                .get('/api/v1/students/2/curriculum')
                .expect(404);
        })

        // Get curriculum with school_year non valid (one in which the student does not exist)
        test('GET /api/v1/students/:id/curriculum?school_year with non valid school_year parameter (the student wasn\'t enrolled in the school at that time) should respond with status 404', async () => {
            return request(app)
                .get('/api/v1/students/2/curriculum')
                .query({school_year: 2021})
                .expect(404);
        })

        // Get curriculum with valid parameters
        test('GET /api/v1/students/:id/curriculum with valid parameters should respond with status 200', async () => {
            return request(app)
                .get('/api/v1/students/2/curriculum')
                .query({school_year: 2022})
                .expect(200)
                .then((response) => {
                    expect(response.body.data.length).toBeGreaterThanOrEqual(0); //If the pair student-school_year is valid (the student was enrolled in the system) there can be the chance that he doesn't have anything in the curriculum (for example we are at the start of the year before the start of the first learning block)
                });
        })

        // Get grades with non valid ID
        test('GET /api/v1/students/:id/grades with non valid ID should respond with status 404', async () =>{
            return request(app)
                .get('/api/v1/students/0/curriculum')
                .query({course_id: 5, block_id: 6})
                .expect(404);
        })

        // Get grades with missing params (course_id)
        test('GET /api/v1/students/:id/grades with missing parameter course_id should respond with status 404', async () =>{
            return request(app)
                .get('/api/v1/students/2/curriculum')
                .query({block_id: 6})
                .expect(404);
        })

        // Get grades with missing params (block_id)
        test('GET /api/v1/students/:id/grades with missing parameter block_id should respond with status 404', async () =>{
            return request(app)
                .get('/api/v1/students/2/curriculum')
                .query({course_id: 5})
                .expect(404);
        })

        // Get grades with wrong params (class doesn't exist or user is not enrolled in that project class)
        test('GET /api/v1/students/:id/grades with missing parameter block_id should respond with status 404', async () =>{
            return request(app)
                .get('/api/v1/students/2/curriculum')
                .query({course_id: 5, block_id:7})
                .expect(404);
        })

        // Get grades with valid parameters
        test('GET /api/v1/students/:id/grades with non valid ID should respond with status 404', async () =>{
            return request(app)
                .get('/api/v1/students/2/curriculum')
                .query({course_id: 5, block_id: 6})
                .expect(404);
        })
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