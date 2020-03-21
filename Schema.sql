DROP DATABASE IF EXISTS Employee_TrackerDB;
CREATE DATABASE Employee_Trackerdb;
USE Employee_Trackerdb;

CREATE TABLE Department (
Id INT AUTO_INCREMENT NOT NULL,
name VARCHAR(30),
PRIMARY KEY(Id)
);

CREATE TABLE role(
Id INT AUTO_INCREMENT NOT NULL,
deptId INT,
title VARCHAR(30),
salary DECIMAL,
PRIMARY KEY(Id),
FOREIGN KEY(deptId)
REFERENCES Department(Id)
);

CREATE TABLE Employee (
Id INT AUTO_INCREMENT NOT NULL,
roleId INT,
managerId INT,
firstName VARCHAR(30) NOT NULL,
lastName VARCHAR(30),
FOREIGN KEY(roleId)
REFERENCES role(Id),
FOREIGN KEY(managerId)
REFERENCES role (Id),
PRIMARY KEY (Id)
);