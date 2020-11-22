class Employee {
    name;
    salary;
    gender;
    department;
    start_date;
    notes;
    profilePic;
    id;

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

    set_id(id) {
        this.id = id;
    }

    toString() {
        return "name= " + this.name + ", gender= " + this.gender +
            ", profile pic=  " + this.profilePic + ", department= " + this.department +
            ", salary= " + this.salary + ", startDate= " + this.start_date + ", notes= " +
            this.notes;
    }
}

// DOM Content Loaded

let isUpdate = false;
let employee_payroll_object = {};

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

    // Salary dispay

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });

    // Date display

    let day = document.querySelector('#day');
    let month = document.querySelector('#month');
    let year = document.querySelector('#year');
    const dateError = document.querySelector('.date-error');
    day.addEventListener('click', checkDate);
    month.addEventListener('click', checkDate);
    year.addEventListener('click', checkDate);
    let date = new Date(year + '/' + month + '/' + day);
    function checkDate() {
        try {
            (new Employee()).set_start_date(year.value + '/' + month.value + '/' + day.value);
            dateError.textContent = "";
        } catch (e) {
            dateError.textContent = e;
        }
    }

    checkForUpdate();

});

const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employee_payroll_object = JSON.parse(employeePayrollJson);
    setForm();
}

const setForm = () => {
    setValue('#name', employee_payroll_object.name);
    setSelectedValues('[name=profile]', employee_payroll_object.profilePic);
    setSelectedValues('[name=gender]', employee_payroll_object.gender);
    setSelectedValues('[name=department]', employee_payroll_object.department);
    setValue('#salary', employee_payroll_object.salary);
    setTextValue('.salary-output', employee_payroll_object.salary);
    setValue('#notes', employee_payroll_object.notes);
    let date = employee_payroll_object.start_date.split("/");
    setValue('#day', date[2]);
    setValue('#month', date[1]);
    setValue('#year', date[0]);
}

const setSelectedValues = (propertyValue, value) => {
    let all_items = document.querySelectorAll(propertyValue);
    all_items.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value == value) {
            item.checked = true;
        }
    });
}

// Submit

const employee_data = document.querySelector('.form-content'),
    form = employee_data.querySelectorAll('.form'),
    submitInput = form[0].querySelector('input[type="submit"]');

function save(event) {

    let toPrint = true;
    event.preventDefault();
    event.stopPropagation();
    let formData = new FormData(form[0]);

    let employee = new Employee();
    employee.set_name(formData.get('name'));
    employee.set_profile(formData.get('profile'));
    employee.set_gender(formData.get('gender'));
    employee.set_salary(formData.get('salary'));
    employee.set_department(formData.get('department'));
    employee.set_start_date(formData.get('Year') + '/' + formData.get('Month') + '/' + formData.get('Day'));
    employee.set_department(getSelectedValues('department'));
    employee.set_notes(formData.get('Notes'));
    if (!isUpdate) {
        employee.set_id(getId());
    }

    if (toPrint) {
        console.log(employee.toString());
        createAndUpdateStorage(employee);
    }
    window.location.replace(site_properties.home_page);
}

document.addEventListener('DOMContentLoaded', function () {
    submitInput.addEventListener('click', save, false);
}, false);

function getId() {
    let employee_list = JSON.parse(localStorage.getItem("Employee_List"));
    if (employee_list) {
        return employee_list.length + 1;
    }
    else {
        return 1;
    }

}

// Get Selected values

const getSelectedValues = (propertyValue) => {
    let all_items = document.getElementsByName(propertyValue);
    let selected_items = [];
    all_items.forEach(item => {
        if (item.checked) selected_items.push(item.value);
    });
    return selected_items;
};


// Create and Update Local Storage

function createAndUpdateStorage(employee) {
    let employee_list = JSON.parse(localStorage.getItem("Employee_List"));
    if (employee.id != undefined) {
        if (employee_list != undefined) {
            employee_list.push(employee);
        }
        else {
            employee_list = [employee];
        }
        alert("Employee Added !! \n\n" + employee.toString());
        localStorage.setItem("Employee_List", JSON.stringify(employee_list));
    }
    else {
        employee.id = employee_payroll_object.id;
        let employee_payroll_data = employee_list.find(employee_data => employee_data.id == employee.id);
        const index = employee_list
            .map(employee_data => employee_data.id)
            .indexOf(employee_payroll_data.id);
        employee_list.splice(index, 1, employee);
        alert("Employee Updated !! \n\n" + employee.toString());
        localStorage.setItem("Employee_List", JSON.stringify(employee_list));
    }


}


// Reset Form

const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes', '');
    setSelectedIndex('#day', 0);
    setSelectedIndex('#month', 0);
    setSelectedIndex('#year', 0);
}

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}

const unsetSelectedValues = (propertyValue) => {
    let all_items = document.querySelectorAll(propertyValue);
    all_items.forEach(item => {
        item.checked = false;
    });
};

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}
