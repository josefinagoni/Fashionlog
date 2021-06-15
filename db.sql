DROP DATABASE IF EXISTS FASHIONLOG_Trabajo;
CREATE DATABASE FASHIONLOG_Trabajo;
USE FASHIONLOG_Trabajo; 
CREATE TABLE usuarios(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR (50) ,
nacimiento DATE ,
email VARCHAR (500),
contrasena VARCHAR (250),
dni INT  ,
imagen VARCHAR (500) ,
createdAt TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP  DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE productos(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR (150)  ,
imagen VARCHAR (500) ,
usuario_id INT UNSIGNED,
descripcion VARCHAR (500) ,
FOREIGN KEY (usuario_id) references usuarios(id),
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP  DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comentarios(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
texto VARCHAR (750) ,

usuario_id INT UNSIGNED,
producto_id INT UNSIGNED,
FOREIGN KEY (usuario_id) references usuarios(id),
FOREIGN KEY (producto_id) references productos(id),
createdAt TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP  DEFAULT CURRENT_TIMESTAMP
);

SELECT usuarios.id FROM usuarios
INNER JOIN productos
ON usuario_id = productos.usuario_id ;

SELECT usuarios.id FROM usuarios
INNER JOIN comentarios
ON usuarios.id = comentarios.usuario_id ;
select*from usuarios;

SELECT productos.id FROM productos
INNER JOIN comentarios
ON productos.id = comentarios.producto_id ;
Select*from productos;

insert into usuarios values (default, 'Sofia Gonzalez', '2001-04-21', 'sofig01@gmail.com', 'sofi123', 4958423,'fotoperfil1.jpeg', '2016-07-04 03:00:00','2016-07-04 03:00:00' ) ;
insert into usuarios values (default, 'Maria Sanchez', '2001-09-21', 'sanchezmaria@hotmail.com', 'mariacapa100', 4958423,'fotoperfil2.jpeg', '2016-07-04 03:00:00','2016-07-04 03:00:00' ) ;
insert into usuarios values (default, 'Lola Rodriguez', '1999-03-21', 'lolarod@gmail.com', 'lola9876', 42567832,'fotoperfil3.jpeg', '2016-07-04 03:00:00','2016-07-04 03:00:00' ) ;
insert into usuarios values (default, 'Agus Bosch', '2000-03-14', 'agusbbosch@yahoo.com.ar', 'bosch1617', 43812990, 'fotoperfil4.jpeg','2016-07-04 03:00:00','2016-07-04 03:00:00' ) ;
insert into usuarios values (default, 'Valen Perez', '1995-09-4', 'valenperez@gmail.com', 'valen123', 49888034,'fotoperfil5.jpeg', '2016-07-04 03:00:00','2016-07-04 03:00:00') ;

insert into productos values (default,'Campera Mango',  'producto1.jpeg' , 1,'Campera sin uso', '2016-07-04 03:00:00','2016-07-04 03:00:00') ;
insert into productos values (default,'Campera Rapsodia',  'producto2.jpeg' , 2,'Campera sin uso', '2016-07-04 03:00:00','2016-07-04 03:00:00') ;
insert into productos values (default,'Pantalon Zara',  'producto3.jpeg' , 3,'Pantalon sin uso', '2016-07-04 03:00:00','2016-07-04 03:00:00') ;
insert into productos values (default,'Campera Zara',  'producto4.jpeg' , 4,'Campera sin uso', '2016-07-04 03:00:00','2016-07-04 03:00:00') ;
insert into productos values (default,'Remera Forever XXI',  'producto5.jpeg' , 5,'Remera sin uso', '2016-07-04 03:00:00','2016-07-04 03:00:00') ;
-- 12:05:05	into productos (id, nombre, fecha, imagen, usuario_id ) values (default,'Campera Mango', '2010-04-10', 'producto1.jpeg' , 1)	Error Code: 1064. You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'into productos (id, nombre, fecha, imagen, usuario_id ) values (default,'Campera' at line 1	0.00030 sec

insert into productos values (default,'Jean Abercrombie',  'producto6.jpeg' , 1,'Jean sin uso', '2016-07-04 03:00:00','2016-07-04 03:00:00') ;
insert into productos values (default,'Joggin Uniqlo',  'producto7.jpeg' , 2,'Joggin sin uso', '2016-07-04 03:00:00','2016-07-04 03:00:00') ;
insert into productos values (default,'Swater Bershka',  'producto8.jpeg' , 3,'Sweater sin uso', '2016-07-04 03:00:00','2016-07-04 03:00:00') ;
insert into productos values (default,'Borcegos Prune',  'producto9.jpeg' , 4,'Borcegos sin uso', '2016-07-04 03:00:00','2016-07-04 03:00:00') ;
insert into productos values (default,'Cartera Kralice',  'producto10.jpeg' , 5,'Cartera sin uso', '2016-07-04 03:00:00','2016-07-04 03:00:00') ;

insert into comentarios values (default,'Muy linda la campera! Pero, ¿tiene alguna falla?' ,  1, 1, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'Divina! Muy recomendable' ,  2, 1, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'Muy buena calidad' ,  3, 1, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'¿De que temporada es?' ,  4, 1, '2016-07-04 03:00:00','2016-07-04 03:00:00');

insert into comentarios values (default,'Muy linda la campera! Pero, ¿tiene alguna falla?' ,  1, 4, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'Divina! Muy recomendable' ,  2, 4, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'Muy buena calidad' ,  3, 4, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'¿De que temporada es?',  4, 4, '2016-07-04 03:00:00','2016-07-04 03:00:00');
-- 12:09:25	insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Muy linda la campera! Pero, ¿tiene alguna falla?' ,  1, 2)	Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`proyecto integrador`.`comentarios`, CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`))	0.0015 sec

insert into comentarios values (default,'Muy linda la campera! Pero, ¿tiene alguna falla?' , 1, 3, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'Divina! Muy recomendable' , 2, 3, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'Muy buena calidad' , 3, 3, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'¿De que temporada es?' , 4, 3, '2016-07-04 03:00:00','2016-07-04 03:00:00');

insert into comentarios values (default,'Muy linda la campera! Pero, ¿tiene alguna falla?' ,  1, 4, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'Divina! Muy recomendable' , 2, 4, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'Muy buena calidad' , 3, 4, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'¿De que temporada es?' , 4, 4, '2016-07-04 03:00:00','2016-07-04 03:00:00');

insert into comentarios values (default,'Muy linda la campera! Pero, ¿tiene alguna falla?' ,  1, 10, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'Divina! Muy recomendable' , 2, 10, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'Muy buena calidad' , 3, 10, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'¿De que temporada es?' , 4, 10, '2016-07-04 03:00:00','2016-07-04 03:00:00');

insert into comentarios values (default,'Muy linda la campera! Pero, ¿tiene alguna falla?' ,  1, 6, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'Divina! Muy recomendable' , 2, 6, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'Muy buena calidad' , 3, 6, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'¿De que temporada es?' , 4, 6, '2016-07-04 03:00:00','2016-07-04 03:00:00');

insert into comentarios values (default,'Muy linda la campera! Pero, ¿tiene alguna falla?' , 1, 9, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'Divina! Muy recomendable' , 2, 9, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'Muy buena calidad' , 3, 9, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'¿De que temporada es?' , 4, 9, '2016-07-04 03:00:00','2016-07-04 03:00:00');

insert into comentarios values (default,'Muy linda la campera! Pero, ¿tiene alguna falla?' ,  1, 8, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'Divina! Muy recomendable' , 2, 8, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'Muy buena calidad' , 3, 8, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'¿De que temporada es?' , 4, 8, '2016-07-04 03:00:00','2016-07-04 03:00:00');

insert into comentarios values (default,'Muy linda la campera! Pero, ¿tiene alguna falla?' ,  1, 8, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'Divina! Muy recomendable' , 2, 8, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'Muy buena calidad' , 3, 8, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'¿De que temporada es?' , 4,  8, '2016-07-04 03:00:00','2016-07-04 03:00:00');

insert into comentarios values (default,'Muy linda la campera! Pero, ¿tiene alguna falla?' ,  1, 7, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'Divina! Muy recomendable' , 2, 7, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'Muy buena calidad' , 3, 7, '2016-07-04 03:00:00','2016-07-04 03:00:00');
insert into comentarios values (default,'¿De que temporada es?' , 4, 7, '2016-07-04 03:00:00','2016-07-04 03:00:00');



