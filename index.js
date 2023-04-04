'use strict';

//const config = require('./config');
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

//config.initDB()
    /*.then(msg => {
        console.log(msg);

        const server = app.listen(PORT, () => {
            console.log("Server started");
        });

        //server.on('upgrade', wss.handleUpgrade);
    })
    .catch(err => {
        throw(new Error(err));
    })*/;