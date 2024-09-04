import { FastifyInstance } from 'fastify';
import { app } from '../../../core/app';
import { User } from '../../../entity/user';

describe('Get User Endpoint', () => {
  let server: FastifyInstance;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    server = await app();
    await server.listen({ port: 0, host: '0.0.0.0' });
    await server.ready();
  });

  afterAll(async () => {
    await server.close();
  });

  beforeEach(async () => {
    // Clear the database before each test
    await server.dataSource.getRepository(User).clear();
  });

  it('should get a user by ID', async () => {
    // Create a test user
    const userRepository = server.dataSource.getRepository(User);
    const user = await userRepository.save({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    });

    const response = await server.inject({
      method: 'GET',
      url: `/users/${user.id}`
    });

    expect(response.statusCode).toBe(200);
    const retrievedUser = JSON.parse(response.payload);
    expect(retrievedUser.id).toBe(user.id);
    expect(retrievedUser.name).toBe(user.name);
    expect(retrievedUser.email).toBe(user.email);
  });

  it('should return 404 if user is not found', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/users/9999' // Non-existent user ID
    });

    expect(response.statusCode).toBe(404);
    const error = JSON.parse(response.payload);
    expect(error.message).toBe('User not found');
  });

  it('should return 400 if user ID is invalid', async () => {
    // Simulate an internal error by sending a request with invalid data
    const response = await server.inject({
      method: 'GET',
      url: '/users/invalid' // Invalid user ID
    });

    expect(response.statusCode).toBe(400);
    const error = JSON.parse(response.payload);
    expect(error.message).toBe('params/id must be number');
  });
});
