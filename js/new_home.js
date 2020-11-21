let employee_payroll_list;
window.addEventListener('DOMContentLoaded', (event) => {
    employee_payroll_list = get_employee_payroll_from_storage();
    document.querySelector(".emp-count").textContent = employee_payroll_list.length;
    createInnerHtml();
});

const get_employee_payroll_from_storage = () => {
    return localStorage.getItem('Employee_List') ?
                        JSON.parse(localStorage.getItem('Employee_List')) : [];
}

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>" +
                       "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    for (employee_payroll_data of employee_payroll_list){
        innerHtml = `${innerHtml}
            <tr>
                <td><img src="${employee_payroll_data.profilePic}" alt="" class="profile">
                </td>
                <td>${employee_payroll_data.name}</td>
                <td>${employee_payroll_data.gender}</td>
                <td>${get_department_html(employee_payroll_data.department)}</td>
                <td>${employee_payroll_data.salary}</td>
                <td>${employee_payroll_data.start_date}</td>
                <td>
                    <img id=${employee_payroll_data.id} src="../assets/icons/delete-black-18dp.svg" alt="delete" onclick="remove(this)">
                    <img id="${employee_payroll_data.id}" src="../assets/icons/create-black-18dp.svg" alt="edit" onclick="update(this)">
                </td>
            </tr>
    `;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}

const get_department_html = (department_list) => {
    let department_html = '';
    for (const department of department_list) {
        department_html = `${department_html} <div class='dept-label'>${department}</div>`
    }
    return department_html;
}


// Remove Employee

const remove = (node) => {
    let employee_payroll_data = employee_payroll_list.find(employee_data => employee_data.id == node.id);
    if(!employee_payroll_data) return;
    const index = employee_payroll_list
                  .map(employee_data => employee_data.id)
                  .indexOf(employee_payroll_data.id);
    employee_payroll_list.splice(index, 1);
    localStorage.setItem("Employee_List", JSON.stringify(employee_payroll_list));
    document.querySelector(".emp-count").textContent = employee_payroll_list.length;
    createInnerHtml();
}