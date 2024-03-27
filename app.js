//======================= Lab 7 =======================

function generateRandomSalary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Employee {
    constructor(id, fullName, department, level, imageUrl) {
        this.id = id;
        this.fullName = fullName;
        this.department = department;
        this.level = level;
        this.imageUrl = imageUrl;
        this.salary = this.level == "Junior" ?
            generateRandomSalary(500, 1000) : this.level == "Mid-Senior" ?
                generateRandomSalary(1000, 1500) :
                this.level == "Senior" ?
                    generateRandomSalary(1500, 2000) : undefined;
    };
}


Employee.prototype.calculateNetSalary = function () {
    let percentage = (this.salary * 7.5) / 100;
    return this.salary - percentage;
}

Employee.prototype.getNameAndSalary = function () {
    return `${this.fullName}  ${this.salary}`;
}


let tbody = document.getElementsByTagName("tbody");

let employees = [
    new Employee(1000, "Ghazi Samer", "Administration", "Senior", "../images/default personal image.jpg"),
    new Employee(1001, "Lana Ali", "Finance", "Senior", "../images/default personal image.jpg"),
    new Employee(1002, "Tamara Ayoub", "Marketing", "Senior", "../images/default personal image.jpg"),
    new Employee(1003, "Safi Walid", "Administration", "Mid-Senior", "../images/default personal image.jpg"),
    new Employee(1004, "Omar Zaid", "Development", "Senior", "../images/default personal image.jpg"),
    new Employee(1005, "Rana Saleh", "Development", "Junior", "../images/default personal image.jpg"),
    new Employee(1006, "Hadi Ahmad", "Finance", "Mid-Senior", "../images/default personal image.jpg"),
];

for (let i = 0; i < employees.length; i++) {
    let employee = employees[i];
    tbody[0].innerHTML += `<tr>
    <td>${employee.id}</td>
    <td>${employee.fullName}</td>
    <td>${employee.department}</td>
    <td>${employee.level}</td>
    <td><img src = "${employee.imageUrl}"></td>
    <td>${employee.calculateNetSalary()}</td>
    <td>${employee.salary}</td>
</tr>
    `;
}