import { app } from './app';

export const start = async () => {
  const fastify = await app();
  try {
    await fastify.ready();
    console.log(JSON.stringify(fastify.swagger(), null, 2));
    await fastify.listen({ port: 3000 });
    console.log(`Server listening on port 3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
