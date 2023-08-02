# LIVOApp Backend
LIVOApp application backend

This is the backend of the application written in Nodejs. It uses the following libraries:
* express - to build the apis and run the backend.
* supertest - to run automated tests
* mariadb - to connect to the database
* cryptojs - for encrypt personal information to insert into the database
* passport and jsonwebtoken - to manage the authentication part

# Installation and Setup

1. Clone this repository using `git clone https://github.com/LIVO-App/backend`
2. Install dependencies by running following command inside project directory: ```npm install```
3. Import the `livoapp_db.sql` into your database and create the .env file following the structure of the .env.example file
4. Start your database, in order for the backend to find it when it runs.
4. Run the backend with the command ```npm start```

# Test suite

If you want to run the test suite, simply run the following command: ```npm test```