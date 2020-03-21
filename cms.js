const inquirer = require ("inquirer");
const cTable = require ("console-table")
const mysql = require ("mysql");

connection = mysql.createConnection({
    host: "localhost",
    post: 3306,
    user: "root",
    password: "Workload=2",
    database: "employee_trackerdb"
});

connection.connect(function(err){
    if(err) throw err;
    startup()
});

startup = () => {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["view all employees listed",
        "view all employees listed by their department", 
        "view all employees listed by their role",
        "add more departments",
        "add more employee roles",
        "add more employees",
        "update employee roles",
        "exit"]
    }).then(function(answers){
        switch(answers.action){
            case "view all employees listed":
            viewAll()
            break;

            case "view all employees listed by their department":
            viewDept()
            break;

            case "view all employees listed by their role":
            viewRole()
            break;

            case "add more departments":
            addDept()
            break;

            case "add more employee roles":
            addRole()
            break;

            case "add more employees":

            break;

            case "update employee roles":
            
            break;

            case "exit":
            connection.end()
            break;
        }
    })
};

let viewAll = () => {
    let query = "SELECT Id, firstName, LastName FROM employee ";
    query += "RIGHT JOIN role ON employee.roleId = role.Id ";
    query += "RIGHT JOIN department ON role.deptId = department.Id ";
    connection.query(
        query, function(err, res){
            if(err) throw err;
            console.log(res)
            startup()
        }
    )
};

let viewDept = () => {
    inquirer.prompt({
        name: "Dept",
        type: "list",
        message: "Which department would you like to view?",
        choices: ["Management",
        "Accounting","Human Resources", 
        "IT", "Research & Development",
        "Marketing", "Sales", "Security", "Maintenance"]
    }).then(function(answers){
        let query = "SELECT Id, firstName, LastName FROM employee ";
        query += "RIGHT JOIN role ON employee.roleId = role.Id ";
        query += `RIGHT JOIN department ON role.deptId = department.Id Group BY ${answers.Dept}`
        connection.query(query, function(err,res){
            if(err) throw err;
            console.log(res);
            startup()
        })
    })
};

let viewRole = () => {
    inquirer.prompt({
        name: "role",
        type: "list",
        message: "Which roles would you like to view?",
        choices: ["Managers", "Accountant", "Bookkeepers" ,"Salespersons", "Computer Technicians",
    "Office Clerks", "Secertaries", "HR Cordinators", "Digital Marketing Advisors", "Janitors", "Security Gaurd",
    "Software Engineers", "Junior Programmers" ]
    }).then(function(answers){
        let query = "SELECT Id, firstName, Lastname FROM employee ";
        query += `RIGHT JOIN role on employee.roleId = role.Id GROUP BY ${answers.role} `
        query += "RIGHT JOIN department on role.deptId = department.Id"
        connection.query(query, function(err, res){
            if(err) throw err;
            console.log(res)
            startup()
        })
    })
}

let addDept = () => {
    inquirer.prompt({
        name: "addedDept",
        type: "input",
        message: "What's the name of your new Deptartment?"
    }).then(function(answers){
        let query = `INSERT INTO department (name) VALUES (${answers.addedDept})`
        connection.query(query, function(err, res){
            if(err) throw err;
            console.log(`${answers.addedDept} was successfully added`)
            startup()
        })
    })
}

let addRole = () => {
    inquirer.prompt([{
        name: "addedRole",
        type: "input",
        message: "What new employee role are you adding?"
    },
    {
        name: "salary",
        type: "number",
        message: "How much is their yearly salary"
    }]).then(function(answers){
        let query = "INSERT INTO role SET ?";
        connection.query(query,
        {
            title: answers.addedRole,
            salary: answers.salary
        },
        function(err, res){
            if(err) throw err;
            console.log(`${answers.addedRole} was successfully adde`)
            startup()
        })
    })
};

