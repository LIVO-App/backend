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
                    expect(res.body.username).toBe(false);
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
                    expect(res.body.username).toBe(true);
                    expect(res.body.password).toBe(false);
                });
            return response;
        });
    })
    
})
