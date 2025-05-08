create_db_filename = './create_db.sql'
create_tables_filenames = [
    './tables/amministratori.sql',
    './tables/artigiani.sql',
    './tables/clienti.sql',
    './tables/categorie.sql',
    './tables/prodotti.sql',
    './tables/ordini.sql',
    './tables/segnalazioni.sql',
    './populate/categorie_insert.sql'
]
populate_filenames = [
    './examples/ex_amministratori.sql',
    './examples/ex_artigiani.sql',
    './examples/ex_clienti.sql',
    './examples/ex_prodotti.sql',
    './examples/ex_ordini.sql',
    './examples/ex_segnalazioni.sql'
]

output_filename = './all_queries.sql'

out:str = ''

def read_file(filename: str) -> str:
    with open(filename, 'r') as file:
        return file.read()
    
def write_file(filename: str, content: str) -> None:
    with open(filename, 'w') as file:
        file.write(content)

def create_all_queries() -> None:
    global out
    out = read_file(create_db_filename)
    for filename in create_tables_filenames:
        out += read_file(filename)
    for filename in populate_filenames:
        out += read_file(filename)
    write_file(output_filename, out)
    print(f"{out}")

def main() -> None:
    create_all_queries()

if __name__ == '__main__':
    main()
    
