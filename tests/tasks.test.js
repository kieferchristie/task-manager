const request = require('supertest');
const app = require('../app');
const { connect, clearDatabase, closeDatabase } = require('./setup');

describe('Task Routes', () => {
  let token;
  let userId;

  beforeAll(async () => {
      await connect();

      const res = await request(app)
          .post('/api/auth/register')
          .send({
              username: `uniqueuser_${Date.now()}`,
              password: 'password123'
          });

      token = res.body.token;
      userId = res.body.user._id;
      console.log('Task Test: User registered and token generated');
      console.log('Task Test: Captured token:', token);
      console.log('Task Test: Captured userId:', userId);
  });

  afterEach(async () => {
      await clearDatabase();  // Clear the database after each test
  });

  afterAll(async () => {
      await closeDatabase();
  });

  test('Create a new task', async () => {
      const res = await request(app)
          .post('/api/tasks')
          .set('Authorization', `Bearer ${token}`)
          .send({
              title: 'New Task',
              description: 'Task description',
              userId
          });

      console.log('Task Creation Test: Status code:', res.statusCode);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
  });
});
