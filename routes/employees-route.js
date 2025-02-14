const express = require('express');
const employeeRouter = express.Router();

const EmployeesData = require('../data/employees-data');

employeeRouter.get('/employees', async (req, res) => {
    try {
        const response = await Promise.resolve({ data: EmployeesData });
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: 'Error Getting employees' });
    }
});

employeeRouter.post('/employees', async (req, res) => {
    try {
        const newemployee = { id: EmployeesData.length + 1, name: req.body.name, parentId: req.body.parentId ?? 0 };
        EmployeesData.push(newemployee);
        res.send(EmployeesData);
    } catch (error) {
        res.status(500).json({ message: 'Error Creating employee', error });
    }
});

employeeRouter.put('/employees/:id', async (req, res) => {
    try {
        const newemployee = { name: req.body.name, parentId: req.body.parentId ?? 0 };
        EmployeesData.push(newemployee);
        res.send(EmployeesData);
    } catch (error) {
        res.status(500).json({ message: 'Error Updating employee', error });
    }
});

employeeRouter.delete('/employees/:id', async (req, res) => {
    try {
        const employeeIndex = EmployeesData.findIndex(postion => postion.id === parseInt(req.params.id));
        if (employeeIndex === -1) {
            return res.status(404).send({ message: 'Invalid Index' });
        }
        EmployeesData.splice(employeeIndex, 1);
        res.send();
    } catch (error) {
        res.status(500).json({ message: 'Error Getting employees', error });
    }
});

module.exports = employeeRouter;