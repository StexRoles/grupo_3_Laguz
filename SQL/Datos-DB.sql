/* LISTADO DE LOS PRODUCTOS */
INSERT INTO products values (1, "Monitor HKC ANTTEQ F2145M 21.45p 75hz", 78000, "Monitor HKC ANTTEQ F2145M 21.45p 75hz", "producto-1.webp", 10, 1, 1);
INSERT INTO products values (2, "Monitor HKC ANTTEQ F238M 23.8 IPS 75hz", 84000, "Monitor HKC ANTTEQ F238M 23.8 IPS 75hz", "producto-2.webp", 20, 1, 1);
INSERT INTO products values (3, "Watercooling - Refirigeración Líquida para CPU", 64000, "Watercooling - Refirigeración Líquida para CPU", "producto-3.webp", 5, 2, 1);
INSERT INTO products values (4, "Coolers para CPU Redragon Effect RGB Air 120mm CC-2000", 48000, "Coolers para CPU Redragon Effect RGB Air 120mm CC-2000", "producto-4.webp", 0, 3, 1);
INSERT INTO products values (5, "Smartwatch Amazfit Bip 3 Pink", 67000, "Smartwatch Amazfit Bip 3 Pink", "oferta-1.webp", 20, 4, 2);
INSERT INTO products values (6, "XP-PEN Artist 22R PRO", 18000, "XP-PEN Artist 22R PRO", "oferta-2.webp", 17, 5, 2);
INSERT INTO products values (7, "Monitor Philips 272V8LA/55 27'' FULL HD", 98000, "Monitor Philips 272V8LA/55 27'' FULL HD", "oferta-3.webp", 25, 6, 2);
INSERT INTO products values (8, "Auricular Redragon Zeus X White H510W-RGB", 102000, "Auricular Redragon Zeus X White H510W-RGB", "oferta-4.webp", 15, 3, 2);
INSERT INTO products values (9, "Computador Portátil LENOVO 15,6'' Pulgadas IdeaPad Slim 3 Táctil", 10000, "Computador Portátil LENOVO 15,6'' Pulgadas IdeaPad Slim 3 Táctil", "producto-9.jpg", 0, 7, 1);
INSERT INTO products values (10, "Audífonos SONY Inalámbricos Bluetooth On Ear WH-CH520", 12000, "Audífonos SONY Inalámbricos Bluetooth On Ear WH-CH520", "producto-10.jpg", 15, 8, 1);
INSERT INTO products values (11, "Computador Portátil Gamer ASUS TUF 15,6'' Pulgadas FX506", 130000, "Computador Portátil Gamer ASUS TUF 15,6'' Pulgadas FX506", "producto-11.jpg", 0, 9, 1);
INSERT INTO products values (12, "Computador Portátil Gamer Victus HP 15.6'' Pulgadas fb0102la", 124000, "Computador Portátil Gamer Victus HP 15.6'' Pulgadas fb0102la", "producto-12.jpg", 0, 10, 1);
INSERT INTO products values (13, "Parlante JBL Inalámbrico Bluetooth Charge 5 40W Azul", 33000, "Parlante JBL Inalámbrico Bluetooth Charge 5 40W Azul", "producto-13.jpeg", 30, 11, 2);

/* MARCAS DE LOS PRODUCTOS */
INSERT INTO brands values (1, "HKC");
INSERT INTO brands values (2, "Watercooling");
INSERT INTO brands values (3, "Redragon");
INSERT INTO brands values (4, "Amazfit");
INSERT INTO brands values (5, "XP-PEN");
INSERT INTO brands values (6, "Philips");
INSERT INTO brands values (7, "Lenovo");
INSERT INTO brands values (8, "Sony");
INSERT INTO brands values (9, "Asus");
INSERT INTO brands values (10, "Victus");
INSERT INTO brands values (11, "JBL");

/* ESTADOS DE LOS PRODUCTOS */
INSERT INTO laguz.status values (1, "featured");
INSERT INTO laguz.status values (2, "in-sale");

/* CATEGORIAS DE LOS PRODUCTOS */
INSERT INTO categories values (1, "laptops");
INSERT INTO categories values (2, "oficina");
INSERT INTO categories values (3, "estudiantes");
INSERT INTO categories values (4, "accesorios");
INSERT INTO categories values (5, "gamer");

/* UNIR CATEGORIAS CON PRODUCTOS */
INSERT INTO product_category values (1, 1, 2);
INSERT INTO product_category values (2, 1, 3);
INSERT INTO product_category values (3, 2, 2);
INSERT INTO product_category values (4, 2, 3);
INSERT INTO product_category values (5, 3, 4);
INSERT INTO product_category values (6, 3, 5);
INSERT INTO product_category values (7, 4, 4);
INSERT INTO product_category values (8, 4, 5);
INSERT INTO product_category values (9, 5, 2);
INSERT INTO product_category values (10, 5, 4);
INSERT INTO product_category values (11, 6, 2);
INSERT INTO product_category values (12, 6, 3);
INSERT INTO product_category values (13, 6, 4);
INSERT INTO product_category values (14, 7, 2);
INSERT INTO product_category values (15, 7, 3);
INSERT INTO product_category values (16, 8, 4);
INSERT INTO product_category values (17, 8, 5);
INSERT INTO product_category values (18, 9, 1);
INSERT INTO product_category values (19, 9, 2);
INSERT INTO product_category values (20, 9, 3);
INSERT INTO product_category values (21, 10, 3);
INSERT INTO product_category values (22, 10, 4);
INSERT INTO product_category values (23, 10, 5);
INSERT INTO product_category values (24, 11, 1);
INSERT INTO product_category values (25, 11, 5);
INSERT INTO product_category values (26, 12, 1);
INSERT INTO product_category values (27, 12, 5);
INSERT INTO product_category values (28, 13, 4);

/* DATOS DE USUARIOS */
INSERT INTO users values (1, "Stex", "ejemplo@gmail.com", "$2a$10$CKqlkcylmTBs.waYJeVJ/eyi8Z8FStzRaoZZE6fIPgoQAN3s5oOQC", true, "Steven Nav", "avatar-1706749307102.jpg", 1);

/* DATOS DE PAISES */
INSERT INTO countries values (1, "Colombia");
INSERT INTO countries values (2, "Argentina");

/* DATOS DE CIUDADES */
INSERT INTO cities values (1, "Bogota", 1);
INSERT INTO cities values (2, "Medellin", 1);
INSERT INTO cities values (3, "Cali", 1);
INSERT INTO cities values (4, "Barranquilla", 1);
INSERT INTO cities values (5, "Buenos Aires", 2);
INSERT INTO cities values (6, "Rosario", 2);
INSERT INTO cities values (7, "Mendoza", 2);
INSERT INTO cities values (8, "La Plata", 2);
