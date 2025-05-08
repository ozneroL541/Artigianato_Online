-- Create all tables in the database
\i './tables/amministratori.sql';
\i './tables/artigiani.sql';
\i './tables/clienti.sql';
\i './tables/categorie.sql';
\i './tables/prodotti.sql';
\i './tables/ordini.sql';
\i './tables/segnalazioni.sql';
-- Populate the cateries table
\i './populate/categorie_insert.sql';
