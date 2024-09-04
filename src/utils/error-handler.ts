import { FastifyReply, FastifyRequest } from 'fastify';

export function errorHandler(
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply
) {
  // console.log(error);
  return reply.code(500).send(error);
}
