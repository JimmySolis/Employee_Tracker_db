INSERT INTO department (name)
VALUES 
('Designers'),
('Event'),
('Finance'),
('Marketing'),
('Sales'),
('Laywers');


INSERT INTO roles (title, salary, department_id)
VALUES 
('Main Desinger', 3000000, 1),
('Second Desinger', 75000, 1),
('Assistant to Desingers', 55000, 1),
('Head Events Cordinator', 100000, 2),
('Assistante to Cordinator', 55000, 2),
('Accountant', 70000, 3),
('Real Estate Manager', 70000, 3),
('Trades & Services Manager', 80000, 3),
('Social Media Cordinators', 45000, 4),
('Comercial Cordinator', 70000, 4),
('Colabotations Consultant', 45000, 4),
('Stores Supervisor', 75000, 5),
('Store Manager', 45000, 5),
('Store Repersentative', 40000, 5),
('Copyrights & Licensing', 85000, 6),
('Leagal Attorney', 100000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Saul', 'Goodman', 16, 26),
('John','Powers', 15, 26),
('Alison','Barkely', 14, 13),
('Tommy','Johnson', 14, 13),
('Sue','Young-Kim', 14, 13),
('Arron','Anderson', 14, 13),
('Happy','Luison', 14, 13),
('David','Scott', 14, 14),
('John-Lucas','Santiago', 14, 14),
('Kevin','Aguilar', 14, 14),
('Paul',' Alberson', 14, 14),
('Peter','Sangu', 14, 14),
('Domonic','SueBird III', 13, 26),
('Juan','Garcia', 13, 26),
('Roxana','Solis', 12, 26),
('David','Low', 11, 26),
('Andersom','Wachina', 10, 26),
('Stevie', 'Amstung', 9, 26),
('Joshua', 'Damarico', 8, 26),
('Susan', 'Park', 7, 26),
('Kallen', 'Rodrigez', 6, 26),
('Allen', 'Delingworth II', 5, 23),
('Sir Allen', 'Delingworth', 4, 26),
('Jean-Polput','Revene', 3, 26),
('Ashiton', 'Vergi', 2, 26),
('James', 'Geovanny', 1, NULL);