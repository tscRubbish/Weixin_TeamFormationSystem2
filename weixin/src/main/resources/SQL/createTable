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
                        `description` varchar(600) DEFAULT '',
                        PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

insert into `User` VALUES (0,'',1,'Admin','123456','123',5,1,'Admin','',''),
                          (1,'',0,'nju_se','12345678','12345',4,1,'Manager','',''),
                          (2,'',0,'Tsc','Tsc20010401','2010075010@qq.com',0,0,'User','','');
insert into `User` VALUES (4,'',0,'清华腾讯微信事业群','qwertyuiop','191923',0,0,'Manager','计算机 软件','');

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
insert into `Contest` VALUES (2,'Hackathon比赛',1,'2021-03-08','2021-03-16',
'此次Hackathon比赛由挪威科技大学、南京大学、同济大学联合举办，旨在解决新冠疫情后城市区域可持续发展所面临的挑战。\n 报名链接:https://ipit.network/hackathon-intelligent-cities-after-covid-19/',
'编程');
insert into `Contest` VALUES (3,'第十七届“挑战杯”院内选拔赛',1,'2021-01-22','2021-05-29',
'全国大学生课外学术科技作品竞赛南京大学选拔赛的通知、2021年寒假社会实践暨年度社会实践特别专项专项示范先导项目立项申报',
'学术 实践');
insert into `Contest` VALUES (4,'中国高校微信小程序应用开发赛',4,'2021-05-21','2021-07-23',
                              '2021 微信小程序应用开发赛（以下简称“大赛”）是由清华大学与腾讯公司微信事业群联合主办，基于微信小程序平台的创新应用开发设计竞赛。大赛面向全球高校在校生开放，旨在通过竞赛的方式提升学生进行微信小程序应用的设计与开发能力，特别是运用微信生态开发技术进行创意设计和创新实践的能力，实现以赛促学、以赛促教、以赛促用，推动微信生态体系的人才培养和产学研用，大赛鼓励高校教师参与指导。
一、参赛对象
本次大赛面向中国及境外的高等学校在校学生（包括本科生、研究生、高职高专等），
具体要求如下：
1. 可以单人参赛或自由组队，每支参赛队伍人数最多不超过 4 人，允许跨年级、跨专业、跨校和跨赛区组队。
2. 每人只能参加一支队伍（即个人参赛后不可再与他人组队参赛，或个人参加一支队伍后不可再参加另一支队伍），每支队伍允许最多有一名指导老师，指导教师须为在职高校教师。
3. 参赛者应为在校生或 2020 年 1 月 1 日之后毕业的学生，在此之前毕业的学生不具备参赛资格','编程');
