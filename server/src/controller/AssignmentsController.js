import assignmentModel from '../model/assignmentModel.js';
import employeeModel from "../model/employeeModel.js";
import projectModel from "../model/projectModel.js";

class AssigmentController {
    async getAssignments(req, res) {
        try {
            const assignments = await assignmentModel.getAssignments();
            res.json(assignments);
        } catch (err) {
            console.log(err)
            res.status(500).json({message: 'Server Error'});
        }
    }

    async getAssignmentById(req, res) {
        try {
            const {id} = req.params;
            const assignment = await assignmentModel.getAssignmentById(id);

            if (!assignment) {
                return res.status(404).json({message: 'No assignment'});
            }
            res.json(assignment);
        } catch (err) {
            console.log(err)
            res.status(500).json({message: err.message});
        }
    }

    async postAssignment(req, res) {
        try{
            const assignment = req.body;

            const employee = await employeeModel.getEmployeeById(assignment.employee_id);
            const project = await projectModel.getProjectById(assignment.project_id);
            const date = Date.now();

            if (!employee) {
                return res.status(404).json({message: 'Employee doesnt exist'});
            }
            if (!project) {
                return res.status(404).json({message: 'Project doesnt exist'});
            }

            const newAssigment = {employee, project, date}
            await assignmentModel.assignProject(newAssigment);
            res.json(newAssigment);
        }catch(err){
            res.status(500).json({message: 'Server Error'});
        }
    }

    async deleteAssignment(req, res) {
        try{
            const {id} = req.params;

            const assignment = await assignmentModel.getAssignmentById(id);
            if (!assignment) {
                return res.status(404).json({message: 'No assignment'});
            }

            await assignmentModel.deleteAssignment(id)
            res.json(assignmentModel);
        }catch(err){
            res.status(500).json({message: 'Server Error'});
        }
    }
}

export default new AssigmentController()