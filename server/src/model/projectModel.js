import databaseService from "../service/databaseService.js"

class ProjectModel {


    async getAllProjects() {
        try {
            return await databaseService.projects.find();
        } catch (err) {
            console.log("Error fetching all projects:", err);
            throw new Error("Could not fetch projects");
        }
    }

    async getProjectById(id) {
        try {
            return await databaseService.projects.findOne({'_id': id});
        } catch (err) {
            console.log("Error fetching project by ID:", err);
            throw new Error("Could not fetch project by ID");
        }
    }


    async getProjectByCode(code) {
        try {
            return await databaseService.projects.findOne({'project_code': code});
        } catch (err) {
            console.log("Error fetching project by code:", err);
            throw new Error("Could not fetch project by code");
        }
    }

    async getProjectByName(name) {
        try {
            return await databaseService.projects.findOne({'project_name': name});
        } catch (err) {
            console.log("Error fetching project by name:", err);
            throw new Error("Could not fetch project by name");
        }
    }


    async addProject(project) {
        try {
            return await databaseService.projects.create(project);
        } catch (err) {
            console.log("Error adding project:", err);
            throw new Error("Could not add the project");
        }
    }


    async addProjects(projects){
        try {
            return await databaseService.projects.insertMany(projects);
        } catch (err) {
            console.log("Error adding projects:", err);
            throw new Error("Could not add projects");
        }
    }

    async putProject(id, body) {
        try {

            return await databaseService.projects.findByIdAndUpdate(
                {'_id': id},
                {
                    'project_code': body.project_code,
                    'project_name': body.project_name,
                    'project_description': body.project_description,
                },
                {new: true}
            );
        } catch (err) {
            console.log("Error updating project:", err);
            throw new Error("Could not update the project");
        }
    }

    async deleteProject(id) {
        try {
            return await databaseService.projects.findOneAndDelete({'_id': id});
        } catch (err) {
            console.log("Error deleting project:", err);
            throw new Error("Could not delete the project");
        }
    }

    async deleteAll() {
        try {
            return await databaseService.projects.deleteMany({});
        } catch (err) {
            console.log("Error deleting employee:", err);
            throw new Error("Could not delete employee");
        }
    }
}

export default new ProjectModel();