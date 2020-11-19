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
    let toPrint = true;
    event.preventDefault();
    let formData = new FormData(form[0]);

    let employee = new Employee();
    try {
        employee.set_name(formData.get('name'));
    } catch (e) {
        console.log(e);
        toPrint = false;
    }
    employee.set_gender(formData.get('gender'));
    employee.set_salary(formData.get('salary'));
    employee.set_department(formData.get('department'));
    try {
        employee.set_start_date(formData.get('Year') + '/' + formData.get('Month') + '/' + formData.get('Day'));
    } catch (e) {
        console.log(e);
        toPrint = false;
    }

    var checkboxes = document.getElementsByName('department');
    var vals = "";
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        if (checkboxes[i].checked) {
            vals += "," + checkboxes[i].value;
        }
    }
    if (vals) vals = vals.substring(1);
    employee.set_department(vals);
    employee.set_notes(formData.get('Notes'));
    if (toPrint) {
        console.log(employee.toString());
        alert(employee.toString())
    }
}

document.addEventListener('DOMContentLoaded', function () {
    submitInput.addEventListener('click', save, false);
}, false);
