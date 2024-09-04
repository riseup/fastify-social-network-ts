import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { Post } from './../../../entity/post';
import { EntityManager } from 'typeorm';
import { getPostSchema } from './schema';

async function getPost(server: FastifyInstance) {
  const handler = async (
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) => {
    const entityManager: EntityManager = server.dataSource.manager;

    try {
      const postId = request.params.id;

      // Buscar el post por ID
      const post = await entityManager.findOne(Post, { where: { id: postId } });
      if (!post) {
        return reply.code(404).send({ message: 'Post not found' });
      }

      reply.code(200).send(post);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({ message: 'Internal Server Error' });
    }
  };

  server.get(
    '/:id',
    {
      schema: getPostSchema,
      preValidation: [server.authenticate]
    },
    handler
  );
}

export default getPost;
