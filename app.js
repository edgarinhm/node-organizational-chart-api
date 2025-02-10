const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const { DivisionData } = require('./data/divison-data');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors);

app.get('/division', async (req, res) => {
    try {
        const response = await Promise.resolve({ data: DivisionData });
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: 'Error Getting Divisions' });
    }
});

app.listen(PORT, () => {
    console.log(`server listen in port ${PORT}`)
})