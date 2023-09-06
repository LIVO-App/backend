'use strict';

const learningSessionSchema = require('../models/learning_sessionsModel');
const adminSchema = require('../models/adminModel')

let MSG = {
    notFound: "Resource not found",
    updateFailed: "Failed to save",
    notAuthorized: "Not authorized request",
    pastSession: "You are adding a past session. Try again",
    itemAlreadyExists: "The learning sessions are all already presents",
    overlappingSessions: "The sessions you tried to add are overlapping. Try again",
    somethingWrong: "Something went wrong",
    missingParameters: "Missing required information",
    wrongData: "The data are not correct. Please try again"
}

process.env.TZ = 'Etc/Universal';

module.exports.get_sessions = async (req, res) => {
    let school_year = req.query.school_year;
    let year_of = req.query.year_of;
    year_of = school_year != undefined ? undefined : year_of;
    let future_session = req.query.future_session;
    future_session = future_session === "true" ? true : false;
    let sessions = await learningSessionSchema.list(school_year, year_of, future_session);
    let data_sessions = sessions.map( (session) => {
        return {
            id: session.id,
            number: session.number,
            school_year: session.school_year,
            start: session.start,
            end: session.end,
            num_groups: session.num_groups,
            open_day: session.open_day
        };
    });
    let response = {
        path: "/api/v1/learning_sessions/",
        single: true,
        query: {
            school_year: school_year,
            year_of: year_of,
            future_session: future_session
        },
        date: new Date(),
        data: data_sessions
    };
    res.status(200).json(response);
}

module.exports.get_session = async (req, res) => {
    let id = req.params.session_id;
    let school_year = req.query.school_year;
    let session = await learningSessionSchema.read(id,school_year);
    if(!session){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('single session: resource not found');
        return;
    }
    let data_session = {
        id: session.id,
        number: session.number,
        school_year: session.school_year,
        start: session.start,
        end: session.end,
        num_groups: session.num_groups,
        open_day: session.open_day
    };
    let response = {
        path: "/api/v1/learning_sessions/",
        single: true,
        query: {
            school_year: school_year
        },
        date: new Date(),
        data: data_session
    };
    res.status(200).json(response);
}

module.exports.get_sessions_from_courses = async (req, res) => {
    let student_id = req.query.student_id;
    let courses = req.body.courses;
    let sessions = await learningSessionSchema.list_from_list_of_courses(student_id, courses);
    if(sessions==null){
        res.status(400).json({status: "error", description: MSG.missingParameters});
        console.log('list of session: missing list of courses');
        return;
    }
    let data_sessions = sessions.map( (session) => {
        return {
            course_id: session.course,
            session_id: session.session
        };
    });
    let response = {
        path: "/api/v1/learning_sessions/",
        single: true,
        query: {
            student_id: student_id
        },
        date: new Date(),
        data: data_sessions
    };
    res.status(200).json(response);
}

