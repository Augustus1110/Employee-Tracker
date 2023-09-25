const inquirer = require('inquirer');
const connection = require('./connection'); 
const { start } = require('repl');

// Function that starts the app and prompts the user with a list of actions to choose from.
function startApp() {
    inquirer.prompt([
      {
        name: "action",
        type: "list",
        message: "What action do you want?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a new department",
          "Add a new role",
          "Add a new employee",
          "Update employee roles",
          "Exit"
        ]
      }])
      .then(function (response) {
        // Switch statement that calls the appropriate function based on the user's choice.
        switch (response.action) {
          case "View all departments":
            viewDepartments();
            break;
          case "View all roles":
            viewRoles();
            break;
          case "View all employees":
            viewEmployees();
            break;
          case "Add a new department":
            addDepartment();
            break;
          case "Add a new role":
            addRole();
            break;
          case "Add a new employee":
            addEmployee();
            break;
          case "Update employee roles":
            employeeUpdate();
            break;
          case "Exit":
            connection.end();
            break;
        }
      });
  };

// View all departments.
function viewDepartments() {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
};
// View all roles.
function viewRoles() {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
};
// View all employees.
function viewEmployees() {
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
};
// Add a new department.
function addDepartment(){
    inquirer.prompt([
        {
            name: "departmentName",
            type: "input",
            message: "What is the name of the department?"
        }
    ]).then(function(response){
        connection.query('INSERT INTO department SET ?', {name: response.departmentName}, function(err, res){
            if (err) throw err;
            console.log("Department added");
            startApp();
        });
    });
};
// Add a new role.
function addRole(){
  connection.query('SELECT * FROM department', function (err, res) {

    inquirer.prompt([
        {
          name: "jobTitle",
          type: "input",
          message: "What is the title of the role?"
        }, 
        {
          name: "jobSalary",
          type: "input",
          message: "What is the salary for the role?" 
        }, 
        {
          name: "departmentId",
          type: "list",
          message: "What is the department id number for the role?",
          choices: res.map(department => department.id)
        }, 
    ]).then(function(response){
        connection.query('INSERT INTO role SET ?', {job_title: response.jobTitle, salary: response.jobSalary, department_id: response.departmentId}, function(err, res){
            if (err) throw err;
            console.log("Role added");
            startApp();
        });
    });
  });
};

// Add a new employee.
function addEmployee(){
  connection.query('SELECT * FROM role', function (err, res) {

    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the first name of the employee?"
        }, 
        {
          name: "lastName",
          type: "input",
          message: "What is the last name of the employee?"
        }, 
        {
          name: "roleId",
          type: "list",
          message: "What is the role id for this employee",
          choices: res.map(role => role.id)
        },
        {
          name: "managerId",
          type: "list",
          message: "What is the manager id for this employee",
          choices: [1, 2, 3]
        },  
    ]).then(function(response){
        connection.query('INSERT INTO employee SET ?', {first_name: response.firstName, last_name: response.lastName, role_id: response.roleId, manager_id: response.managerId}, function(err, res){
            if (err) throw err;
            console.log("Employee added");
            startApp();
        });
    });
  });
};

// Update employee roles.
function employeeUpdate() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    inquirer.prompt([
      {
        type: "list",
        name: "selectedEmployee",
        message: "Select the employee who is changing roles",
        choices: res.map(emp => emp.first_name)
      }
    ]).then(function (answer) {
      const selectedEmp = res.find(emp => emp.first_name === answer.selectedEmployee);
      connection.query("SELECT * FROM role", function (err, res) {
        inquirer.prompt([
          {
            type: "list",
            name: "newRole",
            message: "Select the new role for this employee",
            choices: res.map(item => item.job_title)
          }
        ]).then(function (answer) {
          const selectedRole = res.find(role => role.job_title === answer.newRole);
          connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [selectedRole.id, selectedEmp.id],
            function (error) {
              if (error) throw err;
              startApp();
            }
          );
        })
      })
    })
  })
};




startApp();