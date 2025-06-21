const {
    ArtisanAuthentication,
    ClientAuthentication,
    AdminAuthentication,
    AuthenticationError
} = require('./authentication.js');

// Mock the dependencies
jest.mock('./hash.js');
jest.mock('./jwt.js');
jest.mock('../db/dbReferences.js');
jest.mock('../db/dbConnection.js');

const { verifyPassword } = require('./hash.js');
const { genArtisanJWT, genClientJWT, genAdminJWT } = require('./jwt.js');
const { dbArtisanReferences, dbClientReferences, dbAdminReferences } = require('../db/dbReferences.js');
const { pool } = require('../db/dbConnection.js');

describe('Authentication Classes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        
        // Mock database references
        dbArtisanReferences.mockImplementation(() => ({
            dbTableName: 'artigiani',
            dbUsername: 'username_artigiano',
            dbPassword: 'h_password'
        }));
        
        dbClientReferences.mockImplementation(() => ({
            dbTableName: 'clienti',
            dbUsername: 'username_clienti',
            dbPassword: 'h_password'
        }));
        
        dbAdminReferences.mockImplementation(() => ({
            dbTableName: 'amministratori',
            dbUsername: 'username_amministratore',
            dbPassword: 'h_password'
        }));
        
        // Mock pool.query default behavior
        pool.query = jest.fn();
    });

    describe('ArtisanAuthentication', () => {
        let artisanAuth;
        const mockUsername = 'testArtisan';
        const mockPassword = 'testPassword123';
        const mockHashedPassword = '$2b$10$hashedpassword';
        const mockJWT = 'mock.jwt.token';

        beforeEach(() => {
            artisanAuth = new ArtisanAuthentication(mockUsername, mockPassword);
        });

        test('should create ArtisanAuthentication instance with correct properties', () => {
            expect(artisanAuth.username).toBe(mockUsername);
            expect(artisanAuth.password).toBe(mockPassword);
            expect(artisanAuth.storedPassword).toBe(null);
            expect(ArtisanAuthentication.type).toBe('artigiano');
        });

        test('should successfully authenticate and login', async () => {
            // Mock successful database query
            pool.query.mockResolvedValue({
                rows: [{ password_hash: mockHashedPassword }]
            });
            
            // Mock successful password verification
            verifyPassword.mockResolvedValue(true);
            
            // Mock JWT generation
            genArtisanJWT.mockResolvedValue(mockJWT);

            const token = await artisanAuth.login();

            expect(genArtisanJWT).toHaveBeenCalledWith(mockUsername);
            expect(token).toBe(mockJWT);
        });

        test('should throw AuthenticationError when username does not exist', async () => {
            pool.query.mockResolvedValue({ rows: [] });

            await expect(artisanAuth.login()).rejects.toThrow(AuthenticationError);
            await expect(artisanAuth.login()).rejects.toThrow('Username does not exist');
        });

        test('should throw AuthenticationError when password is wrong', async () => {
            pool.query.mockResolvedValue({
                rows: [{ password_hash: mockHashedPassword }]
            });
            verifyPassword.mockRejectedValue(new Error('Password verification failed'));

            await expect(artisanAuth.login()).rejects.toThrow(AuthenticationError);
            await expect(artisanAuth.login()).rejects.toThrow('Wrong password');
        });

        test('should call verifyPW method correctly', async () => {
            artisanAuth.storedPassword = mockHashedPassword;
            verifyPassword.mockResolvedValue(true);

            await artisanAuth.verifyPW();

            expect(verifyPassword).toHaveBeenCalledWith(mockPassword, mockHashedPassword);
        });
    });

    describe('ClientAuthentication', () => {
        let clientAuth;
        const mockUsername = 'testClient';
        const mockPassword = 'testPassword123';
        const mockHashedPassword = '$2b$10$hashedpassword';
        const mockJWT = 'mock.client.jwt.token';

        beforeEach(() => {
            clientAuth = new ClientAuthentication(mockUsername, mockPassword);
        });

        test('should create ClientAuthentication instance with correct properties', () => {
            expect(clientAuth.username).toBe(mockUsername);
            expect(clientAuth.password).toBe(mockPassword);
            expect(clientAuth.storedPassword).toBe(null);
            expect(ClientAuthentication.type).toBe('cliente');
        });

        test('should successfully authenticate and login', async () => {
            pool.query.mockResolvedValue({
                rows: [{ password_hash: mockHashedPassword }]
            });
            verifyPassword.mockResolvedValue(true);
            genClientJWT.mockResolvedValue(mockJWT);

            const token = await clientAuth.login();
            expect(genClientJWT).toHaveBeenCalledWith(mockUsername);
            expect(token).toBe(mockJWT);
        });

        test('should generate JWT using getJWT method', async () => {
            genClientJWT.mockResolvedValue(mockJWT);

            const token = await clientAuth.getJWT();

            expect(genClientJWT).toHaveBeenCalledWith(mockUsername);
            expect(token).toBe(mockJWT);
        });
    });

    describe('AdminAuthentication', () => {
        let adminAuth;
        const mockUsername = 'testAdmin';
        const mockPassword = 'testPassword123';
        const mockHashedPassword = '$2b$10$hashedpassword';
        const mockJWT = 'mock.admin.jwt.token';

        beforeEach(() => {
            adminAuth = new AdminAuthentication(mockUsername, mockPassword);
        });

        test('should create AdminAuthentication instance with correct properties', () => {
            expect(adminAuth.username).toBe(mockUsername);
            expect(adminAuth.password).toBe(mockPassword);
            expect(adminAuth.storedPassword).toBe(null);
            expect(AdminAuthentication.type).toBe('amministratore');
        });

        test('should successfully authenticate and login', async () => {
            pool.query.mockResolvedValue({
                rows: [{ password_hash: mockHashedPassword }]
            });
            verifyPassword.mockResolvedValue(true);
            genAdminJWT.mockResolvedValue(mockJWT);

            const token = await adminAuth.login();
            expect(genAdminJWT).toHaveBeenCalledWith(mockUsername);
            expect(token).toBe(mockJWT);
        });

        test('should generate JWT using getJWT method', async () => {
            genAdminJWT.mockResolvedValue(mockJWT);

            const token = await adminAuth.getJWT();

            expect(genAdminJWT).toHaveBeenCalledWith(mockUsername);
            expect(token).toBe(mockJWT);
        });
    });

    describe('AuthenticationError', () => {
        test('should create AuthenticationError with correct message and name', () => {
            const errorMessage = 'Test authentication error';
            const error = new AuthenticationError(errorMessage);

            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe(errorMessage);
            expect(error.name).toBe('AuthenticationError');
        });
    });

    describe('Database Query Error Handling', () => {
        test('should handle database connection errors', async () => {
            const artisanAuth = new ArtisanAuthentication('testUser', 'testPass');
            const dbError = new Error('Database connection failed');
            
            pool.query.mockRejectedValue(dbError);

            await expect(artisanAuth.checkUsername()).rejects.toThrow(dbError);
        });
    });

    describe('Integration Tests', () => {
        test('should handle complete authentication flow for all user types', async () => {
            const mockHashedPassword = '$2b$10$hashedpassword';
            const users = [
                { 
                    auth: new ArtisanAuthentication('artisan1', 'pass123'),
                    jwtMock: genArtisanJWT,
                    expectedTable: 'artigiani'
                },
                { 
                    auth: new ClientAuthentication('client1', 'pass123'),
                    jwtMock: genClientJWT,
                    expectedTable: 'clienti'
                },
                { 
                    auth: new AdminAuthentication('admin1', 'pass123'),
                    jwtMock: genAdminJWT,
                    expectedTable: 'amministratori'
                }
            ];

            for (const user of users) {
                // Reset mocks for each user
                jest.clearAllMocks();
                
                pool.query.mockResolvedValue({
                    rows: [{ password_hash: mockHashedPassword }]
                });
                verifyPassword.mockResolvedValue(true);
                user.jwtMock.mockResolvedValue('mock.jwt.token');

                const token = await user.auth.login();

                expect(token).toBe('mock.jwt.token');
            }
        });
    });
});
