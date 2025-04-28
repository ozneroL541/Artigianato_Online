CREATE TABLE IF NOT EXISTS artigiani (
    username_artigiano VARCHAR(63) PRIMARY KEY,
    h_password VARCHAR(255) NOT NULL,
    nome_impresa VARCHAR(127) UNIQUE NOT NULL,
    iban CHAR(27) NOT NULL
);
