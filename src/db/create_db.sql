-- Script to create the cliente and database for the project
CREATE ROLE artigianato_online WITH LOGIN ENCRYPTED PASSWORD 'password' CREATEDB;
CREATE DATABASE artigianato_online_db
    WITH 
    OWNER = artigianato_online
    ENCODING = 'UTF8';
GRANT ALL PRIVILEGES ON DATABASE artigianato_online_db TO artigianato_online;
