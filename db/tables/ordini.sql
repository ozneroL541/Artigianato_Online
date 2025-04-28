CREATE TABLE IF NOT EXISTS ordini(
    id_prodotto INT NOT NULL REFERENCES prodotti(id_prodotto) ON UPDATE CASCADE ON DELETE NO ACTION,
    username_cliente VARCHAR(63) NOT NULL REFERENCES clienti(username_cliente) ON UPDATE CASCADE ON DELETE NO ACTION,
    data_ordine TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    quantita INTEGER CHECK (quantita > 0),
    data_consegna TIMESTAMP,
    PRIMARY KEY (id_prodotto, username_cliente, data_ordine)
);
