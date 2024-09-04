import { FastifyReply, FastifyRequest } from 'fastify';

export function notFoundHandler(request: FastifyRequest, reply: FastifyReply) {
  return reply.code(404).send('Not found');
}
