import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../../../entity/user';
import { FindManyOptions } from 'typeorm';
import { schema } from './schema';

async function getAllUsers(fastify: FastifyInstance) {

  const handler = async (request: FastifyRequest<{ Querystring: { page?: number, limit?: number, fields?: string } }>, reply: FastifyReply) => {
    try {
      const { page = 1, limit = 10, fields } = request.query;
      const userRepository = fastify.dataSource.getRepository(User);

      const options: FindManyOptions<User> = {
        skip: (page - 1) * limit,
        take: limit
      };

      if (fields) {
        options.select = fields.split(',').reduce((acc, field) => {
          acc[field.trim() as keyof User] = true;
          return acc;
        }, {} as Partial<Record<keyof User, boolean>>);
      }

      const users = await userRepository.find(options);
      reply.code(200).send(users);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({ message: 'Internal Server Error' });
    }
  }

  fastify.get('/', { schema: schema }, handler);
}

export default getAllUsers