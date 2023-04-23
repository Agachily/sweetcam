use sweetcam;

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

CREATE TABLE `users`
(
    `id`           int          NOT NULL AUTO_INCREMENT,
    `name`         varchar(255) NOT NULL,
    `passwordHash` varchar(255) NOT NULL,
    `createdAt`    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    `updatedAt`    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

INSERT INTO `admins` (`name`, `passwordHash`, `chatId`)
    value ('Jonny', '$2b$10$tisI8PSJW8hwC/mjdP9MvOMUeY/wjL0jKeS0jb4lJ9EBWo290rGQ6', '1726197025');

INSERT INTO `users` (`name`, `passwordHash`)
values ('Jimmy', '$2b$10$tisI8PSJW8hwC/mjdP9MvOMUeY/wjL0jKeS0jb4lJ9EBWo290rGQ6'),
       ('Nancy', '$2b$10$tisI8PSJW8hwC/mjdP9MvOMUeY/wjL0jKeS0jb4lJ9EBWo290rGQ6');