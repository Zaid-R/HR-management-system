//======================= Lab 8 =======================

let employees = [];


class Employee {
    constructor(fullName, department, level, imageUrl) {
        this.id = generateUniqueId();
        this.fullName = fullName;
        this.department = department;
        this.level = level;
        this.imageUrl = imageUrl;
        this.salary = this.level == "Junior" ?
            generateRandomSalary(500, 1000) : this.level == "Mid-Senior" ?
                generateRandomSalary(1000, 1500) :
                this.level == "Senior" ?
                    generateRandomSalary(1500, 2000) : undefined;
        employees.push(this);
    };
}

function generateRandomSalary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

String.prototype.isEmpty = function () {
    return this == null || this.trim() == "";
}

function generateUniqueId() {
    return 1000 + employees.length;
}

Employee.prototype.calculateNetSalary = function () {
    let percentage = (this.salary * 7.5) / 100;
    return this.salary - percentage;
}

Employee.prototype.getNameAndSalary = function () {
    return `${this.fullName}  ${this.salary}`;
}


let imageUrl = "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=740&t=st=1711538419~exp=1711539019~hmac=3b47d39464306ec37f9a38fc0693dc6f0484a71482c382764b7030d495d5c0ce";

let departments = ["Administration", "Development", "Finance", "Marketing"];

new Employee("Ghazi Samer", "Administration", "Senior", imageUrl);
new Employee("Lana Ali", "Finance", "Senior", imageUrl);
new Employee("Tamara Ayoub", "Marketing", "Senior", imageUrl);
new Employee("Safi Walid", "Administration", "Mid-Senior", imageUrl);
new Employee("Omar Zaid", "Development", "Senior", imageUrl);
new Employee("Rana Saleh", "Development", "Junior", imageUrl);
new Employee("Hadi Ahmad", "Finance", "Mid-Senior", imageUrl);


let center = document.getElementsByClassName("center")[0];

//verticaly correct
departments.forEach(department => {
    // Filter employees by department
    let departmentEmployees = employees.filter(employee => employee.department === department);
    console.log(departmentEmployees);
    // Create a section for the department
    let departmentSection = document.createElement("section");
    departmentSection.classList.add("emps");

    // Add department name as heading
    let departmentHeading = document.createElement("h2");
    departmentHeading.textContent = department;
    departmentSection.appendChild(departmentHeading);

    // Append employee cards to the section
    departmentEmployees.forEach(employee => {
        let firstName = employee.fullName.split(" ")[0];
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.innerHTML = `
            <img src="assets/${firstName}.jpg">
            <div class="card-content">
                <p>Name: ${employee.fullName} - ID: ${employee.id}</p>
                <p>Department: ${employee.department} - Level: ${employee.level}</p>
                <p>${employee.salary}</p>
            </div>
        `;
        departmentSection.appendChild(cardDiv);
    });

    // Append the department section to the center container
    center.appendChild(departmentSection);
});


let myForm = document.forms[0];

myForm.addEventListener("submit", function (e) {
    let fullName = e.target.fullName.value;
    let imageUrl = e.target.imageUrl.value;
    let department = e.target.department.value;
    let level = e.target.level.value;
    if (fullName.isEmpty() || imageUrl.isEmpty() || department == "Department" || level == "Level") {
        e.preventDefault();
    } else {
        new Employee(fullName, department, level, imageUrl);
        console.log("Emp added");
    }
});
