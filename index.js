/* Promineo Tech - week5Assignment by Dave Butler

1.	Create a menu app as seen in this week’s video. What you create is up to you as long as it meets the following requirements.
    a.	Use at least one array.
    b.	Use at least two classes.
    c.	Your menu should have the options to create, view, and delete elements.
 */

// Employee object class - takes first name, last name, and phone number. Concats full name.
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
// Department object class - takes department name and adds employee objects as an array
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
// Menu object class - creates menu with displayMenu() method. 
class Menu {
    constructor(){
        this.departments = [];
        this.currentDepartment = null;
    }

    displayMenu(){
        let menuSelection = this.displayMainMenuOptions(); //take prompt for initial options from displayMainMenuOptions()

        while(menuSelection != 0){
            switch(menuSelection){
                case '1':
                    this.selectDepartment();
                    break;
                case '2':
                    this.createDepartment();
                    break;
                case '3':
                    this.deleteDepartment();
                    break;
                default:
                    menuSelection = '0';
            }
            menuSelection = this.displayMainMenuOptions();
        }
    }
// show main menu options and return value from prompt
    displayMainMenuOptions(){ 
        return prompt(`
        1 - Show Departments
        2 - Create Department
        3 - Delete Department
        0 - Exit
        `);
    }
// return list of departments in string
    showDepartments(){
        let deptList = `-- Select Department --\n`;
        for(let i = 0; i < this.departments.length; i++){            
            deptList += i + ` - ${this.departments[i].deptName}\n`;
        }
        deptList += `B - Back`;
        return deptList;
    }
// select current department and save to currentDepartment property
    selectDepartment(){
        let selectedDeptIndex = prompt(this.showDepartments());
        if(selectedDeptIndex == 'B' || selectedDeptIndex == 'b'){
            return;
        }
        while(selectedDeptIndex < 0 && selectedDeptIndex >= this.departments.length) {
        
            alert('Invalid Department');
            selectedDeptIndex = this.selectDepartment();
        }
        this.currentDepartment = this.departments[selectedDeptIndex];
        this.modifyDepartment();

    }

// list Department Employees returned as string
    listDeptEmployees(){
        let showText = '- Department: ' + this.currentDepartment.deptName + ' -\n';

        for(let i = 0; i < this.currentDepartment.employees.length; i++){
            showText += i + ') ' + this.currentDepartment.employees[i].fullName() + ' - ' + this.currentDepartment.employees[i].phoneNumber + '\n';
        }
        return showText;

    }

// create new Department object and pushed to departments array in menu object
    createDepartment(){
        let deptName = prompt('Enter name for department.');
        this.departments.push(new Department(deptName));
    }
// delete department from departments array
    deleteDepartment(){
        let showText = 'Choose a department to delete.\n';
        showText += this.showDepartments();
        let deleteDept = prompt(showText);
        if(deleteDept > -1 && deleteDept < this.departments.length){
            this.departments.splice(deleteDept, 1);
        }
    }
// functionallity for department menu
    modifyDepartment(){
        if(this.currentDepartment === null){
            this.selectDepartment();
        }
        
        let showText = this.listDeptEmployees();
        let modifyDept = this.displayDepartmentMenuOptions(showText);
        while(modifyDept != 'B'){
            switch(modifyDept){
                case 'A':
                    this.createEmployee();
                    break;
                case 'D':
                    this.deleteEmployee();
                    break;
                default:
                    modifyDept = 'B';
            }
            showText = this.listDeptEmployees(); // Refresh employee list after add/delete
            modifyDept = this.displayDepartmentMenuOptions(showText);
         }    

    }
// create employee object and add to currentDepartment employees array
    createEmployee(){
        let firstName = prompt('Enter employee\'s first name.');
        let lastName = prompt('Enter employee\'s last name');
        let phoneNumber = prompt('Enter employee\'s phone Number.')
        this.currentDepartment.employees.push(new Employee(firstName, lastName, phoneNumber));
    }

// remove employee object from department array
    deleteEmployee(){
        let showText = 'Enter the index of the employee you wish to delete.\n';
        showText += this.listDeptEmployees();
        let deletedEmployee = prompt(showText);
        console.log(this.currentDepartment.employees);
        console.log(deletedEmployee);
        
        if (deletedEmployee > -1 && deletedEmployee < this.currentDepartment.employees.length) {
            this.currentDepartment.employees.splice(deletedEmployee, 1);
        }
        console.log(this.currentDepartment.employees);
    }

// show Department menu options and return prompt string
    displayDepartmentMenuOptions(deptInfo){
        return prompt(`
        ${deptInfo}
        -------------------
        A - Add Employee
        D - Delete Employee
        B - Back
        `)
    }
}

// create menu object and run displayMenu()
let menu = new Menu();
menu.displayMenu();