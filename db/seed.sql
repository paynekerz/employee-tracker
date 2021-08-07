USE employee_db;
SET FOREIGN_KEY_CHECKS=0;
INSERT INTO department(name)VALUES("sales"),("finance"),("management");
INSERT INTO role(postion,salary,departmentID) VALUES("salesman", 70000, 2468);
INSERT INTO employee(firstName,lastName,roleID, managerID) VALUES("Lorem","Ipsum",1234,4321);