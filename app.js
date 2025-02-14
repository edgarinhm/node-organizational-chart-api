const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();

const corsOptions = require('./config/cors-options');

const PORT = process.env.PORT || 3000;

const positionRouter = require('./routes/postitions-route');
const employeeRouter = require('./routes/employees-route');
const divisionsRouter = require('./routes/divisions-route');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors(corsOptions));

app.use('/', divisionsRouter);
app.use('/', positionRouter);
app.use('/', employeeRouter);

app.listen(PORT, () => {
    console.log(`server listen in port ${PORT}`)
})