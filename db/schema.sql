DROP DATABASE IF EXISTS jgllc_db;

CREATE DATABASE jgllc_db;

USE jgllc_db;

CREATE TABLE department (
    d_id INT NOT NULL AUTO_INCREMENT  PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    r_id INT NOT NULL  AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(d_id)
    ON DELETE SET NULL
);

CREATE TABLE employee( 
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT ,
    manager_id INT REFERENCES emplyees(e_id),
    FOREIGN KEY (role_id)
    REFERENCES roles(r_id)
    ON DELETE SET NULL
    );