import express from "express";
import controller from '../controller/employeeController.js';

export const router = express.Router();

router.get('/employees', (req, res) => {
    controller.getAllEmployees(req, res);
});

router.get('/employees_id/:id', (req, res) => {
    controller.getEmployeeById(req, res)
})

router.get('/employees/:name', (req, res) => {
    controller.getEmployeeByName(req, res);
});

router.get('/employee/:email', (req, res) => {
    controller.getEmployeeByEmail(req, res);
})

router.post('/employee', (req, res) => {
    controller.postEmployee(req, res);
});

router.put('/employee/:id', (req, res) => {
    controller.putEmployee(req, res);
});

router.delete('/employee/:id', (req, res) => {
    controller.delEteemployee(req, res);
});
