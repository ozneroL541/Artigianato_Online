# Struttura Database 
## artigianato_online_db
- [amministratori](./tables/amministratori.sql) (<ins>username_amministratore</ins> , h_password)
- [artigiani](./tables/artigiani.sql) (<ins>username_artigiano</ins>, h_password, nome_impresa, iban)
- [clienti](./tables/clienti.sql) (<ins>username_cliente</ins>, h_password, email_cliente, nome_cliente, cognome_cliente)
- [categorie](./tables/categorie.sql) (<ins>categoria</ins>)
- [prodotti](./tables/prodotti.sql) (<ins>id_prodotto</ins>, username_artigiano<sup>[artigiani](./tables/artigiani.sql)</sup>, nome_prodotto, categoria<sup>[categorie](./tables/categorie.sql)</sup>, prezzo, disponibilita)
- [ordini](./tables/ordini.sql) (<ins>id_ordine</ins>, id_prodotto<sup>[prodotti](./tables/prodotti.sql)</sup>, username_cliente<sup>[clienti](./tables/clienti.sql)</sup>, data_ordine, quantita, data_consegna)
- [segnalazioni](./tables/segnalazioni.sql) (<ins>id_segnalazione</ins>, id_ordine<sup>[ordini](./tables/ordini.sql)</sup>, timestamp_segnalazione, descrizione, risolta)
