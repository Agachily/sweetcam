CREATE DATABASE IF NOT EXISTS honeydb;
USE honeydb;

-- Add any initial tables your application needs
CREATE TABLE IF NOT EXISTS honeypot_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip VARCHAR(45),
    username VARCHAR(255),
    password VARCHAR(255),
    success BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    passwordHash VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS cameras (
    -- Add your camera table schema
);

CREATE TABLE `admins`
(
    `id`           int          NOT NULL AUTO_INCREMENT,
    `name`         varchar(255) NOT NULL,
    `passwordHash` varchar(255) NOT NULL,
    `chatId`       varchar(255) DEFAULT NULL,
    `createdAt`    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    `updatedAt`    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

INSERT INTO `admins` (`name`, `passwordHash`, `chatId`)
    value ('Jonny', '$2b$10$tisI8PSJW8hwC/mjdP9MvOMUeY/wjL0jKeS0jb4lJ9EBWo290rGQ6', '1726197025');

/**
  Jimmy:1234567; Admin:admin; Admin:Admin; admin:12345; root:12345; root:123456; root:admin; root:root; Nancy:1234567
 */
INSERT INTO `users` (`name`, `passwordHash`)
    values ('Jimmy', '$2b$10$tisI8PSJW8hwC/mjdP9MvOMUeY/wjL0jKeS0jb4lJ9EBWo290rGQ6'),
           ('Admin', '$2a$10$KSHYVV4y8jkFhMf45hiX1umUuv.XTijwn2wGnbQa9KyCftNvBV6ia'),
           ('Admin', '$2a$10$bYtlT0RyRS16wTQawb3skOwSh.s2Q1YU9owuxKaHq7cSY5sxBcu.i'),
           ('admin', '$2a$10$IOYkMiX4A/zULMHMsPHg3eclBo.uWviARBNnaogMZfFH0yhhDbj7O'),
           ('root', '$2a$10$Q/JuOhBYQxoqZsM2UdZvXeK5pdFFkW5sCb.DdDAkmpxROSPuUC6.y'),
           ('root', '$2a$10$xBvEwoOwzpApu9JYsL4qsOlSRYaIu3y3nwgael60fJiPVHC0g5TNq'),
           ('root', '$2a$10$SjMRqUPAkXSyphmRXj9TyOTqc1tY/HCOdUsBaw04uyPJe.BVgXsGq'),
           ('root', '$2a$10$39XWechlaS5aPg/4SO.43u2xA6ael3fcOWT8yNEQMHAcGVoe2tF4C'),
           ('Nancy', '$2b$10$tisI8PSJW8hwC/mjdP9MvOMUeY/wjL0jKeS0jb4lJ9EBWo290rGQ6');

-- Clear existing users and add test user
DELETE FROM users WHERE name = 'test';

-- Add test user with password 'pas4word'
-- This hash is specifically for 'pas4word'
INSERT INTO users (name, passwordHash) 
VALUES ('test', '$2a$10$IOYkMiX4A/zULMHMsPHg3eclBo.uWviARBNnaogMZfFH0yhhDbj7O');

-- Add some sample honeypot logs
INSERT INTO honeypot_logs (ip, username, password, success) 
VALUES 
    ('192.168.1.100', 'admin', 'admin123', false),
    ('192.168.1.101', 'root', 'password', false),
    ('192.168.1.102', 'test', 'test123', false);