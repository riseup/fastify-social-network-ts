import { app } from './app';

export const start = async () => {
  const server = await app();
  try {
    await server.listen({
      port: Number(process.env.PORT) || 3000,
      host: '0.0.0.0'
    });
    await server.ready();
    console.log(`Server listening on: ${JSON.stringify(server.server.address() as object)}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
