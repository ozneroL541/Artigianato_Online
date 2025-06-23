<a href="https://github.com/ozneroL541/Artigianato_Online/blob/master/LICENSE.md"><img src="https://img.shields.io/github/license/ozneroL541/Artigianato_Online?color=2b9348" alt="License"/></a>

# Artigianato_Online
Il cliente è una startup che vuole vendere online prodotti artigianali realizzati da creativi locali. La piattaforma consente agli artigiani di creare un profilo, caricare i propri prodotti, gestire l’inventario e gli ordini, mentre i clienti possono sfogliare il catalogo, fare acquisti e gestire il proprio profilo.

## Run the project
> [!important]  
> You need to have [docker](https://www.docker.com/) installed to run the project.
> The docker engine must be running

To run the project build it with the `docker-compose.yml` file in *src*.
```sh
    sudo docker compose up --build --remove-orphans -d
```
- Frontend is reachable at port `8000`.
- Server is reachable at port `8080`.

### Stop the project
To stop the project run:
```sh
    sudo docker compose down
```

## Documentation
### API Doc
RESTful API Documentation is avaiable at [/api/docs/](http://localhost:8000:/api/docs/) after the backend server has started.

## Authors
- @Sballerini3    Ballerini Stefano
- @leonardobasso    Basso Leonardo
- @Giaki03  Paredi Giacomo
- @ozneroL541   Radice Lorenzo
