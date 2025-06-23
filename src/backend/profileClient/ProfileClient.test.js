const { ProfileClient, PassWord, Email } = require('../path/to/ProfileClient.js');
const { pool } = require('../db/dbConnection.js');

jest.mock('../db/dbConnection.js', () => ({
  pool: {
    query: jest.fn()
  }
}));

describe('ProfileClient', () => {
  afterEach(() => jest.clearAllMocks());

  it('getBuyProducts() restituisce i prodotti acquistati', async () => {
    const mockData = [{ nameProduct: 'Prodotto A', productId: 1, Quantity: 2 }];
    pool.query.mockResolvedValueOnce({ rows: mockData });

    const profile = new ProfileClient('user1');
    const result = await profile.getBuyProducts();

    expect(pool.query).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });

  it('getBuyProducts() lancia errore in caso di fallimento', async () => {
    pool.query.mockRejectedValueOnce(new Error('Errore DB'));

    const profile = new ProfileClient('user1');

    await expect(profile.getBuyProducts()).rejects.toThrow('Failed to retrieve purchased products from the database');
  });
});

describe('PassWord', () => {
  it('resetPassword() aggiorna la password', async () => {
    pool.query.mockResolvedValueOnce({ rowCount: 1 });

    const pass = new PassWord('user1');
    const result = await pass.resetPassword('newPass123');

    expect(pool.query).toHaveBeenCalled();
    expect(result).toEqual({ message: 'Password updated successfully' });
  });

  it('resetPassword() lancia errore se utente non trovato', async () => {
    pool.query.mockResolvedValueOnce({ rowCount: 0 });

    const pass = new PassWord('user1');
    await expect(pass.resetPassword('newPass123')).rejects.toThrow('No cliente found with the given username');
  });
});

describe('Email', () => {
  it('ResetMail() aggiorna la mail', async () => {
    pool.query.mockResolvedValueOnce({ rowCount: 1 });

    const mail = new Email('user1');
    const result = await mail.ResetMail('new@email.com');

    expect(pool.query).toHaveBeenCalled();
    expect(result).toEqual({ message: 'Mail updated successfully' });
  });

  it('ResetMail() lancia errore se utente non trovato', async () => {
    pool.query.mockResolvedValueOnce({ rowCount: 0 });

    const mail = new Email('user1');
    await expect(mail.ResetMail('new@email.com')).rejects.toThrow('No cliente found with the given username');
  });
});