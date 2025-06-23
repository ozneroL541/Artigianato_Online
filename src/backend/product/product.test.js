const { Product } =require('./Product.js');
const { pool }= require( '../db/dbConnection.js');
const { Category }= require('../category/Category.js');

// Mock del pool
jest.mock('../db/dbConnection.js', () => ({
  pool: {
    query: jest.fn()
  }
}));

// Mock della classe Category
jest.mock('../category/Category.js', () => {
  return {
    Category: jest.fn().mockImplementation(name => ({
      categoria: name?.toUpperCase(),
      exists: jest.fn().mockResolvedValue(true)
    })),
    CategoryError: class CategoryError extends Error {}
  };
});

describe('Product class', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('inserisce un prodotto con successo', async () => {
    const mockedId = 101;
    pool.query.mockResolvedValueOnce({ rows: [{ id_prodotto: mockedId }] });

    const p = new Product(null, 'artUser', 'Vaso', 'ceramica', 25.5, 10);
    const id = await p.save();

    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(id).toBe(mockedId);
  });

  it('aggiorna un prodotto correttamente', async () => {
    pool.query.mockResolvedValueOnce({});

    const p = new Product(1, 'artUser', 'Vaso', 'ceramica', 25.5, 10);
    const result = await p.update();

    expect(result).toBe(true);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  it('elimina un prodotto', async () => {
    pool.query.mockResolvedValueOnce({ rowCount: 1 });

    const p = new Product(1, 'artUser', 'Vaso', 'ceramica', 25.5, 10);
    const result = await p.delete();

    expect(pool.query).toHaveBeenCalledWith(
      'DELETE FROM prodotti WHERE id_prodotto = $1 AND username_artigiano = $2;',
      [1, 'artUser']
    );
    expect(result.rowCount).toBe(1);
  });

  it('cerca prodotti con filtro su categoria e prezzo', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{
        id_prodotto: 2,
        username_artigiano: 'user2',
        nome_prodotto: 'Quadro',
        categoria: 'arte',
        prezzo: 100,
        disponibilita: 2
      }]
    });

    const results = await Product.search(null, null, 'arte', 50, 150, null, null, false);
    expect(results[0]).toBeInstanceOf(Product);
    expect(results[0].nome_prodotto).toBe('Quadro');
  });
});
