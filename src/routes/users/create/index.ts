import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../../../entity/user'; // Asegúrate de importar tu entidad User correctamente
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import { userSchema } from './schema';

async function userCreateUser(server: FastifyInstance) {
  const handler = async (
    request: FastifyRequest<{
      Body: { name: string; email: string; password: string };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const userRepository = server.dataSource.getRepository(User);
      const hashedPassword = await bcrypt.hash(request.body.password, 10);

      const user = userRepository.create({
        name: request.body.name,
        email: request.body.email,
        password: hashedPassword
      });

      const errors = await validate(user);
      if (errors.length > 0) {
        reply.code(400).send({ message: 'Validation failed', errors });
        return;
      }

      await userRepository.save(user);
      reply.code(201).send({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({ message: 'Internal Server Error' });
    }
  };

  server.post(
    '/',
    {
      schema: userSchema
    },
    handler
  );
}

export default userCreateUser;
