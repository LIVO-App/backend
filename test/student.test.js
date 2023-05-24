const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const gradesModel = require('../models/gradesModel');

let tokenStudent3 = jwt.sign({_id: 3, username: "Student3", role: "student"}, process.env.SUPER_SECRET, {expiresIn: 86400});
let tokenStudent2 = jwt.sign({_id: 2, username: "Student2", role: "student"}, process.env.SUPER_SECRET, {expiresIn: 86400});
let invalidToken = jwt.sign({_id: 5}, "wrongsecret", {expiresIn: 86400});


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
        describe('POST /api/v1/students/:id/inscribe', () => {
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
                    .expect(403);
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
        describe('POST /api/v1/students/:id/grades', () => {
            let validToken = jwt.sign({_id: 3, username: "Teacher3", role: "teacher"}, process.env.SUPER_SECRET, {expiresIn: 86400});
            let wrongUserToken = jwt.sign({_id: 1, username: "Teacher1", role: "teacher"}, process.env.SUPER_SECRET, {expiresIn: 86400});
            let validGrades;
            let validFinalGrades;
            let wrongGrades;
            beforeAll(async () => {
                validGrades = {
                    student: 1,
                    teacher: 3,
                    course: 4,
                    block: 6,
                    ita_descr: 'Last test',
                    eng_descr: 'Last test',
                    grade: 9
                };
                validFinalGrades = {
                    student: 1,
                    teacher: 3,
                    course: 4,
                    block: 6,
                    ita_descr: 'Last test',
                    eng_descr: 'Last test',
                    grade: 9,
                    final: true
                };
                
            })
            
            test('POST /api/v1/students/:id/grades with missing token should respond with status 401', async () => {
                return request(app)
                    .post('/api/v1/students/1/grades')
                    .query({teacher_id: validGrades.teacher, course_id: validGrades.course, block_id: validGrades.block, ita_description: validGrades.ita_descr, eng_description: validGrades.eng_descr, grade: validGrades.grade})
                    .expect(401);
            })

            test('POST /api/v1/students/:id/grades with invalid token should respond with status 403', async () => {
                return request(app)
                    .post('/api/v1/students/1/grades')
                    .set('x-access-token', invalidToken)
                    .query({teacher_id: validGrades.teacher, course_id: validGrades.course, block_id: validGrades.block, ita_description: validGrades.ita_descr, eng_description: validGrades.eng_descr, grade: validGrades.grade})
                    .expect(403);
            })

            // Post resources with valid token but from wrong type of user
            test('POST /api/v1/students/:id/grades with valid token but wrong type of user should respond with status 401', async () => {
                return request(app)
                    .post('/api/v1/students/1/grades')
                    .set('x-access-token', tokenStudent2)
                    .query({teacher_id: validGrades.teacher, course_id: validGrades.course, block_id: validGrades.block, ita_description: validGrades.ita_descr, eng_description: validGrades.eng_descr, grade: validGrades.grade})
                    .expect(401);
            })

            // Post resources with valid token and right type of user but teacher of different class
            test('POST /api/v1/students/:id/grades with valid token but rigth type of user but teacher of different class should respond with status 401', async () => {
                return request(app)
                    .post('/api/v1/students/1/grades')
                    .set('x-access-token', wrongUserToken)
                    .query({teacher_id: validGrades.teacher, course_id: validGrades.course, block_id: validGrades.block, ita_description: validGrades.ita_descr, eng_description: validGrades.eng_descr, grade: validGrades.grade})
                    .expect(401);
            })

            // Post resources with valid token and non valid project class
            test('POST /api/v1/students/:id/grades with valid token and non valid project class', async () => {
                return request(app)
                    .post('/api/v1/students/1/grades')
                    .set('x-access-token', validToken)
                    .query({teacher_id: validGrades.teacher, course_id: 1, block_id: validGrades.block, ita_description: validGrades.ita_descr, eng_description: validGrades.eng_descr, grade: validGrades.grade})
                    .expect(401);
            })

            // Post resources with non valid id student and valid token
            test('POST /api/v1/students/:id/grades with valid token and non valid student id', async () => {
                return request(app)
                    .post('/api/v1/students/0/grades')
                    .set('x-access-token', validToken)
                    .query({teacher_id: validGrades.teacher, course_id: validGrades.course, block_id: validGrades.block, ita_description: validGrades.ita_descr, eng_description: validGrades.eng_descr, grade: validGrades.grade})
                    .expect(400);
            })

            // Post resources with student not enrolled in the class and valid token
            // Post resources with non valid id student and valid token
            test('POST /api/v1/students/:id/grades with valid token and non valid student id', async () => {
                return request(app)
                    .post('/api/v1/students/1/grades')
                    .set('x-access-token', validToken)
                    .query({teacher_id: validGrades.teacher, course_id: validGrades.course, block_id: 7, ita_description: validGrades.ita_descr, eng_description: validGrades.eng_descr, grade: validGrades.grade})
                    .expect(400);
            })

            // Post resources with missing required parameters
            test('POST /api/v1/students/:id/grades with valid token and missing required parameters', async () => {
                return request(app)
                    .post('/api/v1/students/1/grades')
                    .set('x-access-token', validToken)
                    .query({teacher_id: validGrades.teacher, course_id: validGrades.course, block_id: validGrades.block})
                    .expect(400);
            })

            // Post resources with right parameters (no final vote)
            test('POST /api/v1/students/:id/grades with valid token and valid parameters', async () => {
                return request(app)
                    .post('/api/v1/students/1/grades')
                    .set('x-access-token', validToken)
                    .query({teacher_id: validGrades.teacher, course_id: validGrades.course, block_id: validGrades.block, ita_description: validGrades.ita_descr, eng_description: validGrades.eng_descr, grade: validGrades.grade})
                    .expect(201);
            })

            // Post resources with right parameters (final vote)
            test('POST /api/v1/students/:id/grades with valid token and valid parameters with final grade', async () => {
                let req = request(app)
                .post('/api/v1/students/1/grades')
                .set('x-access-token', validToken)
                .query({teacher_id: validFinalGrades.teacher, course_id: validFinalGrades.course, block_id: validFinalGrades.block, ita_description: validFinalGrades.ita_descr, eng_description: validFinalGrades.eng_descr, grade: validFinalGrades.grade, final: validFinalGrades.final})
                await new Promise((req) => setTimeout(req, 2000));
                return req.expect(201);
            })        

            // Post resources in a course already concluded
            test('POST /api/v1/students/:id/grades with valid token and valid parameters but final grade inserted', async () => {  
                return request(app)
                    .post('/api/v1/students/1/grades')
                    .set('x-access-token', validToken)
                    .query({teacher_id: validGrades.teacher, course_id: validGrades.course, block_id: validGrades.block, ita_description: validGrades.ita_descr, eng_description: validGrades.eng_descr, grade: validGrades.grade})
                    .expect(403);
            })

            afterAll(async () => {
                //Delete all the grades posted
                await gradesModel.remove(validGrades.student, validGrades.course, validGrades.block, validGrades.ita_descr).then(msg => {
                    console.log(msg);
                });

            })
        })
    })

    describe('GET methods', () => {
        describe('GET /api/v1/students/:id/curriculum', () => {
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
        })

        describe('GET /api/v1/students/:id/grades', () => {
            // Get grades with non valid ID
            test('GET /api/v1/students/:id/grades with non valid ID should respond with status 404', async () =>{
                return request(app)
                    .get('/api/v1/students/0/grades')
                    .query({course_id: 5, block_id: 6})
                    .expect(404);
            })

            // Get grades with missing params (course_id)
            test('GET /api/v1/students/:id/grades with missing parameter course_id should respond with status 404', async () =>{
                return request(app)
                    .get('/api/v1/students/2/grades')
                    .query({block_id: 6})
                    .expect(404);
            })

            // Get grades with missing params (block_id)
            test('GET /api/v1/students/:id/grades with missing parameter block_id should respond with status 404', async () =>{
                return request(app)
                    .get('/api/v1/students/2/grades')
                    .query({course_id: 5})
                    .expect(404);
            })

            // Get grades with wrong params (class doesn't exist or user is not enrolled in that project class)
            test('GET /api/v1/students/:id/grades with missing parameter block_id should respond with status 404', async () =>{
                return request(app)
                    .get('/api/v1/students/2/grades')
                    .query({course_id: 5, block_id:7})
                    .expect(404);
            })

            // Get grades with valid parameters
            test('GET /api/v1/students/:id/grades with valid ID should respond with status 404', async () =>{
                return request(app)
                    .get('/api/v1/students/2/grades')
                    .query({course_id: 5, block_id: 6})
                    .expect(200);
            })
        })
    })

    describe('DELETE methods', () => {
        describe('DELETE /api/v1/students/:id/unscribe', () => {
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
})

describe('/api/v2/students', () => {
    let projectClass;
    let wrongProjectClass;
    let projectClassForMaxCredits;
    let wrongUserToken = jwt.sign({_id: 1, username: "Teacher1", role: "teacher"}, process.env.SUPER_SECRET, {expiresIn: 86400});

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
        describe('POST /api/v1/students/:id/inscribe', () => {
            // api/v1/students/:id/inscribe
            // Add student to a class with non valid ID with valid token
            test('POST /api/v2/students/:id/inscribe with non valid ID and valid token should respond 404', async () => {
                return request(app)
                    .post('/api/v2/students/NonValidID/inscribe')
                    .set('x-access-token', tokenStudent3)
                    .query({course_id: projectClass.course, block_id: projectClass.block, section: projectClass.section})
                    .expect(401);
            })

            // Add student to a class with missing params with valid token
            test('POST /api/v2/students/:id/inscribe with missing params and valid token should respond 404', async () => {
                return request(app)
                    .post('/api/v2/students/3/inscribe')
                    .set('x-access-token', tokenStudent3)
                    .expect(404);
            })

            // Add student to a class with non existing class with valid token
            test('POST /api/v2/students/:id/inscribe with non existing class and valid token should respond 404', async () => {
                return request(app)
                    .post('/api/v2/students/3/inscribe')
                    .set('x-access-token', tokenStudent3)
                    .query({course_id: wrongProjectClass.course, block_id: wrongProjectClass.block, section: wrongProjectClass.section})
                    .expect(404);
            })

            // Add a student to a class where he has all the credits for that area with valid token
            test('POST /api/v2/students/:id/inscribe with valid ID but have max number of credits for that area and valid token should respond 200', async () => {
                return request(app)
                    .post('/api/v2/students/3/inscribe')
                    .set('x-access-token', tokenStudent3)
                    .query({course_id: projectClassForMaxCredits.course, block_id: projectClassForMaxCredits.block, section: projectClassForMaxCredits.section})
                    .expect(403);
            })

            // Add student to a class without token
            test('POST /api/v2/students/:id/inscribe with valid ID without token should respond with status 401', async () => {
                return request(app)
                    .post('/api/v2/students/3/inscribe')
                    .query({course_id: projectClass.course, block_id: projectClass.block, section: projectClass.section})
                    .expect(401);
            })

            // Add student to a class with invalid token
            test('POST /api/v2/students/:id/inscribe with valid ID with invalid token should respond 403', async () => {
                return request(app)
                    .post('/api/v2/students/3/inscribe')
                    .set('x-access-token', invalidToken)
                    .query({course_id: projectClass.course, block_id: projectClass.block, section: projectClass.section})
                    .expect(403);
            })

            // Add student to a class with wrong user token
            test('POST /api/v2/students/:id/inscribe with valid ID with wrong user token should respond 401', async () => {
                return request(app)
                    .post('/api/v2/students/3/inscribe')
                    .set('x-access-token', wrongUserToken)
                    .query({course_id: projectClass.course, block_id: projectClass.block, section: projectClass.section})
                    .expect(401);
            })

            // Add student to a class with valid token but information of another student
            test('POST /api/v2/students/:id/inscribe with valid ID and valid token but of another user should respond 401', async () => {
                return request(app)
                    .post('/api/v2/students/3/inscribe')
                    .set('x-access-token', tokenStudent2)
                    .query({course_id: projectClass.course, block_id: projectClass.block, section: projectClass.section})
                    .expect(401);
            })

            // Add student to a class with valid token
            test('POST /api/v2/students/:id/inscribe with valid ID and valid token should respond 200', async () => {
                return request(app)
                    .post('/api/v2/students/3/inscribe')
                    .set('x-access-token', tokenStudent3)
                    .query({course_id: projectClass.course, block_id: projectClass.block, section: projectClass.section})
                    .expect(201);
            })

            // Add student to a class where he is currently enrolled in with valid token
            test('POST /api/v2/students/:id/inscribe with already enrolled student and valid token should respond 409', async () => {
                return request(app)
                    .post('/api/v2/students/3/inscribe')
                    .set('x-access-token', tokenStudent3)
                    .query({course_id: projectClass.course, block_id: projectClass.block, section: projectClass.section})
                    .expect(409);
            })
        })
    })

    describe('GET methods', () => {
        describe('GET /api/v2/students/:id/curriculum', () => {
            // Get curriculum with non valid ID with valid token
            test('GET /api/v2/students/:id/curriculum with non valid ID and valid token should respond with status 404', async () => {
                return request(app)
                    .get('/api/v2/students/0/curriculum')
                    .set('x-access-token', tokenStudent2)
                    .query({school_year: 2022})
                    .expect(401);
            })

            // Get curriculum without school_year param with valid token
            test('GET /api/v2/students/:id/curriculum without school_year parameter and valid token should respond with status 404', async () => {
                return request(app)
                    .get('/api/v2/students/2/curriculum')
                    .set('x-access-token', tokenStudent2)
                    .expect(404);
            })

            // Get curriculum with school_year non valid (one in which the student does not exist) with valid token
            test('GET /api/v2/students/:id/curriculum?school_year with non valid school_year parameter (the student wasn\'t enrolled in the school at that time) and valid token should respond with status 404', async () => {
                return request(app)
                    .get('/api/v2/students/2/curriculum')
                    .set('x-access-token', tokenStudent2)
                    .query({school_year: 2021})
                    .expect(404);
            })

            // Get curriculum with valid parameters without token
            test('GET /api/v2/students/:id/curriculum with valid parameters but no token should respond with status 401', async () => {
                return request(app)
                    .get('/api/v2/students/2/curriculum')
                    .query({school_year: 2022})
                    .expect(401);
            })

            // Get curriculum with valid parameters with invalid token
            test('GET /api/v2/students/:id/curriculum with valid parameters with invalid token should respond with status 403', async () => {
                return request(app)
                    .get('/api/v2/students/2/curriculum')
                    .set('x-access-token', invalidToken)
                    .query({school_year: 2022})
                    .expect(403);
            })

            // Get curriculum with valid parameters with wrong user token
            test('GET /api/v2/students/:id/curriculum with valid parameters with wrong user token should respond with status 401', async () => {
                return request(app)
                    .get('/api/v2/students/2/curriculum')
                    .set('x-access-token', wrongUserToken)
                    .query({school_year: 2022})
                    .expect(401);
            })

            // Get curriculum with valid parameters and token but info of another user
            test('GET /api/v2/students/:id/curriculum with valid parameters with valid user token but the information of another student should respond with status 401', async () => {
                return request(app)
                    .get('/api/v2/students/2/curriculum')
                    .set('x-access-token', tokenStudent3)
                    .query({school_year: 2022})
                    .expect(401);
            })

            // Get curriculum with valid parameters with valid token
            test('GET /api/v2/students/:id/curriculum with valid parameters and valid token should respond with status 200', async () => {
                return request(app)
                    .get('/api/v2/students/2/curriculum')
                    .set('x-access-token', tokenStudent2)
                    .query({school_year: 2022})
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(0); //If the pair student-school_year is valid (the student was enrolled in the system) there can be the chance that he doesn't have anything in the curriculum (for example we are at the start of the year before the start of the first learning block)
                    });
            })
        })

        describe('GET /api/v2/students/:id/grades', () => {
        // Get grades with non valid ID with valid token
            test('GET /api/v2/students/:id/grades with non valid ID and valid token should respond with status 401', async () =>{
                return request(app)
                    .get('/api/v2/students/0/grades')
                    .set('x-access-token', tokenStudent2)
                    .query({course_id: 5, block_id: 6})
                    .expect(401);
            })

            // Get grades with missing params (course_id) with valid token
            test('GET /api/v2/students/:id/grades with missing parameter course_id and valid token should respond with status 404', async () =>{
                return request(app)
                    .get('/api/v2/students/2/grades')
                    .set('x-access-token', tokenStudent2)
                    .query({block_id: 6})
                    .expect(404);
            })

            // Get grades with missing params (block_id) with valid token
            test('GET /api/v2/students/:id/grades with missing parameter block_id and valid token should respond with status 404', async () =>{
                return request(app)
                    .get('/api/v2/students/2/grades')
                    .set('x-access-token', tokenStudent2)
                    .query({course_id: 5})
                    .expect(404);
            })

            // Get grades with wrong params (class doesn't exist or user is not enrolled in that project class) with valid token
            test('GET /api/v2/students/:id/grades with missing parameter block_id and valid token should respond with status 404', async () =>{
                return request(app)
                    .get('/api/v2/students/2/grades')
                    .set('x-access-token', tokenStudent2)
                    .query({course_id: 5, block_id:7})
                    .expect(404);
            })

            // Get grades with valid parameters with valid token
            test('GET /api/v2/students/:id/grades with valid ID and valid token should respond with status 200', async () =>{
                return request(app)
                    .get('/api/v2/students/2/grades')
                    .set('x-access-token', tokenStudent2)
                    .query({course_id: 5, block_id: 6})
                    .expect(200);
            })
        })
    })

    describe('DELETE methods', () => {
        describe('DELETE /api/v2/students/:id/unscribe', () => {
            // api/v1/students/:id/inscribe
            // Delete subscription with non valid student ID with valid token
            test('DELETE /api/v2/students/:id/unscribe with non valid ID and valid token should respond with status 200', async () => {
                return request(app)
                    .delete('/api/v2/students/NonValidID/unscribe')
                    .set('x-access-token', tokenStudent3)
                    .query({course_id: projectClass.course, block_id: projectClass.block})
                    .expect(401);
            })

            // Delete subscription with missing parameters with valid token
            test('DELETE /api/v2/students/:id/unscribe with missing parameters and valid token should respond with status 400', async () => {
                return request(app)
                    .delete('/api/v2/students/3/unscribe')
                    .set('x-access-token', tokenStudent3)
                    .expect(400);
            })

            // Delete subscription with non existing class parameters with valid token
            test('DELETE /api/v2/students/:id/unscribe and valid token should respond with status 200', async () => {
                return request(app)
                    .delete('/api/v2/students/3/unscribe')
                    .set('x-access-token', tokenStudent3)
                    .query({course_id: wrongProjectClass.course, block_id: wrongProjectClass.block})
                    .expect(404);
            })
            
            // Delete student from a class (the one added at the start of the test) without token
            test('DELETE /api/v2/students/:id/unscribe without token should respond with status 401', async () => {
                return request(app)
                    .delete('/api/v2/students/3/unscribe')
                    .query({course_id: projectClass.course, block_id: projectClass.block})
                    .expect(401);
            })

            // Delete student from a class (the one added at the start of the test) with invalid token
            test('DELETE /api/v2/students/:id/unscribe with invalid token should respond with status 403', async () => {
                return request(app)
                    .delete('/api/v2/students/3/unscribe')
                    .set('x-access-token', invalidToken)
                    .query({course_id: projectClass.course, block_id: projectClass.block})
                    .expect(403);
            })

            // Delete student from a class (the one added at the start of the test) with wrong user token
            test('DELETE /api/v2/students/:id/unscribe should respond with status 401', async () => {
                return request(app)
                    .delete('/api/v2/students/3/unscribe')
                    .set('x-access-token', wrongUserToken)
                    .query({course_id: projectClass.course, block_id: projectClass.block})
                    .expect(401);
            })

            // Delete student from a class (the one added at the start of the test) with valid token but information of another user
            test('DELETE /api/v2/students/:id/unscribe and valid token but different user id should respond with status 401', async () => {
                return request(app)
                    .delete('/api/v2/students/3/unscribe')
                    .set('x-access-token', tokenStudent2)
                    .query({course_id: projectClass.course, block_id: projectClass.block})
                    .expect(401);
            })

            // Delete student from a class (the one added at the start of the test) with valid token
            test('DELETE /api/v2/students/:id/unscribe and valid token should respond with status 200', async () => {
                return request(app)
                    .delete('/api/v2/students/3/unscribe')
                    .set('x-access-token', tokenStudent3)
                    .query({course_id: projectClass.course, block_id: projectClass.block})
                    .expect(200);
            })
        })
    })
})