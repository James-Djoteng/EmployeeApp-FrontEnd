function populateTable(employees) {
    const tableBody = document.getElementById('employeeTableBody');
    employees.forEach((employee) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${employee.name}</td>
          <td>${employee.department}</td>
          <td>${employee.salary}</td>
        `;
      tableBody.appendChild(row);
    });
  }
  
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('/employees');
      if (!response.ok) {
        throw new Error('Failed to fetch employee data');
      }
      const employees = await response.json();
      populateTable(employees);
    } catch (error) {
      console.error('Error:', error.message);
    }
  });

  
document.addEventListener('DOMContentLoaded', async () => {
    // Event listener to fetch employee data from backend on page load
    try {
      const response = await fetch('http://localhost:8080/employees');
      if (!response.ok) {
        throw new Error('Failed to fetch employee data');
      }
      const employees = await response.json();
      populateTable(employees);
    } catch (error) {
      console.error('Error:', error.message);
    }
  });
  
  async function addEmployee(employeeData) {
    try {
      const response = await fetch('http://localhost:8080/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });
      if (!response.ok) {
        throw new Error('Failed to add employee');
      }
      const newEmployee = await response.json();
      console.log('New employee added:', newEmployee);
      // Update UI or perform other actions based on response
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch employees from the server and display them in the table
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/employees');
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const employees = await response.json();
        const tableBody = document.getElementById('employeeTableBody');
        tableBody.innerHTML = '';
        employees.forEach((employee) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
            <td>
              <button onclick="updateEmployee(${employee.id})">Update</button>
              <button onclick="deleteEmployee(${employee.id})">Delete</button>
            </td>
          `;
          tableBody.appendChild(row);
        });
      } catch (error) {
        console.error(error);
      }
    };
  
    // Function to add a new employee
    const addEmployee = async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      try {
        const response = await fetch('/employees', {
          method: 'POST',
          body: JSON.stringify(Object.fromEntries(formData)),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to add employee');
        }
        form.reset();
        fetchEmployees(); // Refresh the employee list
      } catch (error) {
        console.error(error);
      }
    };
  
    // Function to update an existing employee
    const updateEmployee = async (id) => {
      const form = document.getElementById('updateEmployeeForm');
      const formData = new FormData(form);
      try {
        const response = await fetch(`/employees/${id}`, {
          method: 'PUT',
          body: JSON.stringify(Object.fromEntries(formData)),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to update employee');
        }
        form.reset();
        fetchEmployees(); // Refresh the employee list
      } catch (error) {
        console.error(error);
      }
    };
  
    // Function to delete an existing employee
    const deleteEmployee = async (id) => {
      try {
        const response = await fetch(`/employees/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Failed to delete employee');
        }
        fetchEmployees(); // Refresh the employee list
      } catch (error) {
        console.error(error);
      }
    };
  
    // Event listeners for form submissions
    document.getElementById('addEmployeeForm').addEventListener('submit', addEmployee);
    document.getElementById('updateEmployeeForm').addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission
    });
    document.getElementById('deleteEmployeeForm').addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission
    });
  
    // Fetch employees when the page loads
    fetchEmployees();
  });
  
  /*<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Employee Management System</title>
  <link rel="stylesheet" href="styles.css">
  
</head>
<body>
  <h1>Employee Management System</h1>

  <!-- Form for adding a new employee -->
  <form id="addEmployeeForm">
    <h2>Add New Employee</h2>
    <input type="text" name="name" placeholder="Name" required>
    <input type="text" name="department" placeholder="Department" required>
    <input type="number" name="salary" placeholder="Salary" required>
    <button type="submit">Add Employee</button>
  </form>
  <!-- Form for updating an existing employee -->
  <form id="updateEmployeeForm" action="/employees/:id" method="PUT">
    <h2>Update Employee</h2>
    <input type="text" name="id" placeholder="Employee ID" required>
    <input type="text" name="name" placeholder="Name">
    <input type="text" name="department" placeholder="Department">
    <input type="number" name="salary" placeholder="Salary">
    <button type="submit">Update Employee</button>
  </form>

  <!-- Form for deleting an existing employee -->
  <form id="deleteEmployeeForm" action="/employees/:id" method="DELETE">
    <h2>Delete Employee</h2>
    <input type="text" name="id" placeholder="Employee ID" required>
    <button type="submit">Delete Employee</button>
  </form>

  <!-- Table for displaying employee information -->
  <h2>Employee List</h2>
  <table id="employeeTable">
    <thead>
      <tr>
        <th>Name</th>
        <th>Department</th>
        <th>Salary</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody id="employeeTableBody">
      <!-- Employee data will be dynamically populated here -->
    </tbody>
  </table>

  <!-- Form for uploading employee documents -->
  <form id="uploadDocumentForm">
    <h2>Upload Employee Document</h2>
    <input type="file" name="document" required>
    <button type="submit">Upload Document</button>
  </form>

  <!-- Display uploaded documents -->
  <h2>Employee Documents</h2>
  <ul id="documentList">
    <!-- Uploaded documents will be displayed here -->
  </ul>

  <script src="script.js"></script>
</body>
</html>
*/