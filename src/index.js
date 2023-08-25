const express = require('express');
const bodyParser = require('body-parser');

const { PORT, REMINDER_BINDING_KEY } = require('./config/serverConfig'); 
const jobs = require('./utils/job');
const { createChannel, subscribeMessage, publishMessage } = require('./utils/messageQueue');
const TicketController = require('./controllers/ticket-controller');
const EmailService = require('./services/email-services');

const setUpAndStartServer = async () => {
    
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.post('/api/v1/tickets', TicketController.create);

    const channel = await createChannel();
    subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY);

    app.listen(PORT, () => {
        console.log(`Server started on Port ${PORT}`);
        // jobs();
    });
}  

setUpAndStartServer();