import React, { useEffect, useState } from 'react'

const ProjectAssignmentsTable = () => {
    const [assignments, setAssignments] = useState([])
    const [sortKey, setSortKey] = useState("start_date")
    const [sortOrder, setSortOrder] = useState("asc")
    const [datalength, setDatalength] = useState(0)
    const [newEmployee, setNewEmployee] = useState({
        full_name: "",
        email: "",
        password: ""
    })

    const fetchAssignments = async () => {
        const res = await fetch('http://localhost:5000/api/assignments')
        const data = await res.json()
        setDatalength(data.length)
        setAssignments(data.slice(-(data.length)))
    }

    useEffect(() => {
        fetchAssignments()
        const interval = setInterval(fetchAssignments, 6000) // Refresh every 6 seconds
        return () => clearInterval(interval)
    }, [])

    const handleSort = (key) => {
        const order = sortKey === key && sortOrder === "asc" ? "desc" : "asc"
        setSortKey(key)
        setSortOrder(order)

        const sortedData = [...assignments].sort((a, b) => {
            const getValue = (obj, keyPath) => {
                // Handle nested keys like "employee.employee_id"
                return keyPath.split('.').reduce((value, key) => value[key], obj)
            }

            const aValue = getValue(a, key)
            const bValue = getValue(b, key)

            if (aValue < bValue) return order === "asc" ? -1 : 1
            if (aValue > bValue) return order === "asc" ? 1 : -1
            return 0
        })

        setAssignments(sortedData)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewEmployee({ ...newEmployee, [name]: value })
    }

    const handleAddEmployee = async () => {
        try {
            const [employeeRes, randomAssignment] = await Promise.all([
                fetch('http://localhost:5000/api/employee', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        employee_id: datalength + 1,
                        full_name: newEmployee.full_name,
                        email: newEmployee.email,
                        password: newEmployee.password
                    })
                }),
                assignments[Math.floor(Math.random() * assignments.length)]
            ]);

            if (!employeeRes.ok) throw new Error('Failed to add employee');

            const employeeData = await employeeRes.json();
            const createdEmployeeId = employeeData._id;

            const projectRes = await fetch('http://localhost:5000/api/project', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    project_code: datalength + 1,
                    project_name: randomAssignment.project.project_name,
                    project_description: randomAssignment.project.project_description
                })
            });

            if (!projectRes.ok) throw new Error('Failed to add project');

            const projectData = await projectRes.json();
            const createdProjectId = projectData._id;

            const assignmentRes = await fetch('http://localhost:5000/api/assign_project', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    employee_id: createdEmployeeId,
                    project_id: createdProjectId,
                    start_date: new Date().toISOString()
                })
            });

            if (!assignmentRes.ok) throw new Error('Failed to assign project');

            alert('Assigned a Project for you, new Employee!');
            fetchAssignments(); // Refresh the table after adding
            setNewEmployee({ full_name: "", email: "", password: "" }); // Clear the form
        } catch (error) {
            alert(error.message);
            console.error(error);
        }
    };

    return (
        <div className = 'container'>
            <table>
                <thead>
                <tr>
                    <th onClick={() => handleSort("employee.employee_id")}>Employee ID</th>
                    <th onClick={() => handleSort("employee.full_name")}>Employee Name</th>
                    <th onClick={() => handleSort("project.project_name")}>Project Name</th>
                    <th onClick={() => handleSort("start_date")}>Start Date</th>
                </tr>
                </thead>
                <tbody>
                {assignments.map((assignment) => (
                    <tr key={`${assignment.employee_id}-${assignment.start_date}`}>
                        <td>{assignment.employee.employee_id}</td>
                        <td>{assignment.employee.full_name}</td>
                        <td>{assignment.project.project_name}</td>
                        <td>{new Date(assignment.start_date).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className='add-employee'>
                <h3>Add New Employee</h3>
                <input
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    value={newEmployee.full_name}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newEmployee.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={newEmployee.password}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddEmployee}>Add Employee</button>
            </div>
        </div>
    )
}

export default ProjectAssignmentsTable