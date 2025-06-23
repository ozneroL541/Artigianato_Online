const{ DeleteClient, DeleteArtisan, DeleteAdmin } =require ('./Delete.js');
const { pool }=require('../db/dbConnection.js');

// Mock del pool
jest.mock('../db/dbConnection.js', () => ({
  pool: {
    query: jest.fn()
  }
}));

// Mock delle classi di riferimento DB
class MockClientRef {
  dbTableName = 'clienti';
  dbUsername = 'username_cliente';
}

class MockArtisanRef {
  dbTableName = 'artigiani';
  dbUsername = 'username_artigiano';
}

class MockAdminRef {
  dbTableName = 'admin';
  dbUsername = 'username_admin';
}

// Override dei riferimenti usati nel modulo originale
jest.mock('../db/dbReferences.js', () => ({
  dbClientReferences: MockClientRef,
  dbArtisanReferences: MockArtisanRef,
  dbAdminReferences: MockAdminRef,
}));

describe('DeleteProfile subclasses', () => {
  afterEach(() => jest.clearAllMocks());

  it('DeleteClient esegue correttamente la DELETE', async () => {
    pool.query.mockResolvedValueOnce({});

    const deleter = new DeleteClient('clientUser');
    await deleter.delete();

    expect(pool.query).toHaveBeenCalledWith(
      'DELETE FROM clienti\n                       WHERE username_cliente = $1',
      ['clientUser']
    );
  });

  it('DeleteArtisan esegue correttamente la DELETE', async () => {
    pool.query.mockResolvedValueOnce({});

    const deleter = new DeleteArtisan('artisanUser');
    await deleter.delete();

    expect(pool.query).toHaveBeenCalledWith(
      'DELETE FROM artigiani\n                       WHERE username_artigiano = $1',
      ['artisanUser']
    );
  });

  it('DeleteAdmin esegue correttamente la DELETE', async () => {
    pool.query.mockResolvedValueOnce({});

    const deleter = new DeleteAdmin('adminUser');
    await deleter.delete();

    expect(pool.query).toHaveBeenCalledWith(
      'DELETE FROM admin\n                       WHERE username_admin = $1',
      ['adminUser']
    );
  });

  it('Gestisce correttamente un errore DB', async () => {
    pool.query.mockRejectedValueOnce(new Error('Errore DB'));

    const deleter = new DeleteClient('clientUser');
    await expect(deleter.delete()).rejects.toThrow('Errore DB');
  });
});
