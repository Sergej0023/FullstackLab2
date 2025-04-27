import express from "express";
import controller from '../controller/AssignmentsController.js';

export const router = express.Router();

router.get('/assignments', (req, res) => {
    controller.getAssignments(req, res);
});

router.get('/assignment/:id', (req, res) => {
    controller.getAssignmentById(req, res);
});


router.post('/assign_project', (req, res) => {
    controller.postAssignment(req, res);
});


router.delete('/assignment/:id', (req, res) => {
    controller.deleteAssignment(req, res)
})