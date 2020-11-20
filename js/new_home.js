window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>" +
                       "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    let employee_payroll_list = create_employee_payroll_json();
    for (employee_payroll_data of employee_payroll_list){
        innerHtml = `${innerHtml}
            <tr>
                <td><img src="${employee_payroll_data.profile_pic}" alt="" class="profile">
                </td>
                <td>${employee_payroll_data.name}</td>
                <td>${employee_payroll_data.gender}</td>
                <td>${get_department_html(employee_payroll_data.department)}</td>
                <td>${employee_payroll_data.salary}</td>
                <td>${employee_payroll_data.start_date}</td>
                <td>
                    <img id="1" src="../assets/icons/delete-black-18dp.svg" alt="delete">
                    <img id="1" src="../assets/icons/create-black-18dp.svg" alt="edit">
                </td>
            </tr>
    `;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}

const create_employee_payroll_json = () => {
    let employee_payroll_list_local = [
        {
            name: 'Mukesh Ranjan',
            gender: 'male',
            department: [
                'Engineering','Finance'
            ],
            salary: '500000',
            start_date: '29 Oct 2020',
            note: '',
            id: new Date().getTime(),
            profile_pic: '../assets/profile-images/Ellipse -2.png'
        },
        {
            name: 'Nobita',
            gender: 'male',
            department: [
                'Sales','Finance'
            ],
            salary: '500000',
            start_date: '29 Oct 2020',
            note: '',
            id: new Date().getTime(),
            profile_pic: '../assets/profile-images/Ellipse -3.png'
        }
    ];
    return employee_payroll_list_local;
};

const get_department_html = (department_list) => {
    let department_html = '';
    for (const department of department_list) {
        department_html = `${department_html} <div class='dept-label'>${department}</div>`
    }
    return department_html;
}