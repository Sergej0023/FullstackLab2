import databaseService from "../service/databaseService.js"
import bcrypt from 'bcrypt'

class EmployeeModel {


    async getAllEmployees() {
        try {
            return await databaseService.employees.find();
        } catch (err) {
            console.log("Error fetching all employees:", err);
            throw new Error("Could not fetch employees");
        }
    }

    async getEmployeeById(id) {
        try {
            return await databaseService.employees.findOne({'_id': id});
        } catch (err) {
            console.log("Error fetching employee by ID:", err);
            throw new Error("Could not fetch employee by ID");
        }
    }


    async getEmployeeByEmail(email) {
        try {
            return await databaseService.employees.findOne({'email': email});
        } catch (err) {
            console.log("Error fetching employee by code:", err);
            throw new Error("Could not fetch employee by code");
        }
    }

    async getEmployeeByName(name) {
        try {
            return await databaseService.employees.find({'full_name': name});
        } catch (err) {
            console.log("Error fetching employee by name:", err);
            throw new Error("Could not fetch employee by name");
        }
    }


    async addEmployee(employee) {
        try {

            // Promise.all(plainPassword.map(pw => bcrypt.hash(pw, 10)))
            employee.password = await bcrypt.hash(employee.password, 10); // encrypt password before posting
            return await databaseService.employees.create(employee);
        } catch (err) {
            console.log("Error adding employee:", err);
            throw new Error("Could not add the employee");
        }
    }

    async addEmployees(employees){
        try {
            return await databaseService.employees.insertMany(employees);
        } catch (err) {
            console.log("Error adding employees:", err);
            throw new Error("Could not add employees");
        }
    }

    async putEmployee(id, body) {
        try {

            const password = body.password;
            body.hashed_password = await bcrypt.hash(password, 10)
            return await databaseService.employees.findByIdAndUpdate(
                {'_id': id},
                {
                    'full_name': body.full_name,
                    'email': body.email,
                    'password': body.hashed_password,
                },
                {new: true}
            );
        } catch (err) {
            console.log("Error updating employee:", err);
            throw new Error("Could not update the employee");
        }
    }

    async deleteEmployee(id) {
        try {
            return await databaseService.employees.findOneAndDelete({'_id': id});
        } catch (err) {
            console.log("Error deleting employee:", err);
            throw new Error("Could not delete the employee");
        }
    }

    async deleteAll(){
        try{
            return await databaseService.employees.deleteMany({});
        }catch(err){
            console.log("Error deleting employee:", err);
            throw new Error("Could not delete employee");
        }
    }
}

export default new EmployeeModel();