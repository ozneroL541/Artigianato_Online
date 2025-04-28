CREATE USER artigianato_online WITH ENCRYPTED PASSWORD 'password' CREATEDB;
CREATE DATABASE artigianato_online_db
    WITH 
    OWNER = artigianato_online
    ENCODING = 'UTF8';
