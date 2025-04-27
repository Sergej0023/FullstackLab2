import databaseService from "../service/databaseService.js"

class AssignmentModel {
    async getAssignments() {
        try {
            return await databaseService.assignments.find().populate('employee').populate('project')
        } catch (err) {
            console.log("Error fetching all assignments:", err);
            throw new Error("Could not fetch assignments");
        }
    }

    async getAssignmentById(id) {
        try {
            return await databaseService.assignments.findOne({'_id': id}).populate('employee').populate('project');
        } catch (err) {
            console.log("Error fetching assignment by ID:", err);
            throw new Error("Could not fetch assignment by ID");
        }
    }

    async addAssignments(assignments) {
        try {
            return await databaseService.assignments.insertMany(assignments);
        } catch (err) {
            console.log("Error adding assignments:", err);
            throw new Error("Could not add assignments");
        }
    }

    async deleteAll() {
        try {
            return await databaseService.assignments.deleteMany({});
        } catch (err) {
            console.log("Error deleting employee:", err);
            throw new Error("Could not delete employee");
        }
    }

    async assignProject(assignment) {
        try {
            return await databaseService.assignments.create(assignment)
        } catch (err) {
            console.log("Error assigning project");
            throw new Error("Could not assign project");
        }
    }

    async deleteAssignment(id) {
        try{
            return await databaseService.assignments.findOneAndDelete({'_id': id});
        }
        catch(err){
            console.log("Error deleting assignment:", err);
        }
    }
}

export default new AssignmentModel();