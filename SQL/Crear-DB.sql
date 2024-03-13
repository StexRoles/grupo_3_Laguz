CREATE DATABASE IF NOT EXISTS laguz;
USE laguz;

CREATE TABLE `brands` (
   `id` INT AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `status` (
   `id` INT AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `products` (
   `id` INT AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `price` INT NOT NULL,
   `description` VARCHAR(255) NOT NULL,
   `image` VARCHAR(255) NOT NULL,
   `discount` TINYINT,
   `brand_id` INT NOT NULL,
   `status_id` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `product_category` (
   `id` INT AUTO_INCREMENT,
   `product_id` INT,
   `category_id` INT,
   PRIMARY KEY (`id`)
);

CREATE TABLE `countries` (
   `id` INT AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `cities` (
   `id` INT AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   `country_id` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `categories` (
   `id` INT AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
   `id` INT AUTO_INCREMENT,
   `username` VARCHAR(255) NOT NULL,
   `email` VARCHAR(255) NOT NULL,
   `password` VARCHAR(255) NOT NULL,
   `admin` INT NOT NULL,
   `nickname` VARCHAR(100),
   `avatar` VARCHAR(255),
   `country_id` INT,
   PRIMARY KEY (`id`)
);

