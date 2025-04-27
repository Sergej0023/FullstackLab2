import projectModel from '../model/projectModel.js'

class ProjectController {


    async getAllProjects(req, res) {
        try {
            const projects = await projectModel.getAllProjects();
            res.json(projects);
        } catch (err) {
            console.log(err);
            res.status(500).json({message: err.message});
        }
    }

    async getProjectById(req, res) {
        try {
            const {id} = req.params;
            const project = await projectModel.getProjectById(id);

            if (!project) {
                return res.status(404).json({message: 'No project'});
            }
            res.json(project);
        } catch (err) {
            console.log(err)
            res.status(500).json({message: err.message});
        }
    }

    async getProjectByCode(req, res) {
        try {
            const {code} = req.params;
            const project = await projectModel.getProjectByCode(code);
            if (!project) {
                return res.status(404).json({message: 'No project'});
            }
            res.json(project);
        } catch (err) {
            console.log(err)
            res.status(500).json({message: err.message});
        }
    }

    async getProjectByName(req, res) {
        try {
            const {name} = req.params;
            const project = await projectModel.getProjectByName(name);
            if (!project) {
                return res.status(404).json({message: 'project not found'});
            }
            res.json(project);
        } catch (err) {
            console.log(err);
            res.status(500).json({message: 'Server Error'});
        }
    }


    async postProject(req, res) {
        try {
            const newProject = req.body;
            const existingProject = await projectModel.getProjectById(newProject.id);
            if (existingProject) {
                return res.status(409).json({message: 'Project already exists!'});
            }
            const createProject = await projectModel.addProject(newProject);
            res.status(201).json(createProject);
        } catch (err) {
            console.log(err);
            res.status(500).json({message: 'Server Error'});
        }
    }


    async putProject(req, res) {
        const {id} = req.params;
        const body = req.body;

        const existingProject = await projectModel.getProjectById(id);
        if (!existingProject) {
            return res.status(404).json({message: 'Project not found!'});
        }

        const putProject = await projectModel.putProject(id, body);
        res.json({putProject});
    }


    async deleteProject(req, res) {
        try {
            const {id} = req.params;
            const existingProject = await projectModel.getProjectById(id);
            if (!existingProject) {
                return res.status(404).json({message: 'Project not found!'});
            }

            const deleteProject = await projectModel.deleteProject(id);
            res.json({message: 'Project is deleted', deleteProject});
        } catch (err) {
            console.log(err);
            res.status(500).json({message: 'Server Error'});
        }
    }
}

export default new ProjectController();