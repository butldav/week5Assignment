class Employee {

    constructor (firstName, lastName, phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
    }

    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

}

class Department {
    constructor(deptName) {
        this.deptName = deptName;
        this.employees = [];
    }

    addEmployee(employee) {
        if(employee instanceof Employee) {
            this.employees.push(employee);
        } else {
            throw new Error(`Employee is not an object of Employee class: ${employee}`);
        }
    }
}

class Menu {
    constructor(){
        this.departments = [];
        this.currentDepartment;
    }

    displayMenu(){
        let menuSelection = this.displayMainMenuOptions();

        while(menuSelection != 0){
            switch(menuSelection){
                case '1':
                    this.modifyDepartment();
                    break;
                case '2':
                    this.createDepartment();
                    break;
                case '3':
                    this.deleteDepartment();
                    break;
                default:
                    menuSelection = 'X';
            }
            menuSelection = this.displayMainMenuOptions();
        }
    }

    displayMainMenuOptions(){
        return prompt(`
        1 - Show Departments
        2 - Create Department
        3 - Delete Department
        0 - Exit
        `);
    }

    showDepartments(){
        let deptList = `-- Select Department --\n`;
        for(let i = 0; i < this.departments.length; i++){            
            deptList += i + ` - ${this.departments[i].deptName}\n`;
        }
        deptList += `B - Back`;
        return deptList;
    }

    showDepartmentList(){
        return prompt(this.showDepartments());
    }
    createDepartment(){
        let deptName = prompt('Enter name for department.');
        this.departments.push(new Department(deptName));
    }

    deleteDepartment(){
        let showText = `Choose a department to delete.`;
        showText += this.showDepartments();
        let deleteDept = prompt(showText);
        if(deleteDept > -1 && deleteDept < this.departments.length){
            this.departments.splice(deleteDept, 1);
        }
    }

    modifyDepartment(){
        let selectedDeptIndex = this.showDepartmentList();
        if(selectedDeptIndex == 'B' || selectedDeptIndex == 'b'){
            return;
        }
        while(selectedDeptIndex < 0 && selectedDeptIndex >= this.departments.length) {
        
            alert('Invalid Department');
            selectedDeptIndex = this.showDepartmentList();
        }
        this.currentDepartment = this.departments[selectedDeptIndex];
        let showText = `- Department: ${this.currentDepartment.deptName} -
            -----------------------\n`;
        for(let i = 0; i < this.currentDepartment.employees.length; i++){
            showText += i + ' - ' + this.currentDepartment.employees[i].fullName() + ` - ${this.currentDepartment.employees[i].phoneNumber}`;
        }
        let modifyDept = this.displayDepartmentMenuOptions(showText);
        console.log(modifyDept);
        switch(modifyDept){
            case '1':
                this.createEmployee();
                break;
            case '2':
                this.deleteEmployee();
                break;


        }

    }
    createEmployee(){
        let firstName = prompt('Enter employee\'s first name.');
        let lastName = prompt('Enter employee\'s last name');
        let phoneNumber = prompt('Enter employee\'s phone Number.')
        this.currentDepartment.employees.push(new Employee(firstName, lastName, phoneNumber));
        this.modifyDepartment();
    }
    listEmployees(){}
    deleteEmployee(){
        let deletedEmployee = '';
    }
    displayDepartmentMenuOptions(deptInfo){
        return prompt(`
        1 - Add Employee
        2 - Delete Employee
        B - Back
        -------------------
        ${deptInfo}`)
    }
}
let menu = new Menu();
menu.displayMenu();