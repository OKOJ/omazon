drop database if exists omazondb;
create database omazondb;

use omazondb;

create table products (
item_id integer(10) not null unique,
product_name varchar(36),
department_name varchar(24),
price decimal(10,2) not null,
stock_quantity integer(10) not null,
primary key(item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
 VALUES (1927, 'Fan', 'Appliances', 29.24, 82),
		(6964, 'Violin', 'Music', 70.07, 51),
		(5294, 'Hot-Wheel','Toys', 1.05, 24),
		(7416, 'Web-Cam', 'Computers', 87.34, 34),
		(2394, 'Video-Game', 'Electronics', 30.91, 30),
		(3040, 'Backpack', 'Outdoors', 28.74, 57),
		(9064, 'Ski-Pant', 'Clothing', 77.14, 31),
		(9709, 'Doll-House', 'Toys', 152.16, 71),
		(2679, 'Gas Range', 'Appliances', 401.93, 25),
		(4621, 'Microphone','Music', 1.24, 56);