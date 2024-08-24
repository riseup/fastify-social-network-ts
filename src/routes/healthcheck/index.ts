import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { healthCheckSchema } from './schema';

async function healthCheckRoute(server: FastifyInstance) {
  const handler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // const dataSource = server.dataSource;
      // await dataSource.query('SELECT 1');      
      reply.code(200).send({ status: 'OK' });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({ message: 'Internal Server Error' });
    }
  }

  server.get('/healthcheck', { schema: healthCheckSchema }, handler);
}

export default healthCheckRoute;