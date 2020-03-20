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

            break;

            case "view all employees listed by their department":
            
            break;

            case "view all employees listed by their role":

            break;

            case "add more departments":
            
            break;

            case "add more employee roles":
            
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
