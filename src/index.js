const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig'); 
// const jobs = require('./utils/job');
const { createChannel, subscribeMessage, publishMessage } = require('./utils/messageQueue');
const TicketController = require('./controllers/ticket-controller');

const setUpAndStartServer = async () => {
    
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.post('/api/v1/tickets', TicketController.create);

    app.listen(PORT, () => {
        console.log(`Server started on Port ${PORT}`);
        // jobs();

    });
}  

setUpAndStartServer();