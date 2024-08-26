import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { Post } from './../../../entity/post';
import { EntityManager } from 'typeorm';
import { getAllPostsSchema } from './schema';

async function getAllPosts(fastify: FastifyInstance) {

  const handler = async (request: FastifyRequest, reply: FastifyReply) => {
    const entityManager: EntityManager = fastify.dataSource.manager;

    try {
      // Obtener todos los posts
      const posts = await entityManager.find(Post);
      reply.code(200).send(posts);
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({ message: 'Internal Server Error' });
    }
  }

  fastify.get('/', {
    schema: getAllPostsSchema
  }, handler);
}


export default getAllPosts