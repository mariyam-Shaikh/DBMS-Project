use euphoria;
CREATE TABLE users (
    fname varchar(20),
    lname varchar(20),
    email varchar(255),
    password varchar(255),
    password_confirm varchar(255)
);
select* from users;
alter table users drop column password_confirm;

CREATE TABLE ticket (
	fname varchar(20),
    lname varchar(20),
    Age integer(2),
    Gender varchar(10),
    Phone_no integer(10),
    email varchar(255),
    date varchar(25)
    );
    
select* from ticket;

alter table ticket drop date_visit;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'WINXCLUB' ;


CREATE TABLE rides (
	type varchar(255),
    cost integer(255)
    );