# Lab 9
# 1. Add the data to the local storage from app.js
 ```javascript

 localStorage.setItem("employees",JSON.stringify(employees));

 ```

 # 2. Get the data in accounting.js
 ```javascript

 let data = JSON.parse(localStorage.getItem("employees"));

 ```
 # 3. Make a class for the department
 ```javascript

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
        this.averageSalary = 
            Math.round(this.totalSalaries /
                         this.numberOfEmployees);
    }

    addEmployee() {
        this.numberOfEmployees++;
    }
}

 ```

 # 4. Iterate on the employees list to collect the data of table

 # 5. Iterate on the department list to display the data on the web page