import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user';
import { Post } from './post';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'text'})
  content!: string;

  @CreateDateColumn()
  comment_date!: Date;

  @ManyToOne(() => User, user => user.comments)
  user!: User;

  @ManyToOne(() => Post, post => post.comments)
  post!: Post;
}