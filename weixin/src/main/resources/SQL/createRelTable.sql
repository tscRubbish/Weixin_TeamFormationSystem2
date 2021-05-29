DROP TABLE IF EXISTS `Members`;

CREATE TABLE `Members` (
                        `userId` int(11) NOT NULL,
                        `teamId` int(11) NOT NULL,
                        PRIMARY KEY (`userId`,`teamId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `ContestPics`;

CREATE TABLE `ContestPics` (
                           `contestId` int(11) NOT NULL,
                           `pic` varchar(255) NOT NULL,
                           PRIMARY KEY (`contestId`,`pic`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

Alter Table  `ContestPics`
modify `pic` varchar(255) NOT NULL;
Alter Table  `recommend`
    modify `pic` varchar(255) NOT NULL

