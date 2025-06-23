const { Category, CategoryError } = require('./Category.js');
const { pool } = require('../db/dbConnection.js');

// Mock del pool.query
jest.mock('../db/dbConnection.js', () => ({
  pool: {
    query: jest.fn()
  }
}));

describe('Category class', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('save()', () => {
    it('salva una nuova categoria se non esiste già', async () => {
      const category = new Category('artigianato');
      // mock exists() => false
      pool.query.mockResolvedValueOnce({ rows: [{ count: 0 }] }); // per exists
      pool.query.mockResolvedValueOnce({}); // per insert

      const result = await category.save();
      expect(pool.query).toHaveBeenCalledTimes(2);
      expect(result).toBe(true);
    });

    it('non salva la categoria se già esistente', async () => {
      const category = new Category('artigianato');
      pool.query.mockResolvedValueOnce({ rows: [{ count: 1 }] }); // exists = true

      const result = await category.save();
      expect(result).toBe(false);
    });

    it('lancia errore se categoria è null', async () => {
      const category = new Category(null);
      await expect(category.save()).rejects.toThrow(CategoryError);
    });
  });

  describe('update()', () => {
    it('aggiorna il nome della categoria', async () => {
      const category = new Category('cucito');
      pool.query.mockResolvedValueOnce({ rows: [{ count: 1 }] }); // exists = true
      pool.query.mockResolvedValueOnce({}); // update

      const result = await category.update('ricamo');
      expect(result).toBe(true);
      expect(category.categoria).toBe('RICAMO');
    });

    it('lancia errore se categoria non esiste', async () => {
      const category = new Category('inesistente');
      pool.query.mockResolvedValueOnce({ rows: [{ count: 0 }] }); // exists = false

      await expect(category.update('nuovo')).rejects.toThrow('Category does not exist');
    });
  });

  describe('delete()', () => {
    it('elimina una categoria con successo', async () => {
      const category = new Category('ceramica');
      pool.query.mockResolvedValueOnce({}); // delete

      const result = await category.delete();
      expect(result).toBe(true);
    });

    it('ritorna false se la cancellazione fallisce', async () => {
      const category = new Category('ceramica');
      pool.query.mockRejectedValueOnce(new Error('Errore DB'));

      const result = await category.delete();
      expect(result).toBe(false);
    });
  });

  describe('exists()', () => {
    it('ritorna true se categoria esiste', async () => {
      const category = new Category('vetro');
      pool.query.mockResolvedValueOnce({ rows: [{ count: 1 }] });

      const result = await category.exists();
      expect(result).toBe(true);
    });

    it('ritorna false se categoria non esiste', async () => {
      const category = new Category('vetro');
      pool.query.mockResolvedValueOnce({ rows: [{ count: 0 }] });

      const result = await category.exists();
      expect(result).toBe(false);
    });

    it('ritorna true se categoria è null', async () => {
      const category = new Category(null);
      const result = await category.exists();
      expect(result).toBe(true);
    });
  });

  describe('getAll()', () => {
    it('ritorna tutte le categorie in uppercase', async () => {
      pool.query.mockResolvedValueOnce({ rows: [{ categoria: 'CUCITO' }, { categoria: 'LEGNO' }] });

      const result = await Category.getAll();
      expect(result).toEqual(['CUCITO', 'LEGNO']);
    });

    it('lancia errore se la query fallisce', async () => {
      pool.query.mockRejectedValueOnce(new Error('DB error'));

      await expect(Category.getAll()).rejects.toThrow(CategoryError);
    });
  });
});
