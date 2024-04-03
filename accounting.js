'use strict';

let departments = [];


class Department {
    constructor(name) {
        this.name = name;
        this.numberOfEmployees = 1;
        this.totalSalaries = 0;
        this.averageSalary;
        departments.push(this);
    }

    addSalary(value) {
        this.totalSalaries += value;
        this.averageSalary = Math.round(this.totalSalaries / this.numberOfEmployees);
    }

    addEmployee() {
        this.numberOfEmployees++;
    }
}

let employees = JSON.parse(localStorage.getItem("employees"));
employees.forEach(emp => {
    if (!departments.map(dep => dep.name).includes(emp.department)) {
        let newDepartment = new Department(emp.department);
        newDepartment.addSalary(emp.salary);
    } else {
        let department = departments.find(dep => dep.name == emp.department);
        department.addEmployee();
        department.addSalary(emp.salary);
    }
});

let table = document.createElement("table");
let thead = document.createElement("thead");

thead.innerHTML =
    `
    <tr>
        <th>Department Name</th>
        <th># Of Employees</th>
        <th>Average Salary</th>
        <th>Total Salary</th>
    </tr>
`;
table.appendChild(thead);

let tbody = document.createElement("tbody");

let departmentsSalaries = 0;
let departmentsAverageSalaries = 0;

departments.forEach(department => {
    tbody.innerHTML +=
        `
    <tr>
        <td>${department.name}</td>
        <td>${department.numberOfEmployees}</td>
        <td>${department.averageSalary}</td>
        <td>${department.totalSalaries}</td>
    </tr>
`;
    departmentsSalaries += department.totalSalaries;
    departmentsAverageSalaries+= department.averageSalary;
});
table.appendChild(tbody);

let tfoot = document.createElement("tfoot");
tfoot.innerHTML = 
`
<tr>
        <td>Total</td>
        <td>${employees.length}</td>
        <td>${departmentsAverageSalaries}</td>
        <td>${departmentsSalaries}</td>
    </tr>
`;

table.appendChild(tfoot);

document.getElementsByTagName("main")[0].appendChild(table);