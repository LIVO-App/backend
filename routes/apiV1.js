'use strict';

const express = require('express');
const apiV1 = express.Router();

const authRouter = require('./apiV1/auth');
const sessionsRouter = require('./apiV1/learning_session');
const areasRouter = require('./apiV1/learning_area');
const courseRouter = require('./apiV1/course');
const ordclassRouter = require('./apiV1/ordinary_class');
const studentRouter = require('./apiV1/student');
const teacherRouter = require('./apiV1/teacher');
const projclassRouter = require('./apiV1/project_class');
const announcementRouter = require('./apiV1/announcement');
const learningContextRouter = require('./apiV1/learning_context');
const propositionsRouter = require('./apiV1/propositions');
const growthAreaRouter = require('./apiV1/growth_area');
const teachingRouter = require('./apiV1/teaching');
const constraintRouter = require('./apiV1/constraints');
const adminRouter = require('./apiV1/admin');
const studyAddressRouter = require('./apiV1/study_address')

apiV1.use('/auth', authRouter);
apiV1.use('/learning_sessions', sessionsRouter);
apiV1.use('/learning_areas', areasRouter);
apiV1.use('/courses', courseRouter);
apiV1.use('/ordinary_classes', ordclassRouter);
apiV1.use('/students',studentRouter);
apiV1.use('/teachers', teacherRouter);
apiV1.use('/project_classes', projclassRouter);
apiV1.use('/announcements', announcementRouter);
apiV1.use('/learning_contexts', learningContextRouter);
apiV1.use('/propositions', propositionsRouter);
apiV1.use('/growth_areas', growthAreaRouter);
apiV1.use('/teachings', teachingRouter);
apiV1.use('/constraints', constraintRouter);
apiV1.use('/admins', adminRouter);
apiV1.use('/study_addresses', studyAddressRouter)

module.exports = apiV1;