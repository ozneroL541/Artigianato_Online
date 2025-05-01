const {client} = require('pg');

const Client = new client({

    host: "localhost",
    port: "5432",
    user: "artigianato_online",
    password: "password",
    database: "artigianato_online_db"
});

Client.connect();

function query_test(){}


async function loginAmm(){
     
 }

async function logoutAmm(){

}

async function RegArtigiano(){

}

async function CaricaProd(){

}

async function loginArt(){
     
}

async function logoutArt(){

}


async function RegCliente(){

}

async function loginCliente(){

}

async function logoutCliente(){

}


