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
  
  