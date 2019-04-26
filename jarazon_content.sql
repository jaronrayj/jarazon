drop database if exists jarazon_db;

create database jarazon_db;

use jarazon_db;

create table items(
    id int not null auto_increment,
	item varchar(50) not null,
    price decimal(10,4) not null,
    quantity int not NULL,
    primary key(id)

)