CREATE TABLE IF NOT EXISTS prodotti (
    username_artigiano VARCHAR(63) NOT NULL REFERENCES artigiani(username_artigiano),
    nome_prodotto VARCHAR(127) NOT NULL,
    categoria VARCHAR(63) REFERENCES categorie(categoria) ON UPDATE CASCADE ON DELETE SET NULL ,
    prezzo DECIMAL(10, 2) NOT NULL CHECK (prezzo >= 0),
    disponibilita INTEGER CHECK (disponibilita >= 0),
    PRIMARY KEY (username_artigiano, nome_prodotto)
);
