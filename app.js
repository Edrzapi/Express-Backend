const dotenv = require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 5000;  
const connect = require('./config/db');
const bodyParser = require('body-parser');

const { errorHandler } = require('./middleware/errorHandler');
const setupSwagger = require('./swag-conf');
const app = express();
setupSwagger(app)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

connect();
app.use('/api/v1/course', require('./routes/courseRoutes'));
app.use('/api/v1/trainer', require('./routes/trainerRoutes'));
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});

