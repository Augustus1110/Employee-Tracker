USE employee_db;

INSERT INTO department (name) VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');


INSERT INTO role (job_title, salary, department_id) VALUES
    ('Sales Lead', 100000.00, 1),
    ('Salesperson', 80000.00, 1),
    ('Lead Engineer', 150000.00, 2),
    ('Software Engineer', 120000.00, 2),
    ('Accountant', 125000.00, 3),
    ('Paralegal', 250000.00, 4),
    ('Attorney', 190000.00, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES

('Lucy', 'Ricardo', 1, NULL),
('Ricky', 'Ricardo', 2, 1),
('Fred', 'Mertz', 3, 3),
('Ethel', 'Mertz', 4, 3);



