 const { SearchProductById, SearchAllProduct } = require('../path/to/Search');
const { pool } = require('../db/dbConnection.js');


jest.mock('../db/dbConnection.js', () => ({
  pool: {
    query: jest.fn()
  }
}));

class IncompatiblyId extends Error {} 

describe('SearchProductById', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('restituisce un prodotto con prezzo convertito', async () => {
    const mockProduct = { id: 1, nome: 'Prodotto A', prezzo: '10.50' };
    pool.query.mockResolvedValueOnce({ rows: [mockProduct] });

    SearchProductById.dbIdProducts = 'id'; 
    const search = new SearchProductById(1);
    const result = await search.researchById();

    expect(pool.query).toHaveBeenCalledWith(expect.stringContaining('SELECT * FROM prodotti'), [1]);
    expect(result[0].prezzo).toBe(10.5);
  });

  it('lancia errore se il prodotto non esiste', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    SearchProductById.dbIdProducts = 'id';
    const search = new SearchProductById(999);

    await expect(search.researchById()).rejects.toThrow('No products found for the given ID');
  });
});

describe('SearchAllProduct', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('restituisce tutti i prodotti con prezzo convertito', async () => {
    const mockProducts = [
      { id: 1, nome: 'A', prezzo: '5.00' },
      { id: 2, nome: 'B', prezzo: '12.50' }
    ];
    pool.query.mockResolvedValueOnce({ rows: mockProducts });

    const searchAll = new SearchAllProduct();
    const result = await searchAll.researchProduct();

    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM prodotti');
    expect(result[0].prezzo).toBe(5.00);
    expect(result[1].prezzo).toBe(12.50);
  });

  it('lancia errore se la query fallisce', async () => {
    pool.query.mockRejectedValueOnce(new Error('DB error'));

    const searchAll = new SearchAllProduct();
    await expect(searchAll.researchProduct()).rejects.toThrow('Could not fetch products from the database');
  });
});
