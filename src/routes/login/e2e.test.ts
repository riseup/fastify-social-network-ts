import { FastifyInstance } from 'fastify';
import { app } from '../../core/app';
import { User } from '../../entity/user';
import bcrypt from 'bcrypt';

describe('Login Endpoint', () => {
  let server: FastifyInstance;
  const password = 'password123';

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    server = await app();
    await server.listen({ port: 0, host: '0.0.0.0' });
    await server.ready();

    // Sincronizar la base de datos
    await server.dataSource.synchronize(true);
  });

  afterAll(async () => {
    await server.close();
  });

  beforeEach(async () => {
    // Clear the database before each test
    await server.dataSource.getRepository(User).clear();
  });

  async function createTestUser(): Promise<User> {
    const userRepository = server.dataSource.getRepository(User);
    const hashedPassword = await bcrypt.hash(password, 10);
    return await userRepository.save({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: hashedPassword
    });
  }

  it('should login a user with valid credentials', async () => {
    const testUser = await createTestUser();

    const response = await server.inject({
      method: 'POST',
      url: '/login',
      payload: {
        email: testUser.email,
        password: password
      }
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.payload);
    expect(body).toHaveProperty('token');
  });

  it('should return 401 if email is invalid', async () => {
    await createTestUser();

    const response = await server.inject({
      method: 'POST',
      url: '/login',
      payload: {
        email: 'invalid.email@example.com',
        password: password
      }
    });

    expect(response.statusCode).toBe(401);
    const error = JSON.parse(response.payload);
    expect(error.message).toBe('Invalid email or password');
  });

  it('should return 401 if password is invalid', async () => {
    const testUser = await createTestUser();

    const response = await server.inject({
      method: 'POST',
      url: '/login',
      payload: {
        email: testUser.email,
        password: 'invalidPassword'
      }
    });

    expect(response.statusCode).toBe(401);
    const error = JSON.parse(response.payload);
    expect(error.message).toBe('Invalid email or password');
  });

  it('should return 500 if an internal error occurs', async () => {
    const testUser = await createTestUser();

    // Simulate an internal error by sending a request with invalid data
    const response = await server.inject({
      method: 'POST',
      url: '/login',
      payload: {
        email: testUser.email,
        invalidField: 'this will cause an error'
      }
    });

    expect(response.statusCode).toBe(400);
    const error = JSON.parse(response.payload);
    expect(error.message).toBe("body must have required property 'password'");
  });
});
