CREATE TABLE IF NOT EXISTS artigiani (
    username_artigiano VARCHAR(63) PRIMARY KEY,
    h_password VARCHAR(255) NOT NULL,
    nome_impresa VARCHAR(127) UNIQUE NOT NULL,
    iban VARCHAR(34) NOT NULL CHECK (iban ~ '^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$' )
);
