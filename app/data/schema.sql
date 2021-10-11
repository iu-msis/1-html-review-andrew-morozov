-- database-2.cluster-ro-cowe6qx6tye0.us-east-2.rds.amazonaws.com
-- CREATE USER 'msis-reader'@'%' IDENTIFIED BY 'msisreadonly';

DROP TABLE IF EXISTS books;
CREATE TABLE books (
	ID int PRIMARY KEY AUTO_INCREMENT ,
    Title varchar(24),
    Author varchar(48),
    Year Published int,
    Publisher varchar(24),
    Page Count int,
    MSRP float(2)
);

INSERT INTO students (id, title, Author, Year Published, Publisher, Page Count, MSRP) VALUES 
(1,"The Hunger Games", "Suzanne Collins", 2008, "Scholastic Press", 374, 7.99),
(2, "Harry Potter and the Sorcerer's Stone", "J. K. Rowling", 1997, "Bloomsbury", 223, 6.99),
(3, "The Alchemist", "Paul Coelho", 1988, "HarperCollins", 208, 8.99),
(4, "The Da Vinci Code", "Robert Langdon", 2003, "Doubleday", 416, 8.99);