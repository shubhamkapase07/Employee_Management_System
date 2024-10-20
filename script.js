// Employee List Array
let employeeList = [];

// Load from Local Storage when the page is loaded
window.onload = function () {
  loadFromLocalStorage();
};

// Add Employee Function
function addEmployee(name, position, salary, department) {
  const employee = {
    id: Date.now(),
    name: name,
    position: position,
    salary: salary,
    department: department
  };
  employeeList.push(employee);
  saveToLocalStorage();
  displayEmployees();
}

// Delete Employee Function
function deleteEmployee(id) {
  employeeList = employeeList.filter(employee => employee.id !== id);
  saveToLocalStorage();
  displayEmployees();
}

// Edit Employee Function
function editEmployee(id) {
  const employee = employeeList.find(emp => emp.id === id);
  if (employee) {
    document.getElementById('name').value = employee.name;
    document.getElementById('position').value = employee.position;
    document.getElementById('salary').value = employee.salary;
    document.getElementById('department').value = employee.department;

    deleteEmployee(id); // Remove the employee from the list for re-adding
  }
}

// Display Employees Function
function displayEmployees() {
  const tableBody = document.getElementById('employeeTableBody');
  tableBody.innerHTML = '';

  employeeList.forEach(employee => {
    const row = `
      <tr>
        <td>${employee.name}</td>
        <td>${employee.position}</td>
        <td>${employee.salary}</td>
        <td>${employee.department}</td>
        <td>
          <button class="edit-btn" onclick="editEmployee(${employee.id})">Edit</button>
          <button class="delete-btn" onclick="deleteEmployee(${employee.id})">Delete</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Search Employees
document.getElementById('searchBar').addEventListener('input', function (e) {
  const searchTerm = e.target.value.toLowerCase();
  const filteredEmployees = employeeList.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm) || 
    employee.position.toLowerCase().includes(searchTerm)
  );
  displayFilteredEmployees(filteredEmployees);
});

// Filter Employees by Department
function filterByDepartment() {
  const selectedDepartment = document.getElementById('departmentFilter').value;
  const filteredEmployees = selectedDepartment === 'All' 
    ? employeeList 
    : employeeList.filter(employee => employee.department === selectedDepartment);
  displayFilteredEmployees(filteredEmployees);
}

// Display Filtered Employees
function displayFilteredEmployees(filteredEmployees) {
  const tableBody = document.getElementById('employeeTableBody');
  tableBody.innerHTML = '';

  filteredEmployees.forEach(employee => {
    const row = `
      <tr>
        <td>${employee.name}</td>
        <td>${employee.position}</td>
        <td>${employee.salary}</td>
        <td>${employee.department}</td>
        <td>
          <button class="edit-btn" onclick="editEmployee(${employee.id})">Edit</button>
          <button class="delete-btn" onclick="deleteEmployee(${employee.id})">Delete</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Save to Local Storage
function saveToLocalStorage() {
  localStorage.setItem('employeeList', JSON.stringify(employeeList));
}

// Load from Local Storage
function loadFromLocalStorage() {
  const storedEmployees = localStorage.getItem('employeeList');
  if (storedEmployees) {
    employeeList = JSON.parse(storedEmployees);
    displayEmployees();
  }
}

// Form Submission Event Listener
document.getElementById('employeeForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const position = document.getElementById('position').value;
  const salary = document.getElementById('salary').value;
  const department = document.getElementById('department').value;

  if (validateForm(name, position, salary, department)) {
    addEmployee(name, position, salary, department);
    document.getElementById('employeeForm').reset();
  }
});

// Form Validation
function validateForm(name, position, salary, department) {
  const nameRegex = /^[a-zA-Z\s]+$/;
  const positionRegex = /^[a-zA-Z\s]+$/;
  const salaryRegex = /^\d+$/;

  if (!nameRegex.test(name)) {
    alert('Please enter a valid name');
    return false;
  }
  if (!positionRegex.test(position)) {
    alert('Please enter a valid position');
    return false;
  }
  if (!salaryRegex.test(salary) || salary <= 0) {
    alert('Please enter a valid salary');
    return false;
  }
  if (department === '') {
    alert('Please select a department');
    return false;
  }
  return true;
}
