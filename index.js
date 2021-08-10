const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = require("./config/connection.js");

menu = async () => {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "choice",
      choices: [
        "ADD EMPLOYEE",
        "ADD ROLE",
        "ADD DEPARTMENT",
        "VIEW EMPLOYEE",
        "VIEW ROLE",
        "VIEW DEPARTMENT",
        "UPDATE EMPLOYEE ROLE",
        "EXIT",
      ],
    })
    .then(function (data) {
      if (data.choice === "ADD EMPLOYEE") {
        addEmployee();
      } else if (data.choice === "ADD ROLE") {
        addRole();
      } else if (data.choice === "ADD DEPARTMENT") {
        addDepartment();
      } else if (data.choice === "VIEW ROLE") {
        viewRole();
      } else if (data.choice === "VIEW DEPARTMENT") {
        viewDepartment();
      } else if (data.choice === "VIEW EMPLOYEE") {
        viewEmployee();
      } else if (data.choice === "UPDATE EMPLOYEE ROLE") {
        updateEmployeeRole();
      } else {
        connection.end();
      }
    });
};

addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is their first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is their last name?",
      },
      {
        type: "input",
        name: "roleID",
        message: "What is their role id?",
      },
      {
        type: "input",
        name: "managerID",
        message: "What is their manager id?",
      },
    ])
    .then(function (data) {
      connection.query("INSERT INTO EMPLOYEE SET?", {
        first_name: data.firstName,
        last_name: data.lastName,
        role_id: data.roleID,
        manager_id: data.managerID || null,
      });
      viewEmployee();
    });
}

addRole = () => {
    inquirer.prompt([
        {
        type:"input",
        name:"role",
        message:"What is the role?"
        },
        {
        type:"input",
        name:"salary",
        message:"What is the salary?"
        },
        {
        type:"input",
        name:"id",
        message:"What is the department id?"
        }
    ]).then(function(data) {
        connection.query(
            "INSERT INTO role SET ?",
            {
                role: data.role,
                salary: data.salary,
                departmentID: data.id
            }
            );
        viewRole();
    });
  };

addDepartment = () => {
    inquirer
    .prompt([
      {
        name: 'name',
        type: 'input',
        message: 'What is the department name?'
      },
      {
        name: 'id',
        type: 'input',
        message: 'what is the department ID?'
      }
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO department SET ?',
        {
          name: answer.name,
          id: answer.id
        },
        (err) => {
          if (err) throw err;
        }
      )
      menu();
    });
  };

viewRole = () =>{
  connection.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    console.table(data);
    menu();
  });
}

viewDepartment = () => {
  connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    console.table(data);
    menu();
  });
}

viewEmployee = () => {
    let query = `SELECT * FROM employee`
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
       menu();
    });
  };

updateEmployeeRole = () => {
    connection.query("SELECT * FROM role", (err, data) => {
        if(err) throw err;
        // console.log(data);
        const choices = data.map((role) => (role.title));
        console.log(choices);

        inquirer.prompt([
              {
                  type:"list",
                  name:"update",
                  message:"Please choose a role to update.",
                  choices: choices
              },
              {
                  type:"input",
                  name:"newRole",
                  message:"Whats the new name?"
              },
          ])
          .then(function(data){
            console.log(data.newRole);
            connection.query(`UPDATE role SET ? WHERE ?`, 
                [
                    {title: `${data.newRole}`}, 
                    {title: `${data.update}`}
                ], 
                (err, res) => {
                    if (err) throw err;
                    console.log(res);
                readRole();
            }); 
          });
    });
  };

menu();
