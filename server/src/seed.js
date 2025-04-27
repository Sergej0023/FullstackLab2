import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import employee from './model/employeeModel.js'
import project from './model/projectModel.js'
import assignment from './model/assignmentModel.js'

const MONGO_URI = process.env.CONNECTION_URI

async function seed() {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('Connected to MongoDB')

        await employee.deleteAll({})
        await project.deleteAll({})
        await assignment.deleteAll({})


        const plainPassword = ['alice123', 'bob123', 'charlie123', 'dana123', 'eli123']
        const hashedPassword = await Promise.all(plainPassword.map(pw => bcrypt.hash(pw, 10)))

        const employees = await employee.addEmployees([
            {employee_id: 'E001', full_name: 'Alice Aloom', email: 'alice@example.com', password: hashedPassword[0]},
            {employee_id: 'E002', full_name: 'Bob Bashir', email: 'bob@example.com', password: hashedPassword[1]},
            {employee_id: 'E003', full_name: 'Charlie Chen', email: 'charlie@example.com', password: hashedPassword[2]},
            {employee_id: 'E004', full_name: 'Dana D', email: 'dana@example.com', password: hashedPassword[3]},
            {employee_id: 'E005', full_name: 'Eli Ekstrom', email: 'eli@example.com', password: hashedPassword[4]},
        ])


        const projects = await project.addProjects([
            {project_code: 'P001', project_name: 'AI Dashboard', project_description: 'Visualization AI data'},
            {project_code: 'P002', project_name: 'Chatbot Dev', project_description: 'Customer service assistant'},
            {project_code: 'P003', project_name: 'IoT Monitor', project_description: 'Smart sensor dashboard'},
            {project_code: 'P004', project_name: 'E-Learning', project_description: 'Online course platform'},
            {project_code: 'P005', project_name: 'DataViz Pro', project_description: 'Advanced data visualization'},
        ])

        const assignments = await assignment.addAssignments([
            {employee: employees[0]._id, project: projects[0]._id, start_date: new Date("2025-03-01")},
            {employee: employees[1]._id, project: projects[1]._id, start_date: new Date("2025-03-05")},
            {employee: employees[2]._id, project: projects[2]._id, start_date: new Date("2025-03-10")},
            {employee: employees[3]._id, project: projects[3]._id, start_date: new Date("2025-03-15")},
            {employee: employees[4]._id, project: projects[4]._id, start_date: new Date("2025-03-20")},
        ])

        console.log('seed data successfully')
    } catch (err) {
        console.log(err.message);
    }
}

export default seed;