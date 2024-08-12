const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');  // Assuming you have an 'app.js' exporting your Express app

jest.setTimeout(30000); // Increase the timeout for long-running tests

let server;
let mongoServer;

beforeAll(async () => {
    // Start MongoMemoryServer before all tests
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    
    // Connect to the in-memory database
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Start the server
    server = app.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
});

afterAll(async () => {
    // Close the server and MongoDB connection after all tests
    if (server && server.close) {
        await new Promise((resolve) => server.close(resolve));
    }
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

test('Register a new user', async () => {
    const userData = { username: 'uniqueuser_1723415971104', password: 'password123' };
    const user = new User(userData);
    await user.save();
    const savedUser = await User.findOne({ username: userData.username });

    const isMatch = await bcrypt.compare('password123', savedUser.password);
    expect(isMatch).toBe(true);
});

test('Login a user', async () => {
    const userData = { username: 'uniqueuser_1723415971104', password: 'password123' };

    const user = await User.findOne({ username: userData.username });
    if (!user) {
        throw new Error(`User not found for username: ${userData.username}`);
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);
    expect(isMatch).toBe(true);
});
