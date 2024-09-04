import { FastifyInstance } from 'fastify';
import { app } from '../../../core/app';

describe('Create User Endpoint', () => {
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

  it('should create a new user', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/users',
      payload: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      }
    });

    expect(response.statusCode).toBe(201);
    const user = JSON.parse(response.payload);
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john.doe@example.com');
  });

  it('should return 400 if validation fails', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/users',
      payload: {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'pass'
      }
    });

    expect(response.statusCode).toBe(400);
    const error = JSON.parse(response.payload);
    expect(error.message).toBe('body/email must match format "email"');
  });

  it('should return 500 if an internal error occurs', async () => {
    // Simulate an internal error by sending a request with invalid data
    const response = await server.inject({
      method: 'POST',
      url: '/users',
      payload: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        invalidField: 'this will cause an error'
      }
    });

    expect(response.statusCode).toBe(500);
    const error = JSON.parse(response.payload);
    expect(error.message).toBe('Internal Server Error');
  });
});
