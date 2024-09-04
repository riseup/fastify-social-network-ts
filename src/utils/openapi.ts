import { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import revision from '../../static/revision.json';

export const openapi = async (server: FastifyInstance) => {
  server.register(fastifySwagger, {
    openapi: {
      openapi: '3.0.3',
      info: {
        title: server.config.app.name,
        description: `${server.config.app.description} API - rev ${revision}`,
        version: server.config.app.version
      },
      servers: [
        {
          url: `{scheme}://${server.config.server.host}`,
          variables: {
            scheme: {
              enum: server.config.server.schemes,
              default: server.config.server.schemes[0]
            }
          }
        }
      ],

      components: {
        securitySchemes: {
          apiKey: {
            description: 'Authentication bearer token',
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
          }
        }
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      }
    }
  });
};
