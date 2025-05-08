CREATE TABLE IF NOT EXISTS segnalazioni (
    id_segnalazione SERIAL PRIMARY KEY,
    id_ordine INT NOT NULL REFERENCES ordini(id_ordine) ON DELETE CASCADE ON UPDATE CASCADE,
    timestamp_segnalazione TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    descrizione TEXT,
    risolta BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE (id_ordine, timestamp_segnalazione)
);
