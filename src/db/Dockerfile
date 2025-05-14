FROM postgres:latest
LABEL name="db-artigianato_online"
# Set the environment variables for PostgreSQL
ENV POSTGRES_USER=artigianato_online
ENV POSTGRES_HOST=localhost
ENV POSTGRES_DB=artigianato_online_db
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_PORT=5432

COPY tables/ /tables/
COPY populate/ /populate/
COPY examples/ /examples/

RUN mkdir -p /docker-entrypoint-initdb.d
COPY create_tables.sql /docker-entrypoint-initdb.d/02-create_tables.sql
COPY insert_data.sql /docker-entrypoint-initdb.d/03-insert_data.sql

EXPOSE $POSTGRES_PORT
