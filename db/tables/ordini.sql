CREATE TABLE IF NOT EXISTS ordini(
    username_artigiano VARCHAR(63) NOT NULL REFERENCES artigiani(username_artigiano),
    username_cliente VARCHAR(63) NOT NULL REFERENCES clienti(username_cliente),
    nome_prodotto VARCHAR(127) NOT NULL REFERENCES prodotti(nome_prodotto),
    data_ordine TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    quantita INTEGER CHECK (quantita > 0),
    data_consegna TIMESTAMP,
    PRIMARY KEY (username_artigiano, username_cliente, nome_prodotto, data_ordine),
);
