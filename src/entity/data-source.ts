import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Post } from './post';
import { User } from './user';
import { Like } from './like';
import { Comment } from './comment';
import { Follow } from './follow';
import * as dotenv from 'dotenv';
dotenv.config();

export function getDataSourceConfig(): DataSource {
  if (process.env.NODE_ENV === 'test') {
    return new DataSource({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [Post, User, Like, Comment, Follow],
      synchronize: true,
      logging: false
    });
  } else {
    return new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'test',
      password: process.env.DB_PASSWORD || 'test',
      database: process.env.DB_DATABASE || 'test',
      synchronize: true,
      logging: true,
      entities: [Post, User, Like, Comment, Follow],
      subscribers: [],
      migrations: ['src/migration/**/*.ts']
    });
  }
}
