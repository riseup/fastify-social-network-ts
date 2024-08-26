import Fastify, { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyRateLimit from '@fastify/rate-limit';
import fastifyCookie from '@fastify/cookie';
import { DataSource } from 'typeorm';

import { Config, config } from '../config';
import { AppDataSource } from '../entity/data-source';
import { authenticate, notFoundHandler, errorHandler, openapi } from '../utils';
import routes from '../routes';

declare module 'fastify' {

  export interface FastifyInstance {
    dataSource: DataSource;
    config: Config
  }
}

export async function app() {
  const server: FastifyInstance = Fastify();
  server.decorate('config', config)
  
  const dataSource = await AppDataSource.initialize();
  server.decorate('dataSource', dataSource);
  
  authenticate(server)
  openapi(server)

  server.setErrorHandler(errorHandler);
  server.setNotFoundHandler(notFoundHandler);
  
  server.register(fastifyCors);
  server.register(fastifyHelmet);
  server.register(fastifyRateLimit);
  server.register(fastifyCookie);

  server.register(routes.users.createUser, { prefix: 'users' });
  server.register(routes.users.getAllUsers, { prefix: 'users' });
  server.register(routes.users.getUser, { prefix: 'users' });
  server.register(routes.posts.createPost, { prefix: 'posts' });
  server.register(routes.posts.getAllPosts, { prefix: 'posts' });
  server.register(routes.posts.getPost, { prefix: 'posts' });
  server.register(routes.followers.follow, { prefix: 'followers' });
  server.register(routes.followers.unfollow, { prefix: 'followers' });
  server.register(routes.login, { prefix: 'login' });
  server.register(routes.comments, { prefix: 'comments' });
  server.register(routes.likes, { prefix: 'likes' });
  server.register(routes.version, { prefix: 'version' });
  server.register(routes.healthCheck, { prefix: 'healthcheck' });
  return server
}


