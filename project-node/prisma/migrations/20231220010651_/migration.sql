-- CreateTable
CREATE TABLE `comment` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `create_time` DATETIME(6) NULL,
    `update_time` DATETIME(6) NULL,
    `content` VARCHAR(300) NULL,
    `member_member_id` BIGINT NULL,
    `post_id` BIGINT NULL,

    INDEX `FKo408axpwswl3s4824x98gcby5`(`member_member_id`),
    INDEX `FKs1slvnkuemjsq2kj4h3vhx7i1`(`post_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `like_post` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `create_time` DATETIME(6) NULL,
    `update_time` DATETIME(6) NULL,
    `member_member_id` BIGINT NULL,
    `post_id` BIGINT NULL,

    INDEX `FKhxidq8xbcktgnsraklj7lgtws`(`member_member_id`),
    INDEX `FKnu91sbh82a5nj1o3xh0sgwhu8`(`post_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `member` (
    `member_id` BIGINT NOT NULL AUTO_INCREMENT,
    `create_time` DATETIME(6) NULL,
    `update_time` DATETIME(6) NULL,
    `email` VARCHAR(30) NULL,
    `login_id` VARCHAR(255) NULL,
    `nickname` VARCHAR(255) NULL,
    `open_privacy` BIT(1) NULL,
    `password` VARCHAR(255) NULL,
    `refresh_token` VARCHAR(255) NULL,
    `role` ENUM('ADMIN', 'USER') NULL,

    UNIQUE INDEX `UK_mbmcqelty0fbrvxp1q58dn57t`(`email`),
    PRIMARY KEY (`member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `create_time` DATETIME(6) NULL,
    `update_time` DATETIME(6) NULL,
    `content` VARCHAR(255) NULL,
    `title` VARCHAR(255) NULL,
    `member_member_id` BIGINT NULL,

    INDEX `FK6fhxjpyi39cyxa7xwdj80bpq`(`member_member_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post_views` (
    `post_id` BIGINT NOT NULL,
    `views` BIGINT NULL,

    INDEX `FK8a1o0yvf8ee1udcj1vp8k5d22`(`post_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `re_comment` (
    `id` BIGINT NOT NULL,
    `create_time` DATETIME(6) NULL,
    `update_time` DATETIME(6) NULL,
    `content` VARCHAR(255) NULL,
    `comment_id` BIGINT NULL,
    `member_member_id` BIGINT NULL,

    INDEX `FKfntfyfiora59ypgqd3aqdia2m`(`member_member_id`),
    INDEX `FKlbau13r2qs2dvla5g9k3xnmpd`(`comment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `re_comment_seq` (
    `next_val` BIGINT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tag` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `create_time` DATETIME(6) NULL,
    `update_time` DATETIME(6) NULL,
    `name` VARCHAR(255) NULL,
    `post_id` BIGINT NULL,

    INDEX `FK7tk5hi5tl1txftyn44dtq2mv6`(`post_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `todo_list` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `create_time` DATETIME(6) NULL,
    `update_time` DATETIME(6) NULL,
    `checked` BIT(1) NOT NULL,
    `content` VARCHAR(255) NULL,
    `important` ENUM('HIGH', 'LOW', 'MIDDLE') NULL,
    `local_date` DATE NULL,
    `member_member_id` BIGINT NULL,

    INDEX `FKenu9wa31vqjfw3u0sukqhywyc`(`member_member_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `FKo408axpwswl3s4824x98gcby5` FOREIGN KEY (`member_member_id`) REFERENCES `member`(`member_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `FKs1slvnkuemjsq2kj4h3vhx7i1` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `like_post` ADD CONSTRAINT `FKhxidq8xbcktgnsraklj7lgtws` FOREIGN KEY (`member_member_id`) REFERENCES `member`(`member_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `like_post` ADD CONSTRAINT `FKnu91sbh82a5nj1o3xh0sgwhu8` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `FK6fhxjpyi39cyxa7xwdj80bpq` FOREIGN KEY (`member_member_id`) REFERENCES `member`(`member_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `post_views` ADD CONSTRAINT `FK8a1o0yvf8ee1udcj1vp8k5d22` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `re_comment` ADD CONSTRAINT `FKfntfyfiora59ypgqd3aqdia2m` FOREIGN KEY (`member_member_id`) REFERENCES `member`(`member_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `re_comment` ADD CONSTRAINT `FKlbau13r2qs2dvla5g9k3xnmpd` FOREIGN KEY (`comment_id`) REFERENCES `comment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tag` ADD CONSTRAINT `FK7tk5hi5tl1txftyn44dtq2mv6` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `todo_list` ADD CONSTRAINT `FKenu9wa31vqjfw3u0sukqhywyc` FOREIGN KEY (`member_member_id`) REFERENCES `member`(`member_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
