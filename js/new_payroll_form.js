class Employee {
    name;
    salary;
    gender;
    department;
    start_date;
    notes;
    profilePic;

    set_start_date(start_date) {
        let date = new Date(start_date);
        let date_of_joining = new Date();
        date_of_joining.setDate(date_of_joining.getDate() - 30);
        if (date > Date.now()) {
            throw 'You are trying to enter a future date !'
        }
        else if (date - date_of_joining < 0) {
            throw 'Not within 30 days of date of joining'
        }
        else {
            this.start_date = start_date;
        }
    }

    set_notes(notes) {
        this.notes = notes;
    }

    set_name(name) {
        let regex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if (regex.test(name)) {
            this.name = name;
        }
        else {
            throw 'Name is Incorrect !';
        }
    }

    set_salary(salary) {
        this.salary = salary;
    }

    set_gender(gender) {
        this.gender = gender;
    }

    set_department(department) {
        this.department = department;
    }

    set_profile(profile) {
        this.profilePic = profile;
    }

    toString() {
        return "name= " + this.name + ", gender= " + this.gender +
            ", profile pic=  " + this.profilePic + ", department= " + this.department +
            ", salary= " + this.salary + ", startDate= " + this.start_date + ", notes= " +
            this.notes;
    }
}


window.addEventListener('DOMContentLoaded', (event) => {
    let name = document.querySelector('#name');
    const textError = document.querySelector('.name-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new Employee()).set_name(name.value);
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });

    let day = document.querySelector('#day');
    let month = document.querySelector('#month');
    let year = document.querySelector('#year');
    const dateError = document.querySelector('.date-error');
    name.addEventListener('select', function () {
        try {
            (new Employee()).set_start_date(year + '/' + month + '/' + day);
            dateError.textContent = "";
        } catch (e) {
            dateError.textContent = e;
        }
    });


});

// const save = () => {
//     try {
//         let employeePayrollData = createEmployeePayroll();
//     } catch (e) {
//         return;
//     }
// }

// const createEmployeePayroll = () => {
//     let employee = new Employee();
//     let toPrint = true;
//     try {
//         employee.set_name = document.querySelector('#name').value;
//     } catch (e) {
//         console.log(e);
//         toPrint = false;
//     }

//     employee.set_gender = document.querySelector('#gender').value;
//     employee.set_profile = document.querySelector('#profile').value;
//     employee.set_department = getSelectedValues('[name=department]');
//     employee.set_salary = document.querySelector('#salary').value;
//     employee.set_notes = document.querySelector('#notes').value;
//     try {
//         employee.set_start_date = document.querySelector('#year') + "/" + document.querySelector('#month') + "/" +
//         document.querySelector('#day');
//     } catch (e){
//         console.log(e);
//         alert(e);
//         toPrint = false;
//     }
//     console.log(employee.toString());
//        if (toPrint) {
//         console.log(employee.toString());
//         alert(employee.toString())
//     }
//     return employee;
// }

// const getSelectedValues = (propertyValue) => {
//     let all_items = document.querySelector(propertyValue);
//     let selected_items = [];
//     all_items.forEach(item => {
//         if(item.checked) selected_items.push(item.value);
//     });
//     return selected_items;
// };

const employee_data = document.querySelector('.form-content'),
    form = employee_data.querySelectorAll('.form'),
    submitInput = form[0].querySelector('input[type="submit"]');

function save(event) {
    let toPrint = true;
    event.preventDefault();
    let formData = new FormData(form[0]);

    let employee = new Employee();
    employee.set_name(formData.get('name'));
    employee.set_profile(formData.get('profile'));
    employee.set_gender(formData.get('gender'));
    employee.set_salary(formData.get('salary'));
    employee.set_department(formData.get('department'));
    try {
        employee.set_start_date(formData.get('Year') + '/' + formData.get('Month') + '/' + formData.get('Day'));
    } catch (e) {
        console.log(e);
        alert(e);
        toPrint = false;
    }

    var checkboxes = document.getElementsByName('department');
    var departments = "";
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        if (checkboxes[i].checked) {
            departments += "," + checkboxes[i].value;
        }
    }
    if (departments) departments = departments.substring(1);
    employee.set_department(departments);
    employee.set_notes(formData.get('Notes'));

    if (toPrint) {
        console.log(employee.toString());
        alert(employee.toString())
    }
}

document.addEventListener('DOMContentLoaded', function () {
    submitInput.addEventListener('click', save, false);
}, false);
