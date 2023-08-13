const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig'); 
// const { sendEmail } = require('./services/email-services');
const cron = require('node-cron');

const setUpAndStartServer = () => {
    
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.listen(PORT, () => {
        console.log(`Server started on Port ${PORT}`);
        // sendEmail(
        //     'support@admin.com',
        //     'keyur.np@somaiya.edu',
        //     'This is a testing email',
        //     'Hey How are you ? I hope you loved the support'
        // );
        cron.schedule('*/2 * * * *', () => {
            console.log("Running a task every 2 minutes");
        });
    });

}  

setUpAndStartServer();