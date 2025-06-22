const { Segnala } = require('./Report.js');
const { pool }=require('../db/dbConnection.js');

jest.mock('../db/dbConnection.js', () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe('Segnala class', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('newReport()', () => {
    it('should insert a new report and return success message', async () => {
      pool.query.mockResolvedValueOnce({});

      const report = new Report(null, 1, null, 'Segnalazione test', false);
      const result = await report.newReport();

      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ message: 'Report inserted successfully' });
    });

    it('should throw an error if insert fails', async () => {
      pool.query.mockRejectedValueOnce(new Error('DB error'));

      const report = new Report(null, 1, null, 'Errore DB', false);

      await expect(report.newReport()).rejects.toThrow('Failed to insert report into the database');
    });
  });

  describe('getReports()', () => {
    it('should return rows from the query result', async () => {
      const mockRows = [{ id_segnalazione: 1, descrizione: 'Test' }];
      pool.query.mockResolvedValueOnce({ rows: mockRows });

      const result = await Report.getReports();

      expect(pool.query).toHaveBeenCalledWith(expect.stringContaining('SELECT *'), undefined);
      expect(result).toEqual(mockRows);
    });

    it('should throw an error if query fails', async () => {
      pool.query.mockRejectedValueOnce(new Error('Query error'));

      await expect(Report.getReports()).rejects.toThrow('Failed to fetch reports from the database');
    });
  });

  describe('solveReport()', () => {
    it('should update a report as solved', async () => {
      pool.query.mockResolvedValueOnce({});

      const result = await Report.solveReport(123);

      expect(pool.query).toHaveBeenCalledWith(expect.stringContaining('UPDATE'), [123]);
      expect(result).toEqual({ message: 'Report marked as solved successfully' });
    });

    it('should throw an error if update fails', async () => {
      pool.query.mockRejectedValueOnce(new Error('Update error'));

      await expect(Segnala.solveReport(123)).rejects.toThrow('Failed to mark report as solved in the database');
    });
  });
});
