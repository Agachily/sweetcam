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