CREATE TABLE IF NOT EXISTS clienti (
    username_cliente VARCHAR(63) PRIMARY KEY,
    h_password VARCHAR(255) NOT NULL,
    email_cliente VARCHAR(127) UNIQUE NOT NULL CHECK (email_cliente LIKE '_%@__%.__%'),
    nome_cliente VARCHAR(127) NOT NULL,
    cognome_cliente VARCHAR(127) NOT NULL
);
