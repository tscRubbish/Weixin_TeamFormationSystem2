DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
                        `id` int(11) NOT NULL AUTO_INCREMENT,
                        `pic` varchar(100) DEFAULT '',
                        `likes` int(11) NOT NULL DEFAULT 0,
                        `username` varchar(25) NOT NULL,
                        `password` varchar(64) NOT NULL,
                        `email` varchar(64) NOT NULL ,
                        `score` float(10) NOT NULL DEFAULT 0,
                        `score_nums` int(11) NOT NULL DEFAULT 0,
                        `userType` varchar(10) NOT NULL DEFAULT 'User',
                        `tags` varchar(100) DEFAULT '',
                        `description` varchar(255) DEFAULT '',
                        PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

insert into `User` VALUES (0,'',1,'Admin','123456','123',5,1,'Admin','',''),
                          (1,'',0,'nju_se','12345678','123',4,1,'Manager','',''),
                          (2,'',0,'Tsc','Tsc20010401','2010075010@qq.com',0,0,'User','','');

DROP TABLE IF EXISTS `Team`;

CREATE TABLE `Team` (
                        `id` int(11) NOT NULL AUTO_INCREMENT,
                        `pic` varchar(255) DEFAULT '',
                        `name` varchar(25) NOT NULL,
                        `password` varchar(64) NOT NULL,
                        `description` varchar(255) DEFAULT '',
                        `captainId` int(11) NOT NULL ,
                        `captainNotice` varchar(255) DEFAULT '',
                        `contestId` int(11) NOT NULL ,
                        PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
alter table weixin.team add maxNum int(11) DEFAULT 5;
alter table weixin.team modify description varchar(600) DEFAULT '';

insert into `Team` VALUES (1,'','5A430','123456','垃圾回收中心',2,'114514',1,4);

DROP TABLE IF EXISTS `Contest`;
CREATE TABLE `Contest` (
                        `id` int(11) NOT NULL AUTO_INCREMENT,
                        `name` varchar(25) NOT NULL,
                        `sponsorId` int(11) NOT NULL,
                        `startTime` DATE NOT NULL ,
                        `endTime` DATE NOT NULL ,
                        `description` varchar(600) DEFAULT '',
                        `tags` varchar(100) DEFAULT '',
                        PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

insert into `Contest` VALUES (1,'EL比赛',1,'2021-3-1','2021-5-31','南大软院','编程 算法');