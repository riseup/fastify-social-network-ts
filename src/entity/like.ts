import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn
} from 'typeorm';
import { User } from './user';
import { Post } from './post';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  like_date!: Date;

  @ManyToOne(() => User, (user) => user.likes)
  user!: User;

  @ManyToOne(() => Post, (post) => post.likes)
  post!: Post;
}
