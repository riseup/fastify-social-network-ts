import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { User } from './../../../entity/user';
import { EntityManager } from 'typeorm';
import { unfollowSchema } from './schema';

async function unfollow(server: FastifyInstance) {
  const handler = async (
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) => {
    const entityManager: EntityManager = server.dataSource.manager;

    try {
      const userId = request.params.id;
      const currentUser = request.user;

      // Verificar si el usuario existe
      const user = await entityManager.findOne(User, { where: { id: userId } });
      if (!user) {
        return reply.code(404).send({ message: 'User not found' });
      }

      // Eliminar al usuario actual de la lista de seguidores del usuario objetivo
      await entityManager
        .createQueryBuilder()
        .relation(User, 'followers')
        .of(user)
        .remove(currentUser);

      reply.code(204).send();
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({ message: 'Internal Server Error' });
    }
  };
  server.post(
    '/:id/unfollow',
    {
      schema: unfollowSchema,
      preValidation: [server.authenticate]
    },
    handler
  );
}

export default unfollow;
