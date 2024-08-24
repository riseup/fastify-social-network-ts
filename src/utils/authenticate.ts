import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastifyJwt from '@fastify/jwt';

export const authenticate = (server: FastifyInstance) => {
  server.register(fastifyJwt, server.config.jwt);

  server.addHook('preHandler', async (req: FastifyRequest, reply: FastifyReply) => {
    req.jwt = server.jwt
  });

  server.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (e) {
      return reply.send(e);
    }
  });
};
