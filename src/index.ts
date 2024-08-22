import bcrypt from "bcrypt";

import { AppDataSource } from "./entity/data-source";
import { User } from "./entity/user";
import { Post } from "./entity/post";
import { Like } from "./entity/like";
import { Comment } from "./entity/comment";
import { Follow } from "./entity/follow";


async function main() {
  try {
    // Inicializar la conexión a la base de datos
    await AppDataSource.initialize();
    console.log("Database connection established");

    // Crear un usuario
    const userRepo = AppDataSource.getRepository(User);
    const hashedPassword = await bcrypt.hash("password123", 10);
    const user = userRepo.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: hashedPassword,
    });
    await userRepo.save(user);
    console.log("User created:", user);

    // Crear un post
    const postRepo = AppDataSource.getRepository(Post);
    const post = postRepo.create({
      content: "This is a test post",
      user: user,
    });
    await postRepo.save(post);
    console.log("Post created:", post);

    // Crear un like
    const likeRepo = AppDataSource.getRepository(Like);
    const like = likeRepo.create({
      user: user,
      post: post,
    });
    await likeRepo.save(like);
    console.log("Like created:", like);

    // Crear un comentario
    const commentRepo = AppDataSource.getRepository(Comment);
    const comment = commentRepo.create({
      content: "This is a test comment",
      user: user,
      post: post,
    });
    await commentRepo.save(comment);
    console.log("Comment created:", comment);

    // Crear un follow (usuario sigue a sí mismo para prueba)
    const followRepo = AppDataSource.getRepository(Follow);
    const follow = followRepo.create({
      follower: user,
      followed: user,
    });
    await followRepo.save(follow);
    console.log("Follow created:", follow);

    // Cerrar la conexión a la base de datos
    await AppDataSource.destroy();
    console.log("Database connection closed");
  } catch (error) {
      console.error("Error during test:", error);
      process.exit(1);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

main();