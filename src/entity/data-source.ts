import "reflect-metadata"
import { DataSource } from "typeorm";
import { Post } from "./post";
import { User } from "./user";
import { Like } from "./like";
import { Comment } from "./comment";
import { Follow } from "./follow";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [Post, User, Like, Comment, Follow],
  subscribers: [],
  migrations: ["src/migration/**/*.ts"],
})