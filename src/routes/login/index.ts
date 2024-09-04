import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../../entity/user';
import bcrypt from 'bcrypt';
import { authSchema } from './schema';

async function login(server: FastifyInstance) {
  const handler = async (
    request: FastifyRequest<{ Body: { email: string; password: string } }>,
    reply: FastifyReply
  ) => {
    const userRepository = server.dataSource.getRepository(User);

    try {
      const user = await userRepository.findOne({
        where: {
          email: request.body.email
        }
      });

      if (
        !user ||
        !user.password ||
        !bcrypt.compareSync(request.body.password, user.password)
      ) {
        return reply.code(401).send({ message: 'Invalid email or password' });
      }

      const token = server.jwt.sign({ id: user.id });
      reply.send({ token });
    } catch (error) {
      console.error('Internal Server Error:', error); // Log para depuración
      request.log.error(error);
      reply.code(500).send({ message: 'Internal Server Error' });
    }
  };

  server.post(
    '/',
    {
      schema: authSchema
    },
    handler
  );
}

export default login;
