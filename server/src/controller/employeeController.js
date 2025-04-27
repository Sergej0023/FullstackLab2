import employeeModel from '../model/employeeModel.js'

class EmployeeController {


    async getAllEmployees(req, res) {
        try {
            const employees = await employeeModel.getAllEmployees();
            res.json(employees);
        } catch (err) {
            console.log(err);
            res.status(500).json({message: err.message});
        }
    }

    async getEmployeeById(req, res) {
        try {
            const {id} = req.params;
            const employee = await employeeModel.getEmployeeById(id);
            console.log(employee);
            if (!employee) {
                return res.status(404).json({message: 'No employee'});
            }
            res.json(employee);
        } catch (err) {
            console.log(err)
            res.status(500).json({message: err.message});
        }
    }



    async getEmployeeByName(req, res) {
        try {
            const {name} = req.params;
            const employee = await employeeModel.getEmployeeByName(name);
            if (!employee) {
                return res.status(404).json({message: 'employee not found'});
            }
            res.json(employee);
        } catch (err) {
            console.log(err);
            res.status(500).json({message: 'Server Error'});
        }
    }

    async getEmployeeByEmail(req, res) {
        try {
            const {email} = req.params;
            const employee = await employeeModel.getEmployeeByEmail(email);
            if (!employee) {
                return res.status(404).json({message: 'employee not found'});
            }
            res.json(employee);
        }catch (err){
            console.log(err)
            res.status(500).json({message: err.message});
        }
    }


    async postEmployee(req, res) {
        try {
            const newEmployee = req.body;
            const existingEmployee = await employeeModel.getEmployeeByEmail(newEmployee.email);
            if (existingEmployee) {
                return res.status(409).json({message: 'employee already exists!'});
            }
            const createEmployee = await employeeModel.addEmployee(newEmployee);
            res.status(201).json(createEmployee);
        } catch (err) {
            console.log(err);
            res.status(500).json({message: 'Server Error'});
        }
    }


    async putEmployee(req, res) {
        const {id} = req.params;
        const body = req.body;
        const existingEmployee = await employeeModel.getEmployeeById(id);
        if (!existingEmployee) {
            return res.status(404).json({message: 'Employee not found!'});
        }

        const putEmployee = await employeeModel.putEmployee(id, body);
        res.json({putEmployee});
    }


    async delEteemployee(req, res) {
        try {
            const {id} = req.params;
            const existingEmployee = await employeeModel.getEmployeeById(id);
            if (!existingEmployee) {
                return res.status(404).json({message: 'Employee not found!'});
            }

            const deleteEmployee = await employeeModel.deleteEmployee(id);
            res.json({message: 'Employee is deleted', deleteEmployee});
        } catch (err) {
            console.log(err);
            res.status(500).json({message: 'Server Error'});
        }
    }
}

export default new EmployeeController();