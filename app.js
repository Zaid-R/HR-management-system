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
let imageUrl = "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=740&t=st=1711538419~exp=1711539019~hmac=3b47d39464306ec37f9a38fc0693dc6f0484a71482c382764b7030d495d5c0ce";
let employees = [
    new Employee(1000, "Ghazi Samer", "Administration", "Senior", imageUrl),
    new Employee(1001, "Lana Ali", "Finance", "Senior", imageUrl),
    new Employee(1002, "Tamara Ayoub", "Marketing", "Senior", imageUrl),
    new Employee(1003, "Safi Walid", "Administration", "Mid-Senior", imageUrl),
    new Employee(1004, "Omar Zaid", "Development", "Senior", imageUrl),
    new Employee(1005, "Rana Saleh", "Development", "Junior", imageUrl),
    new Employee(1006, "Hadi Ahmad", "Finance", "Mid-Senior", imageUrl),
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