const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
dotenv.config();

const DivisionData = require('./data/divison-data');
const corsOptions = require('./config/cors-options');

const PORT = process.env.PORT || 3000;
const FILES_DIR = 'data';
const PositionsData = require('./data/positions-data');

const fs = require('fs');
const { promises: fsPromises } = fs;

const ReadFile = async (fileName, encoding = 'utf8') => {
    return await fsPromises.readFile(path.join(__dirname, FILES_DIR, fileName), encoding);
}

const CreateFile = async (fileName, content) => {
    return await fsPromises.writeFile(path.join(__dirname, FILES_DIR, fileName), content);
}

const UpdateFile = async (fileName, content) => {
    return await fsPromises.appendFile(path.join(__dirname, FILES_DIR, fileName), content);
}

const DeleteFile = async (fileName) => {
    return await fsPromises.unlink(path.join(__dirname, FILES_DIR, fileName));
}

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors(corsOptions));

app.get('/division', async (req, res) => {
    try {
        const response = await Promise.resolve({ data: DivisionData });
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: 'Error Getting Divisions' });
    }
});

app.get('/positions', async (req, res) => {
    try {
        const response = await Promise.resolve({ data: PositionsData });
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: 'Error Getting Positions' });
    }
});

app.post('/positions', async (req, res) => {
    try {
        const newPosition = { id: PositionsData.length + 1, name: req.body.name, division: req.body.division, tier: req.body.tier, parentId: req.body.parentId ?? 0 };
        PositionsData.push(newPosition);
        res.send(PositionsData);
    } catch (error) {
        res.status(500).json({ message: 'Error Creating Position', error });
    }
});

app.put('/positions:id', async (req, res) => {
    try {
        const newPosition = { name: req.body.name, division: req.body.division, tier: req.body.tier, parentId: req.body.parentId ?? 0 };
        PositionsData.push(newPosition);
        res.send(PositionsData);
    } catch (error) {
        res.status(500).json({ message: 'Error Updating Position' });
    }
});

app.delete('/positions:id', async (req, res) => {
    try {
        const positionIndex = PositionsData.findIndex(postion => postion.id === parseInt(req.params.id));
        if (positionIndex === -1) {
            return res.status(404).send({ message: 'Invalid Index' });
        }
        PositionsData.splice(positionIndex, 1);
        res.send();
    } catch (error) {
        res.status(500).json({ message: 'Error Getting Positions' });
    }
});

app.listen(PORT, () => {
    console.log(`server listen in port ${PORT}`)
})