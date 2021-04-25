CREATE TABLE usuarios(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR (50) NOT NULL,
nacimiento DATE NOT NULL,
email VARCHAR (500),
contrasena VARCHAR (250),
dni INT NOT NULL
);

CREATE TABLE productos(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR (150) NOT NULL,
fecha DATE NOT NULL,
imagen VARCHAR (500) NOT NULL,
usuario_id INT UNSIGNED,
FOREIGN KEY (usuario_id) references usuarios(id)
);

CREATE TABLE comentarios(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
texto VARCHAR (750) NOT NULL,
fecha DATE NOT NULL,
usuario_id INT UNSIGNED,
producto_id INT UNSIGNED,
FOREIGN KEY (usuario_id) references usuarios(id),
FOREIGN KEY (producto_id) references productos(id)
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

insert into usuarios(id, nombre, nacimiento, email, contrasena, dni) values (default, 'Sofia Gonzalez', '2001-04-21', 'sofig01@gmail.com', 'sofi123', 49581123 ) ;
insert into usuarios(id, nombre, nacimiento, email, contrasena, dni) values (default, 'Maria Sanchez', '2001-09-21', 'sanchezmaria@hotmail.com', 'mariacapa100', 49581123 ) ;
insert into usuarios(id, nombre, nacimiento, email, contrasena, dni) values (default, 'Lola Rodriguez', '1999-03-21', 'lolarod@gmail.com', 'lola9876', 42567832 ) ;
insert into usuarios(id, nombre, nacimiento, email, contrasena, dni) values (default, 'Agus Bosch', '2000-03-14', 'agusbbosch@yahoo.com.ar', 'bosch1617', 43812990 ) ;
insert into usuarios(id, nombre, nacimiento, email, contrasena, dni) values (default, 'Valen Perez', '1995-09-11', 'valenperez@gmail.com', 'valen123', 49888034) ;

insert into productos (id, nombre, fecha, imagen, usuario_id ) values (default,'Campera Mango', '2010-04-10', '/producto1.jpeg' , 1) ;
insert into productos (id, nombre, fecha, imagen, usuario_id ) values (default,'Campera Rapsodia', '2011-09-10', '/producto2.jpeg' , 2) ;
insert into productos (id, nombre, fecha, imagen, usuario_id ) values (default,'Pantalon Zara', '2010-04-12', '/producto3.jpeg' , 3) ;
insert into productos (id, nombre, fecha, imagen, usuario_id ) values (default,'Campera Zara', '2016-09-11', '/producto4.jpeg' , 4) ;
insert into productos (id, nombre, fecha, imagen, usuario_id ) values (default,'Remera Forever XXI', '2020-12-09', '/producto5.jpeg' , 5) ;
-- 12:05:05	into productos (id, nombre, fecha, imagen, usuario_id ) values (default,'Campera Mango', '2010-04-10', 'producto1.jpeg' , 1)	Error Code: 1064. You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'into productos (id, nombre, fecha, imagen, usuario_id ) values (default,'Campera' at line 1	0.00030 sec

insert into productos (id, nombre, fecha, imagen, usuario_id ) values (default,'Jean Abercrombie', '2009-11-24', 'producto6.jpeg' , 1) ;
insert into productos (id, nombre, fecha, imagen, usuario_id ) values (default,'Joggin Uniqlo', '2019-11-14', 'producto7.jpeg' , 2) ;
insert into productos (id, nombre, fecha, imagen, usuario_id ) values (default,'Swater Bershka', '2020-05-18', 'producto8.jpeg' , 3) ;
insert into productos (id, nombre, fecha, imagen, usuario_id ) values (default,'Borcegos Prune', '2019-08-12', 'producto9.jpeg' , 4) ;
insert into productos (id, nombre, fecha, imagen, usuario_id ) values (default,'Cartera Kralice', '2018-10-20', 'producto10.jpeg' , 5) ;

insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Muy linda la campera! Pero, ¿tiene alguna falla?' , '2021-05-03', 1, 1);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Divina! Muy recomendable' , '2019-08-03', 2, 1);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Muy buena calidad' , '2019-03-18', 3, 1);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'¿De que temporada es?' , '2021-05-09', 4, 1);

insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Muy linda la campera! Pero, ¿tiene alguna falla?' , '2021-05-03', 1, 11);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Divina! Muy recomendable' , '2019-08-03', 2, 11);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Muy buena calidad' , '2019-03-18', 3, 11);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'¿De que temporada es?' , '2021-05-09', 4, 11);
-- 12:09:25	insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Muy linda la campera! Pero, ¿tiene alguna falla?' , '2021-05-03', 1, 2)	Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`proyecto integrador`.`comentarios`, CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`))	0.0015 sec

insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Muy linda la campera! Pero, ¿tiene alguna falla?' ,'2021-05-03', 1, 3);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Divina! Muy recomendable' , '2019-08-03', 2, 3);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Muy buena calidad' , '2019-03-18', 3, 3);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'¿De que temporada es?' , '2021-05-09', 4, 3);

insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Muy linda la campera! Pero, ¿tiene alguna falla?' , '2021-05-03', 1, 4);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Divina! Muy recomendable' , '2019-08-03', 2, 4);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Muy buena calidad' , '2019-03-18', 3, 4);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'¿De que temporada es?' , '2021-05-09', 4, 4);

insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Muy linda la campera! Pero, ¿tiene alguna falla?' , '2021-05-03', 1, 17);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Divina! Muy recomendable' , '2019-08-03', 2, 17);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Muy buena calidad' , '2019-03-18', 3, 17);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'¿De que temporada es?' , '2021-05-09', 4, 17);

insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Muy linda la campera! Pero, ¿tiene alguna falla?' , '2021-05-03', 1, 6);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Divina! Muy recomendable' , '2019-08-03', 2, 6);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Muy buena calidad' , '2019-03-18', 3, 6);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'¿De que temporada es?' , '2021-05-09', 4, 6);

insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Muy linda la campera! Pero, ¿tiene alguna falla?' ,'2021-05-03', 1, 16);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Divina! Muy recomendable' , '2019-08-03', 2, 16);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Muy buena calidad' , '2019-03-18', 3, 16);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'¿De que temporada es?' ,'2021-05-09', 4, 16);

insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Muy linda la campera! Pero, ¿tiene alguna falla?' , '2021-05-03', 1, 8);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Divina! Muy recomendable' , '2019-08-03', 2, 8);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Muy buena calidad' , '2019-03-18', 3, 8);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'¿De que temporada es?' ,'2021-05-09', 4, 8);

insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Muy linda la campera! Pero, ¿tiene alguna falla?' , '2021-05-03', 1, 13);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Divina! Muy recomendable' , '2019-08-03', 2, 13);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Muy buena calidad' , '2019-03-18', 3, 13);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'¿De que temporada es?' , '2021-05-09', 4,  13);

insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Muy linda la campera! Pero, ¿tiene alguna falla?' , '2021-05-03', 1, 10);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Divina! Muy recomendable' , '2019-08-03', 2, 10);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'Muy buena calidad' , '2019-03-18', 3, 10);
insert into comentarios (id, texto, fecha, usuario_id, producto_id ) values (default,'¿De que temporada es?' , '2021-05-09', 4, 10);



