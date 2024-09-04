import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { User } from './../../../entity/user';
import { userSchema } from './schema';

async function getUser(server: FastifyInstance) {
  const handler = async (
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) => {
    try {
      const userRepository = server.dataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { id: request.params.id }
      });

      if (!user) {
        reply.code(404).send({ message: 'User not found' });
        return;
      }

      reply.code(200).send({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({ message: 'Internal Server Error' });
    }
  };

  server.get(
    '/:id',
    {
      schema: userSchema
    },
    handler
  );
}
export default getUser;
