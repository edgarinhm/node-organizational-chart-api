const express = require('express');
const positionRouter = express.Router();

const PositionsData = require('../data/positions-data');

positionRouter.get('/positions', async (req, res) => {
    try {
        const response = await Promise.resolve({ data: PositionsData });
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: 'Error Getting Positions' });
    }
});

positionRouter.post('/positions', async (req, res) => {
    try {
        const newPosition = { id: PositionsData.length + 1, name: req.body.name, division: parseInt(req.body.division), tier: req.body.tier, parentId: req.body.parentId ?? 0 };
        PositionsData.push(newPosition);
        res.send(PositionsData);
    } catch (error) {
        res.status(500).json({ message: 'Error Creating Position', error });
    }
});

positionRouter.put('/positions/:id', async (req, res) => {
    try {
        const newPosition = { name: req.body.name, division: req.body.division, tier: req.body.tier, parentId: req.body.parentId ?? 0 };
        PositionsData.push(newPosition);
        res.send(PositionsData);
    } catch (error) {
        res.status(500).json({ message: 'Error Updating Position', error });
    }
});

positionRouter.delete('/positions/:id', async (req, res) => {
    try {
        const positionIndex = PositionsData.findIndex(postion => postion.id === parseInt(req.params.id));
        if (positionIndex === -1) {
            return res.status(404).send({ message: 'Invalid Index' });
        }
        PositionsData.splice(positionIndex, 1);
        res.send();
    } catch (error) {
        res.status(500).json({ message: 'Error Getting Positions', error });
    }
});

module.exports = positionRouter;