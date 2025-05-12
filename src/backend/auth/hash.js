import argon2 from 'argon2';

/**
 * Hash a password using argon2
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} - The hashed password.
 * @async
 * @throws {Error} - If hashing fails.
 */
async function hashPassword(password) {
    try {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
    } catch (err) {
        console.error('Error hashing password:', err);
        throw new Error('Error during password hashing');
    }
}

/**
 * Verify a password against a hashed password using argon2
 * @param {string} password - The password to verify.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} - True if the password matches, false otherwise.
 * @async
 * @throws {Error} - If verification fails.
 */
async function verifyPassword(password, hashedPassword) {
    try {
        const isValid = await argon2.verify(hashedPassword, password);
        return isValid;
    } catch (err) {
        console.error('Error verifying password:', err);
        throw new Error('Error during password verification');
    }
}
