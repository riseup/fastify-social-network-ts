import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { Like } from './../../entity/like';
import { EntityManager } from 'typeorm';
import { likeSchema } from './schema';
import { Post } from '../../entity/post';
import { User } from '../../entity/user';

async function likes(server: FastifyInstance) {
  const handler = async (
    request: FastifyRequest<{ Params: { postId: number } }>,
    reply: FastifyReply
  ) => {
    const entityManager: EntityManager = server.dataSource.manager;

    try {
      const postId = request.params.postId;
      const user = request.user;

      // Verificar si el post existe
      const postExists = await entityManager.findOne(Post, {
        where: { id: postId }
      });
      if (!postExists) {
        return reply.code(404).send({ message: 'Post not found' });
      }

      // Crear el like
      const like = entityManager.create(Like, {
        user: user as User,
        post: { id: postId }
      });

      // Guardar el like
      await entityManager.save(like);

      reply.code(201).send(like);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({ message: 'Internal Server Error' });
    }
  };

  server.post(
    '/:postId/like',
    {
      schema: likeSchema,
      preValidation: [server.authenticate]
    },
    handler
  );
}

export default likes;
