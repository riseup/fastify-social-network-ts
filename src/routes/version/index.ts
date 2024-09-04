import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import fs from 'fs/promises';
import path from 'path';
import { versionSchema } from './schema';

async function versionRoute(server: FastifyInstance) {
  const handler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Leer el archivo package.json
      const packagePath = path.join(process.cwd(), 'package.json');
      const packageData = await fs.readFile(packagePath, 'utf8');
      const packageJson = JSON.parse(packageData);

      // Enviar la versión
      reply.code(200).send({ version: packageJson.version });
    } catch (error) {
      request.log.error(error);
      reply.code(500).send({ message: 'Internal Server Error' });
    }
  };

  server.get('/', { schema: versionSchema }, handler);
}

export default versionRoute;
