use bamazon;
drop table products;
drop database bamazon;

create database bamazon;
use bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name varchar(20) NOT NULL,
  price decimal(10,2) NOT NULL,
  stock_quantity INT(5) NOT NULL,
  product_sales DECIMAL(20,2),
  PRIMARY KEY (id));
 
 DELETE FROM products where id > 0;
 COMMIT;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Dove Shampoo', 'Cosmetics', 5.75, 500),
		('Dove Conditioner', 'Cosmetics', 6.25, 627),
		('Glad 12 Gal Trash Bags', 'Grocery', 5.99, 300),
		('Brawny Paper Towels', 'Grocery', 4.25, 400),
		('Granny Smith Apples', 'Produce', 0.35, 800),
		('Chiquita Bannana', 'Produce', 0.20, 10000),
		('Tropicana Orange Juice', 'Grocery', 4.45, 267),
		('Horizon Organic Milk', 'Grocery', 4.50, 200),
		('Huggies Diapers', 'Children', 2.75, 476),
		('Charmin Toiler Paper', 'Grocery', 12.99, 575),
		('Pampers Baby Wipes', 'Children', 1.50, 423),
		('Yoga Mat', 'Sports', 12.75, 150),
		('Soccerballs', 'Sports', 7.99, 89),
		('Cotton Shirt', 'Clothing', 5.55, 120),
		('Nike Shorts', 'Clothing', 17.88, 250),
		('Purina Cat Chow', 'Pet', 7.25, 157),
		('Fancy Feast Wet Cat Food', 'Pet', 12.50, 163),
		('Ibuprophen', 'Pharmacy', 4.95, 389),
		('Band Aid', 'Pharmacy', 3.25, 550),
		('Ben & Jerry Ice Cream', 'Grocery', 3.25, 432);


create table department(
 dept_id integer auto_increment,
 dept_name varchar(35),
 dept_cost decimal(10,2),
 primary key (dept_id)
 );


INSERT INTO department(dept_name,dept_cost)
VALUES ('Grocery',6.00),
	   ('Produce',7.00),
	   ('Children',8.00),
	   ('Sports',9.00),
	   ('Clothing',10.00),
	   ('Pet',12.00),
	   ('Pharmacy',15.00');

SELECT department.dept_id,department.dept_name,products.product_sales FROM bamazon.products  
inner join department on products.department_name=department.dept_name group by department_name;
