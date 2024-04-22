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
  