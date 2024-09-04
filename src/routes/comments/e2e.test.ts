import { FastifyInstance } from 'fastify';
import { app } from '../../core/app';
import { Comment } from '../../entity/comment';
import { Post } from '../../entity/post';
import { EntityManager } from 'typeorm';

describe('Comments Endpoint', () => {
  let server: FastifyInstance;
  let entityManager: EntityManager;
  let testPost: Post;
  let testUser: { id: number; username: string };
  let authToken: string;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    server = await app();
    await server.listen({ port: 0, host: '0.0.0.0' });
    await server.ready();

    entityManager = server.dataSource.manager;

    // Create a test user
    testUser = { id: 123, username: 'john_doe' };

    // Create a test post
    testPost = await entityManager.save(Post, {
      title: 'Test Post',
      content: 'This is a test post'
    });

    // Generate an auth token for the test user
    authToken = server.jwt.sign({ id: testUser.id });
  });

  afterAll(async () => {
    await entityManager.delete(Comment, {});
    await entityManager.delete(Post, {});
    await server.close();
  });

  it.skip('should create a new comment', async () => {
    const response = await server.inject({
      method: 'POST',
      url: `/comments/${testPost.id}/comment`,
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      payload: {
        content: 'This is a great post!'
      }
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toMatchObject({
      content: 'This is a great post!',
      user: { id: testUser.id, username: testUser.username },
      post: { id: testPost.id }
    });
  });

  it('should return 404 if post does not exist', async () => {
    const nonExistentPostId = 9999;
    const response = await server.inject({
      method: 'POST',
      url: `/comments/${nonExistentPostId}/comment`,
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      payload: {
        content: 'This is a great post!'
      }
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toMatchObject({ message: 'Post not found' });
  });

  it('should return 500 if an internal error occurs', async () => {
    // Simulate an internal error by sending a request with invalid data
    const response = await server.inject({
      method: 'POST',
      url: `/comments/${testPost.id}/comment`,
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      payload: {
        content: 123 // Invalid content type
      }
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toMatchObject({ message: 'Internal Server Error' });
  });
});
