const express = require('express');
const divisionsRouter = express.Router();

const DivisionData = require('../data/divison-data');

divisionsRouter.get('/division', async (req, res) => {
    try {
        const response = await Promise.resolve({ data: DivisionData });
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: 'Error Getting divisions' });
    }
});

module.exports = divisionsRouter;