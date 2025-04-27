import express from "express";
import ProjectController from '../controller/projectController.js';
import projectController from "../controller/projectController.js";

export const router = express.Router();

router.get('/project', (req, res) => {
    ProjectController.getAllProjects(req, res);
});

router.get('/project/:id', (req, res) => {
    projectController.getProjectById(req, res);
})

router.get('/project_code/:code', (req, res) => {
    projectController.getProjectByCode(req, res)
})

router.get('/project_name/:name', (req, res) => {
    ProjectController.getProjectByName(req, res);
});

router.post('/project', (req, res) => {
    ProjectController.postProject(req, res);
});

router.put('/project/:id', (req, res) => {
    ProjectController.putProject(req, res);
});

router.delete('/project/:id', (req, res) => {
    ProjectController.deleteProject(req, res);
});