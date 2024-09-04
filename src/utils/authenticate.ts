import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastifyJwt, { JWT } from '@fastify/jwt';

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authenticate: any;
  }
}

export const authenticate = (server: FastifyInstance) => {
  server.register(fastifyJwt, server.config.jwt);

  server.addHook('preHandler', async (req: FastifyRequest) => {
    req.jwt = server.jwt;
  });

  server.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (e) {
        return reply.send(e);
      }
    }
  );
};
