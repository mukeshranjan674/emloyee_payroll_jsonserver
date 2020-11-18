const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function () {
    output.textContent = salary.value;
});

try {
    let name = document.querySelector('#name');
    const textError = document.querySelector('.name-error');
    name.addEventListener('input', function () {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if (nameRegex.test(name.value))
            textError.textContent = "";
        else
            textError.textContent = "Name is Incorrect";
    });
} catch (e) {
    console.error(e);
}

class Employee {
    name;
    salary;
    gender;
    department;
    start_date;
    notes;

    constructor(name, salary, gender, department, start_date, notes) {
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.start_date = start_date;
        this.notes = notes;
    }

    set_department(department) {
        this.department = department;
    }

    set_start_date(start_date) {
        this.start_date = start_date;
    }

    set_notes(notes) {
        this.notes = notes;
    }

    set_name(name) {
        let regex = RegExp('^[A-Z]{1}[a-z]{2,}');
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


    toString() {
        return "[name = " + this.name + ", gender = " + this.gender + ", salary = " + this.salary +
            ", department = " + this.department + ", start_date = " + this.start_date + ", notes = " +
            this.notes + "]";
    }
}


const employee_data = document.querySelector('.form-content'),
    form = employee_data.querySelectorAll('.form'),
    submitInput = form[0].querySelector('input[type="submit"]');

function save(event) {
    event.preventDefault();
    let formData = new FormData(form[0]);

    let employee = new Employee();
    employee.set_name(formData.get('name'));
    employee.set_gender(formData.get('gender'));
    employee.set_salary(formData.get('salary'));
    employee.set_department(formData.get('department'));
    employee.set_start_date(formData.get('Day') + '-' + formData.get('Month') + '-' + formData.get('Year'));
    employee.set_notes(formData.get('Notes'));
    console.log(employee.toString());
    alert(employee.toString())
}

document.addEventListener('DOMContentLoaded', function () {
    submitInput.addEventListener('click', save, false);
}, false);
