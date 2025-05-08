# Struttura Database 
## artigianato_online_db
- [amministratori](./tables/amministratori.sql) (<u>username_amministratore</u> , h_password)
- [artigiani](./tables/artigiani.sql) (<u>username_artigiano</u>, h_password, nome_impresa, iban)
- [clienti](./tables/clienti.sql) (<u>username_cliente</u>, h_password, email_cliente, nome_cliente, cognome_cliente)
- [categorie](./tables/categorie.sql) (<u>categoria</u>)
- [prodotti](./tables/prodotti.sql) (<u>id_prodotto</u>, username_artigiano<sup>[artigiani](./tables/artigiani.sql)</sup>, nome_prodotto, categoria<sup>[categorie](./tables/categorie.sql)</sup>, prezzo, disponibilita)
- [ordini](./tables/ordini.sql) (<u>id_ordine</u>, id_prodotto<sup>[prodotti](./tables/prodotti.sql)</sup>, username_cliente<sup>[clienti](./tables/clienti.sql)</sup>, data_ordine, quantita, data_consegna)
- [segnalazioni](./tables/segnalazioni.sql) (<u>id_segnalazione</u>, id_ordine<sup>[ordini](./tables/ordini.sql)</sup>, timestamp_segnalazione, descrizione, risolta)
