const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

const userSchema = require('../models/userModel');

describe("POST /v1/auth", () => {
    describe('POST /v1/login/student_login', () => {
        let registeredStudent;

        beforeAll(async () => {
            registeredStudent = {
                username: "Student1",
                password: "Password"
            }
        })

        test('POST /v1/login/student_login successful', async () => {
            let response = await request(app).post('/api/v1/auth/student_login')
                .send(registeredStudent)
                .set('Accept', 'application/json')
                .expect(200)
                .then((response) => {
                    //Check response
                    expect(response.body.success).toBe(true);
                    expect(response.body.user).toBe("student");
                    expect(response.body.username).toBe("Student1");
                });
            return response;
        });
    })
    
})
