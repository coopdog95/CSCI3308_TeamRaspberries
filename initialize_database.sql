CREATE DATABASE IF NOT EXISTS Raspberries;
GO
USE Raspberries;
GO
CREATE TABLE IF NOT EXISTS sensorInfo(
  sensorID INT(11),
  testDate date,
  testTime time,
  temp INT(11),
  humidity INT(11),
  userID INT(10),
  latitude decimal(9,6),
  longitude decimal(9,6)
);

CREATE TABLE IF NOT EXISTS LoginInfo(
  userID INT NOT NULL AUTO_INCREMENT,
	firstName VARCHAR(20),
	lastName VARCHAR(20),
	username VARCHAR(20),
	password VARCHAR(20),
	email VARCHAR(50),
  PRIMARY KEY ( userID )
);


