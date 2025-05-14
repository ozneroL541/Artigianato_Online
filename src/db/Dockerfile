FROM postgres:latest

LABEL name="db-artigianato_online"

COPY tables/ /tables/
COPY populate/ /populate/
COPY examples/ /examples/

RUN mkdir -p /docker-entrypoint-initdb.d
COPY create_tables.sql /docker-entrypoint-initdb.d/02-create_tables.sql
COPY insert_data.sql /docker-entrypoint-initdb.d/03-insert_data.sql

EXPOSE 5432
