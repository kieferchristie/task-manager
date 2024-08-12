const { connect, clearDatabase, closeDatabase } = require('./setup');
const User = require('../models/User');

describe('User Model', () => {
    beforeAll(async () => {
        await connect();
    });

    afterAll(async () => {
        await clearDatabase();
        await closeDatabase();
    });

    test('Create & save a user successfully', async () => {
        const userData = { username: `testuser_${Date.now()}`, password: 'password123' };
        const validUser = new User(userData);
        const savedUser = await validUser.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe(userData.username);
    });

    test('Insert user with invalid field', async () => {
        const invalidUser = new User({ username: `testuser_${Date.now()}`, password: null });
        let err;
        try {
            await invalidUser.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(Error);
        expect(err.errors.password).toBeDefined();
    });

    test('Create user without required field should fail', async () => {
        const userWithoutRequiredField = new User({ username: `testuser_${Date.now()}` });
        let err;
        try {
            await userWithoutRequiredField.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(Error);
        expect(err.errors.password).toBeDefined();
    });
});
