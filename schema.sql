CREATE DATABASE USER_DB;

USE USER_DB;

CREATE TABLE USERS(
  USER_ID INT NOT NULL AUTO_INCREMENT,
  NAME VARCHAR(50),
  PRIMARY KEY (USER_ID)
);
