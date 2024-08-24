import { FastifyReply, FastifyRequest } from "fastify";

export function errorHandler(error: any, request: FastifyRequest, reply: FastifyReply) {
  console.log(error);
  return reply.code(500).send(error);
}
