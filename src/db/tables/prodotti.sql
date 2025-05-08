CREATE TABLE IF NOT EXISTS prodotti (
    id_prodotto SERIAL PRIMARY KEY,
    username_artigiano VARCHAR(63) NOT NULL REFERENCES artigiani(username_artigiano) ON UPDATE CASCADE ON DELETE CASCADE,
    nome_prodotto VARCHAR(127) NOT NULL,
    categoria VARCHAR(63) DEFAULT NULL REFERENCES categorie(categoria) ON UPDATE CASCADE ON DELETE SET DEFAULT,
    prezzo DECIMAL(10, 2) NOT NULL CHECK (prezzo >= 0),
    disponibilita INTEGER NOT NULL CHECK (disponibilita >= 0),
    UNIQUE (username_artigiano, nome_prodotto)
);
