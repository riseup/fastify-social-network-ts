import { FastifyInstance } from "fastify";
import { app } from "../../../core/app";
import { User } from "../../../entity/user";
import { Follow } from "../../../entity/follow";
import { EntityManager } from "typeorm";

describe("Follow Endpoint", () => {
  let server: FastifyInstance;
  let entityManager: EntityManager;
  let testUser: User;
  let userToFollow: User;
  let authToken: string;

  beforeAll(async () => {
    process.env.NODE_ENV = "test";
    server = await app();
    await server.listen({ port: 0, host: "0.0.0.0" });
    await server.ready();

    entityManager = server.dataSource.manager;

    // Create test users
    testUser = await entityManager.save(User, {
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    userToFollow = await entityManager.save(User, {
      name: "User to Follow",
      email: "usertofollow@example.com",
      password: "password456",
    });

    // Generate an auth token for the test user
    authToken = server.jwt.sign({ id: testUser.id });
  });

  afterAll(async () => {
    await entityManager.delete(Follow, {});
    await entityManager.delete(User, {});
    await server.close();
  });

  it.skip("should follow a user successfully", async () => {
    const response = await server.inject({
      method: "POST",
      url: `/followers/${userToFollow.id}/follow`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    expect(response.statusCode).toBe(204);

    // Verify the follow relationship in the database
    const follow = await entityManager.findOne(Follow, {
      where: {
        followerId: testUser.id,
        followedId: userToFollow.id,
      },
    });

    expect(follow).toBeDefined();
  });

  it("should return 404 if user to follow does not exist", async () => {
    const nonExistentUserId = 9999;
    const response = await server.inject({
      method: "POST",
      url: `/followers/${nonExistentUserId}/follow`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toMatchObject({ message: "User not found" });
  });

  it("should return 401 if not authenticated", async () => {
    const response = await server.inject({
      method: "POST",
      url: `/followers/${userToFollow.id}/follow`,
    });

    expect(response.statusCode).toBe(401);
  });

  it("should return 500 if an internal error occurs", async () => {
    // Simulate an internal error by mocking the entityManager to throw an error
    jest.spyOn(entityManager, "findOne").mockImplementationOnce(() => {
      throw new Error("Database error");
    });

    const response = await server.inject({
      method: "POST",
      url: `/followers/${userToFollow.id}/follow`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toMatchObject({ message: "Internal Server Error" });
  });
});
