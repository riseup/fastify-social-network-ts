import bcrypt from 'bcrypt';
import { getDataSourceConfig } from '../entity/data-source';
import { User } from '../entity/user';
import { Post } from '../entity/post';
import { Comment } from '../entity/comment';
import { Like } from '../entity/like';
import { Follow } from '../entity/follow';

async function seed() {
  const AppDataSource = getDataSourceConfig();
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);
  const postRepository = AppDataSource.getRepository(Post);
  const commentRepository = AppDataSource.getRepository(Comment);
  const likeRepository = AppDataSource.getRepository(Like);
  const followRepository = AppDataSource.getRepository(Follow);

  // Crear usuarios
  const users = [];
  for (let i = 1; i <= 10; i++) {
    const user = new User();
    user.name = `User ${i}`;
    user.email = `user${i}@example.com`;
    const hashedPassword = await bcrypt.hash(`password${i}`, 10);
    user.password = hashedPassword;
    await userRepository.save(user);
    users.push(user);
  }

  // Crear posts
  const posts = [];
  for (let i = 1; i <= 10; i++) {
    const post = new Post();
    post.content = `This is the post number ${i}`;
    post.user = users[i - 1];
    await postRepository.save(post);
    posts.push(post);
  }

  // Crear comentarios
  const comments = [];
  for (let i = 1; i <= 10; i++) {
    const comment = new Comment();
    comment.content = `This is a comment on post number ${i}`;
    comment.user = users[i % 10];
    comment.post = posts[i - 1];
    await commentRepository.save(comment);
    comments.push(comment);
  }

  // Crear likes
  const likes = [];
  for (let i = 1; i <= 10; i++) {
    const like = new Like();
    like.user = users[i % 10];
    like.post = posts[i - 1];
    await likeRepository.save(like);
    likes.push(like);
  }

  // Crear follows
  const follows = [];
  for (let i = 1; i <= 10; i++) {
    const follow = new Follow();
    follow.follower = users[i - 1];
    follow.followed = users[i % 10];
    await followRepository.save(follow);
    follows.push(follow);
  }

  console.log('Seed data inserted successfully');
  await AppDataSource.destroy();
}

seed().catch((error) => console.error(error));
