const bcrypt = require('bcrypt');

describe('Password Hashing and Comparison', () => {
    test('should hash password and validate it correctly', async () => {
        const password = 'password123';
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password:', hashedPassword);

        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        console.log('Password validation:', isPasswordValid);
        expect(isPasswordValid).toBe(true);
    });

    test('should fail validation with incorrect password', async () => {
        const password = 'password123';
        const wrongPassword = 'wrongPassword123';
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password:', hashedPassword);

        const isPasswordValid = await bcrypt.compare(wrongPassword, hashedPassword);
        console.log('Password validation with wrong password:', isPasswordValid);
        expect(isPasswordValid).toBe(false);
    });
});
