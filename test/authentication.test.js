const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

const userSchema = require('../models/userModel');

describe("POST /v1/auth", () => {
    describe('POST /v1/login/student_login', () => {
        let registeredStudent;
        let nonexistingStudent;
        let wrongpswStudent;

        beforeAll(async () => {
            registeredStudent = {
                username: "Student1",
                password: "Password"
            }
            nonexistingStudent = {
                username: "Studentn",
                password: "Password"
            }
            wrongpswStudent = {
                username: "Student2",
                password: "ciao"
            }
        })

        test('POST /v1/login/student_login successful', async () => {
            let response = await request(app).post('/api/v1/auth/student_login')
                .send(registeredStudent)
                .set('Accept', 'application/json')
                .expect(200)
                .then((res) => {
                    //Check response
                    expect(res.body.success).toBe(true);
                    expect(res.body.user).toBe("student");
                    expect(res.body.username).toBe("Student1");
                });
            return response;
        });

        test('POST /v1/login/student_login with wrong username', async () => {
            let response = await request(app).post('/api/v1/auth/student_login')
                .send(nonexistingStudent)
                .set('Accept', 'application/json')
                .expect(401)
                .then((res) => {
                    expect(res.body.success).toBe(false);
                });
            return response;
        });

        test('POST /v1/login/student_login with wrong password', async () => {
            let response = await request(app).post('/api/v1/auth/student_login')
                .send(wrongpswStudent)
                .set('Accept', 'application/json')
                .expect(401)
                .then((res) => {
                    expect(res.body.success).toBe(false);
                });
            return response;
        });
    })
    
    describe('POST /v1/login/teacher_login', () => {
        let registeredTeacher;
        let nonexistingTeacher;
        let wrongpswTeacher;

        beforeAll(async () => {
            registeredTeacher = {
                username: "Teacher1",
                password: "Password"
            }
            nonexistingTeacher = {
                username: "Studentn",
                password: "Password"
            }
            wrongpswTeacher = {
                username: "Teacher2",
                password: "ciao"
            }
        })

        test('POST /v1/login/teacher_login successful', async () => {
            let response = await request(app).post('/api/v1/auth/teacher_login')
                .send(registeredTeacher)
                .set('Accept', 'application/json')
                .expect(200)
                .then((res) => {
                    //Check response
                    expect(res.body.success).toBe(true);
                    expect(res.body.user).toBe("teacher");
                    expect(res.body.username).toBe("Teacher1");
                });
            return response;
        });

        test('POST /v1/login/teacher_login with wrong username', async () => {
            let response = await request(app).post('/api/v1/auth/teacher_login')
                .send(nonexistingTeacher)
                .set('Accept', 'application/json')
                .expect(401)
                .then((res) => {
                    expect(res.body.success).toBe(false);
                });
            return response;
        });

        test('POST /v1/login/teacher_login with wrong password', async () => {
            let response = await request(app).post('/api/v1/auth/teacher_login')
                .send(wrongpswTeacher)
                .set('Accept', 'application/json')
                .expect(401)
                .then((res) => {
                    expect(res.body.success).toBe(false);
                });
            return response;
        });
    })

    describe('POST /v1/login/admin_login', () => {
        let registeredAdmin;
        let nonexistingAdmin;
        let wrongpswAdmin;

        beforeAll(async () => {
            registeredAdmin = {
                username: "Admin1",
                password: "Password"
            }
            nonexistingAdmin = {
                username: "Studentn",
                password: "Password"
            }
            wrongpswAdmin = {
                username: "Admin2",
                password: "ciao"
            }
        })

        test('POST /v1/login/admin_login successful', async () => {
            let response = await request(app).post('/api/v1/auth/admin_login')
                .send(registeredAdmin)
                .set('Accept', 'application/json')
                .expect(200)
                .then((res) => {
                    //Check response
                    expect(res.body.success).toBe(true);
                    expect(res.body.user).toBe("admin");
                    expect(res.body.username).toBe("Admin1");
                });
            return response;
        });

        test('POST /v1/login/admin_login with wrong username', async () => {
            let response = await request(app).post('/api/v1/auth/admin_login')
                .send(nonexistingAdmin)
                .set('Accept', 'application/json')
                .expect(401)
                .then((res) => {
                    expect(res.body.success).toBe(false);
                });
            return response;
        });

        test('POST /v1/login/admin_login with wrong password', async () => {
            let response = await request(app).post('/api/v1/auth/admin_login')
                .send(wrongpswAdmin)
                .set('Accept', 'application/json')
                .expect(401)
                .then((res) => {
                    expect(res.body.success).toBe(false);
                });
            return response;
        });
    })
})
