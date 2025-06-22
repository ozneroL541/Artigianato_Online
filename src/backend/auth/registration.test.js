const { ClientRegistration, RegistrationError } = require('./registration.js');
const { pool } = require('../db/dbConnection.js');
const { hashPassword } = require('./hash.js');
const { dbClientReferences } = require('../db/dbReferences.js');

// Mock dependencies
jest.mock('../db/dbConnection', () => ({
    pool: {
        query: jest.fn(),
    },
}));
jest.mock('./hash', () => ({
    hashPassword: jest.fn(),
}));

// Import Registration after mocks

describe('Registration', () => {
    let registration;

    beforeEach(() => {
        registration = new ClientRegistration('testuser', 'testpass', 'mock@mail.com', 'User', 'Test');
        jest.clearAllMocks();
    });

    describe('constructor', () => {
        it('should initialize properties correctly', () => {
            expect(registration.username).toBe('testuser');
            expect(registration.password).toBe('testpass');
            expect(registration.hashedPassword).toBeNull();
        });
    });

    describe('hashPW', () => {
        it('should hash the password and set hashedPassword', async () => {
            hashPassword.mockResolvedValue('hashedValue');
            await registration.hashPW();
            expect(hashPassword).toHaveBeenCalledWith('testpass');
            expect(registration.hashedPassword).toBe('hashedValue');
        });

        it('should throw and log error if hashing fails', async () => {
            const error = new Error('Hash failed');
            hashPassword.mockRejectedValue(error);
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            await expect(registration.hashPW()).rejects.toThrow(error);
            expect(consoleSpy).toHaveBeenCalledWith('Error hashing password:', 'testuser');
            expect(consoleSpy).toHaveBeenCalledWith(error);
            consoleSpy.mockRestore();
        });
    });

    describe('checkUsername', () => {
        it('should not throw if username does not exist', async () => {
            pool.query.mockResolvedValue({ rows: [] });
            await expect(registration.checkUsername()).resolves.toBeUndefined();
            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM clienti WHERE username_cliente = $1',
                ['testuser']
            );
        });

        it('should throw RegistrationError if username exists', async () => {
            pool.query.mockResolvedValue({ rows: [{ username: 'testuser' }] });
            await expect(registration.checkUsername()).rejects.toThrow(RegistrationError);
            await expect(registration.checkUsername()).rejects.toThrow('Username already exists');
        });
    });

    describe('register', () => {
        it('should call allChecks and save', async () => {
            registration.allChecks = jest.fn().mockResolvedValue();
            registration.save = jest.fn().mockResolvedValue();
            await registration.register();
            expect(registration.allChecks).toHaveBeenCalled();
            expect(registration.save).toHaveBeenCalled();
        });

        it('should throw if allChecks fails', async () => {
            registration.allChecks = jest.fn().mockRejectedValue(new RegistrationError('fail'));
            registration.save = jest.fn();
            await expect(registration.register()).rejects.toThrow('fail');
            expect(registration.save).not.toHaveBeenCalled();
        });

        it('should throw if save fails', async () => {
            registration.allChecks = jest.fn().mockResolvedValue();
            registration.save = jest.fn().mockRejectedValue(new RegistrationError('fail-save'));
            await expect(registration.register()).rejects.toThrow('fail-save');
        });
    });
});
