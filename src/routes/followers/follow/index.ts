import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { User } from './../../../entity/user';
import { EntityManager } from 'typeorm';
import { followSchema } from './schema';

async function follow(fastify: FastifyInstance) {

  const handler = async (request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) => {
    const entityManager: EntityManager = fastify.dataSource.manager;

    try {
      const userId = request.params.id;
      const currentUser = request.user;

      // Verificar si el usuario existe
      const user = await entityManager.findOne(User, { where: { id: userId } });
      if (!user) {
        return reply.code(404).send({ message: 'User not found' });
      }

      // Añadir al usuario actual a la lista de seguidores del usuario objetivo
      await entityManager
        .createQueryBuilder()
        .relation(User, 'followers')
        .of(user)
        .add(currentUser);

      reply.code(204).send();
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({ message: 'Internal Server Error' });
    }
  }
  fastify.post('/:id/follow', {
    schema: followSchema,
    preValidation: [fastify.authenticate]
  }, handler);
}

export default follow