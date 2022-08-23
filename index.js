const inquirer = require('inquirer');
const mysql = require('mysql2');

const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Bronco$500',
        database: 'jgllc_db'
    },
  console.log(`\n
  \n
+-+ +-+ +-+ +-+ +-+ +-+ +-+ +-+   +-+ +-+ +-+ +-+ +-+ +-+ +-+
|E| |M| |P| |L| |O| |Y| |E| |E|   |T| |R| |A| |C| |K| |E| |R|
+-+ +-+ +-+ +-+ +-+ +-+ +-+ +-+   +-+ +-+ +-+ +-+ +-+ +-+ +-+
               +-+-+-+-+-+-+-+-+ +-+-+-+-+
               |D|A|T|A|B|A|S|E| |3|0|0|0|
               +-+-+-+-+-+-+-+-+ +-+-+-+-+
\n
\n`)
);

const applicationQuestion = [
    {
        type : 'list',
        name : 'tablesAddsAndUpdates',
        message : 'How can I assist you today?',
        choices: [
            'View all Departments',
            'View all Roles',
            'View all Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            'Quit'
        ]
    }
]

const buildDepartmentQuestions = [
    {
        type: 'input',
        name: 'depName',
        message: 'What is the name of the new Department?'
     }
]

const buildRoleQuestions = [
    {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the new Role?'
     },
     {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the amount of the new Salary? (No Commas)'
     },
     {
        type: 'input',
        name: 'roleDep',
        message: 'What is the Department id for this role? (Find it in "View All Department")'
     }
]

const buildEmployeeQuestions = [
    {
        type: 'input',
        name: 'firstName',
        message: 'What is the first name of the new Employee?'
     },
     {
        type: 'input',
        name: 'lastName',
        message: 'What is the last name of the new Employee?'
     },
     {
        type: 'input',
        name: 'employeeRole',
        message: 'What is the Role id for this Employee?',
     },
     {
        type: 'input',
        name: 'employeeManager',
        message: 'What the Manager id for this Employee?',
     }
]

const updateAnEmployee = [
    {
        type : 'input',
        name : 'employeeUpdateById',
        message : 'What is the Employees id?'
    },
    {
        type : 'input',
        name : 'employeeUpdateRole',
        message : "What is the employee's new Role ID? Revert to the 'View all Roles' for the id if needed"
    }
  
]


const getTableDepartments = () => {
    console.log("\nDEPARTMENTS\n");
    db.query('Select * From department;', (err, results) => {
        return new Promise ((resolve, reject) => {
        err ? reject(err) : resolve(results);
        console.table(results);
        console.log("\n");
        init();
         });
    });
}

const getTableRoles = () => {
    console.log("\nROLES\n");
    return new Promise ((resolve, reject) => {
    db.query('Select r_id AS RoleID, Title, name as Department, salary As Salary from roles join department on roles.department_id = department.d_id;', (err, results) => {
        err ? reject(err) : resolve(results);
        console.table(results);
        console.log("\n");
        init();
        });
    });
}

const getTableEmployees = () => {
    console.log("\nEMPLOYEES\n");
    return new Promise ((resolve, reject) => {
    db.query(`Select e.id, e.first_name, e.last_name, title, name AS Department, salary AS Salary, CONCAT( e.first_name, " ", e.last_name ) AS Manager
    from employee e
    left outer join roles on e.role_id = roles.r_id
    left outer join department on department.d_id = roles.department_id
    left outer join employee m on m.id = e.manager_id;`, (err, results) => {
        err ? reject(err) : resolve(results);
        console.table(results);
        console.log("\n");
        init();
        });
       
    });
}

const promptDepartment = () => {
    inquirer
    .prompt(buildDepartmentQuestions)
    .then(data => makeADepartment(data))

}

const makeADepartment = (data) => {
    console.log(`\n ADDING NEW DEPARTMENT \n`)
    return new Promise ((resolve, reject) => {
        db.query(`INSERT INTO department (name) VALUES ('${data.depName}');`, (err, results) => {
            err ? reject(err) : resolve(results);
            console.log(`\n New Department: (${data.depName}) has been added! Click 'View all Departments' to see updated list.\n`);
            init();
            });
           
        });
}

const promptRole = () => {
    inquirer
    .prompt(buildRoleQuestions)
    .then(data => makeARole(data))     

}

const makeARole = (data) => {
    console.log(`\n ADDING NEW ROLE \n`)
    return new Promise ((resolve, reject) => {
        db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${data.roleName}', ${data.roleSalary}, ${data.roleDep});`,
            (err, results) => {
            err ? reject(err) : resolve(results);
            console.log(`\n New Role: (${data.roleName}) has been added! Click 'View all Roles" to see updated list.\n`);
            init();
            });
           
        });
    
}

const promptEmployee = () => {
    inquirer
    .prompt(buildEmployeeQuestions)
    .then(data => makeAnEmployee(data))

}

const makeAnEmployee = (data) => {
    console.log(`\n ADDING NEW EMPLOYEE \n`)
    return new Promise ((resolve, reject) => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${data.firstName}", "${data.lastName}", ${data.employeeRole}, ${data.employeeManager ? data.employeeManager : null});`, (err, results) => {
            err ? reject(err) : resolve(results);
            console.log(`\n New Employee: (${data.firstName} ${data.lastName}) has been added! Click 'View all Employees" to see updated list.\n`);
            init();
            });
           
        });
}



const promptUpdateEmployee = () => {
    inquirer
    .prompt(updateAnEmployee)
    .then(data => updateAnEmployeeQuery(data))

}

const updateAnEmployeeQuery = (data) => {
    console.log(`\n UPDATED ROLE FOR EMPLOYEE \n`)
    return new Promise ((resolve, reject) => {
        db.query(`Update employee set role_id = ${data.employeeUpdateRole} where id = ${data.employeeUpdateById}; `, (err, results) => {
            err ? reject(err) : resolve(results);
            console.log(`\n Update has been made! Click "View all Employee" to see updates!\n`);
            init();
            });
           
        });
}

const exitApp = () =>{ 
    db.end()
 console.log(`\n
     +-+-+-+-+-+-+-+ +-+-+-+
     |S|Y|S|T|E|M|S| |O|F|F|
     +-+-+-+-+-+-+-+ +-+-+-+
+-+-+-+-+ +-+ +-+-+-+-+-+ +-+-+-+
|H|A|V|E| |A| |G|R|E|A|T| |D|A|Y|
+-+-+-+-+ +-+ +-+-+-+-+-+ +-+-+-+
               😇
\n
`)
};


const init = () => {
    inquirer.prompt(applicationQuestion)
    .then(data => {
        switch (data.tablesAddsAndUpdates) {
            case 'View all Departments':
                getTableDepartments();
                break;
                
                case 'View all Roles':
                    getTableRoles();
                    break;
                    
                    case 'View all Employees':
                        getTableEmployees();
                        break;

                        case 'Add a Department':
                            promptDepartment();
                            break;

                            case 'Add a Role':
                                promptRole();
                                break;

                                case 'Add an Employee':
                                    promptEmployee();
                                    break;

                                    case 'Update an Employee Role':
                                        promptUpdateEmployee();
                                        break;

                                        case 'Quit':
                                        exitApp();
                                        break;
        }
    })
};


init();

