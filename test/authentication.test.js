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

    describe("POST /v1/auth/refresh - Refresh Token System", () => {
    let studentCredentials;
    let teacherCredentials;
    let studentRefreshToken;
    let teacherRefreshToken;
    let mobileStudentRefreshToken;

    beforeAll(async () => {
      studentCredentials = {
        username: "Student1",
        password: "Password",
        device_uuid: "test-web-device-123",
      };
      teacherCredentials = {
        username: "Teacher1",
        password: "Password",
        device_uuid: "test-web-device-456",
      };
    });

    test("POST /v1/auth/student_login should return refresh_token", async () => {
      let response = await request(app)
        .post("/api/v1/auth/student_login")
        .send(studentCredentials)
        .set("Accept", "application/json")
        .expect(200)
        .then((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.token).toBeDefined();
          expect(res.body.refresh_token).toBeDefined();
          expect(res.body.user).toBe("student");
          expect(res.body.username).toBe("Student1");
          studentRefreshToken = res.body.refresh_token;
        });
      return response;
    });

    test("POST /v1/auth/teacher_login should return refresh_token", async () => {
      let response = await request(app)
        .post("/api/v1/auth/teacher_login")
        .send(teacherCredentials)
        .set("Accept", "application/json")
        .expect(200)
        .then((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.token).toBeDefined();
          expect(res.body.refresh_token).toBeDefined();
          expect(res.body.user).toBe("teacher");
          expect(res.body.username).toBe("Teacher1");
          teacherRefreshToken = res.body.refresh_token;
        });
      return response;
    });

    test("POST /v1/auth/refresh with valid student refresh_token", async () => {
      let response = await request(app)
        .post("/api/v1/auth/refresh")
        .send({ refresh_token: studentRefreshToken })
        .set("Accept", "application/json")
        .expect(200)
        .then((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.token).toBeDefined();
          expect(res.body.refresh_token).toBeDefined();
          expect(res.body.user).toBe("student");
          expect(res.body.username).toBe("Student1");
          expect(res.body.id).toBeDefined();
          expect(res.body.expirationDate).toBeDefined();
          // Il nuovo refresh_token dovrebbe essere diverso dal vecchio
          expect(res.body.refresh_token).not.toBe(studentRefreshToken);
        });
      return response;
    });

    test("POST /v1/auth/refresh with valid teacher refresh_token", async () => {
      let response = await request(app)
        .post("/api/v1/auth/refresh")
        .send({ refresh_token: teacherRefreshToken })
        .set("Accept", "application/json")
        .expect(200)
        .then((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.token).toBeDefined();
          expect(res.body.refresh_token).toBeDefined();
          expect(res.body.user).toBe("teacher");
          expect(res.body.username).toBe("Teacher1");
          expect(res.body.id).toBeDefined();
          expect(res.body.expirationDate).toBeDefined();
          // Il nuovo refresh_token dovrebbe essere diverso dal vecchio
          expect(res.body.refresh_token).not.toBe(teacherRefreshToken);
        });
      return response;
    });

    test("POST /v1/auth/refresh with old/used refresh_token should fail", async () => {
      // Usa il vecchio studentRefreshToken che è stato già utilizzato
      let response = await request(app)
        .post("/api/v1/auth/refresh")
        .send({ refresh_token: studentRefreshToken })
        .set("Accept", "application/json")
        .expect(401)
        .then((res) => {
          expect(res.body.success).toBe(false);
          expect(res.body.message).toContain(
            "Invalid or expired refresh token"
          );
        });
      return response;
    });

    test("POST /v1/auth/refresh with invalid refresh_token", async () => {
      let response = await request(app)
        .post("/api/v1/auth/refresh")
        .send({ refresh_token: "invalid_token_12345" })
        .set("Accept", "application/json")
        .expect(401)
        .then((res) => {
          expect(res.body.success).toBe(false);
          expect(res.body.message).toContain(
            "Invalid or expired refresh token"
          );
        });
      return response;
    });

    test("POST /v1/auth/refresh without refresh_token", async () => {
      let response = await request(app)
        .post("/api/v1/auth/refresh")
        .send({})
        .set("Accept", "application/json")
        .expect(401)
        .then((res) => {
          expect(res.body.success).toBe(false);
          expect(res.body.message).toContain("Refresh token is required");
        });
      return response;
    });

    test("POST /v1/auth/student_login with mobile device should return refresh_token", async () => {
      let mobileCredentials = {
        username: "Student1",
        password: "Password",
        device_uuid: "test-mobile-device-789",
      };

      let response = await request(app)
        .post("/api/v1/auth/student_login")
        .send(mobileCredentials)
        .set("Accept", "application/json")
        .set("User-Agent", "MyApp/1.0 (Android 11; Mobile)")
        .expect(200)
        .then((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.token).toBeDefined();
          expect(res.body.refresh_token).toBeDefined();
          expect(res.body.user).toBe("student");
          expect(res.body.username).toBe("Student1");
          mobileStudentRefreshToken = res.body.refresh_token;
          // Il mobile refresh token dovrebbe essere diverso da quello web
          expect(res.body.refresh_token).not.toBe(studentRefreshToken);
        });
      return response;
    });

    test("Student should have multiple active refresh tokens (web + mobile)", async () => {
      // Verifica che entrambi i token (web e mobile) funzionino
      let webRefreshResponse = await request(app)
        .post("/api/v1/auth/refresh")
        .send({ refresh_token: studentRefreshToken })
        .set("Accept", "application/json")
        .expect(200);

      let mobileRefreshResponse = await request(app)
        .post("/api/v1/auth/refresh")
        .send({ refresh_token: mobileStudentRefreshToken })
        .set("Accept", "application/json")
        .expect(200);

      expect(webRefreshResponse.body.success).toBe(true);
      expect(mobileRefreshResponse.body.success).toBe(true);
    });
  });

  describe("POST /v1/auth/logout - Logout from specific device", () => {
    let studentToken;
    let studentRefreshToken;
    let anotherRefreshToken;
    let deviceId = "test-logout-device-123";
    let anotherDeviceId = "test-another-device-456";

    beforeAll(async () => {
      // Login per ottenere un token
      let loginResponse = await request(app)
        .post("/api/v1/auth/student_login")
        .send({
          username: "Student1",
          password: "Password",
          device_uuid: deviceId
        })
        .set("Accept", "application/json")
        .expect(200);

      studentToken = loginResponse.body.token;
      studentRefreshToken = loginResponse.body.refresh_token;

      // Login da un altro dispositivo per test di sicurezza
      let anotherLoginResponse = await request(app)
        .post("/api/v1/auth/student_login")
        .send({
          username: "Student1",
          password: "Password",
          device_uuid: anotherDeviceId
        })
        .set("Accept", "application/json")
        .expect(200);

      anotherRefreshToken = anotherLoginResponse.body.refresh_token;
    });

    test("POST /v1/auth/logout should invalidate refresh token", async () => {
      // Effettua il logout usando il refresh token
      let logoutResponse = await request(app)
        .post("/api/v1/auth/logout")
        .send({ refresh_token: studentRefreshToken })
        .set("Accept", "application/json")
        .set("x-access-token", studentToken)
        .expect(200);

      expect(logoutResponse.body.success).toBe(true);
      expect(logoutResponse.body.message).toContain("Logged out successfully");

      // Verifica che il refresh token non funzioni più
      let refreshResponse = await request(app)
        .post("/api/v1/auth/refresh")
        .send({ refresh_token: studentRefreshToken })
        .set("Accept", "application/json")
        .expect(404);

      expect(refreshResponse.body.success).toBe(false);
    });

    test("POST /v1/auth/logout should NOT affect other device tokens", async () => {
      // L'altro dispositivo dovrebbe ancora funzionare
      let refreshResponse = await request(app)
        .post("/api/v1/auth/refresh")
        .send({ refresh_token: anotherRefreshToken })
        .set("Accept", "application/json")
        .expect(200);

      expect(refreshResponse.body.success).toBe(true);
    });

    test("POST /v1/auth/logout without refresh_token should fail", async () => {
      let response = await request(app)
        .post("/api/v1/auth/logout")
        .send({})
        .set("Accept", "application/json")
        .set("x-access-token", studentToken)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Refresh token is required");
    });

    test("POST /v1/auth/logout without access token should fail", async () => {
      let response = await request(app)
        .post("/api/v1/auth/logout")
        .send({ refresh_token: anotherRefreshToken })
        .set("Accept", "application/json")
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("No token provided");
    });

    test("POST /v1/auth/logout with invalid refresh_token should fail", async () => {
      let response = await request(app)
        .post("/api/v1/auth/logout")
        .send({ refresh_token: "invalid-token-xyz" })
        .set("Accept", "application/json")
        .set("x-access-token", studentToken)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("not found");
    });
  });
});