module.exports.add_sessions = async (req, res) => {
    if(req.loggedUser.role == "admin"){
        let user_id = req.loggedUser._id
        let user_exist = await adminSchema.read_id(user_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('learning sessions addition: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('learning sessions addition: unauthorized access');
        return;
    }
    let sessions_list = req.body.sessions_list;
    // Get all future sessions we have to use for control. They are ordered by starting date, so we have them in cronological order
    let future_sessions_existing = await learningSessionSchema.list(undefined, undefined, true);
    if(!future_sessions_existing){
        res.status(400).json({status: "error", description: MSG.somethingWrong});
        console.log('learning sessions addition: something went wrong in get future sessions');
        return;
    }
    future_sessions_existing.reverse()
    // Check sessions: UNIQUE number + school_year, start < end, no overlap in sessions
    // First reorder the session_list object based on school_year and starting_date
    let wrong_session, existing_session, overlapping;
    if(sessions_list!=undefined){
        sessions_list.sort((a,b) => {
            let school_year_a = a.school_year
            let school_year_b = b.school_year
            let start_date_a = new Date(a.start_date)
            let start_date_b = new Date(b.start_date)
            if(school_year_a<school_year_b){
                return -1
            }
            if(school_year_a>school_year_b){
                return 1
            }
            if(start_date_a<start_date_b){
              return -1
            }
            if(start_date_a>start_date_b){
            return 1
            }
            return 0
        })
        
        let dates_session = []
        for(let i=0;i<sessions_list.length;i++){
            let number = sessions_list[i].number;
            let school_year = sessions_list[i].school_year
            let start_date = new Date(sessions_list[i].start_date)
            let end_date = new Date(sessions_list[i].end_date)
            let open_day = sessions_list[i].open_day != undefined ? new Date(sessions_list[i].open_day) : undefined
            // If ending_date smaller than or equal to starting_date
            if(end_date<=start_date){
                console.log(`The ending date of the session ${number} of the school year ${school_year} is before the starting date. Removing the session from the list`)
                wrong_session = true
                sessions_list.splice(i,1)
                i = i-1;
                continue
            }
            // If open_day greater than or equal to starting_date
            if(start_date<=open_day){
                console.log(`The starting date of the session ${number} of the school year ${school_year} is before the open day. Removing the session from the list`)
                wrong_session = true
                sessions_list.splice(i,1)
                i = i-1;
                continue
            }
            // If session already exists, remove it
            let session_exists = await learningSessionSchema.read(number, school_year);
            if(session_exists){
                console.log(`The session ${number} of the school year ${school_year} you tried to add already exists. Removing the session from the list`)
                existing_session = true
                sessions_list.splice(i,1)
                i = i-1;
                continue
            }
            // Check if it is a future session and if there is a hole between them (start from the most recent one)
            let valid_session = false
            for(let j in future_sessions_existing){
                let future_session_start = new Date(future_sessions_existing[j].start)
                let future_session_end = new Date(future_sessions_existing[j].end)
                if(start_date > future_session_start){
                    if(start_date > future_session_end){
                        console.log("Session number "+number+" school year "+school_year)
                        // If we are in the most recent future session we are safe
                        // If we find a hole, it is also fine. We continue the iteration until we find the hole and then we can safely add
                        valid_session = true
                        break
                    } else {
                        console.log("Overlapping start date. Session number "+number+" school year "+school_year)
                        console.log(end_date)
                        console.log(future_session_end)
                        overlapping = true
                        res.status(400).json({status: "error", description: MSG.overlappingSessions, wrong_session: wrong_session, existing_session: existing_session, overlapping: overlapping});
                        console.log('learning sessions addition: the sessions you wanted to add are overlapping with already existing ones. Please try again');
                        return;
                    }
                } else {
                    // Check ending date to see if it is still overlapping or not
                    if(end_date>future_session_start){
                        console.log("Overlapping end date. Session number "+number+" school year "+school_year)
                        console.log(end_date)
                        console.log(future_session_start)
                        overlapping = true
                        res.status(400).json({status: "error", description: MSG.overlappingSessions, wrong_session: wrong_session, existing_session: existing_session, overlapping: overlapping});
                        console.log('learning sessions addition: the sessions you wanted to add are overlapping with already existing ones. Please try again');
                        return;
                    }
                }
            }
            if(!valid_session){
                overlapping = true
                res.status(400).json({status: "error", description: MSG.pastSession, wrong_session: wrong_session, existing_session: existing_session, overlapping: overlapping});
                console.log('learning sessions addition: the sessions you wanted to add is a past session. Please try again');
                return;
            }
            // The control for the overlap with future sessions already present is successful
            // Check now with the previous ones
            for(let j = 0;j<dates_session.length;j++){
                if(start_date<=dates_session[j]){
                    overlapping = true
                    res.status(400).json({status: "error", description: MSG.overlappingSessions, wrong_session: wrong_session, existing_session: existing_session, overlapping: overlapping});
                    console.log('learning sessions addition: the sessions you wanted to add are overlapping with each others. Please try again');
                    return;
                }               
            }
            // Fill also the date of open_day parameter if they are undefined
            if(open_day == undefined){
                if(i!=0){
                    sessions_list[i].open_day = sessions_list[i-1].start_date
                } else {
                    sessions_list[i].open_day = future_sessions_existing[0].start
                }
            }
            dates_session.push(start_date, end_date);
        }
    }
    
    let insert_sessions = await learningSessionSchema.add(sessions_list)
    if(!insert_sessions){
        if(existing_session && !wrong_session){
            res.status(409).json({status: "error", description: MSG.itemAlreadyExists, wrong_session: wrong_session, existing_session: existing_session, overlapping: overlapping})
            console.log('duplicated information: new learning session addition');
            return;
        } else {
            res.status(400).json({status: "error", description: MSG.missingParameters, wrong_session: wrong_session, existing_session: existing_session, overlapping: overlapping})
            console.log('missing required information: new learning session addition');
            return;
        }
    }
    let first_inserted_id = insert_sessions.insertId.toString()
    let num_inserted = insert_sessions.affectedRows
    res.status(201).json({
        status: "accepted", 
        description: "Sessions inserted", 
        wrong_session: wrong_session, 
        existing_session: existing_session, 
        overlapping: overlapping, 
        first_inserted_id: first_inserted_id, 
        num_inserted: num_inserted
    })
}

module.exports.update_session = async (req, res) => {
    if(req.loggedUser.role == "admin"){
        let user_id = req.loggedUser._id
        let user_exist = await adminSchema.read_id(user_id)
        if(!user_exist){
            res.status(401).json({status: "error", description: MSG.notAuthorized});
            console.log('learning sessions update: unauthorized access');
            return;
        }
    } else {
        res.status(401).json({status: "error", description: MSG.notAuthorized});
        console.log('learning sessions update: unauthorized access');
        return;
    }
    let session_id = req.params.session_id
    let session_info = req.body.session_info
    let both_date = false
    let start_date = session_info!=undefined ? new Date(session_info.start_date) : undefined
    let end_date = session_info!=undefined ? new Date(session_info.end_date) : undefined
    if(session_info!=undefined){
        if(end_date != undefined && start_date != undefined){
            both_date = true
            if(end_date<=start_date){
                res.status(400).json({status: "error", description: MSG.wrongData});
                console.log('learning session update: the session has wrong data. Abort update');
                return;
            }
        } 
    }
    let session_exists = await learningSessionSchema.read(session_id)
    if(!session_exists){
        res.status(404).json({status: "error", description: MSG.notFound});
        console.log('learning session update: session does not exist');
        return;
    }
    if(!both_date){
        if(start_date!=undefined && start_date != ""){
            if(start_date>=new Date(session_exists.end)){
                res.status(400).json({status: "error", description: MSG.wrongData});
                console.log('learning session update: the session has wrong data. Abort update');
                return;
            }
        }
        if(end_date!=undefined && end_date != ""){
            if(end_date>=session_exists.start){
                res.status(400).json({status: "error", description: MSG.wrongData});
                console.log('learning session update: the session has wrong data. Abort update');
                return;
            }
        }
    }
    let starting_date = new Date(session_exists.start)
    let today = new Date()
    let _10days = today.setDate(today.getDate() + 10)
    if (starting_date <= today || starting_date <= _10days){
        res.status(400).json({status: "error", description: MSG.pastSession});
        console.log('learning session update: the session is a past, current or imminent session. Abort update');
        return;
    }
    let future_sessions_existing = await learningSessionSchema.list(undefined, undefined, true);
    if(!future_sessions_existing){
        res.status(400).json({status: "error", description: MSG.somethingWrong});
        console.log('learning sessions update: something went wrong in get future sessions');
        return;
    }
    future_sessions_existing.reverse()
    // Check if session overlaps sessions or is changed to past session
    let overlapping, valid_session;
    if(session_info!=undefined){
        for(let j in future_sessions_existing){
            let start_date_update = start_date != undefined ? start_date : session_exists.start
            let end_date_update = end_date != undefined ? end_date : session_exists.end
            let future_session_start = new Date(future_sessions_existing[j].start)
            let future_session_end = new Date(future_sessions_existing[j].end)
            if(future_sessions_existing[j].id!=session_id){
                if(start_date_update > future_session_start){
                    if(start_date_update > future_session_end){
                        // If we are in the most recent future session we are safe
                        // If we find a hole, it is also fine. We continue the iteration until we find the hole and then we can safely add
                        valid_session = true
                        break
                    } else {
                        overlapping = true
                        res.status(400).json({status: "error", description: MSG.overlappingSessions});
                        console.log('learning sessions update: the session you wanted to update is overlapping with already existing ones. Please try again');
                        return;
                    }
                } else {
                    // Check ending date to see if it is still overlapping or not
                    if(end_date_update>future_session_start){
                        overlapping = true
                        res.status(400).json({status: "error", description: MSG.overlappingSessions});
                        console.log('learning sessions update: the session you wanted to update is overlapping with already existing ones. Please try again');
                        return;
                    }
                }        
                
            } else {
                if(start_date_update >= future_session_start){
                    valid_session = true
                    break
                }
            }
        }
    }
    if(!valid_session){
        overlapping = true
        res.status(400).json({status: "error", description: MSG.pastSession});
        console.log('learning sessions update: you can\'t change a session and move it to the past. Please try again');
        return;
    }
    let update_session = await learningSessionSchema.update(session_id, session_info);
    if(!update_session){
        res.status(400).json({status: "error", description: MSG.missingParameters});
        console.log('learning sessions update: missing parameters');
        return;
    }
    res.status(200).json({status: "updated", description: "Learning session updated successfully"})
}

module.exports.get_school_years = async (req, res) => {
    let school_years = await learningSessionSchema.list_of_years()
    let data_years = school_years.map( (school_year) => {
        return {
            school_year: school_year.school_year
        };
    });
    let response = {
        path: "/api/v1/learning_sessions/school_years",
        single: true,
        query: {},
        date: new Date(),
        data: data_years
    };
    res.status(200).json(response);
}
/*obj.sort((a,b) => {
	let school_year_a = a.school_year
    let school_year_b = b.school_year
	let start_date_a = new Date(a.start_date)
    let start_date_b = new Date(b.start_date)
    if(school_year_a<school_year_b){
    	return -1
    }
    if(school_year_a>school_year_b){
    	return 1
    }
    if(start_date_a<start_date_b){
      return -1
    }
  	if(start_date_a>start_date_b){
    	return 1
  	}
  	return 0
    
});*/