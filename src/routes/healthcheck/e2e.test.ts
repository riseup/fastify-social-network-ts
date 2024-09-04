import { FastifyInstance } from 'fastify';
import { app } from '../../core/app';

describe('Healthcheck Endpoint', () => {
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

  it('should return 200 and "OK" message', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/healthcheck'
    });

    expect(response.statusCode).toBe(200);
    const healthcheck = JSON.parse(response.payload);
    expect(healthcheck.status).toBe('OK');
  });
});