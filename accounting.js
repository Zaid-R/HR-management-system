'use strict';

let employees = JSON.parse(localStorage.getItem("employees"));
let table = document.createElement("table");
let thead = document.createElement("thead");
thead.innerHTML = 
`
<tr>
`;