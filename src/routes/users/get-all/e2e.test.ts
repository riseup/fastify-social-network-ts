import { FastifyInstance } from 'fastify';
import { app } from '../../../core/app';
import { User } from '../../../entity/user';

describe('Get All Users Endpoint', () => {
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

  it('should get all users with default pagination', async () => {
    // Create some test users
    const userRepository = server.dataSource.getRepository(User);
    await userRepository.save([
      { name: 'User 1', email: 'user1@example.com', password: 'password1' },
      { name: 'User 2', email: 'user2@example.com', password: 'password2' },
      { name: 'User 3', email: 'user3@example.com', password: 'password3' }
    ]);

    const response = await server.inject({
      method: 'GET',
      url: '/users'
    });

    expect(response.statusCode).toBe(200);
    const users = JSON.parse(response.payload);
    expect(users).toHaveLength(3);
  });

  it('should get users with custom pagination', async () => {
    // Create some test users
    const userRepository = server.dataSource.getRepository(User);
    await userRepository.save([
      { name: 'User 1', email: 'user1@example.com', password: 'password1' },
      { name: 'User 2', email: 'user2@example.com', password: 'password2' },
      { name: 'User 3', email: 'user3@example.com', password: 'password3' }
    ]);

    const response = await server.inject({
      method: 'GET',
      url: '/users',
      query: {
        page: '2',
        limit: '1'
      }
    });

    expect(response.statusCode).toBe(200);
    const users = JSON.parse(response.payload);
    expect(users).toHaveLength(1);
    expect(users[0].name).toBe('User 2');
  });

  it('should get users with selected fields', async () => {
    // Create some test users
    const userRepository = server.dataSource.getRepository(User);
    await userRepository.save([
      { name: 'User 1', email: 'user1@example.com', password: 'password1' },
      { name: 'User 2', email: 'user2@example.com', password: 'password2' }
    ]);

    const response = await server.inject({
      method: 'GET',
      url: '/users',
      query: {
        fields: 'id,name'
      }
    });

    expect(response.statusCode).toBe(200);
    const users = JSON.parse(response.payload);
    expect(users).toHaveLength(2);
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).not.toHaveProperty('email');
  });

  it('should return 400 if page is less than 1', async () => {
    // Simulate an internal error by sending a request with invalid data
    const response = await server.inject({
      method: 'GET',
      url: '/users',
      query: {
        page: '-1'
      }
    });

    expect(response.statusCode).toBe(400);
    const error = JSON.parse(response.payload);
    expect(error.message).toBe('querystring/page must be >= 1');
  });
});
