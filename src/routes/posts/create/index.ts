import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { Post } from './../../../entity/post';
import { EntityManager } from 'typeorm';
import { postSchema } from './schema';
import { User } from '../../../entity/user';

async function createPost(server: FastifyInstance) {
  const handler = async (
    request: FastifyRequest<{ Body: { content: string } }>,
    reply: FastifyReply
  ) => {
    const entityManager: EntityManager = server.dataSource.manager;

    try {
      const content = request.body.content;
      const user = request.user as User;

      // Crear el post
      const post = entityManager.create(Post, {
        content,
        user
      });

      // Guardar el post
      await entityManager.save(post);

      reply.code(201).send(post);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({ message: 'Internal Server Error' });
    }
  };

  server.post(
    '/',
    {
      schema: postSchema,
      preValidation: [server.authenticate]
    },
    handler
  );
}

export default createPost;
