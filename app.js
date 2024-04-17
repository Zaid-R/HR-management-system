'use strict';
//======================= Lab 8 =======================

let employees = [];
let dataKey = "employees";

class Employee {
    constructor(fullName, department, level) {
        this.id = generateUniqueId();
        this.fullName = fullName;
        this.department = department;
        this.imageUrl = `assets/${this.fullName.split(" ")[0]}.jpg`;
        this.level = level;
        this.salary = this.level == "Junior" ?
            generateRandomSalary(500, 1000) : this.level == "Mid-Senior" ?
                generateRandomSalary(1000, 1500) :
                this.level == "Senior" ?
                    generateRandomSalary(1500, 2000) : undefined;
        employees.push(this);
    };

    setImageUrl(url) {
        this.imageUrl = url;
    }
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


let departments = ["Administration", "Development", "Finance", "Marketing"];

new Employee("Ghazi Samer", "Administration", "Senior");
new Employee("Lana Ali", "Finance", "Senior");
new Employee("Tamara Ayoub", "Marketing", "Senior");
new Employee("Safi Walid", "Administration", "Mid-Senior");
new Employee("Omar Zaid", "Development", "Senior");
new Employee("Rana Saleh", "Development", "Junior");
new Employee("Hadi Ahmad", "Finance", "Mid-Senior");

function addEmployeesToLocalStorage(){
    localStorage.setItem(dataKey, JSON.stringify(employees));
}

function addHardCodedDataToLocalStorage() {
    let dataOnLocalStorage = localStorage.getItem(dataKey);
    if (dataOnLocalStorage == null) {
        addEmployeesToLocalStorage();
    }
}

let center = document.getElementsByClassName("center")[0];

function createCard(employee) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML =
        `
    <div class="container">
         <div class="wrapper">
            <img src="${employee.imageUrl}" alt="${employee.fullName}">
            <div class="title">
               <p>Name: ${employee.fullName}</p><p> ID: ${employee.id}</p>
               <p>Department: ${employee.department}</p><p> Level: ${employee.level}</p>
                <p>${employee.salary}</p>
            </div>
         </div>
      </div>
    `;
    return card;
}


function addCard(employee) {
    let fieldset = document.getElementsByClassName(employee.department)[0];
    let card = createCard(employee);
    fieldset.appendChild(card);
}

function renderData() {
    //First of all, get data from local storage
    employees = JSON.parse(localStorage.getItem(dataKey));

    //then show the data on the page
    departments.forEach(department => {
        // Filter employees by department
        let departmentEmployees = employees.filter(employee => employee.department === department);
        // Create a section for the department
        let departmentSection = document.createElement("section");
        departmentSection.classList.add("emps");
        // Create fieldset
        let departmentFieldset = document.createElement("fieldset");
        departmentFieldset.classList.add(department);
        //Create legend 
        let departmentLegend = document.createElement("legend");
        // Add department name as heading
        let departmentHeading = document.createElement("h2");
        departmentHeading.textContent = department;
        departmentLegend.appendChild(departmentHeading);
        departmentFieldset.appendChild(departmentLegend);
        departmentSection.appendChild(departmentFieldset);

        // Append employee cards to the section
        departmentEmployees.forEach(employee => {
            let card = createCard(employee);
            departmentFieldset.appendChild(card);
        });
        // addEmployeeToLocalstorage(employee);
        // Append the department section to the center container
        center.appendChild(departmentSection);
    });
}


let myForm = document.forms[0];

myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let fullName = e.target.fullName.value;
    let imageUrl = e.target.imageUrl.value;
    let department = e.target.department.value;
    let level = e.target.level.value;
    if (fullName.isEmpty() || imageUrl.isEmpty() || department == "Department" || level == "Level") {
        return;
    } else {
        let newEmp = new Employee(fullName, department, level);
        newEmp.setImageUrl(imageUrl);
        addEmployeesToLocalStorage();
        addCard(newEmp);
    }
});

addHardCodedDataToLocalStorage();

renderData();