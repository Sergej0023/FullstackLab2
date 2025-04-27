import mongoose, {Schema} from 'mongoose';
import seed from '../seed.js';

class DatabaseService {
    #db = null;
    employeeSchema = null;
    projectSchema = null;
    assignmentSchema = null;

    employees = null;
    projects = null
    assignments = null;


    async connect() {
        console.log('Trying to connect to the database...');
        try {

            this.#db = await mongoose.connect(process.env.CONNECTION_URI);
            console.log('Connection to DB successful.');


            this.employeeSchema = new Schema(
                {
                    employee_id: {
                        type: String,
                        required: true,
                        unique: true
                    },
                    full_name: {
                        type: String,
                        required: true,
                    },
                    email: {
                        type: String,
                        unique: true,
                        required: true,
                        lowercase: true,
                    },
                    password: {
                        type: String,
                        required: true,
                    },
                },
            );

            this.projectSchema = new Schema(
                {
                    project_code: {
                        type: String,
                        required: true,
                        unique: true
                    },
                    project_name: {
                        type: String,
                        required: true
                    },
                    project_description: String,
                },
            )

            this.assignmentSchema = new Schema(
                {
                    employee: {type: Schema.Types.ObjectId, ref: 'employees'},
                    project: {type: Schema.Types.ObjectId, ref: 'projects'},
                    start_date: {type: Date, default: Date.now, immutable: true},
                }
            )


            this.employees = mongoose.model('employees', this.employeeSchema);
            this.projects = mongoose.model('projects', this.projectSchema);
            this.assignments = mongoose.model('assignments', this.assignmentSchema);

            await seed()
        } catch (err) {
            console.log('Error with connection: ' + err);
        }
    }


    async disconnect() {
        try {

            if (this.#db) {
                await mongoose.disconnect();
                console.log('Database disconnected.');
            }
        } catch (err) {

            console.log('Error while disconnecting: ' + err);
        }
    }
}

export default new DatabaseService();

