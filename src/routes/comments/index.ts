import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { Comment } from '../../entity/comment';
import { EntityManager } from 'typeorm';
import { commentSchema } from './schema';
import { Post } from '../../entity/post';


async function comments(fastify: FastifyInstance) {

  const handler = async (request: FastifyRequest<{ Params: { postId: number }, Body: { content: string } }>, reply: FastifyReply) => {
    const entityManager: EntityManager = fastify.dataSource.manager;

    try {
      const postId = request.params.postId;
      const content = request.body.content;
      const user = typeof request.user === 'string' ? { id: request.user } : request.user;

      // Verificar si el post existe
      const postExists = await entityManager.findOne(Post, { where: { id: postId } });
      if (!postExists) {
        return reply.code(404).send({ message: 'Post not found' });
      }

      // Crear el comentario
      const comment = entityManager.create(Comment, {
        content,
        user,
        post: { id: postId }
      });

      // Guardar el comentario
      await entityManager.save(comment);

      reply.code(201).send(comment);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({ message: 'Internal Server Error' });
    }
  }
  fastify.post('/:postId/comment', { schema: commentSchema, preValidation: [fastify.authenticate] }, handler);
}

export default comments