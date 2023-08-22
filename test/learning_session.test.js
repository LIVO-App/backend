const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const learning_sessionsModel = require('../models/learning_sessionsModel');
//const { response } = require('../app');

let invalidToken = jwt.sign({_id: 5}, 'wrongSecret', {expiresIn: 86400});
let validTokenAdmin = jwt.sign({_id: 1, username: "Admin1", role: "admin"}, process.env.SUPER_SECRET, {expiresIn: 86400});
let wrongTokenAdmin = jwt.sign({_id: 0, username: "Admin0", role: "admin"}, process.env.SUPER_SECRET, {expiresIn: 86400});
let starting_id, number_of_insert;

describe('/api/v1/learning_sessions', () => {
    describe('POST methods tests', () => {
        let empty_data = {}
        let empty_array = {sessions_list: []}
        let wrong_open_day_date = {sessions_list: [{number: 1, school_year: 2023, start_date: "2023/10/01", end_date: "2023/10/31", num_groups: 2, open_day: "2023/10/18"}]}
        let already_inserted_session = {sessions_list: [{number: 5, school_year: 2021, start_date: "2022/03/01", end_date: "2022/04/30", num_groups: 1, open_day: "2022/02/18"}]}
        let wrong_session_dates = {sessions_list: [{number: 1, school_year: 2023, start_date: "2022/03/01", end_date: "2022/01/30", num_groups: 1, open_day: "2022/02/18"}]}
        let overlapping_sessions = {sessions_list: [{number: 1, school_year: 2023, start_date: "2023/09/01", end_date: "2023/11/30", num_groups: 1, open_day: "2023/08/10"},{number: 2, school_year: 2023, start_date: "2023/10/01", end_date: "2023/12/30", num_groups: 1, open_day: "2023/09/18"}]}
        let valid_sessions = {
            sessions_list: [
                {number: 1, school_year: 2023, start_date: "2023/10/01", end_date: "2023/10/31", num_groups: 2, open_day: "2023/09/18"},
                {number: 2, school_year: 2023, start_date: "2023/11/01", end_date: "2023/12/31", num_groups: 1, open_day: "2023/10/18"},
                {number: 3, school_year: 2023, start_date: "2024/01/01", end_date: "2024/02/02", num_groups: 1, open_day: "2023/12/18"}
            ]
        }

        describe('POST /api/v1/learning_sessions', () => {
            test('POST /api/v1/learning_sessions without a token should respond with status 401', async () => {
                return request(app)
                    .post('/api/v1/learning_sessions')
                    .expect(401)
            })

            test('POST /api/v1/learning_sessions with invalid token should respond with status 403', async () => {
                return request(app)
                    .post('/api/v1/learning_sessions')
                    .set('x-access-token', invalidToken)
                    .expect(403)
            })

            test('POST /api/v1/learning_sessions with wrong user token should respond with status 401', async () => {
                return request(app)
                    .post('/api/v1/learning_sessions')
                    .set('x-access-token', wrongTokenAdmin)
                    .expect(401)
            })

            test('POST /api/v1/learning_sessions with valid token but undefined sessions_list should respond with status 400', async () => {
                return request(app)
                    .post('/api/v1/learning_sessions')
                    .send(empty_data)
                    .set('x-access-token', validTokenAdmin)
                    .expect(400)
            })

            test('POST /api/v1/learning_sessions with valid token but empty sessions_list should respond with status 400', async () => {
                return request(app)
                    .post('/api/v1/learning_sessions')
                    .send(empty_array)
                    .set('x-access-token', validTokenAdmin)
                    .expect(400)
            })

            test('POST /api/v1/learning_sessions with valid token but wrong open day date definition (start_date <= open_day) should respond with status 400', async () => {
                return request(app)
                    .post('/api/v1/learning_sessions')
                    .send(wrong_open_day_date)
                    .set('x-access-token', validTokenAdmin)
                    .expect(400)
            })

            test('POST /api/v1/learning_sessions with valid token but wrong session definition (end_date <= start_date) should respond with status 400', async () => {
                return request(app)
                    .post('/api/v1/learning_sessions')
                    .send(wrong_session_dates)
                    .set('x-access-token', validTokenAdmin)
                    .expect(400)
            })

            test('POST /api/v1/learning_sessions with valid token but only already existing session should respond with status 409', async () => {
                return request(app)
                    .post('/api/v1/learning_sessions')
                    .send(already_inserted_session)
                    .set('x-access-token', validTokenAdmin)
                    .expect(409)
            })

            test('POST /api/v1/learning_sessions with valid token but overlapping of new sessions should respond with status 409', async () => {
                return request(app)
                    .post('/api/v1/learning_sessions')
                    .send(overlapping_sessions)
                    .set('x-access-token', validTokenAdmin)
                    .expect(400)
            })

            test('POST /api/v1/learning_sessions with valid token and sessions should respond with status 201', async () => {
                return request(app)
                    .post('/api/v1/learning_sessions')
                    .send(valid_sessions)
                    .set('x-access-token', validTokenAdmin)
                    .expect(201)
                    .then((response) => {
                        starting_id = parseInt(response.body.first_inserted_id)
                        number_of_insert = parseInt(response.body.num_inserted)
                    })
            })
        })

        describe('POST /api/v1/learning_sessions/correspondence', () => {
            test('POST /api/v1/learning_sessions/correspondence with no parameters should return status 400', async () => {
                return request(app)
                    .post('/api/v1/learning_sessions/correspondence')
                    .expect(400);
            }) 

            test('POST /api/v1/learning_sessions/correspondence with only student_id should return status 400', async () => {
                return request(app)
                    .post('/api/v1/learning_sessions/correspondence')
                    .query({student_id: 1})
                    .expect(400);
            })

            test('POST /api/v1/learning_sessions/correspondence with empty courses should return status 400', async () => {
                let json = {courses: []}
                return request(app)
                    .post('/api/v1/learning_sessions/correspondence')
                    .query({student_id: 1})
                    .send(json)
                    .expect(400);
            })

            test('POST /api/v1/learning_sessions/correspondence with wrong params should return status 200 but empty data', async () => {
                let json = {courses: [1,2,3,4,5,6]}
                return request(app)
                    .post('/api/v1/learning_sessions/correspondence')
                    .query({student_id: 5})
                    .send(json)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(0) //Student has just arrived and is not inscribed to anything
                    });
            })

            test('POST /api/v1/learning_sessions/correspondence with valid params should return status 200', async () => {
                let json = {courses: [1,2,3,4,5,6]}
                return request(app)
                    .post('/api/v1/learning_sessions/correspondence')
                    .query({student_id: 1})
                    .send(json)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.length).toBeGreaterThanOrEqual(0) //Student has just arrived and is not inscribed to anything
                    });
            })
        })
    })

    describe('PUT methods tests', () => {
        describe('PUT /api/v1/learning_sessions/:session_id', () => {
            let empty_data = {}
            let no_data = {session_info: {}}
            let wrong_date = {session_info: {start_date: "2022/03/01", end_date: "2022/01/30"}}
            let start_date_overlap = {session_info: {start_date: "2022/09/29"}}
            let end_date_overlap = {session_info: {start_date: "2022/11/01"}}
            let moved_to_past = {session_info: {start_date: "2022/01/30", end_date: "2022/02/28"}}
            let valid_update = {session_info: {start_date: "2023/10/10", end_date: "2023/10/30", num_groups: 2}}
            // Session to be changed it the first one inserted
            // No token
            test('PUT /api/v1/learning_sessions/:session_id without token should respond with status 401', async () => {
                return request(app)
                    .put('/api/v1/learning_sessions/'+starting_id)
                    .expect(401)
            })

            // Invalid token
            test('PUT /api/v1/learning_sessions/:session_id with invalid token should respond with status 403', async () => {
                return request(app)
                    .put('/api/v1/learning_sessions/'+starting_id)
                    .set('x-access-token', invalidToken)
                    .expect(403)
            })

            // Wrong admin token
            test('PUT /api/v1/learning_sessions/:session_id with non existing admin token should respond with status 401', async () => {
                return request(app)
                    .put('/api/v1/learning_sessions/'+starting_id)
                    .set('x-access-token', wrongTokenAdmin)
                    .expect(401)
            })

            // Valid token but non existing session
            test('PUT /api/v1/learning_sessions/:session_id with valid token but non existing session should respond with status 404', async () => {
                return request(app)
                    .put('/api/v1/learning_sessions/0')
                    .set('x-access-token', validTokenAdmin)
                    .expect(404)
            })

            // Valid token but new end_date <= start_date
            test('PUT /api/v1/learning_sessions/:session_id with valid token but wrong starting and ending date should respond with status 400', async () => {
                return request(app)
                    .put('/api/v1/learning_sessions/'+starting_id)
                    .set('x-access-token', validTokenAdmin)
                    .send(wrong_date)
                    .expect(400)
            })

            // Valid token but past session updated
            test('PUT /api/v1/learning_sessions/:session_id with valid token but non existing session should respond with status 400', async () => {
                return request(app)
                    .put('/api/v1/learning_sessions/1')
                    .set('x-access-token', validTokenAdmin)
                    .expect(400)
            })

            // Valid token but start date overlapping with other future sessions
            test('PUT /api/v1/learning_sessions/:session_id with valid token but starting date is overlapping should respond with status 400', async () => {
                return request(app)
                    .put('/api/v1/learning_sessions/'+starting_id)
                    .set('x-access-token', validTokenAdmin)
                    .send(start_date_overlap)
                    .expect(400)
            })

            // Valid token but end date overlapping with other future sessions
            test('PUT /api/v1/learning_sessions/:session_id with valid token but ending date is overlapping should respond with status 400', async () => {
                return request(app)
                    .put('/api/v1/learning_sessions/'+starting_id)
                    .set('x-access-token', validTokenAdmin)
                    .send(end_date_overlap)
                    .expect(400)
            })

            // Valid token moved as past sessions
            test('PUT /api/v1/learning_sessions/:session_id with valid token but session is moved as past session should respond with status 400', async () => {
                return request(app)
                    .put('/api/v1/learning_sessions/'+starting_id)
                    .set('x-access-token', validTokenAdmin)
                    .send(moved_to_past)
                    .expect(400)
            })

            // Valid token but empty data
            test('PUT /api/v1/learning_sessions/:session_id with valid token but empty data should respond with status 400', async () => {
                return request(app)
                    .put('/api/v1/learning_sessions/'+starting_id)
                    .set('x-access-token', validTokenAdmin)
                    .send(empty_data)
                    .expect(400)
            })

            test('PUT /api/v1/learning_sessions/:session_id with valid token but no data should respond with status 400', async () => {
                return request(app)
                    .put('/api/v1/learning_sessions/'+starting_id)
                    .set('x-access-token', validTokenAdmin)
                    .send(no_data)
                    .expect(400)
            })

            // Valid token and valid update
            test('PUT /api/v1/learning_sessions/:session_id with valid token and valid updates data should respond with status 200', async () => {
                return request(app)
                    .put('/api/v1/learning_sessions/'+starting_id)
                    .set('x-access-token', validTokenAdmin)
                    .send(valid_update)
                    .expect(200)
            })
        })
    })

    describe('GET methods tests', () => {
        describe('GET /api/v1/learning_sessions', () => {
            //GET all the resources
            test('GET /api/v1/learning_sessions should respond with status 200', async () => {
                let response = request(app)
                    .get('/api/v1/learning_sessions')
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning session in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBeGreaterThanOrEqual(1);
                    });
                return response;
            });

            // GET all resources of a school year that does not exist
            test('GET /api/v1/learning_sessions?school_year with non existing school year should respond with status 200 but with empty data', async () => {
                let response = request(app)
                    .get('/api/v1/learning_sessions')
                    .query({school_year: 2000})
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning session in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBe(0);
                    });
                return response;
            });

            // GET all resources in a school year specified
            test('GET /api/v1/learning_sessions?school_year with existing school year should respond with status 200', async () => {
                let response = request(app)
                    .get('/api/v1/learning_sessions')
                    .query({school_year: 2022})
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning session in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBeGreaterThanOrEqual(1);
                    });
                return response;
            });

            // GET all resources linked to a specific session with non valid ID
            test('GET /api/v1/learning_sessions?year_of with non valid valid session id should respond with status 200 but empty data', async () => {
                let response = request(app)
                    .get('/api/v1/learning_sessions')
                    .query({year_of: 0})
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning session in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBe(0);
                    });
                return response;
            });

            // GET all resources linked to a specific session with valid ID
            test('GET /api/v1/learning_sessions?year_of with valid session id should respond with status 200 ', async () => {
                let response = request(app)
                    .get('/api/v1/learning_sessions')
                    .query({year_of: 5})
                    .expect(200)
                    .then((res) => {
                        //For now we have at least 1 learning session in our db. After implementation of POST method, we can work with this expect() w.r.t. the tests of the POST methods
                        expect(res.body.data.length).toBeGreaterThanOrEqual(1);
                    });
                return response;
            });
        })

        describe('GET /api/v1/learning_sessions/:session_id', () => {
            // GET specific resource with non valid ID
            test('GET /api/v1/learning_sessions/:session_id with non valid ID', async () => {
                return request(app)
                    .get('/api/v1/learning_sessions/nonValidID')
                    .expect(404);
            });
            
            // GET specific resource with non valid parameters
            test('GET /api/v1/learning_sessions/:session_id?school_year with non valid params', async () => {
                return request(app)
                    .get('/api/v1/learning_sessions/7')
                    .query({ school_year: 2022})
                    .expect(404);
            })

            // GET specific resourse
            test('GET /api/v1/learning_sessions/:session_id with valid ID', async () => {
                return request(app)
                    .get('/api/v1/learning_sessions/6')
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.number).toBe(5);
                        expect(response.body.data.school_year).toBe(2022);
                    });
            });

            // GET specific resource with valid parameters
            test('GET /api/v1/learning_sessions/:session_id?school_year with valid params', async () => {
                return request(app)
                    .get('/api/v1/learning_sessions/6')
                    .query({ school_year: 2022 })
                    .expect(200)
                    .then((response) => {
                        expect(response.body.data.number).toBe(6);
                        expect(response.body.data.school_year).toBe(2022);
                    });
            });
        })
    })

    afterAll(async ()=> {
        for(let i=0;i<number_of_insert;i++){
            await learning_sessionsModel.delete(starting_id+i)
        }
    })
})