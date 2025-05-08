import random

categories:list = [
    "\'Accessori moda\'", "\'Arredamento\'", "\'Articoli per la casa\'", "\'Borse\'", "\'Candele\'", "\'Carta\'", "\'Ceramica\'", "\'Cosmetici naturali\'", "\'Decorazioni\'", "\'Fiori e piante\'", "\'Gioielli\'", "\'Giocattoli\'", "\'Lampade\'", "\'Legno\'", "\'Pelle\'", "\'Quadri\'", "\'Saponi e profumi\'", "\'Strumenti musicali\'", "\'Tessuti\'", "\'Vetro\'", "NULL"
]
artigiani:list = []
with open('ex_artigiani.sql', 'r') as infile:
    for line in infile:
        if line.startswith('INSERT INTO'):
            continue
        if line.startswith('VALUES'):
            continue
        if line.startswith('('):
            line = line.strip()
            line = line.split(',')
            username:str = line[0].strip().replace('(', '')
            artigiani.append(username)
    infile.close()
clienti:list = []
with open('ex_clienti.sql', 'r') as infile:
    for line in infile:
        if line.startswith('INSERT INTO'):
            continue
        if line.startswith('VALUES'):
            continue
        if line.startswith('('):
            line = line.strip()
            line = line.split(',')
            username:str = line[0].strip().replace('(', '')
            clienti.append(username)
    infile.close()

prodotti:list = []
with open('prodotti.csv', 'r') as infile:
    for line in infile:
        name:str = line.strip().replace('\"', '\'')
        prodotti.append(name)
    infile.close()

num_prodotti:int = 750
def gen_ex_prodotti():
    global num_prodotti
    firstline:str = 'INSERT INTO prodotti (id_prodotto, username_artigiano, nome_prodotto, categoria, prezzo, disponibilita) VALUES \n'
    with open('ex_prodotti.sql', 'w') as out:
        #print(firstline, end='')
        out.write(firstline)
        for id in range(1, num_prodotti):
            id_prodotto:str = id
            username_artigiano:str = random.choice(artigiani)
            nome_prodotto:str = prodotti[id % len(prodotti)]
            categoria:str = random.choice(categories)
            prezzo:str = f"{random.randint(1, 1000)}.{random.randint(0, 99)}"
            disponibilita:str = f"{random.randint(0, 500)}"
            instance:str = f"({id_prodotto}, {username_artigiano}, {nome_prodotto}, {categoria}, {prezzo}, {disponibilita}),\n"
            #print(instance, end='')
            out.write(instance)
        id_prodotto:str = num_prodotti
        username_artigiano:str = random.choice(artigiani)
        nome_prodotto:str = prodotti[num_prodotti % len(prodotti)]
        categoria:str = random.choice(categories)
        prezzo:str = f"{random.randint(1, 1000)}.{random.randint(0, 99)}"
        disponibilita:str = f"{random.randint(0, 500)}"
        instance:str = f"({id_prodotto}, {username_artigiano}, {nome_prodotto}, {categoria}, {prezzo}, {disponibilita});\n"
        #print(instance, end='')
        out.write(instance)
        out.close()

num_ordini:int = 1000


def get_random_timestamp():
    year = random.randint(2020, 2023)
    month = random.randint(1, 12)
    day = random.randint(1, 28)  # To avoid invalid dates
    hour = random.randint(0, 23)
    minute = random.randint(0, 59)
    second = random.randint(0, 59)
    return f"'{year}-{month:02d}-{day:02d} {hour:02d}:{minute:02d}:{second:02d}'"

def gen_ex_ordini():
    global num_prodotti, num_ordini
    firstline:str = 'INSERT INTO ordini (id_prodotto, username_cliente, data_ordine, quantita, data_consegna) VALUES \n'
    with open('ex_ordini.sql', 'w') as out:
        #print(firstline, end='')
        out.write(firstline)
        for id in range(1, num_ordini):
            choice:bool = random.choice([True, False])
            id_prodotto:str = random.randint(1, num_prodotti)
            username_cliente:str = random.choice(clienti)
            data_ordine:str = f"{get_random_timestamp()}"
            quantita:str = f"{random.randint(1, 100)}"
            data_consegna:str = f"NULL" if choice else f"{get_random_timestamp()}"
            instance:str = f"({id_prodotto}, {username_cliente}, {data_ordine}, {quantita}, {data_consegna});\n"
            #print(instance, end='')
            out.write(instance)
        choice:bool = random.choice([True, False])
        id_prodotto:str = random.randint(1, num_prodotti)
        username_cliente:str = random.choice(clienti)
        data_ordine:str = f"{get_random_timestamp()}"
        quantita:str = f"{random.randint(1, 100)}"
        data_consegna:str = f"NULL" if choice else f"{get_random_timestamp()}"
        instance:str = f"({id_prodotto}, {username_cliente}, {data_ordine}, {quantita}, {data_consegna}),\n"
        #print(instance, end='')
        out.write(instance)
        out.close()

def gen_segnalazioni():
    firstline:str = 'INSERT INTO segnalazioni (id_ordine, timestamp_segnalazione, descrizione, risolta) VALUES \n'
    num_segnalazioni:int = 250
    with open('ex_segnalazioni.sql', 'w') as out:
        print(firstline, end='')
        out.write(firstline)
        for id in range(1, num_segnalazioni):
            instance = get_segnalazione()
            print(instance, end='')
            out.write(instance)
        instance:str = get_segnalazione()
        instance = instance.replace('),\n', ');\n')
        print(instance, end='')
        out.write(instance)
        out.close()

def get_segnalazione() ->str:
    global num_ordini
    possibili_descrizioni:list = ["\'prodotto difettoso\'", "\'prodotto non conforme\'", "\'prodotto non ricevuto\'", "\'prodotto non corrispondente alla descrizione\'",
                                  "NULL"
                                  ]
    id_ordine:str = random.randint(1, num_ordini)
    timestamp_segnalazione:str = f"{get_random_timestamp()}"
    descrizione:str = f"{random.choice(possibili_descrizioni)}"
    risolta:str = f"{random.choice(['TRUE', 'FALSE', 'DEFAULT'])}"
    instance:str = f"({id_ordine}, {timestamp_segnalazione}, {descrizione}, {risolta}),\n"
    return instance

#gen_ex_prodotti()
#gen_ex_ordini()
gen_segnalazioni()
